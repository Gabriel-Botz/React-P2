import {useParams} from "react-router-dom";
import {useContext} from "react";
import {InvestigationContext} from "../../contexts/InvestigationContext";

function SuspectDetails () {
    const { id } = useParams();
    const { suspects } = context(InvestigationContext);
    
    const suspect = suspects.find( s => s.id === Number(id) );

    console.log("Suspeitos como o id: ", id);

    return (
        <p>Detalhes do suspeito com o id: {id}</p>
    )
};
export default SuspectDetails;