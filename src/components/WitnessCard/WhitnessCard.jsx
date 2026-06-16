import React from 'react';
import styles from './WhitnessCard.module.css';
import iconHead from '../../assets/icons/research.png'

function WitnessCard({ witness, isRead, onMarkRead, isRevealed, onReveal, currentProgess }) {
    return (
        <div className={`${styles.witnessContainer} ${isRead ? styles.read : ''}`} onClick={() => onMarkRead(witness.id)} >
            <div className={styles.cardHeader}>
                <div className={styles.headerName}>
                    <img className={styles.icon} src={iconHead} alt=""/>
                    <h3 className={styles.witnessName}>{witness.name}</h3>
                </div>
                <span className={`${styles.badgeStatus} ${isRead ? styles.badgeRead : styles.badgeUnread}`} >
                    {isRead ? (
                        <>✓ Analisado</>
                    ) : (
                        // todo: alterar o icone
                        <> 🕮 Ler Depoimento</>
                    )}
                </span>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.witnessTestimony}>
                    "{witness.testimony}"
                </p>
                {witness.isContradictory && (
                    <span className={styles.alertText}>⚠️ Este depoimento contradiz um suspeito!</span>
                )}
            </div>
        </div>
    );
}

export default WitnessCard;