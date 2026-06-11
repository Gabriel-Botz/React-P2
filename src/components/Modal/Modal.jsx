function Modal({isOpen, suspectName, onConfirm, onCancel}) {
    
    if (!isOpen) return null;

    return (
        <div>
            <div>
                <p> Deseja acusar <strong>{suspectName}</strong>?</p>
                <button onClick={onConfirm}>Confirmar</button>
                <button onClick={onCancel}>Cancelar</button>
            </div>
        </div>
    )
}

export default Modal;