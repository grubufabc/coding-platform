import React from 'react'
import { useCodeEnvironment } from '../../hooks/useCodeEnvironment'
import { useNavigate } from 'react-router-dom';

const CodeEnvironment: React.FC = () => {
    const { createCodeEnvironment } = useCodeEnvironment()
    const navigate = useNavigate();

    const handleCreateCodeEnvironment = async () => {
        const codeEnvironment = await createCodeEnvironment()
        navigate(`${codeEnvironment._id}`, { replace: true })
    }

    return (
        <div className="m-5">
            <h1 className="mb-5">Ambiente de Programação</h1>
            <div className={`w-50`}>
                <div className="row mb-3">
                    <div className="col-6 d-grid">
                        <button
                            className="btn btn-outline-dark btn-lg"
                            onClick={handleCreateCodeEnvironment}
                        >
                            Novo ambiente
                        </button>
                    </div>
                    <div className="col-6 d-grid">
                        <button
                            className="btn btn-outline-dark btn-lg"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".join-room"
                            aria-expanded="false"
                        >
                            Conectar a um ambiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEnvironment
