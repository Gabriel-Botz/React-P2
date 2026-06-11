function Modal({isOpen, suspectName, onConfirm, onCancel}) {
    
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">

                <div className="modal-header">
                    <span>⚠️</span>
                    <h2>ATENÇÃO DETETIVE</h2>
                </div>

                <p>Tem certeza que deseja acusar este suspeito?</p>

                <div className="suspect-box">
                    <small>SUSPEITO SELECIONADO:</small>
                    <strong>{suspectName}</strong>
                </div>

                <p><em>Esta decisão é definitiva e encerrará o caso.</em></p>

                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>

            </div>
        </div>
    )
}

export default Modal;