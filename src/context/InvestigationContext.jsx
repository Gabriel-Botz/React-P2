import { createContext, useContext, useState } from 'react';

const InvestigationContext = createContext();

export function InvestigationProvider({ children }) {

  const [progressBar, setProgressBar] = useState(0);
  const [suspects, setSuspects] = useState([
    {
      id: 1,
      name: "Carlos Silva",
      profissao: "Contador",
      motivo: "Herança milionária",
      alibi: "Estava em viagem de negócios"
    }
  ]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [witnesses, setWitnesses] = useState([]);
  const [clues, setClues] = useState([
  {
    "id": 1,
    "description": "Faca de cozinha suja de sangue, escondida atrás do sofá principal.",
    "location": "Sala de estar, próximo ao corpo da vítima.",
    "unlocked":true
  },
  {
    "id": 2,
    "description": "Bilhete de ameaça rasgado em vários pedaços, onde ainda se lê: 'Você vai pagar pelo que fez'.",
    "location": "Lixeira do escritório.",
    "unlocked":true
  },
  {
    "id": 3,
    "description": "Copo de uísque com marcas de batom vermelho e um leve aroma de amêndoas amargas (sinal clássico de cianeto).",
    "location": "Mesa de centro da sala.",
    "unlocked":true
  },
  {
    "id": 4,
    "description": "Relógio de pulso com o vidro trincado, parado exatamente às 22h14 devido ao impacto.",
    "location": "No chão, próximo à janela arrombada.",
    "unlocked":false
  },
  {
    "id": 5,
    "description": "Chave reserva da porta dos fundos, com arranhões recentes como se tivesse sido forçada.",
    "location": "No vaso de plantas do corredor externo.",
    "unlocked":false
  }
]);
  const [investigationStep, setInvestigationStep] = useState('home');

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
