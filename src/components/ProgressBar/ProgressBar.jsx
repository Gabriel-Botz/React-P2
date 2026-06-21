import styles from "./ProgressBar.module.css";
import { useInvestigation } from "../../context/InvestigationContext";
const ProgressBar = () => {

  const { 
    progressBar,
  } = useInvestigation();
  
  const roundedProgressBar = Math.round(progressBar);
  
  return (
      <div className={styles.content}>
      <div className={styles.progressContainer}>
      <div className={styles.labelRow}>
        <span className={styles.title}>PROCESSO DE INVESTIGAÇÃO:</span>
        <span className={styles.percentage}>{roundedProgressBar}% CONCLUÍDO</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.bar} 
          style={{ width: `${roundedProgressBar}%` }}
        />
      </div>
    </div>
    </div>
  );
};

export default ProgressBar;