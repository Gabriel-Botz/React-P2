import style from "./Header.module.css";
import { Link } from "react-router-dom";

function Header () {
    return (
    <header className={style.header}>
        <h1 className={style.title}>The Last Clue</h1>
        <div className={style.menu}>
            <ul className={style.list}>
                <li className={style.item}><Link to="/">Caso</Link></li>
                <li className={style.item}><Link to="/suspect">Suspeitos</Link></li>
                <li className={style.item}><Link to="/clues">Pistas</Link></li>
                <li className={style.item}><Link to="/witness">Testemunhas</Link></li>
                <li className={style.item}><Link to="/accusation">Acusar</Link></li>
            </ul>
        </div>
    </header>
)};
export default Header;