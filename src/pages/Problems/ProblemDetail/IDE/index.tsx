import React from 'react'
import { default as GenericIDE, IDEHandles} from '../../../../components/IDE'

interface IDEProps {
    IDERef: React.RefObject<IDEHandles>
    handleSubmit: () => Promise<void>
}

const IDE: React.FC<IDEProps> = ({ IDERef, handleSubmit }) => {
    return (
        <div className="col-8 p-0 px-3">
            <GenericIDE ref={IDERef} />
            <button onClick={handleSubmit} className="btn btn-outline-dark btn-lg mt-3">Enviar solução</button>
        </div>
    )
}

export default IDE
