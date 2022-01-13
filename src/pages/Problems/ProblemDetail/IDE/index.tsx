import React from 'react'
import { default as GenericIDE, IDEHandles} from '../../../../components/IDE'

interface IDEProps {
    IDERef: React.RefObject<IDEHandles>
    handleSubmit: () => Promise<void>
    judging: boolean
}

const IDE: React.FC<IDEProps> = ({ IDERef, handleSubmit, judging }) => {
    return (
        <div className="col-8 p-0 px-3">
            <GenericIDE ref={IDERef} />
            {(judging ? (
                <button onClick={handleSubmit} className="btn btn-outline-dark btn-lg mt-3">Processando...</button>
            ) : (
                <button onClick={handleSubmit} className="btn btn-outline-dark btn-lg mt-3">Enviar solução</button>
            ))}
        </div>
    )
}

export default IDE
