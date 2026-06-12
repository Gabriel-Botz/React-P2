import Header from "../../components/Header/Header";
import styles from "./Home.module.css";

function Home({}) {
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
                <p className={styles.crimeValue} id="vitima">
                  <span className={styles.crimeDesc}>Vitima: </span>
                  Dr Hans Chucrute, 70 anos, medico de passarinho
                </p>

                <p className={styles.crimeValue} id="local">
                  <span className={styles.crimeDesc}>Local: </span>
                  Escritorio principal do Hospital Estadual Pica-pau
                </p>

                <p className={styles.crimeValue} id="hora">
                  <span className={styles.crimeDesc}>Hora do Obito: </span>
                  Sexta-feira, estimada entre 22h e 23h
                </p>

                <p className={styles.crimeValue} id="causa">
                  <span className={styles.crimeDesc}>Causa da Morte: </span>
                  Asfixia por envenenamento e comida de passarinho
                </p>
              </div>
            </div>

            <h4 className={styles.sumario}>Resumo do crime</h4>
            <p className={styles.descricao} id="descricao">
              Na noite de sexta-feira, Roberto Valente foi encontrado sem vida
              sobre sua escrivaninha. Um copo de uísque quebrado no chão e uma
              mancha escura de bebida indicam que o veneno foi consumido pouco
              antes de sua morte.{" "}
              <p>
                {" "}
                Como detetive encarregado, sua missão é cruzar os fatos,
                vasculhar os “8 indícios” espalhados ao redor dos documentos.
                Sua descoberta revelará incongruências óbvias no álibi de quem
                cometeu o crime. Uma acusação sem provas sólidas permitirá que o
                verdadeiro assassino escape.
              </p>
            </p>
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
