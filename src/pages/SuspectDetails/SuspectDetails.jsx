import {useContext} from "react"; 
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useInvestigation} from "../../context/InvestigationContext";
import {useNavigate} from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import styles from "./SuspectDetails.module.css";

function SuspectDetails () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {suspects, selectedSuspect, setSelectedSuspect, setProgressBar} = useInvestigation();
    const [modalAberto, setModalAberto] = useState(false);
    
    const suspect = suspects.find( s => s.id === Number(id) );
    const isSelected = selectedSuspect?.id === suspect?.id;

    if (loading) return <p>Carregando...</p>;
    if (!suspect) return <p>Suspeito não encontrado</p>;
    
    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/suspects')} className={styles.btnVoltar}> 
                ← Voltar para Lista
            </button>
            
            <div className={styles.card}>

                <div className={styles.left}>
                    <img src={suspect.image} alt={suspect.name} className={styles.photo} />
                </div>

                <div className={styles.right}>
                    <small className={styles.dossie}>Dossiê Criminal — {suspect.name}</small>
                    <h1 className={styles.name}>{suspect.name}</h1>
                    <p className={styles.occupation}><strong>Ocupação:</strong> {suspect.profession}</p>

                    <h3 className={styles.sectionTitle}>Motivação</h3>
                    <p className={styles.text}>{suspect.motive}</p>

                    <h3 className={styles.sectionTitle}>Álibi Declarado</h3>
                    <p className={styles.alibi}>{suspect.alibi}</p>

                    {!isSelected ? (
                        <button className={styles.btnPrincipal} onClick={() => setModalAberto(true)}>
                            Marcar como Principal Suspeito
                        </button>
                    ) : (
                        <button className={styles.btnCancelar} onClick={() => {
                            setSelectedSuspect(null);
                            setProgressBar(prev => Math.max(prev - 20, 0));
                        }}>
                            Cancelar Acusação
                        </button>
                    )}
                </div>
            </div>

            {modalAberto && (
                <Modal
                    isOpen={modalAberto}
                    suspectName={suspect.name}
                    onConfirm={() => {
                        setSelectedSuspect(suspect);
                        setProgressBar(prev => Math.min(prev + 20, 100));
                        setModalAberto(false);
                    }}
                    onCancel={() => setModalAberto(false)}
                />
            )}
        </div>
    );
};
export default SuspectDetails;