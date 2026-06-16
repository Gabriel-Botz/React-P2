import { useContext } from "react";
import styles from "./Result.module.css";
import { useLocation } from "react-router-dom";

const temas = {
  acerto: {
    icone: "🏆",
    titulo: "Parabéns",
    subtitulo: "Voce solucionou o caso",
    linhaCard: styles.linhaAcerto,
    cardSuspeito: styles.cardAcerto,
    crimeCard: styles.crimeAcerto,
    shadowCard: styles.shadowAcerto,
  },
  erro: {
    icone: "💀",
    titulo: "Acusação errada",
    subtitulo: "O verdadeiro culpado escapou",
    linhaCard: styles.linhaErro,
    cardSuspeito: styles.cardErro,
    crimeCard: styles.crimeErro,
    shadowCard: styles.shadowErro,
  },
};

function Result() {
  const { state } = useLocation();
  const resultado = state?.resultado ?? "acerto";
  const culpado = state?.culpado;
  const resolucao = state?.resolucao;
  const tema = temas[resultado];

  return (
    <>
      <div className={styles.bg}>
        <div className={`${styles.card} ${tema.shadowCard}`}>
          <div className={`${styles.linhaCard} ${tema.linhaCard}`}></div>
          <div className={styles.trofeu}>{tema.icone}</div>
          <h1 className={styles.titulo}>{tema.titulo}</h1>
          <p className={styles.subtitulo}>{tema.subtitulo}</p>

          <div className={`${styles.cardSuspeito} ${tema.cardSuspeito}`}>
            <div className={styles.fotoMoldura}>
              <img
                src={culpado?.picture}
                alt={culpado?.name}
                className={styles.foto}
              />
            </div>
            <div>
              <h4 className={styles.nomeSuspeito}>{culpado?.name}</h4>
              <p className={styles.descSuspeito}>{culpado.occupation}</p>
            </div>
          </div>

          <div className={styles.separador}></div>
          <div className={`${styles.crimeCard} ${tema.crimeCard}`}>
            <h3 className={styles.tituloCrime}>⌕ Resolução do Inquerito</h3>
            <p className={styles.textoCrime}>{resolucao}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Result;
