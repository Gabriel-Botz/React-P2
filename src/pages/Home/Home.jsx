import { useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import { generateCase } from "../../services/api";
import { useInvestigation } from "../../context/InvestigationContext";

function Home() {
  const { setSuspects, setWitnesses, setClues } = useInvestigation();

  useEffect(() => {
    async function loadCase() {
      const data = await generateCase();
      setSuspects(data.suspects);
      setWitnesses(data.witnesses);
      setClues(data.clues);
    }

    loadCase();
  }, []);

  return (
    <>
      <div className={styles.board}>
        <div className={styles.pastaStack}>
          <div className={styles.pastaFundo}></div>
          <div className={styles.pasta}>
            <div className={styles.pastaAba}>
              <p className={styles.numPasta}> Caso #0001 </p>
            </div>
            <h1 className={styles.casoTitulo}>O Último Indício</h1>
            <div className={styles.barraTitulo} />
            <h3 className={styles.sumario}>Sumário do Crime</h3>
            <div className={styles.crimeCard}>
              <div className={styles.crime}>
                <p className={styles.crimeValue}>
                  <span className={styles.crimeDesc}>Vítima: </span>
                  Dr Hans Chucrute, 70 anos, médico de passarinho
                </p>
                <p className={styles.crimeValue}>
                  <span className={styles.crimeDesc}>Local: </span>
                  Escritório principal do Hospital Estadual Pica-pau
                </p>
              </div>
            </div>
            <div className={styles.buttonPos}>
              <button className={styles.button}>Iniciar investigação</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;