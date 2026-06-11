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

            <h1 className={styles.casoTitulo}>O Ultimo Indicio</h1>
            <div className={styles.barraTitulo} />

            <p className={styles.resumo}>Resumo do crime</p>
            <p className={styles.descricao}>
              Na noite de sexta-feira, Roberto Valente foi encontrado sem vida
              sobre sua escrivaninha. Um copo de uísque quebrado no chão e uma
              mancha escura de bebida indicam que o veneno foi consumido pouco
              antes de sua morte.{" "}
              <p>
                O sistema de segurança da mansão registrou a entrada de poucas
                pessoas naquele dia. O delegado responsável filtrou 4 suspeitos
                principais que tinham acesso à mansão ou motivos comerciais e
                pessoais explícitos para desejar o fim de Roberto. Além disso, 4
                testemunhas chaves próximas prestaram depoimentos
                preliminares.{" "}
              </p>
              <p>
                {" "}
                Como detetive encarregado, sua missão é cruzar os fatos,
                vasculhar os “8 indícios” espalhados ao redor dos documentos.
                Sua descoberta revelará incongruências óbvias no álibi de quem
                cometeu o crime. Uma acusação sem provas sólidas permitirá que o
                verdadeiro assassino escape.
              </p>
            </p>

            <button className={styles.button}>Iniciar investigação</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
