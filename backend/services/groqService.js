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
        content: `Você é um escritor especialista em romances policiais brasileiros, com domínio de narrativa noir, psicologia criminal e construção de mistérios coerentes.

REGRAS ABSOLUTAS:
- Responda APENAS com JSON válido e bem estruturado, sem nenhum texto, comentário ou markdown fora do JSON.
- Nunca use aspas duplas dentro de strings — use aspas simples ou reescreva a frase.
- Nunca deixe campos vazios ou com valores placeholder como "" ou "url_aqui".
- Todos os dados gerados devem ser 100% coerentes entre si: pistas, depoimentos, álibs e solução devem formar uma narrativa única e sem contradições não intencionais.`,
      },
      {
        role: "user",
        content: `Crie um caso de investigação criminal brasileiro completo, elaborado e coerente, com um único culpado.

PERSONAGENS BASE (use como ponto de partida, expanda com detalhes):
${JSON.stringify(characters)}

═══════════════════════════════════
ESTRUTURA OBRIGATÓRIA DO CASO
═══════════════════════════════════

[CASO]
- title: título criativo e noir, relacionado ao crime específico
- description: array com EXATAMENTE 3 strings, cada uma sendo um parágrafo denso de ao menos 5 linhas:
    • Parágrafo 1: descreve a cena do crime com detalhes sensoriais (o que foi visto, cheirado, ouvido na cena)
    • Parágrafo 2: contextualiza a vítima, o ambiente social e as relações entre os envolvidos
    • Parágrafo 3: apresenta o desafio investigativo e os primeiros indícios que intrigam o detetive
- location: local específico e detalhado (ex: "Mansão Cavalcanti, bairro Cosme Velho, Rio de Janeiro — sala de estar do segundo andar")
- victim: nome completo, idade e profissão da vítima
- deathTime: hora estimada da morte com intervalo (ex: "entre 22h15 e 23h00 de uma sexta-feira")
- causeOfDeath: causa detalhada da morte (método, instrumento, mecanismo fisiológico)

[SUSPEITOS] — exatamente 6: 4 homens e 2 mulheres
Cada suspeito deve ter:
- id: número de 1 a 6
- name: nome completo brasileiro
- occupation: profissão coerente com o contexto do caso
- motive: motivação psicológica profunda, específica e com histórico (mínimo 3 linhas). Deve ser única para cada suspeito — sem motivos genéricos como "ciúme" sem contexto
- alibi: álibi plausível mas com UMA brecha sutil e específica (mínimo 2 linhas). Inocentes têm álibi verificável; o culpado tem álibi falso com a brecha sendo a prova disso
- isGuilty: true apenas para 1 suspeito

[PISTAS] — exatamente 9 pistas físicas
- Ordenadas do mais genérico/ambíguo (pista 1) ao mais revelador/conclusivo (pista 9)
- A pista 1 deve ser intrigante mas não apontar diretamente para ninguém
- As pistas 7, 8 e 9 devem, juntas, ser suficientes para identificar o culpado com certeza
- Cada pista deve ter:
    • id: 1 a 9
    • description: descrição detalhada do objeto/marca/evidência e sua relevância investigativa (mínimo 3 linhas)
    • location: localização exata dentro da cena do crime
- PROIBIDO: pistas genéricas como "pegada no chão" sem especificar de quem ou como liga ao culpado

[DEPOIMENTOS] — exatamente 10 testemunhas
- Ordenados do menos relevante (depoimento 1) ao mais revelador (depoimento 10)
- O depoimento 1 deve ser de alguém periférico ao caso (vizinho, porteiro, entregador)
- Os depoimentos 9 e 10 devem conter informações críticas que, combinadas com as pistas finais, resolvem o caso
- EXATAMENTE 2 depoimentos devem conter contradições sutis com outros depoimentos ou pistas — a testemunha não percebe que está se contradizendo (marque com isContradictory: true)
- Cada depoimento deve ter:
    • id: 1 a 10
    • name: nome completo da testemunha
    • role: relação da testemunha com a vítima ou com o caso (ex: "vizinha do andar de cima", "barman do clube")
    • testimony: depoimento em primeira pessoa, mínimo de 6 linhas, com detalhes específicos de horário, local, comportamento observado. NÃO pode ser genérico.
    • isContradictory: true ou false

[SOLUÇÃO]
- guiltyName: nome completo do culpado (deve bater com um dos suspeitos)
- explanation: texto corrido de mínimo 8 linhas explicando: como o crime foi planejado e executado, por que as pistas apontam para o culpado, como o álibi do culpado é desmentido, e qual detalhe psicológico revela a motivação real

═══════════════════════════════════
COERÊNCIA OBRIGATÓRIA
═══════════════════════════════════
- Pelo menos 3 pistas devem ter relação direta e rastreável com o culpado
- Pelo menos 2 depoimentos devem corroborar ou contradizer informações que aparecem em pistas
- O álibi quebrado do culpado deve ser desmentido por pelo menos 1 pista E 1 depoimento
- Nenhuma pista ou depoimento pode existir sem ter função narrativa (sem red herrings inúteis)

Responda APENAS com este JSON, sem nenhum texto fora dele:
{
  "case": {
    "title": "",
    "description": ["parágrafo 1", "parágrafo 2", "parágrafo 3"],
    "location": "",
    "victim": "",
    "deathTime": "",
    "causeOfDeath": ""
  },
  "suspects": [
    { "id": 1, "name": "", "occupation": "", "motive": "", "alibi": "", "isGuilty": false }
  ],
  "clues": [
    { "id": 1, "description": "", "location": "" }
  ],
  "witnesses": [
    { "id": 1, "name": "", "role": "", "testimony": "", "isContradictory": false }
  ],
  "solution": {
    "guiltyName": "",
    "explanation": ""
  }
}`,
      },
    ],
    temperature: 0.82,
    max_tokens: 6000,
  });

  const text = completion.choices[0].message.content.trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Groq não retornou JSON válido");
  return JSON.parse(match[0]);
}

export default generateCase;
