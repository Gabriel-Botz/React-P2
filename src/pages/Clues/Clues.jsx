import { useState, useMemo } from "react";
import ClueCard from "../../components/ClueCard/ClueCard";
import styles from "./Clues.module.css";
import { useInvestigation } from "../../context/InvestigationContext";

function Clues() {
  const {
    progressBar,
    setProgressBar,
    clues,
    unlockClue,
  } = useInvestigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Atribui percentuais de desbloqueio a cada pista
  const cluesList = useMemo(() => {
    return clues.map((clue, index) => {
      if (!clue.progressRequiredToUnlock) {
        return {
          ...clue,
          progressRequiredToUnlock: index * 10 // 0%, 20%, 40%, 60%, 80%
        };
      }
      return clue;
    });
  }, [clues]);

  function handleSelect(clue) {
      unlockClue(clue.id);
      setProgressBar(progressBar + 4.4);
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
              progressBar={progressBar}
            />
          ))}
      </div>
    </div>
  );
}

export default Clues;