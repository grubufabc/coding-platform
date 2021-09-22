import React from 'react'


const GOOGLE_BUTTON_ID = "google-sign-in-button";
declare var window: any

class GoogleSignIn extends React.Component {
    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 240,
            height: 50,
            longtitle: true,
            onsuccess: this.onSuccess
        })
    }

    onSuccess(googleUser: any) {
        console.log(googleUser)
        const profile = googleUser.getBasicProfile()
        console.log("Name: " + profile.getName())
    }

    render() {
        return (<div style={{ display: 'inline-block' }} id={GOOGLE_BUTTON_ID} />)
    }
}


const Login: React.FC = () => {
    return (
        <div className="m-5">
            <div className="row d-flex justify-content-center">
                <div className="col-4 p-5 border border-dark border-2 rounded-3 text-center">
                    <h1 className="mb-5">Bem vindo de volta</h1>
                    <GoogleSignIn />
                </div>
            </div>
        </div>
    )
}

export default Login
