import { useMemo } from "react";
import ClueCard from "../../components/ClueCard/ClueCard";
import styles from "./Clues.module.css";
import { Loading } from "../../components/Loading/Loading.jsx";
import { useInvestigation } from "../../context/InvestigationContext";

function Clues() {
  const {
    progressBar,
    setProgressBar,
    clues,
    unlockClue,
  } = useInvestigation();

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

  if (!clues || clues.length === 0) {
    return <Loading />;
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