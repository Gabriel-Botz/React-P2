import styles from "./ClueCard.module.css";
import cadeadoIcon from "../../assets/icons/cadeado.png";

function ClueCard({ clue, onSelect, progressBar = 0 }) {
  // Verifica se a pista foi desbloqueada pelo progresso
  const isUnlockedByProgress = progressBar >= (clue.progressRequiredToUnlock || 0);
  const isUnlockedByUser = clue.unlocked === true;

  return (
    <div className={styles.clueCard}>
      {isUnlockedByUser ? (
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
      ) : !isUnlockedByProgress ? (
        <div className={styles.lockedCardByProgress}>
          <div className={styles.clueIcon}>
            <img className={styles.lockIcon} src={cadeadoIcon} alt="Cadeado" />
          </div>
          <h2 className={styles.lockedTitleBlocked}>Arquivo Bloqueado</h2>
          <p className={styles.lockedDescription}>
            Aguarde o desbloqueio do indício
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