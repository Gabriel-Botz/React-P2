import styles from "./ProgressBar.module.css";
import { useInvestigation } from "../../context/InvestigationContext";

const ProgressBar = () => {
  
  const { progressBar } = useInvestigation();
  const percentage = progressBar;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.labelRow}>
        <span className={styles.title}>PROCESSO DE INVESTIGAÇÃO:</span>
        <span className={styles.percentage}>{percentage}% CONCLUÍDO</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.bar} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;