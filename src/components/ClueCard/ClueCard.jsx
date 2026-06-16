import styles from "./ClueCard.module.css";

function ClueCard({ clue, onSelect }) {

  return (
    <div className={styles.clueCard}>
      {clue.unlocked === true ? (
        <>
          <div>
            <h2>Pista {clue.id}</h2>
            <div className={styles.barraTitulo}></div>
          </div>

          <p>
            <strong>Descrição:</strong> {clue.description}
          </p>

          <p>
            <strong>Local:</strong> {clue.location}
          </p>
        </>
      ) : (
        <>
          <div>
            <h2>Pista {clue.id}</h2>
            <div className={styles.barraTitulo}></div>
          </div>

          <button onClick={() => onSelect(clue)}>
            Desbloquear
          </button>

          <p>Este indício está bloqueado</p>
        </>
      )}
    </div>
  );
}

export default ClueCard;