import React from 'react';
import styles from './WhitnessCard.module.css';

function WitnessCard({ witness, isRead, onMarkRead }) {
    return (
        <div className={`${styles.witnessContainer} ${isRead ? styles.read : ''}`} >
            <div className={styles.cardHeader}>
                <div>
                    <h3 className={styles.witnessName}>{witness.name}</h3>
                </div>
                <span className={`${styles.badgeStatus} ${isRead ? styles.badgeRead : styles.badgeUnread}`} onClick={() => onMarkRead(witness.id)}>
                    {isRead ? (
                        <>✓ Analisado</>
                    ) : (
                        // todo: alterar o icone
                        <>📖 Ler Depoimento</>
                    )}
                </span>
            </div>
            <p className={styles.witnessTestimony}>
                "{witness.testimony}"
            </p>
        </div>
    );
}

export default WitnessCard;