import { useInvestigation } from "../../context/InvestigationContext";
import SuspectCard from "../../components/SuspectCard/SuspectCard";
import { Loading } from "../../components/Loading/Loading.jsx";
import styles from "./Suspect.module.css";

const Suspect = () => {
    const { suspects } = useInvestigation();

    if (!suspects || suspects.length === 0) return <Loading />;

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