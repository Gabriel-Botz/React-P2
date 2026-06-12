import { useContext } from "react";

function Result() {
  function ResultPage() {
    const { investigation, reset } = useContext(InvestigationContext);
    const { accusation } = investigation;
    const correct = accusation?.correct;
  }
  return (
    <>
      <div></div>
    </>
  );
}
export default Result;
