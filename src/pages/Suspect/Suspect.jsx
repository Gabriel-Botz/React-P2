import { useState, useEffect } from "react";
import axios from "axios";
import SuspectCard from "../../components/SuspectCard/SuspectCard";
import { Loading } from "../../components/Loading/Loading.jsx";
import styles from "./Suspect.module.css";
import { useInvestigation } from "../../context/InvestigationContext";

const Suspect = () => {
    const { suspects, formatAndLoadSuspects } = useInvestigation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuspects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/suspects");
                const suspectsData = response.data.suspects || response.data || [];

                if (suspectsData.length > 0) {
                    formatAndLoadSuspects(suspectsData);
                }
            } catch (e) {
                console.error("Erro na API, usando Caso Base.", e);
                setError("Servidor offline. Exibindo os arquivos do caso base local.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuspects();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Loading />;

    return (
        <div className={styles.suspectContainer}>
            {error && (
                <div className={styles.errorContainer} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #8b0000', backgroundColor: 'rgba(139, 0, 0, 0.2)' }}>
                    <p style={{ color: '#ff4d4d', margin: 0, textAlign: 'center' }}>⚠️ {error}</p>
                </div>
            )}

            <div className={styles.titleSection}>
                <div className={styles.title}>
                    <h2 style={{ fontSize: "1.8rem" }}>
                        Lista de <span className={styles.titleAccent}>Suspeitos</span>
                    </h2>
                </div>
                <div>
                    <p className={styles.subTitle}>
                        Analise o perfil de cada suspeito e suas profissões para encontrar o verdadeiro culpado.
                    </p>
                </div>
            </div>

            <div className={styles.suspectGrid}>
                {suspects.map((suspect) => (
                    <SuspectCard
                        key={suspect.id}
                        id={suspect.id}
                        name={suspect.name}
                        profession={suspect.profession}
                        image={suspect.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Suspect;