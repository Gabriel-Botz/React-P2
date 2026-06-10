import {useParams} from "react-router-dom";
import {useContext} from "react";
import {useInvestigation} from "../../context/InvestigationContext";

function SuspectDetails () {
    const { id } = useParams();
    const { suspects } = useInvestigation();
    const [loading, setLoading] = useState(false);
    
    const suspect = suspects.find( s => s.id === Number(id) );

    if (loading) return <Loading/> // ainda precisa ser criada essa função
    if (!suspect) return <p>Suspeito não encontrado</p>;
    
    return (
        <div>
            <h1>{suspect.name}</h1>
            <p>{suspect.profissao}</p>
            <p>{suspect.motivo}</p>
            <p>{suspect.alibi}</p>
        </div>
    );
};
export default SuspectDetails;