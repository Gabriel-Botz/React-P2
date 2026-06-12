import styles from "./ClueCard.module.css";

function ClueCard({ clue, onSelect }) {

  return (
    <div className={styles.clueCard}>
      {clue.unlocked === false ? (
        <>
          <h2>Pista {clue.id}</h2>

          <button onClick={() => onSelect(clue)}>
            Desbloquear
          </button>

          <p>Este indício está bloqueado</p>
        </>
      ) : (
        <>
          {/* <div className="clue-icon">
            {icons[clue.object]}
          </div> */}

          <h2>Pista {clue.id}</h2>

          <p>
            <strong>Descrição:</strong> {clue.description}
          </p>

          <p>
            <strong>Local:</strong> {clue.location}
          </p>
        </>
      )}
    </div>
  );
}

export default ClueCard;