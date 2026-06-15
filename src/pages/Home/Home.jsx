import { useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { generateCase } from "../../services/api";
import { useInvestigation } from "../../context/InvestigationContext";
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();
const { setWitnesses, setClues, setCaseInfo, formatAndLoadSuspects, caseInfo } = useInvestigation();

useEffect(() => {
  async function loadCase() {
    const data = await generateCase();

    formatAndLoadSuspects(data.suspects); 

    const witnesses = data.witnesses.map((w) => ({
      id: w.id,
      name: w.name,
      image: w.picture,
      role: w.role,
      testimony: w.testimony,
      isContradictory: w.isContradictory,
    }));

    setWitnesses(witnesses);
    setClues(data.clues);
    setCaseInfo(data.case);
  }

  loadCase();
}, []);

  return (
  <>
    <div className={styles.board}>
      <div className={styles.pastaStack}>
        <div className={styles.abaConectada}>PASTA #402-B</div>

        <div className={styles.pasta}>
          <div className={styles.headerRow}>
            <h1 className={styles.casoTitulo}>
              CASO: {caseInfo ? caseInfo.title.toUpperCase() : "CARREGANDO..."}
            </h1>
            <div className={styles.confidencial}>CONFIDENCIAL</div>
          </div>

          <div className={styles.barraTitulo} />

          <h3 className={styles.sumario}>📖 Sumário do Crime</h3>
          <div className={styles.crimeCard}>
            <div className={styles.crime}>
              <p className={styles.crimeValue}>
                <span className={styles.crimeDesc}>Local: </span>
                {caseInfo ? caseInfo.location : "Carregando..."}
              </p>
            </div>
          </div>

          <h3 className={styles.sumario}>Narrativa dos Fatos</h3>
          <p className={styles.narrativa}>
            {caseInfo ? caseInfo.description : "Carregando descrição do caso..."}
          </p>

          <div className={styles.buttonPos}>
            <button className={styles.button} onClick={() => navigate('/suspects')}>
               🔍 Iniciar Investigação
             </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default Home;
