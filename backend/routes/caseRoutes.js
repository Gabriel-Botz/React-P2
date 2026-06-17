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

    const maleCharacters = await fetchCharacters(4, "male");
    const femaleCharacters = await fetchCharacters(2, "female");
    const characters = [...maleCharacters, ...femaleCharacters];

    const charactersForAI = stripImages(characters);
    const generatedCase = await generateCase(charactersForAI);

    // Injeta imagens baseado no gênero
    let maleIndex = 0;
    let femaleIndex = 0;

    generatedCase.suspects = generatedCase.suspects.map((suspect) => {
      const character = characters.find((c) => c.name === suspect.name);
      const gender = character?.gender || "male";
      const image =
        gender === "female"
          ? femaleCharacters[femaleIndex++]?.image || ""
          : maleCharacters[maleIndex++]?.image || "";
      return { ...suspect, picture: image };
    });

    maleIndex = 0;
    femaleIndex = 0;

    generatedCase.witnesses = generatedCase.witnesses.map((witness) => {
      const character = characters.find((c) => c.name === witness.name);
      const gender = character?.gender || "male";
      const image =
        gender === "female"
          ? femaleCharacters[femaleIndex++]?.image || ""
          : maleCharacters[maleIndex++]?.image || "";
      return { ...witness, picture: image };
    });

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

  res.json({
    resultado: acertou ? "acerto" : "erro",
    culpado: {
      name: culpado.name,
      occupation: culpado.occupation,
      picture: culpado.picture,
    },
    resolucao: cachedCase.solution.explanation,
  });
});

export default router;
