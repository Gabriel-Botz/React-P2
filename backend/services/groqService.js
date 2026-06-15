import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateCase(characters) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "Você é um escritor especialista em mistérios policiais. Sempre responde com JSON válido e bem estruturado, sem nenhum texto adicional fora do JSON.",
      },
      {
        role: "user",
        content: `
Você é um escritor de mistérios policiais. Com base nos personagens abaixo, crie um caso de investigação criminal.

PERSONAGENS:
${JSON.stringify(characters)}

Crie um caso com:
- Título e descrição do crime
- Crie exatamente 5 suspeitos e 5 testemunhas usando os personagens fornecidos
- Motivo e álibi para cada suspeito
- 10 pistas encontradas na cena
- Testemunhos (alguns contraditórios)
- A solução revelando o culpado

Responda APENAS com JSON válido, sem texto extra, neste formato:
{
  "case": { "title": "", "description": "", "location": "" },
  "suspects": [{ "id": 1, "name": "", "occupation": "", "motive": "", "alibi": "", "picture": "", "isGuilty": false }],
  "witnesses": [{ "id": 1, "name": "", "role": "", "testimony": "", "picture": "", "isContradictory": false }],
  "clues": [{ "id": 1, "description": "", "location": "" }],
  "solution": { "guiltyName": "", "explanation": "" }
}`,
      },
    ],
    temperature: 0.9,
    max_tokens: 2000,
  });

  const text = completion.choices[0].message.content.trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Groq não retornou JSON válido");
  return JSON.parse(match[0]);
}

export default generateCase;
