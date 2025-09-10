import { Router } from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

router.get("/cinemas", async (_req: Request, res: Response) => {
  try {
    const cinemas = await prisma.cinema.findMany({
      include: {
        rackComponents: {
          include: {
            specs: {
              include: {
                portDetails: true,
              },
            },
          },
        },
      },
    });
    res.json(cinemas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/cinemas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Falta el ID del cine" });

  try {
    const cinema = await prisma.cinema.findUnique({
      where: { id }, // ahora SIEMPRE string
      include: {
        rackComponents: {
          include: {
            specs: {
              include: {
                portDetails: true,
              },
            },
          },
        },
      },
    });

    if (!cinema) return res.status(404).json({ message: "Cine no encontrado" });
    res.json(cinema);
  } catch (err) {
    console.error(`Error al traer cine ${id}:`, err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.patch("/cinemas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rackComponents } = req.body;

  if (!Array.isArray(rackComponents)) {
    return res.status(400).json({ error: "Se espera { rackComponents: [...] }" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      // IDs existentes en BD
      const existing = await tx.rackComponent.findMany({
        where: { cinemaId: id },
        select: { id: true },
      });
      const existingIds = existing.map(c => c.id);
      const incomingIds = rackComponents.filter(c => typeof c.id === "number").map(c => c.id);

      // Componentes a borrar
      const toDelete = existingIds.filter(eid => !incomingIds.includes(eid));
      if (toDelete.length > 0) {
        // 🔹 Primero eliminar portDetails
        await tx.portDetails.deleteMany({
          where: { specId: { in: await tx.specs.findMany({ where: { rackComponentId: { in: toDelete } }, select: { id: true } }).then(s => s.map(x => x.id)) } }
        });

        // 🔹 Luego eliminar specs
        await tx.specs.deleteMany({ where: { rackComponentId: { in: toDelete } } });

        // 🔹 Finalmente eliminar los rackComponents
        await tx.rackComponent.deleteMany({ where: { id: { in: toDelete } } });
      }

      // Crear o actualizar componentes
      for (const comp of rackComponents) {
        const compData = {
          name: comp.name,
          type: comp.type,
          status: comp.status,
          position: comp.position ?? null,
          model: comp.model ?? null,
          description: comp.description ?? null,
          powerConsumption: comp.powerConsumption ?? null,
          capacityVA: comp.capacityVA ?? null,
          batteryInstallDate: comp.batteryInstallDate ? new Date(comp.batteryInstallDate) : null,
        };

        const specs = comp.specs ?? null;
        const portDetails = specs?.portDetails?.map((pd: any) => ({
          portNumber: pd.portNumber,
          isConnected: !!pd.isConnected,
          connectedTo: pd.connectedTo ?? null,
          description: pd.description ?? null,
        })) ?? [];

        if (existingIds.includes(comp.id)) {
          // actualizar
          await tx.rackComponent.update({
            where: { id: comp.id },
            data: {
              ...compData,
              specs: specs
                ? {
                    upsert: {
                      create: {
                        ram: specs.ram ?? null,
                        storage: specs.storage ?? null,
                        cpu: specs.cpu ?? null,
                        ports: specs.ports ?? null,
                        connections: specs.connections ?? null,
                        portDetails: { create: portDetails },
                      },
                      update: {
                        ram: specs.ram ?? null,
                        storage: specs.storage ?? null,
                        cpu: specs.cpu ?? null,
                        ports: specs.ports ?? null,
                        connections: specs.connections ?? null,
                        portDetails: { deleteMany: {}, create: portDetails },
                      },
                    },
                  }
                : undefined,
            },
          });
        } else {
          // crear
          await tx.rackComponent.create({
            data: {
              ...compData,
              cinemaId: id,
              specs: specs
                ? {
                    create: {
                      ram: specs.ram ?? null,
                      storage: specs.storage ?? null,
                      cpu: specs.cpu ?? null,
                      ports: specs.ports ?? null,
                      connections: specs.connections ?? null,
                      portDetails: { create: portDetails },
                    },
                  }
                : undefined,
            },
          });
        }
      }

      await tx.cinema.update({
        where: { id },
        data: { lastUpdated: new Date() },
      });
    });

    const updated = await prisma.cinema.findUnique({
      where: { id },
      include: {
        rackComponents: { include: { specs: { include: { portDetails: true } } } },
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("PATCH /cinemas/:id error:", err);
    res.status(500).json({ error: "Error interno al actualizar rackComponents" });
  }
});

export default router;
