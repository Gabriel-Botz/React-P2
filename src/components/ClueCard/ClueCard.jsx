import "./ClueCard.css";

function ClueCard({ clue, onSelect }) {
  const icons = {
    Faca: "🔪",
    Relógio: "🕒",
    Bilhete: "📝",
  };

  return (
    <div className="clue-card">
      <div className="clue-icon">
        {icons[clue.object]}
      </div>

      <h2>{clue.title}</h2>

      <p>
        <strong>Objeto:</strong> {clue.object}
      </p>

      <p>
        <strong>Relatório:</strong> {clue.report}
      </p>

      <button onClick={() => onSelect(clue)}>
        Marcar como relevante
      </button>
    </div>
  );
}

export default ClueCard;