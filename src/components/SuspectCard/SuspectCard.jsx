import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lupaIcon from '../../assets/icons/lupa.png';
import './SuspectCard.css';

const SuspectCard = ({ id, name, profession, image }) => {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${name ? name.replace(/\s+/g, '+') : 'X'}&background=000000&color=8B0000&size=250`;
  const [imgSrc, setImgSrc] = useState(image || fallbackUrl);

  useEffect(() => {
    if (image) setImgSrc(image);
  }, [image]);

  const handleImageError = () => {
    if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
  };

  return (
    <div className="card">
      <img 
        src={imgSrc} 
        alt={`Foto de ${name}`} 
        className="image" 
        onError={handleImageError} 
      />
      
      <div className="info">
        <h3 className="name">{name}</h3>
        <p className="profession"><strong>Profissão:</strong> {profession}</p>
        

        <Link to={`/suspect-details/${id}`} className="button">
          <img src={lupaIcon} alt="Lupa" className="icon-lupa" />
          Investigar
        </Link>
      </div>
    </div>
  );
};

export default SuspectCard;