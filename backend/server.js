import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import caseRoutes from "./routes/caseRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
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
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
