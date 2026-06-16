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
          "Você é um escritor especialista em romances policiais brasileiros, com domínio de narrativa noir, psicologia criminal e construção de mistérios coerentes. Sempre responde com JSON válido e bem estruturado, sem nenhum texto adicional fora do JSON.",
      },
      {
        role: "user",
        content: `
Você é um escritor de mistérios policiais. Com base nos personagens abaixo, crie um caso de investigação criminal elaborado, coerente e envolvente.

PERSONAGENS:
${JSON.stringify(characters)}

REGRAS IMPORTANTES:
- O caso deve ter um único culpado, com motivação psicológica profunda e convincente
- As pistas devem ser coerentes entre si e apontar logicamente para o culpado
- Os álibs dos inocentes devem ser verificáveis, mas com pequenas brechas
- Os testemunhos contraditórios devem ter uma explicação lógica dentro da narrativa
- A solução deve amarrar todas as pistas e testemunhos de forma satisfatória

Crie um caso com:
- Título criativo e intrigante
- Descrição com EXATAMENTE 3 parágrafos de 4 linhas cada, detalhando: 1º) o crime e a cena, 2º) o contexto e os personagens envolvidos, 3º) o desafio para o detetive
- Vítima com nome, idade e profissão
- Local específico e detalhado
- Hora estimada da morte
- Causa da morte detalhada
- Exatamente 4 suspeitos homens e 2 suspeitas mulheres, cada um com ocupação coerente, motivo forte e álibi plausível
- 10 testemunhas com depoimentos elaborados de pelo menos 5 linhas cada, descrevendo detalhes específicos do que viram, ouviram ou sabem. Pelo menos 2 depoimentos devem conter contradições sutis com outros testemunhos ou com as pistas encontradas, sem que a testemunha perceba que está se contradizendo
- 9 pistas físicas encontradas na cena, cada uma com localização específica
- Solução completa explicando como e por que o crime foi cometido

Responda APENAS com JSON válido, sem texto extra, neste formato:
{
  "case": { 
    "title": "", 
    "description": "", 
    "location": "", 
    "victim": "",
    "deathTime": "",
    "causeOfDeath": ""
  },
  "suspects": [{ "id": 1, "name": "", "occupation": "", "motive": "", "alibi": "", "picture": "", "isGuilty": false }],
  "witnesses": [{ "id": 1, "name": "", "role": "", "testimony": "", "picture": "", "isContradictory": false }],
  "clues": [{ "id": 1, "description": "", "location": "" }],
  "solution": { "guiltyName": "", "explanation": "" }
}`,
      },
    ],
    temperature: 0.85,
    max_tokens: 3000,
  });

  const text = completion.choices[0].message.content.trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Groq não retornou JSON válido");
  return JSON.parse(match[0]);
}

export default generateCase;
