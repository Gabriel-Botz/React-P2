import ClueCard from "../../components/ClueCard/ClueCard";
import { useInvestigation } from "../../context/InvestigationContext";

function Clues() {
  const {
    addClue,
    progressBar,
    setProgressBar,
  } = useInvestigation();

  const clues = [
    {
      id: 1,
      title: "Pista 1",
      object: "Faca",
      report: "Encontrada na cozinha.",
    },
    {
      id: 2,
      title: "Pista 2",
      object: "Relógio",
      report: "Parou às 22h15.",
    },
    {
      id: 3,
      title: "Pista 3",
      object: "Bilhete",
      report: "Contém uma mensagem suspeita.",
    },
  ];

  function handleSelect(clue) {
    addClue(clue);

    if (progressBar < 100) {
      setProgressBar(prev => prev + 10);
    }

    console.log("Pista adicionada:", clue);
  }

  return (
    <div>
      <h1>Pistas da Investigação</h1>

      {clues.map((clue) => (
        <ClueCard
          key={clue.id}
          clue={clue}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default Clues;