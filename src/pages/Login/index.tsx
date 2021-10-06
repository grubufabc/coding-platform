import React from 'react'
import { AuthContext } from '../../providers/AuthProvider';
import { Navigate } from 'react-router-dom';


const GOOGLE_BUTTON_ID = "google-sign-in-button";
declare var window: any


interface GoogleSignInProps {
    setToken: any
}


const GoogleSignIn: React.FC<GoogleSignInProps> = ({ setToken }) => {
    
    const onSuccess = (googleUser: any) => {
        const token = googleUser.getAuthResponse().id_token
        localStorage.setItem('token', token)
        setToken(token)
    }

    React.useEffect(() => {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 240,
            height: 50,
            longtitle: true,
            onsuccess: onSuccess
        })
    })

    return (
        <React.Fragment>
            <div style={{ display: 'inline-block' }} id={GOOGLE_BUTTON_ID}></div>
        </React.Fragment>
    )
}


const Login: React.FC = () => {
    const [token, setToken] = React.useContext(AuthContext)

    if(token){
        return <Navigate to="/" replace={true}/>
    }

    return (
        <div className="m-5">
            <div className="row d-flex justify-content-center">
                <div className="col-4 p-5 border border-dark border-2 rounded-3 text-center">
                    <h1 className="mb-5">Bem vindo de volta</h1>
                    <GoogleSignIn setToken={setToken}/>
                </div>
            </div>
        </div>
    )
}

export default Login
