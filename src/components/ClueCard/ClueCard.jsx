import styles from "./ClueCard.module.css";
import cadeadoIcon from "../../assets/icons/cadeado.png";

function ClueCard({ clue, onSelect }) {

  return (
    <div className={styles.clueCard}>
      {clue.unlocked === true ? (
        <div className={styles.unlockedContent}>
          <div>
            <div className={styles.cardTitle}>
              <strong>Descrição</strong>
              <div className={styles.confidencial}>CONFIDENCIAL</div>
            </div>
            <p>
              {clue.description}
            </p>
          </div>

          <p>
            <strong>Local:</strong> {clue.location}
          </p>
        </div>
      ) : (
        <div className={styles.lockedCard} onClick={() => onSelect(clue)}>
          <div className={styles.clueIcon}>
            <img className={styles.lockIcon} src={cadeadoIcon} alt="Cadeado" />
          </div>
          <h2 className={styles.lockedTitle}>Arquivo Confidencial</h2>
          <p className={styles.lockedDescription}>Clique para revelar este indício</p>
        </div>
      )}
    </div>
  );
}

export default ClueCard;