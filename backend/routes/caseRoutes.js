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

export default router;
