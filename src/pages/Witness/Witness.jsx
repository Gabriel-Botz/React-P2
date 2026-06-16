import React, { useState, useEffect } from 'react';
import styles  from './Witness.module.css'
import WitnessCard  from '../../components/WitnessCard/WhitnessCard.jsx';
import { Loading } from '../../components/Loading/Loading.jsx';
import { useInvestigation } from '../../context/InvestigationContext.jsx'
import axios from 'axios';

function Witness() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { progressBar,
            setProgressBar,
            witnesses,
            setWitnesses,
            readWitnesses,
            setReadWitnesses
    } = useInvestigation();

    useEffect(() => {
        const timer = setTimeout (() => {
            if (witnesses && witnesses.length > 0) {
                setLoading(false);
                return
            }

            if (readWitnesses) {
                setLoading(false);
                return
            }

            const fetchWitnesses = async () => {
                try {
                    setLoading(true)
                    setError(null)

                    const response = await axios.get('http://localhost:5000/case/generate');
                    setWitnesses(response.data.case?.witnesses || response.data.witnesses || []);
                } catch (e) {
                    console.error(e);
                    setError('Não foi possível carregar as testemunhas');
                } finally {
                    setLoading(false);
                }
            }
            fetchWitnesses().then(r => console.log(r));
        }, 1000);
        return () => clearTimeout(timer);
    }, [witnesses, setWitnesses, readWitnesses, setReadWitnesses])

    const handleMarkRead = (id) => {
        const isAlreadyRead = readWitnesses.includes(id);
        const updateRead = isAlreadyRead
            ? readWitnesses.filter((witnessId) => witnessId !== id)
            : [...readWitnesses, id];

        setReadWitnesses(updateRead);

        const progressIncrement = 10;
        const newProgress = updateRead.length * progressIncrement;
        setProgressBar(Math.min(Math.max(newProgress, 0), 100));
        setLoading(false);
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