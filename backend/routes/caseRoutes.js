import express from "express";
import fetchCharacters from "../services/characterService.js";
import generateCase from "../services/geminiService.js";

const router = express.Router();

router.get("/generate", async (req, res) => {
  try {
    const characters = await fetchCharacters(5);
    const generatedCase = await generateCase(characters);
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
