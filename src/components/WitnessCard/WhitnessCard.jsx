import React from 'react';
import styles from './WhitnessCard.module.css';
import iconHead from '../../assets/icons/research.png'

function WitnessCard({ witness, isRead, onMarkRead, isRevealed, onReveal, currentProgress }) {

    const isUnlocked = currentProgress >= witness.requiredProgress;
    
    return (
        <div className={`${styles.witnessContainer} ${isRead ? styles.read : ''}`} >
            <div className={styles.cardHeader}>
                <div className={styles.headerName}>
                    <img className={styles.icon} src={iconHead} alt=""/>
                    <h3 className={styles.witnessName}>{witness.name}</h3>
                </div>

                {!isUnlocked ? ( //botão muda conforme o estado
                    <span className={styles.badgeLocked}>🔒 Bloqueado</span>
                ) : !isRevealed ? (
                    <span 
                        className={styles.badgeReveal} 
                        onClick={() => {
                            onReveal();
                            onMarkRead(witness.id);
                        }}
                    >
                        🕮 Revelar Depoimento
                    </span>
                ) : (
                    <span 
                        className={styles.badgeRead}
                    >
                        ✓ Analisado
                    </span>
                )}
            </div>

            {isRevealed && ( // exibe apenas se foi revelado

            <div className={`${styles.cardBody} ${styles.fadeIn}`}>
                <p className={styles.witnessTestimony}>
                    "{witness.testimony}"
                </p>
                {witness.isContradictory && (
                    <span className={styles.alertText}>⚠️ Este depoimento contradiz um suspeito!</span>
                )}
            </div>
            )}
        </div>
    );
}

export default WitnessCard;