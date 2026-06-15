import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import caseRoutes from "./routes/caseRoutes.js";

dotenv.config();
console.log("Chave:", process.env.GEMINI_API_KEY);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando!",
  });
});

const PORT = process.env.PORT || 5000;

app.use("/cases", caseRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
