import style from "./Footer.module.css";


function Footer () {
    return (

        <footer className={style.footer}>
            <div className={style.container}>
                <h1 className={style.title}>The Last Clue — O Último Indício</h1>
                <h3 className={style.h3}>Trabalho Acadêmico de Desenvolvimento com React • Curso FullStack Serratec.</h3>
                <p className={style.p}>© 2026 — Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};
export default Footer;