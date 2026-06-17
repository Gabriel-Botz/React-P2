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
- Nunca deixe campos vazios ou com valores placeholder.
- Todos os dados gerados devem ser 100% coerentes entre si: pistas, depoimentos, álibs e solução devem formar uma narrativa única e sem contradições não intencionais.

PARTIÇÃO DE INFORMAÇÃO — REGRA ABSOLUTA:
- A narrativa (description) apresenta APENAS o que foi encontrado na chegada à cena: o corpo, o ambiente geral, a hora e o estado aparente da vítima. Nenhuma conclusão investigativa, nenhuma pista física, nenhum relato de terceiros.
- As pistas são APENAS evidências físicas coletadas pela perícia: objetos, marcas, substâncias, documentos, vestígios. Nunca repetem algo já dito na narrativa e nunca incluem interpretações ou relatos de testemunhas.
- Os depoimentos são APENAS relatos subjetivos de pessoas: o que viram, ouviram, sentiram ou sabem por experiência própria. Nunca descrevem evidências físicas que só a perícia teria acesso, e nunca repetem informações que outra testemunha já forneceu.
- PROIBIDO: qualquer informação que apareça em duas camadas diferentes. Cada fato do caso deve existir em UMA única camada.`,
      },
      {
        role: "user",
        content: `Crie um caso de investigação criminal brasileiro completo, elaborado e coerente, com um único culpado.

PERSONAGENS BASE:
${JSON.stringify(characters)}

═══════════════════════════════════
ESTRUTURA OBRIGATÓRIA DO CASO
═══════════════════════════════════

[CASO]
- title: título criativo e noir, relacionado ao crime específico
- description: array com EXATAMENTE 3 strings, cada uma sendo um parágrafo denso de ao menos 5 linhas:
    • Parágrafo 1: descreve APENAS a cena encontrada — o corpo, a posição, o ambiente, os detalhes sensoriais (cheiro, luz, temperatura). Sem mencionar pistas físicas coletadas ou relatos de testemunhas.
    • Parágrafo 2: contextualiza APENAS a vítima e o ambiente social — quem era, onde vivia, suas relações. Sem revelar suspeitos ou motivações.
    • Parágrafo 3: apresenta APENAS o desafio investigativo inicial — o que intriga o detetive na cena, as primeiras perguntas sem resposta. Sem antecipar pistas ou depoimentos.
- location: local específico e detalhado (ex: "Mansão Cavalcanti, bairro Cosme Velho, Rio de Janeiro — sala de estar do segundo andar")
- victim: nome completo, idade e profissão da vítima
- deathTime: hora estimada da morte com intervalo (ex: "entre 22h15 e 23h00 de uma sexta-feira")
- causeOfDeath: causa detalhada da morte (método, instrumento, mecanismo fisiológico)

[SUSPEITOS] — exatamente 6: 4 homens e 2 mulheres
Cada suspeito deve ter:
- id: número de 1 a 6
- name: nome completo brasileiro
- occupation: profissão coerente com o contexto do caso
- motive: motivação psicológica profunda, específica e com histórico (mínimo 3 linhas). Deve ser única — sem motivos genéricos sem contexto.
- alibi: álibi plausível mas com UMA brecha sutil e específica (mínimo 2 linhas). Inocentes têm álibi verificável; o culpado tem álibi falso cuja brecha é desmentida por pelo menos 1 pista e 1 depoimento.
- isGuilty: true apenas para 1 suspeito

[PISTAS] — exatamente 7 evidências físicas
- Ordenadas da mais ambígua (pista 1) à mais conclusiva (pista 7)
- Pista 1: intrigante, mas não aponta para ninguém diretamente
- Pistas 5, 6 e 7: juntas, identificam o culpado com certeza
- Cada pista deve conter informação INÉDITA — algo que não foi mencionado na narrativa nem em nenhum depoimento
- Cada pista deve ter:
    • id: 1 a 7
    • description: descrição detalhada do objeto/marca/evidência, onde foi encontrada, e qual é sua relevância investigativa (mínimo 3 linhas)
    • location: localização exata dentro da cena do crime
- PROIBIDO: pistas que descrevem comportamentos de pessoas (isso é depoimento), pistas genéricas sem conexão rastreável ao caso, e pistas que repetem informações da narrativa

[DEPOIMENTOS] — exatamente 7 testemunhas
- Ordenados do menos relevante (depoimento 1) ao mais revelador (depoimento 7)
- Depoimento 1: pessoa periférica ao caso (vizinho, porteiro, entregador) com observação vaga mas verdadeira
- Depoimentos 6 e 7: informações críticas que, combinadas com as pistas 5-7, resolvem o caso
- EXATAMENTE 2 depoimentos devem conter contradições sutis com outros depoimentos ou com pistas físicas — a testemunha não percebe que está se contradizendo (marque com isContradictory: true)
- Cada depoimento deve conter informação INÉDITA — algo que não foi mencionado na narrativa nem em nenhuma pista
- Cada depoimento deve ter:
    • id: 1 a 7
    • name: nome completo da testemunha
    • role: relação com a vítima ou com o caso (ex: "vizinha do andar de cima", "barman do clube")
    • testimony: depoimento em primeira pessoa, mínimo de 6 linhas, com detalhes específicos de horário, local e comportamento observado. Não pode ser genérico.
    • isContradictory: true ou false

[SOLUÇÃO]
- guiltyName: nome completo do culpado
- explanation: mínimo 8 linhas explicando: como o crime foi planejado e executado, por que as pistas 5-7 apontam para o culpado, como o álibi é desmentido, e qual detalhe revela a motivação real

═══════════════════════════════════
COERÊNCIA CRUZADA OBRIGATÓRIA
═══════════════════════════════════
Antes de finalizar o JSON, verifique internamente:
1. Alguma informação aparece em mais de uma camada (narrativa, pista ou depoimento)? Se sim, remova da camada secundária.
2. Alguma pista descreve comportamento humano em vez de evidência física? Se sim, reescreva como evidência.
3. Algum depoimento menciona algo que só a perícia saberia? Se sim, reescreva como observação pessoal.
4. O álibi do culpado é desmentido por ao menos 1 pista E 1 depoimento? Se não, ajuste.
5. As pistas 5, 6 e 7 são suficientes para identificar o culpado sem os depoimentos? Se não, fortaleça-as.

Responda APENAS com este JSON:
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
