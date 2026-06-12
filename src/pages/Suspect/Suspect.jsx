import { useState, useEffect } from "react";
import axios from "axios";
import SuspectCard from "../../components/SuspectCard/SuspectCard";
import styles from "./Suspect.module.css"; 

const Suspect = () => {
    const [suspectList, setSuspectList] = useState([]);

    useEffect(() => {
        const fetchSuspects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/suspects");
                setSuspectList(response.data || []);
            } catch (e) {
                console.error("Falha na comunicação com os arquivos de suspeitos:", e);
            }
        };
        
        fetchSuspects();
    }, []);

    return (
        <div className={styles.suspectContainer}>
            <div className={styles.titleSection}>
                <div className={styles.title}>
                    <h2 style={{ fontSize: "1.8rem" }}>
                        Lista de <span className={styles.titleAccent}>Suspeitos</span>
                    </h2>
                </div>
                <div>
                    <p className={styles.subTitle}>
                        Analise o perfil de cada suspeito, suas profissões e níveis de suspeita para encontrar o verdadeiro culpado.
                    </p>
                </div>
            </div>

            <div className={styles.suspectGrid}>
                {suspectList.map((suspect) => (
                    <SuspectCard
                        key={suspect.id}
                        id={suspect.id}
                        name={suspect.name}
                        profession={suspect.profession}
                        image={suspect.image}
                        suspicionLevel={suspect.suspicionLevel}
                    />
                ))}
            </div>
        </div>
    );
};

export default Suspect;