import React from 'react'
import { useNavigate } from 'react-router-dom';

declare var window: any

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        await auth2.signOut()
        navigate('/', { replace: true })
    }

    return (
        <div className="m-5">
            <div className="row d-flex justify-content-center">
                <div className="col-4 p-5 border border-dark border-2 rounded-3 text-center">
                    <h1 className="mb-5">Logout</h1>
                    <button className="btn btn-dark px-5" onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Logout
