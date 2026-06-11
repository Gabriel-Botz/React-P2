import style from "./Loading.module.css";
import lupa from "../../assets/icons/lupa.png";

export const Loading = () => {
  return <div className={style.loadingSection}>
    <div className={style.text}>
      Carregando...
    </div>
    <div className={style.lupa}>
      <img src={lupa} />
    </div>
  </div>
};