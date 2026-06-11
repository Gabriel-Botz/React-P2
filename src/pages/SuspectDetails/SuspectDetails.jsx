import {useContext} from "react"; 
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useInvestigation} from "../../context/InvestigationContext";
import Modal from "../../components/Modal/Modal";

function SuspectDetails () {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [suspects, selectedSuspect, setSelectedSuspect] = useInvestigation();
    const [modalAberto, setModalAberto] = useState(false);
    
    const suspect = suspects.find( s => s.id === Number(id) );

    if (loading) return <Loading/>;
    if (!suspect) return <p>Suspeito não encontrado</p>;
    
    return (
        <div>
            <h1>{suspect.name}</h1>
            <p>{suspect.profissao}</p>
            <p>{suspect.motivo}</p>
            <p>{suspect.alibi}</p>

            <button onClick={() => setModalAberto(true)}>Principal Suspeito</button>
            <button onClick={() => setSelectedSuspect(null)}>Inocente</button>
            <button onClick={() => setSelectedSuspect(null)}>Investigado</button>

            {modalAberto && (
                <Modal
                    isOpen={modalAberto}
                    suspectName={suspect.name}
                    onConfirm={() => {
                        setSelectedSuspect(suspect);
                        setModalAberto(false);
                    }}
                    onCancel={() => setModalAberto(false)}
                />
            )}
        </div>
    );
};
export default SuspectDetails;