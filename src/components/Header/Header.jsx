import style from "./Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/lupa.png"

function Header () {
    return (
    <header className={style.header}> 
        <div className={style.logoContainer}> 
        <img className={style.logo} src={logo} alt="logo"/>
        <h1 className={style.title}>The Last Clue</h1>
        </div>
        <div className={style.menu}>
            <ul className={style.list}>
                <li className={style.item}><Link to="/">Caso</Link></li>
                <li className={style.item}><Link to="/suspects">Suspeitos</Link></li>
                <li className={style.item}><Link to="/clues">Pistas</Link></li>
                <li className={style.item}><Link to="/witnesses">Testemunhas</Link></li>
                <li className={style.item}><Link to="/accusation">Acusar</Link></li>
            </ul>
        </div>
    </header>
)};
export default Header;