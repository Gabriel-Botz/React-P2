import { createContext, useContext, useState } from 'react';

const InvestigationContext = createContext();

export function InvestigationProvider({ children }) {

  const [progressBar, setProgressBar] = useState(0);
  const [suspects, setSuspects] = useState([]);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [witnesses, setWitnesses] = useState([]);
  const [clues, setClues] = useState([]);
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
