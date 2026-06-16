import styles from "./ProgressBar.module.css";
import { useInvestigation } from "../../context/InvestigationContext";
import { useEffect } from "react";

const ProgressBar = () => {

  const { 
    progressBar,
    setProgressBar,
    suspects,
    witnesses,
    clues,
  } = useInvestigation();

  const suspectsLength = suspects.length;
  const witnessesLength = witnesses.length;
  const cluesLength = clues.length;

  const totalLength = (suspectsLength + witnessesLength + cluesLength);

  const suspectsIncrease = suspectsLength / totalLength;
  const witnessesIncrease = witnessesLength / totalLength;
  const cluesIncrease = cluesLength / totalLength;

  const suspectsUnlocked = suspects.filter(suspect => suspect.unlocked).length;
  const witnessesUnlocked = witnesses.filter(witness => witness.unlocked).length;
  const cluesUnlocked = clues.filter(clue => clue.unlocked).length;

  useEffect(() => {
    let barValue = 0;

    barValue += (suspectsUnlocked * suspectsIncrease);
    barValue += (witnessesUnlocked * witnessesIncrease);
    barValue += (cluesUnlocked * cluesIncrease);

    setProgressBar(Math.round(barValue * 10));
  }, [suspects, witnesses, clues, suspectsUnlocked, witnessesUnlocked, cluesUnlocked, suspectsIncrease, witnessesIncrease, cluesIncrease, setProgressBar]);

  return (
      <div className={styles.content}>
      <div className={styles.progressContainer}>
      <div className={styles.labelRow}>
        <span className={styles.title}>PROCESSO DE INVESTIGAÇÃO:</span>
        <span className={styles.percentage}>{progressBar}% CONCLUÍDO</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.bar} 
          style={{ width: `${progressBar}%` }}
        />
      </div>
    </div>
    </div>
  );
};

export default ProgressBar;