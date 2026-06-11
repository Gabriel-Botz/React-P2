import React from 'react';
import styles from './WhitnessCard.module.css';

function WitnessCard({ witness, isRead, onMarkRead }) {
    return (
        // Opção 1
        <div className={`${styles.witnessContainer} ${isRead ? styles.read : ''}`} onClick={() => onMarkRead(witness.id)} >
        {/*// Opção 2*/}
        {/*<div className={`${styles.witnessContainer} ${isRead ? styles.read : ''} ${witness.isContradictory ? styles.witnessContradictory : ''}`} onClick={() => onMarkRead(witness.id)} >*/}
            <div className={styles.cardHeader}>
                <div>
                    <h3 className={styles.witnessName}>{witness.name}</h3>
                </div>
                <span className={`${styles.badgeStatus} ${isRead ? styles.badgeRead : styles.badgeUnread}`} >
                    {isRead ? (
                        <>✓ Analisado</>
                    ) : (
                        // todo: alterar o icone
                        <>📖 Ler Depoimento</>
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