import { useState } from "react";
import ClueCard from "../../components/ClueCard/ClueCard";
import styles from "./Clues.module.css";
import { useInvestigation } from "../../context/InvestigationContext";

function Clues() {
  const {
    clues,
    unlockClue,
  } = useInvestigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cluesList = clues;

  function handleSelect(clue) {
      unlockClue(clue.id);
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