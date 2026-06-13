import { useState } from "react";
import ClueCard from "../../components/ClueCard/ClueCard";
import styles from "./Clues.module.css";
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

  const cluesList = clues;

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
    <div className={styles.cluesContainer}>
      <h1 className={styles.cluesTitle}>
        Pistas da Investigação
      </h1>

      <div className={styles.cluesList}>
        {cluesList
          // .filter((clue) => clue.unlocked)
          .map((clue) => (
            <ClueCard
              key={clue.id}
              clue={clue}
              onSelect={handleSelect}
            />
          ))}
      </div>
    </div>
  );
}

export default Clues;