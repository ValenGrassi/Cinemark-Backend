// prisma/seedPalermoComplete.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🔹 Eliminando Cines ");

  await prisma.portDetails.deleteMany({});
  await prisma.specs.deleteMany({});
  await prisma.rackComponent.deleteMany({});
  await prisma.cinema.deleteMany({});


  console.log("✅ Cines eliminados.");

  console.log("🔹 Creando Cines nuevos...");

  await prisma.cinema.create({
    data: {
      id: 'malvinas-argentinas',
      name: 'Cine Malvinas Argentinas',
      location: 'Malvinas Argentinas',
      address: 'Av. Presidente Perón 2500, Malvinas Argentinas, Buenos Aires',
      lastUpdated: new Date('2024-01-08'),
      generator: false,
      rackComponents: {
        create: [
          {
            type: 'switch',
            name: 'Quidway 3308 Series',
            model: 'Quidway 3308',
            status: 'online',
            position: 1,
            powerConsumption: 25,
            description: 'Switch principal de distribución de red',
            specs: {
              create: {
                ports: 24,
                connections: 18,
                portDetails: {
                  create: [
                    { portNumber: 1, isConnected: true, connectedTo: 'Servidor de Proyección 01', description: 'Conecta Servidor de Proyección 01' },
                    { portNumber: 2, isConnected: true, connectedTo: 'Servidor de Audio', description: 'Conecta Servidor de Audio' },
                    { portNumber: 3, isConnected: true, connectedTo: 'Cisco C8200 4T', description: 'Conecta Cisco C8200 4T' },
                    { portNumber: 4, isConnected: true, connectedTo: 'Cisco FPR1000', description: 'Conecta Cisco FPR1000' },
                    // puertos restantes sin conexión
                    ...Array.from({ length: 20 }, (_, i) => ({
                      portNumber: i + 5,
                      isConnected: false,
                      connectedTo: null,
                      description: 'No conectado'
                    }))
                  ]
                }
              }
            }
          },
          {
            type: 'server',
            name: 'HP ProLiant DL360 Gen 10',
            model: 'DL360 Gen10',
            status: 'online',
            position: 7,
            powerConsumption: 275,
            description: 'Servidor principal para aplicaciones críticas del cine',
            specs: {
              create: {
                cpu: '2x Intel Xeon Silver 4214R',
                ram: '64GB DDR4 ECC',
                storage: '4x 1TB NVMe SSD RAID 10'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS Principal 10kVA',
            model: 'APC Smart-UPS SRT 10kVA',
            status: 'online',
            position: 14,
            description: 'UPS principal con autonomía de 5-7 horas',
            batteryInstallDate: new Date('2023-08-15'),
            capacityVA: 10000,
            specs: { create: {} }
          }
        ]
      }
    }
  });

  // ---------- Cine Moreno ----------
  await prisma.cinema.create({
    data: {
      id: 'moreno',
      name: 'Cine Moreno',
      location: 'Moreno',
      address: 'Av. Victorica 1234, Moreno, Buenos Aires',
      lastUpdated: new Date('2024-01-08'),
      generator: false,
      rackComponents: {
        create: [
          {
            type: 'server',
            name: 'Servidor de Proyección 01',
            status: 'online',
            position: 1,
            powerConsumption: 180,
            description: 'Servidor principal de proyección digital de cine',
            specs: {
              create: {
                cpu: 'Intel Xeon E5-2680 v4',
                ram: '64GB DDR4',
                storage: '4TB NVMe SSD'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS Alimentación Principal',
            model: 'APC Smart-UPS 3000',
            status: 'warning',
            position: 2,
            description: 'UPS principal para equipos críticos del cine',
            batteryInstallDate: new Date('2022-03-15'),
            capacityVA: 3000,
            specs: { create: {} }
          },
          {
            type: 'server',
            name: 'Servidor de Audio',
            status: 'online',
            position: 3,
            powerConsumption: 150,
            description: 'Servidor de procesamiento de audio Dolby Atmos',
            specs: {
              create: {
                cpu: 'AMD EPYC 7542',
                ram: '32GB DDR4',
                storage: '2TB SSD'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS Secundario',
            model: 'APC Smart-UPS 1500',
            status: 'warning',
            position: 5,
            description: 'UPS secundario para equipos de red',
            batteryInstallDate: new Date('2022-01-10'),
            capacityVA: 1500,
            specs: { create: {} }
          }
        ]
      }
    }
  });

  // ---------- Cine Morón ----------
  await prisma.cinema.create({
    data: {
      id: 'moron',
      name: 'Cine Morón',
      location: 'Morón',
      address: 'Av. Rivadavia 5678, Morón, Buenos Aires',
      lastUpdated: new Date('2024-01-08'),
      generator: false,
      rackComponents: {
        create: [
          {
            type: 'server',
            name: 'Servidor de Proyección 01',
            status: 'online',
            position: 1,
            powerConsumption: 160,
            description: 'Servidor de proyección digital de cine',
            specs: {
              create: {
                cpu: 'Intel Xeon Silver 4214',
                ram: '32GB DDR4',
                storage: '2TB NVMe SSD'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS Alimentación Principal',
            model: 'APC Smart-UPS 2200',
            status: 'online',
            position: 2,
            description: 'UPS principal para equipos del cine',
            batteryInstallDate: new Date('2023-06-20'),
            capacityVA: 2200,
            specs: { create: {} }
          },
          {
            type: 'server',
            name: 'Servidor de Medios',
            status: 'online',
            position: 3,
            powerConsumption: 200,
            description: 'Servidor de almacenamiento y streaming de medios',
            specs: {
              create: {
                cpu: 'Intel Core i7-10700K',
                ram: '64GB DDR4',
                storage: '8TB HDD RAID'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS de Red',
            model: 'APC Smart-UPS 1000',
            status: 'warning',
            position: 4,
            description: 'UPS para equipos de red y auxiliares',
            batteryInstallDate: new Date('2022-08-15'),
            capacityVA: 1000,
            specs: { create: {} }
          }
        ]
      }
    }
  });

  // ---------- Cine San Martín ----------
  await prisma.cinema.create({
    data: {
      id: 'san-martin',
      name: 'Cine San Martín',
      location: 'San Martín',
      address: 'Av. San Martín 9012, San Martín, Buenos Aires',
      lastUpdated: new Date('2024-01-08'),
      generator: true,
      rackComponents: {
        create: [
          {
            type: 'server',
            name: 'Servidor de Proyección 01',
            status: 'online',
            position: 1,
            powerConsumption: 140,
            description: 'Servidor de proyección de última generación',
            specs: {
              create: {
                cpu: 'AMD Ryzen 9 5900X',
                ram: '32GB DDR4',
                storage: '1TB NVMe SSD'
              }
            }
          },
          {
            type: 'ups',
            name: 'UPS Alimentación Principal',
            model: 'APC Smart-UPS 3000',
            status: 'online',
            position: 2,
            description: 'Nuevo sistema UPS principal',
            batteryInstallDate: new Date('2023-11-01'),
            capacityVA: 3000,
            specs: { create: {} }
          }
        ]
      }
    }
  });

  await prisma.cinema.create({
    data: {
      id: 'palermo',
      name: 'Cine Palermo',
      location: 'Palermo',
      address: 'Av. Santa Fe 1234, Palermo, Buenos Aires',
      lastUpdated: new Date('2025-08-15'),
      generator: true,
      rackComponents: {
        create: [
          // Switch Core 48p
          {
            name: 'Switch Core 48p',
            status: 'online',
            model: 'Cisco Catalyst 9500',
            type: 'switch',
            position: 1,
            description: 'Switch core que conecta todas las salas y servidores',
            powerConsumption: 50,
            specs: {
              create: {
                ports: 48,
                connections: 36,
                portDetails: {
                  create: [
                    { portNumber: 1, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                    { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                    { portNumber: 3, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                    { portNumber: 4, isConnected: true, connectedTo: 'Patch Panel Principal', description: 'Conecta a Patch Panel Principal' },
                    { portNumber: 5, isConnected: true, connectedTo: 'Patch Panel Principal', description: 'Conecta a Patch Panel Principal' },
                    { portNumber: 6, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                    { portNumber: 7, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                    { portNumber: 8, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                    // Puertos 9-48 no conectados
                    ...Array.from({ length: 40 }, (_, i) => ({
                      portNumber: i + 9,
                      isConnected: false,
                      description: 'No conectado'
                    }))
                  ]
                }
              }
            }
          },
          // Patch Panel Principal 48p
          {
            name: 'Patch Panel Principal 48p',
            status: 'online',
            type: 'patch-panel',
            position: 2,
            description: 'Patch panel principal del rack',
            powerConsumption: 0,
            specs: {
              create: {
                ports: 48,
                connections: 24,
                portDetails: {
                  create: [
                    // Puertos 1-24 conectados a Switch Core 48p y servidores
                    { portNumber: 1, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                    { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                    { portNumber: 3, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                    { portNumber: 4, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                    { portNumber: 5, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                    { portNumber: 6, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                    { portNumber: 7, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                    { portNumber: 8, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                    { portNumber: 9, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                    { portNumber: 10, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                    { portNumber: 11, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                    { portNumber: 12, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                    { portNumber: 13, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                    { portNumber: 14, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                    { portNumber: 15, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                    { portNumber: 16, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                    { portNumber: 17, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                    { portNumber: 18, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                    { portNumber: 19, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                    { portNumber: 20, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                    { portNumber: 21, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                    { portNumber: 22, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                    { portNumber: 23, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                    { portNumber: 24, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                    // Puertos 25-48 no conectados
                    ...Array.from({ length: 24 }, (_, i) => ({
                      portNumber: i + 25,
                      isConnected: false,
                      description: 'No conectado'
                    }))
                  ]
                }
              }
            }
          },
          // Servidores
          {
            name: 'Servidor Cine 01',
            status: 'online',
            model: 'HP DL380 Gen10',
            type: 'server',
            position: 3,
            description: 'Servidor principal de proyección y aplicaciones del cine',
            powerConsumption: 300,
            specs: {
              create: {
                ram: '128GB DDR4 ECC',
                storage: '8x 2TB NVMe SSD RAID10',
                cpu: '2x Intel Xeon Gold 5218'
              }
            }
          },
          {
            name: 'Servidor Cine 02',
            status: 'online',
            model: 'Dell PowerEdge R740',
            type: 'server',
            position: 4,
            description: 'Servidor de medios y streaming',
            powerConsumption: 280,
            specs: {
              create: {
                ram: '64GB DDR4 ECC',
                storage: '4x 2TB NVMe SSD',
                cpu: '2x Intel Xeon Silver 4210'
              }
            }
          },
          // Router
          {
            name: 'Router Principal',
            status: 'online',
            model: 'Cisco ISR 4331',
            type: 'router',
            position: 5,
            description: 'Router principal del cine',
            powerConsumption: 40,
            specs: { create: { 
                ports: 8, 
                connections: 4,
                portDetails: {
                    create: [
                      // Puertos 1-24 conectados a Switch Core 48p y servidores
                      { portNumber: 1, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 3, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 4, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 5, isConnected: false},
                      { portNumber: 6, isConnected: false},
                      { portNumber: 7, isConnected: false},
                      { portNumber: 8, isConnected: false}
                    ]
                  }
            }}
          },
          // UPS
          {
            name: 'UPS Principal 15kVA',
            status: 'online',
            model: 'APC Smart-UPS SRT 15kVA',
            type: 'ups',
            position: 6,
            description: 'UPS principal con autonomía de 5 horas',
            batteryInstallDate: new Date('2024-01-10'),
            capacityVA: 15000,
            specs: { create: {} }
          },
          // Switches de sala
          {
            name: 'Switch Sala 1',
            status: 'online',
            model: 'Cisco Catalyst 2960',
            type: 'switch',
            position: 7,
            description: 'Switch dedicado a Sala 1',
            powerConsumption: 15,
            specs: { create: { 
                ports: 24, 
                connections: 12,
                portDetails: {
                    create: [
                      // Puertos 1-24 conectados a Switch Core 48p y servidores
                      { portNumber: 1, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 3, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 4, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 5, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                      { portNumber: 6, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                      { portNumber: 7, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                      { portNumber: 8, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 9, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 10, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 11, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 12, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 13, isConnected: false},
                      { portNumber: 14, isConnected: false},
                      { portNumber: 15, isConnected: false},
                      { portNumber: 16, isConnected: false},
                      { portNumber: 17, isConnected: false},
                      { portNumber: 18, isConnected: false},
                      { portNumber: 19, isConnected: false},
                      { portNumber: 20, isConnected: false},
                      { portNumber: 21, isConnected: false},
                      { portNumber: 22, isConnected: false},
                      { portNumber: 23, isConnected: false},
                      { portNumber: 24, isConnected: false},
                    ]
                  }
            }}
          },
          {
            name: 'Switch Sala 2',
            status: 'online',
            model: 'Cisco Catalyst 2960',
            type: 'switch',
            position: 8,
            description: 'Switch dedicado a Sala 2',
            powerConsumption: 15,
            specs: { create: { 
                ports: 24, 
                connections: 12,
                portDetails: {
                    create: [
                      // Puertos 1-24 conectados a Switch Core 48p y servidores
                      { portNumber: 1, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 3, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 4, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 5, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                      { portNumber: 6, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                      { portNumber: 7, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                      { portNumber: 8, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 9, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 10, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 11, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 12, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 13, isConnected: false},
                      { portNumber: 14, isConnected: false},
                      { portNumber: 15, isConnected: false},
                      { portNumber: 16, isConnected: false},
                      { portNumber: 17, isConnected: false},
                      { portNumber: 18, isConnected: false},
                      { portNumber: 19, isConnected: false},
                      { portNumber: 20, isConnected: false},
                      { portNumber: 21, isConnected: false},
                      { portNumber: 22, isConnected: false},
                      { portNumber: 23, isConnected: false},
                      { portNumber: 24, isConnected: false},
                    ]
                  }
            }}
          },
          {
            name: 'Switch Sala 3',
            status: 'online',
            model: 'Cisco Catalyst 2960',
            type: 'switch',
            position: 9,
            description: 'Switch dedicado a Sala 3',
            powerConsumption: 15,
            specs: { create: { 
                ports: 24, 
                connections: 12,
                portDetails: {
                    create: [
                      // Puertos 1-24 conectados a Switch Core 48p y servidores
                      { portNumber: 1, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 2, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 3, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 4, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 5, isConnected: true, connectedTo: 'Switch Sala 2', description: 'Conecta a Switch Sala 2' },
                      { portNumber: 6, isConnected: true, connectedTo: 'Switch Sala 3', description: 'Conecta a Switch Sala 3' },
                      { portNumber: 7, isConnected: true, connectedTo: 'Router Principal', description: 'Conecta a Router Principal' },
                      { portNumber: 8, isConnected: true, connectedTo: 'Servidor Cine 01', description: 'Conecta a Servidor Cine 01' },
                      { portNumber: 9, isConnected: true, connectedTo: 'Servidor Cine 02', description: 'Conecta a Servidor Cine 02' },
                      { portNumber: 10, isConnected: true, connectedTo: 'Switch Core 48p', description: 'Conecta a Switch Core 48p' },
                      { portNumber: 11, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 12, isConnected: true, connectedTo: 'Switch Sala 1', description: 'Conecta a Switch Sala 1' },
                      { portNumber: 13, isConnected: false},
                      { portNumber: 14, isConnected: false},
                      { portNumber: 15, isConnected: false},
                      { portNumber: 16, isConnected: false},
                      { portNumber: 17, isConnected: false},
                      { portNumber: 18, isConnected: false},
                      { portNumber: 19, isConnected: false},
                      { portNumber: 20, isConnected: false},
                      { portNumber: 21, isConnected: false},
                      { portNumber: 22, isConnected: false},
                      { portNumber: 23, isConnected: false},
                      { portNumber: 24, isConnected: false},
                    ]
                  }
            } }
          }
        ]
      }
    }
  });

  console.log("✅ Nuevos Cines creados con todos los detalles.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
