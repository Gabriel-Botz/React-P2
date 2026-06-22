import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("isInvestigatorLogged") === "true";
  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

<<<<<<< HEAD
    setError("");
    localStorage.setItem("user", JSON.stringify({ email, password }));
    navigate("/");
=======
    if (email === "investigadorfred@gmail.com" && password === "senhaforte") {
      setError("");
      localStorage.setItem("isInvestigatorLogged", "true");
      localStorage.setItem("investigatorEmail", email);
      localStorage.setItem("investigatorSenha", password);
      
      navigate("/", { replace: true });
    } else {
      setError("Usuário inválido para acessar os arquivos");
    }
>>>>>>> 114499390b702e5fb10b9ceb4b0db1f4794f25ac
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.badge}>ÁREA RESTRITA</div>

        <h1 className={styles.title}>Acesso ao Sistema</h1>
        <p className={styles.subtitle}>
          Insira suas credenciais para acessar os arquivos do caso
        </p>

        <div className={styles.divider} />

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              placeholder="detective@agency.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Senha</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        <button className={styles.backButton} onClick={() => navigate("/")}>
          Voltar ao início
        </button>

        <p className={styles.footer}>
          Credenciais criptografadas e monitoradas.
        </p>
      </div>
    </div>
  );
}

export default Login;