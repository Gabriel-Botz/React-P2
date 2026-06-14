import { createContext, useContext, useState } from 'react';

const InvestigationContext = createContext();

export function InvestigationProvider({ children }) {

  const [progressBar, setProgressBar] = useState(0);
  const [suspects, setSuspects] = useState([
    {
      "id": 1,
      "name": "Carlos Silva",
      "profession": "Contador",
      "motive": "Herança milionária e queima de arquivo.",
      "alibi": "Estava numa viagem de negócios numa cidade vizinha, mas nenhum colega confirmou a sua presença.",
      "image": "https://i.pinimg.com/736x/65/49/93/65499382fffa1a958ffbff06729cb907.jpg"
    },
    {
      "id": 2,
      "name": "Lucas Oliveira",
      "profession": "Segurança Privado",
      "motive": "Foi demitido pela vítima dois dias antes do crime por negligência.",
      "alibi": "Alega que estava no ginásio treinando no horário do crime, mas as câmeras do local estavam desligadas.",
      "image": ""
    },
    {
      "id": 3,
      "name": "Fernanda Costa",
      "profession": "Doutora em Bioquímica",
      "motive": "Apropriação da descoberta científica que poderia valer milhões.",
      "alibi": "Afirma que estava no laboratório trabalhando sozinha, mas não há registros de acesso ao sistema naquela noite.",
      "image": ""
    }
  ]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [witnesses, setWitnesses] = useState([]);
  const [clues, setClues] = useState([
    {
      "id": 1,
      "description": "Faca de cozinha suja de sangue, escondida atrás do sofá principal.",
      "location": "Sala de estar, próximo ao corpo da vítima.",
      "unlocked": true
    },
    {
      "id": 2,
      "description": "Bilhete de ameaça rasgado em vários pedaços, onde ainda se lê: 'Você vai pagar pelo que fez'.",
      "location": "Lixeira do escritório.",
      "unlocked": true
    },
    {
      "id": 3,
      "description": "Copo de uísque com marcas de batom vermelho e um leve aroma de amêndoas amargas (sinal clássico de cianeto).",
      "location": "Mesa de centro da sala.",
      "unlocked": true
    },
    {
      "id": 4,
      "description": "Relógio de pulso com o vidro trincado, parado exatamente às 22h14 devido ao impacto.",
      "location": "No chão, próximo à janela arrombada.",
      "unlocked": false
    },
    {
      "id": 5,
      "description": "Chave reserva da porta dos fundos, com arranhões recentes como se tivesse sido forçada.",
      "location": "No vaso de plantas do corredor externo.",
      "unlocked": false
    }
  ]);
  const [investigationStep, setInvestigationStep] = useState('home');

  function formatAndLoadSuspects(apiData) {
    if (!apiData || apiData.length === 0) return;

    const formattedSuspects = apiData.map((s, index) => {
      const safeName = s.name || s.nome || "Desconhecido";
      const fallbackUrl = `https://ui-avatars.com/api/?name=${safeName.replace(/\s+/g, '+')}&background=000000&color=8B0000&size=250`;

      return {
        id: s.id || index + 1,
        name: safeName,
        profession: s.profession || s.occupation || s.profissao || "Desconhecida",
        motive: s.motive || s.motivo || "Não revelado",
        alibi: s.alibi || "Sem álibi",
        image: s.picture || s.image || fallbackUrl
      };
    });

    setSuspects(formattedSuspects);
  }

  function addSuspect(suspect) {
    setSuspects([...suspects, suspect]);
  }

  function removeSuspect(suspectId) {
    const newSuspects = suspects.filter(s => s.id !== suspectId);
    setSuspects(newSuspects);
  }

  function addWitness(witness) {
    setWitnesses([...witnesses, witness]);
  }

  function removeWitness(witnessId) {
    const newWitnesses = witnesses.filter(w => w.id !== witnessId);
    setWitnesses(newWitnesses);
  }

  function addClue(clue) {
    setClues([...clues, clue]);
  }

  function removeClue(clueId) {
    const newClues = clues.filter(c => c.id !== clueId);
    setClues(newClues);
  }

  function resetInvestigation() {
    setSuspects([]);
    setWitnesses([]);
    setClues([]);
    setInvestigationStep('home');
    setProgressBar(0);
  }

  const value = {
    suspects,
    witnesses,
    clues,
    investigationStep,
    selectedSuspect,
    setSelectedSuspect,
    setSuspects,
    setClues,
    addSuspect,
    removeSuspect,
    addWitness,
    removeWitness,
    addClue,
    removeClue,
    resetInvestigation,
    setInvestigationStep,
    progressBar,
    setProgressBar,
    formatAndLoadSuspects
  };

  return (
    <InvestigationContext.Provider value={value}>
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  const context = useContext(InvestigationContext);

  if (!context) {
    throw new Error('Erro: useInvestigation deve estar dentro do InvestigationProvider');
  }

  return context;
}
