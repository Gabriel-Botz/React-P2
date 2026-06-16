// caseRoutes.js
import express from "express";
import fetchCharacters from "../services/characterService.js";
import generateCase from "../services/groqService.js";

const router = express.Router();

let cachedCase = null; // cache em memória

router.get("/generate", async (req, res) => {
  try {
    if (cachedCase) {
      return res.json(cachedCase); // retorna o cache sem chamar o Gemini
    }

    const characters = await fetchCharacters(5);
    const generatedCase = await generateCase(characters);

    cachedCase = generatedCase; // salva no cache
    res.json(generatedCase);
  } catch (error) {
    console.error("Erro ao gerar caso:", error.message);
    res.status(500).json({
      error: "Não foi possível gerar o caso.",
      details: error.message,
    });
  }
});

router.get("/mock", (req, res) => {
  res.json(mockCase);
});

router.post("/accusation", (req, res) => {
  const { suspectId } = req.body;

  if (!cachedCase) {
    return res.status(400).json({ error: "Nenhum caso gerado ainda." });
  }

  const culpado = cachedCase.suspects.find((s) => s.isGuilty === true);
  console.log("culpado:", culpado);
  console.log(
    "comparação:",
    culpado?.id,
    "===",
    suspectId,
    "→",
    culpado?.id === suspectId,
  );
  const acertou = culpado?.id === suspectId;

  res.json({ resultado: acertou ? "acerto" : "erro" });
});

export default router;
