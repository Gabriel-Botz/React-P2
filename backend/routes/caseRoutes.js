import express from "express";
import mockCase from "../data/mockCase.js";

const router = express.Router();

router.get("/generate", (req, res) => {
  res.json(mockCase);
});

export default router;
