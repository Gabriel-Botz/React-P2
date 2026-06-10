import style from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/lupa.png"

function Header () {
    return (
    <header className={style.header}>
        <div className={style.container}>
        <div className={style.logoContainer}>
        <img className={style.logo} src={logo} alt="logo"/>
        <h1 className={style.title}>The Last Clue</h1>
        </div>
        <div className={style.menu}>
            <ul className={style.list}>
                <li><Link className={style.item} to="/">Caso</Link></li>
                <li><Link className={style.item} to="/suspect">Suspeitos</Link></li>
                <li><Link className={style.item} to="/clues">Pistas</Link></li>
                <li><Link className={style.item} to="/witness">Testemunhas</Link></li>
                <li><Link className={style.item} to="/accusation">Acusar</Link></li>
            </ul>
        </div>
        </div>
    </header>
)};
export default Header;