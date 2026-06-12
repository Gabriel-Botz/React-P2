import { useState } from "react";
import ClueCard from "../../components/ClueCard/ClueCard";
import "./Clues.css";
import { useInvestigation } from "../../context/InvestigationContext";

function Clues() {
  const {
    addClue,
    clues,
    progressBar,
    setProgressBar,
  } = useInvestigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cluesList = [
    {
      id: 1,
      title: "Pista 1",
      object: "Faca",
      report: "Encontrada na cozinha.",
      unlocked: true,
    },
    {
      id: 2,
      title: "Pista 2",
      object: "Relógio",
      report: "Parou às 22h15.",
      unlocked: true,
    },
    {
      id: 3,
      title: "Pista 3",
      object: "Bilhete",
      report: "Contém uma mensagem suspeita.",
      unlocked: false,
    },
  ];

  function handleSelect(clue) {
    const exists = clues.some((c) => c.id === clue.id);

    if (!exists) {
      addClue(clue);

      if (progressBar < 100) {
        setProgressBar((prev) => prev + 10);
      }

      console.log("Pista adicionada:", clue);
    } else {
      console.log("Pista já selecionada!");
    }
  }

  if (loading) {
    return <h2>Carregando pistas...</h2>;
  }

  if (error) {
    return <h2>Erro ao carregar pistas.</h2>;
  }

  return (
    <div className="clues-container">
      <h1 className="clues-title">
        Pistas da Investigação
      </h1>

      {cluesList
        .filter((clue) => clue.unlocked)
        .map((clue) => (
          <ClueCard
            key={clue.id}
            clue={clue}
            onSelect={handleSelect}
          />
        ))}
    </div>
  );
}

export default Clues;