import { createContext, useContext, useState } from 'react';

const InvestigationContext = createContext();

export function InvestigationProvider({ children }) {

  const [progressBar, setProgressBar] = useState(0);
  const [caseInfo, setCaseInfo] = useState(null);
  const [suspects, setSuspects] = useState([]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [witnesses, setWitnesses] = useState([]);
  const [clues, setClues] = useState([]);
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
    caseInfo,
    setCaseInfo,
    setWitnesses,  
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
