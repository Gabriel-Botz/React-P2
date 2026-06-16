import styles from "./ProgressBar.module.css";
import { useInvestigation } from "../../context/InvestigationContext";
const ProgressBar = () => {

  const { 
    progressBar,
  } = useInvestigation();
  
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