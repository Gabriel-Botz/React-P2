import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateCase(characters) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(
    `Você é um escritor de mistérios policiais. Com base nos personagens abaixo, crie um caso de investigação criminal.
        
    PERSONAGENS:
    ${JSON.stringify(characters)}
    
    Crie um caso com:
    - Título e descrição do crime
    - Cada personagem sendo suspeito ou testemunha
    - Motivo e álibi para cada suspeito
    - 3 pistas encontradas na cena
    - Testemunhos (alguns contraditórios)
    - A solução revelando o culpado
    
    IMPORTANTE: Responda APENAS com JSON válido, sem texto extra, neste formato:
    {
      "case": { "title": "", "description": "", "location": "" },
      "suspects": [{ "id": 1, "name": "", "occupation": "", "motive": "", "alibi": "", "picture": "", "isGuilty": false }],
      "witnesses": [{ "id": 1, "name": "", "role": "", "testimony": "", "picture": "", "isContradictory": false }],
      "clues": [{ "id": 1, "description": "", "location": "" }],
      "solution": { "guiltyName": "", "explanation": "" }
    }`,
  );

  const text = result.response.text();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Gemini não retornou JSON válido");
  return JSON.parse(match[0]);
}

export default generateCase;
