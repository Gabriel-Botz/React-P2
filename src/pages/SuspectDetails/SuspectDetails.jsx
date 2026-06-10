import {useParams} from "react-router-dom";

function SuspectDetails () {
    const { id } = useParams();
    
    console.log("Suspeitos como o id: ", id);

    return (
        <p>Detalhes do suspeito com o id: {id}</p>
    )
};
export default SuspectDetails;