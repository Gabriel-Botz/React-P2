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

    const characters = await fetchCharacters(10);

    const mockWithImages = {
      case: {
        title: "O Roubo na Mansão",
        description: "Um colar foi roubado.",
        location: "São Paulo",
      },
      suspects: [
        {
          id: 1,
          name: "Carlos Silva",
          occupation: "Empresário",
          motive: "Dívidas",
          alibi: "Estava no jardim",
          picture: characters[0]?.image || "",
          isGuilty: false,
        },
        {
          id: 2,
          name: "Ana Souza",
          occupation: "Secretária",
          motive: "Vingança",
          alibi: "Estava na cozinha",
          picture: characters[1]?.image || "",
          isGuilty: true,
        },
        {
          id: 3,
          name: "Pedro Lima",
          occupation: "Segurança",
          motive: "Dinheiro",
          alibi: "Patrulhando",
          picture: characters[2]?.image || "",
          isGuilty: false,
        },
      ],
      witnesses: [
        {
          id: 1,
          name: "João Costa",
          role: "Motorista",
          testimony: "Vi Ana saindo às 22h",
          picture: characters[3]?.image || "",
          isContradictory: false,
        },
        {
          id: 2,
          name: "Maria Ramos",
          role: "Cozinheira",
          testimony: "Não vi ninguém",
          picture: characters[4]?.image || "",
          isContradictory: true,
        },
      ],
      clues: [
        { id: 1, description: "Luvas de couro encontradas", location: "Sala" },
        { id: 2, description: "Perfume no corredor", location: "Corredor" },
        { id: 3, description: "Relógio quebrado", location: "Quarto" },
      ],
      solution: {
        guiltyName: "Ana Souza",
        explanation: "Ana aproveitou o acesso à mansão para roubar o colar.",
      },
    };

    cachedCase = mockWithImages;
    res.json(mockWithImages);
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
