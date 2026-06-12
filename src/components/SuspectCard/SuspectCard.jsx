import { Link } from 'react-router-dom';
import './SuspectCard.css';

const SuspectCard = ({ id, name, profession, image, suspicionLevel }) => {
  return (
    <div className="card">
      <img src={image} alt={`Foto do suspeito ${name}`} className="image" />
      
      <div className="info">
        <h3 className="name">{name}</h3>
        <p className="profession"><strong>Profissão:</strong> {profession}</p>
        
        <div className="rankingContainer">
          <p className="rankingText">{name} - {suspicionLevel}% de suspeita</p>
          <div className="progressBarBg">
            <div 
              className="progressBarFill" 
              style={{ width: `${suspicionLevel}%` }} 
            ></div>
          </div>
        </div>

        <Link to={`/suspect/${id}`} className="button">
          Investigar
        </Link>
      </div>
    </div>
  );
};

export default SuspectCard;