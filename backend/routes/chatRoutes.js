import express from 'express';
import { forwardToN8n } from '../services/n8nWebhookService.js';

const router = express.Router();

//  Recebe a mensagem do front end e envia para o n8n
//  Body esperado: { "message": "string" }
//  Retorno: { "reply": "string" }
 
router.post('/help', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'INVALID_PAYLOAD',
        details: 'Message is required and must be a non-empty string',
      });
    }

    const reply = await forwardToN8n(message.trim());

    res.json({ reply });
  } catch (error) {
    console.error('Chat help error:', error.message);

    if (error.message === 'N8N_TIMEOUT') {
      return res.status(504).json({
        error: 'N8N_TIMEOUT',
        details: 'The help service timed out. Please try again.',
      });
    }

    if (error.message.startsWith('N8N_UPSTREAM_ERROR')) {
      return res.status(502).json({
        error: 'N8N_UPSTREAM_ERROR',
        details: 'Unable to reach the help service. Please try again later.',
      });
    }

    res.status(500).json({
      error: 'INTERNAL_ERROR',
      details: 'An unexpected error occurred',
    });
  }
});

export default router;