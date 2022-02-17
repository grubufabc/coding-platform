import React from 'react'
import { useCodeEnvironment } from '../../hooks/useCodeEnvironment'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const CodeEnvironment: React.FC = () => {
    const { createCodeEnvironment } = useCodeEnvironment()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)

    const handleCreateCodeEnvironment = async () => {
        setLoading(true)
        const codeEnvironment = await createCodeEnvironment()
        setLoading(false)
        navigate(`${codeEnvironment._id}`, { replace: true })
    }

    return (
        <React.Fragment>
            <Header />
            <div className="m-5">
                <h1 className="mb-5">Ambiente de Programação</h1>
                {loading ? (
                    <div className="d-flex align-items-center">
                        <strong>Carregando ambiente de programação...</strong>
                        <div className="spinner-border ms-5" role="status" aria-hidden="true"></div>
                    </div>
                ) : (
                    <button
                        className="btn btn-outline-dark btn-lg"
                        onClick={handleCreateCodeEnvironment}
                    >
                        Novo ambiente
                    </button>
                )}
            </div>
        </React.Fragment>
    )
}

export default CodeEnvironment
