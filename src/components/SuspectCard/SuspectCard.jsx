import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import lupaIcon from '../../assets/icons/lupa.png';
import cadeadoIcon from '../../assets/icons/cadeado.png';
import './SuspectCard.css';
import { useInvestigation } from '../../context/InvestigationContext';

const SuspectCard = ({ id, name, profession, image }) => {
  const { selectedSuspect } = useInvestigation();

  const isSelected = selectedSuspect?.id === id;
  const hasSelection = selectedSuspect !== null && selectedSuspect !== undefined;
  const isGhost = hasSelection && !isSelected;
  const fallbackUrl = `https://ui-avatars.com/api/?name=${name ? name.replace(/\s+/g, '+') : 'X'}&background=000000&color=8B0000&size=250`;
  const [imgSrc, setImgSrc] = useState(image || fallbackUrl);

  useEffect(() => {
    if (image) setImgSrc(image);
  }, [image]);

  const handleImageError = () => {
    if (imgSrc !== fallbackUrl) setImgSrc(fallbackUrl);
  };

  return (
    <div className={`card ${isSelected ? 'selected' : ''} ${isGhost ? 'ghost' : ''}`}>

      {isSelected && <div className="ribbon">Suspeito</div>}

      <img
        src={imgSrc}
        alt={`Foto de ${name}`}
        className="image"
        onError={handleImageError}
      />

      <div className="info">
        <h3 className="name">{name}</h3>
        <p className="profession"><strong>Ocupação:</strong> {profession}</p>

        {isGhost ? (
          <div className="button disabled">
            <img src={cadeadoIcon} alt="Cadeado" className="icon-lupa" />
            Bloqueado
          </div>
        ) : (
          <Link to={`/suspect-details/${id}`} className="button">
            <img src={lupaIcon} alt="Lupa" className="icon-lupa" />
            {isSelected ? 'Ver Dossiê' : 'Investigar'}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SuspectCard;