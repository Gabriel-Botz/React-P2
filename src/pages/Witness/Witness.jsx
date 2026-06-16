import React, { useState, useEffect } from 'react';
import styles  from './Witness.module.css'
import WitnessCard  from '../../components/WitnessCard/WhitnessCard.jsx';
import { Loading } from '../../components/Loading/Loading.jsx';
import { useInvestigation } from '../../context/InvestigationContext.jsx'


function Witness() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const { progressBar,
            setProgressBar,
            witnesses,
            setWitnesses,
            readWitnesses,
            setReadWitnesses
    } = useInvestigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000)

        if (readWitnesses.length > 0 || [...readWitnesses ] > 0 ) {
            setLoading(false);
        }

        return () => clearTimeout(timer);
    }, [])

   if (loading) {
       if(readWitnesses.length > 0){
           return
       } else {
           return <Loading/>
       }
   }

    const handleMarkRead = (id) => {
        const isAlreadyRead = readWitnesses.includes(id);
        const updateRead = isAlreadyRead
            ? readWitnesses.filter((witnessId) => witnessId !== id)
            : [...readWitnesses, id];

        setReadWitnesses(updateRead);

        const progressIncrement = 10;
        const newProgress = updateRead.length * progressIncrement;
        setProgressBar(Math.min(Math.max(newProgress, 0), 100));
    };

    if (error) {
        return (
            <div className={styles.witnessContainer}>
            <div className={styles.errorContainer}>
                <h2 className={styles.errorTitle}>
                    Erro de Conexão
                </h2>
                <p className={styles.errorBody}>
                    {error}
                </p>
            </div>
            </div>
        );
    }

    return (
        <div className={styles.witnessContainer}>
            <div className={styles.teste}>
            <div className={styles.title}>
                <h2 style={{ fontSize: '1.8rem'}}>
                    Interrogatórios e <span className="title-accent">Depoimentos</span>
                </h2>
            </div>
            <div>
                <p className={styles.subTitle}>
                    Consulte as declarações oficiais das testemunhas. Lembre-se de cruzar essas informações com os álibis e horários informados nas fichas de suspeitos.
                </p>
            </div>
            </div>
                <div className={styles.witnessCard}>
                    {witnesses.map((witness) => (
                        <WitnessCard
                            key={witness.id}
                            witness={witness}
                            isRead={readWitnesses.includes(witness.id)}
                            onMarkRead={handleMarkRead}
                        />
                    ))}
                </div>
        </div>
    );
}

export default Witness;