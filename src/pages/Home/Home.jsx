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

    const suspects = data.suspects.map((s) => ({
      id: s.id,
      name: s.name,
      image: s.picture,        // IA manda "picture", front espera "image"
      profession: s.occupation, // IA manda "occupation", front espera "profession"
      motive: s.motive,
      alibi: s.alibi,
      isGuilty: s.isGuilty,
    }));

    const witnesses = data.witnesses.map((w) => ({
      id: w.id,
      name: w.name,
      image: w.picture,
      role: w.role,
      testimony: w.testimony,
      isContradictory: w.isContradictory,
    }));

    setSuspects(suspects);
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
    {/* Aba integrada */}
    <div className={styles.abaConectada}>PASTA #402-B</div>
    
    <div className={styles.pasta}>
      <div className={styles.headerRow}>
        <h1 className={styles.casoTitulo}>CASO: O ÚLTIMO INDÍCIO</h1>
        <div className={styles.confidencial}>CONFIDENCIAL</div>
      </div>
      
      <div className={styles.barraTitulo} />

      <h3 className={styles.sumario}>📖 Sumário do Crime</h3>
      <div className={styles.crimeCard}>
        <div className={styles.crime}>
          <p className={styles.crimeValue}><span className={styles.crimeDesc}>Vítima:</span> Roberto Valente, 62 anos, magnata do mercado imobiliário e colecionador de arte.</p>
          <p className={styles.crimeValue}><span className={styles.crimeDesc}>Local:</span> Escritório principal da Mansão Valente, Zona Norte.</p>
          <p className={styles.crimeValue}><span className={styles.crimeDesc}>Hora do Óbto:</span> Sexta-feira passada, estimada entre 22h e 23h.</p>
          <p className={styles.crimeValue}><span className={styles.crimeDesc}>Causa da Morte:</span> Asfixia por envenenamento (presença confirmada de cianeto de potássio na corrente sanguínea).</p>

        </div>
      </div>

      <h3 className={styles.sumario}>Narrativa dos Fatos</h3>
      <p className={styles.narrativa}>
        Na noite de sexta-feira, Roberto Valente foi encontrado sem vida sobre sua escrivaninha de mogno. 
        Um copo de uísque de safra rara encontrava-se estilhaçado ao chão, e uma mancha escura de bebida 
        sobre o tapete persa indica que o veneno foi consumido pouco antes de sua morte. O sistema de 
        segurança biométrica da mansão registrou a entrada de apenas quatro pessoas naquele dia.<br /><br />
        O delegado responsável filtrou 4 <strong>suspeitos principais</strong> que tinham acesso total 
        à mansão, cujos motivos comerciais e pessoais são explícitos e sugerem uma trama de traições. 
        Além disso, 4 <strong>testemunhas chaves</strong> próximas à família já prestaram depoimentos 
        preliminares, apresentando contradições preocupantes.<br /><br />
        Como detetive encarregado, sua missão é cruzar os fatos, vasculhar os <strong>6 indícios</strong> 
        espalhados pela cena e confrontar os álibis. Suas descobertas revelarão incongruências óbvias 
        na cronologia do crime. Uma acusação sem provas sólidas permitirá que o verdadeiro assassino escape.
      </p>

      <div className={styles.buttonPos}>
        <button className={styles.button}>🔍 Iniciar Investigação</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}

export default Home;
