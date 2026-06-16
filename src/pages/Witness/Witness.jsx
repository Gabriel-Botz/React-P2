import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles  from './Witness.module.css'
import WitnessCard  from '../../components/WitnessCard/WhitnessCard.jsx';
import { Loading } from '../../components/Loading/Loading.jsx';
import { useInvestigation } from '../../context/InvestigationContext.jsx'


function Witness() {
    const [witnesses, setWitnesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [readWitnesses, setReadWitnesses] = useState([]);
    const [error, setError] = useState(null);
    const { progressBar, setProgressBar, revealedWitnesses, revealWitness } = useInvestigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchWitnesses = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const response = await axios.get('http://localhost:5000/cases/generate');
                    setWitnesses(response.data.witnesses || []);
                } catch (e) {
                    setError('Falha na comunicação com a central de depoimentos. Verifique se o servidor está ativo.')
                } finally {
                    setLoading(false)
                }
            };
            fetchWitnesses();
        }, 1000);
        return () => clearTimeout(timer);
    }, [])

     const witnessesWithProgress = witnesses.map((witness, index) => ({
        ...witness,
        requiredProgress: index * 10
    }));

    const handleMarkRead = (id) => {
        const isAlreadyRead = readWitnesses.includes(id);
        const updateRead = isAlreadyRead
            ? readWitnesses.filter((witnessId) => witnessId !== id)
            : [...readWitnesses, id];
        setReadWitnesses(updateRead);
    };

    const handleReveal = (id) => {
        revealWitness(id);
        setProgressBar(prev => Math.min(prev + 10, 50));
    };

    if (loading) {
        return <Loading/>;
    }

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
                    {witnessesWithProgress.map((witness) => (
                        <WitnessCard
                            key={witness.id}
                            witness={witness}
                            isRead={readWitnesses.includes(witness.id)}
                            onMarkRead={handleMarkRead}
                            isRevealed={revealedWitnesses.includes(witness.id)}
                            onReveal={() => handleReveal(witness.id)}
                            currentProgress={progressBar}
                        />
                    ))}
                </div>
        </div>
    );
}

export default Witness;