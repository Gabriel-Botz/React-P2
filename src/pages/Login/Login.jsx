import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setError("");
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.badge}>AREA RESTRITA</div>

        <h1 className={styles.title}>Acesso ao Sistema</h1>
        <p className={styles.subtitle}>
          Enter para acessar os arquivos do caso
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

        <p className={styles.footer}>
          Credenciais de teste: qualquer email e senha
        </p>
      </div>
    </div>
  );
}

export default Login;
