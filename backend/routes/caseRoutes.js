import express from "express";
import fetchCharacters, { stripImages } from "../services/characterService.js";
import generateCase from "../services/groqService.js";

const router = express.Router();

let cachedCase = null;

router.get("/generate", async (req, res) => {
  try {
    if (cachedCase) {
      return res.json(cachedCase);
    }

    const characters = await fetchCharacters(5);
    console.log(
      "Imagens geradas:",
      characters.map((c) => c.image),
    );
    const charactersForAI = stripImages(characters);
    const generatedCase = await generateCase(charactersForAI);

    generatedCase.suspects = generatedCase.suspects.map((suspect, index) => ({
      ...suspect,
      picture: characters[index]?.image || "",
    }));

    generatedCase.witnesses = generatedCase.witnesses.map((witness, index) => ({
      ...witness,
      picture: characters[index]?.image || "",
    }));

    cachedCase = generatedCase;
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
  res.json({ message: "mock desativado" });
});

export default router;
