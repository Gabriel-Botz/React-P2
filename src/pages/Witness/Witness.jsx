import React, { useState, useEffect } from 'react';
import styles from './Witness.module.css';
import WitnessCard from '../../components/WitnessCard/WhitnessCard.jsx'; // Nota: verifique se a pasta é 'WhitnessCard' ou 'WitnessCard'
import { Loading } from '../../components/Loading/Loading.jsx';
import { useInvestigation } from '../../context/InvestigationContext.jsx';

function Witness() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Centralizando o estado vindo do Contexto para evitar duplicidade
    const { 
        progressBar, 
        setProgressBar, 
        revealedWitnesses, 
        revealWitness,
        witnesses,
        setWitnesses,
        readWitnesses,
        setReadWitnesses
    } = useInvestigation();

    useEffect(() => {
        const fetchWitnesses = async () => {
            try {
                // Se já temos dados ou testemunhas lidas, podemos pular o loading visual demorado
                if (readWitnesses.length > 0 || witnesses.length > 0) {
                    setLoading(false);
                    return;
                }

                // Substitua pela sua URL real de API
                const response = await fetch('/api/witnesses'); 
                const data = await response.json();
                
                setWitnesses(data.witnesses || []);
            } catch (e) {
                setError('Falha na comunicação com a central de depoimentos. Verifique se o servidor está ativo.');
            } finally {
                setLoading(false);
            }
        };

        fetchWitnesses();
    }, [setWitnesses, readWitnesses.length, witnesses.length]);

    // Handlers de clique
    const handleMarkRead = (id) => {
        const isAlreadyRead = readWitnesses.includes(id);
        const updateRead = isAlreadyRead
            ? readWitnesses.filter((witnessId) => witnessId !== id)
            : [...readWitnesses, id];
        setReadWitnesses(updateRead);

        // Atualiza a barra de progresso baseado nas lidas
        const progressIncrement = 10;
        const newProgress = updateRead.length * progressIncrement;
        setProgressBar(Math.min(Math.max(newProgress, 0), 100));
    };

    const handleReveal = (id) => {
        revealWitness(id);
        setProgressBar(prev => Math.min(prev + 10, 50));
    };

    // Distribuição do progresso requerido baseado na lista
    const witnessesWithProgress = witnesses.map((witness, index) => ({
        ...witness,
        requiredProgress: witnesses.length > 0 ? (index / witnesses.length) * 100 : 0
    }));

    // Renderizações Condicionais (Gargalos de tela)
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className={styles.witnessContainer}>
                <div className={styles.errorContainer}>
                    <h2 className={styles.errorTitle}>Erro de Conexão</h2>
                    <p className={styles.errorBody}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.witnessContainer}>
            <div className={styles.teste}>
                <div className={styles.title}>
                    <h2 style={{ fontSize: '1.8rem' }}>
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