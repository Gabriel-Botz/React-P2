import style from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/icons/lupa.png"

function Header () {

    const getLinkClass = ({ isActive }) => isActive ? style.active : style.item;

    return (
    <header className={style.header}>
        <div className={style.container}>
        <div className={style.logoContainer}>
        <img className={style.logo} src={logo} alt="logo"/>
        <h1><Link className={style.title} to="/">The Last Clue</Link></h1>
        </div>
        <div className={style.menu}>
            <ul className={style.list}>
                <li><NavLink className={getLinkClass} to="/">Caso</NavLink></li>
                <li><NavLink className={getLinkClass} to="/suspects">Suspeitos</NavLink></li>
                <li><NavLink className={getLinkClass} to="/clues">Pistas</NavLink></li>
                <li><NavLink className={getLinkClass} to="/witnesses">Testemunhas</NavLink></li>
                <li><NavLink className={getLinkClass} to="/accusation">Acusar</NavLink></li>
            </ul>
        </div>
        </div>
    </header>
)};
export default Header;