import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cineRoutes from "./routes/cinemas";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["http://localhost:3000", "https://cinemark-it.netlify.app"],  // tu frontend
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// Habilitar preflight para todos los routes
// app.options("*", cors());

app.use(express.json());

app.use("/api", cineRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
