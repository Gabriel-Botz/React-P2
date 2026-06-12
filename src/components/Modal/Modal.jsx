import styles from "./Modal.module.css"

function Modal({isOpen, suspectName, onConfirm, onCancel}) {
    
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.header}>
                    <span>⚠️</span>
                    <h2>ATENÇÃO DETETIVE</h2>
                </div>

                <p className={styles.question}>Tem certeza que deseja acusar este suspeito?</p>

                <div className={styles.suspectBox}>
                    <small>SUSPEITO SELECIONADO:</small>
                    <strong>{suspectName}</strong>
                </div>

                <p className={styles.warning}><em>Esta decisão é definitiva e encerrará o caso.</em></p>

                <div className={styles.buttons}>
                    <button className={styles.btnCancelar} onClick={onConfirm}>Confirmar</button>
                    <button className={styles.btnConfirmar} onClick={onCancel}>Cancelar</button>
                </div>

            </div>
        </div>
    )
}

export default Modal;