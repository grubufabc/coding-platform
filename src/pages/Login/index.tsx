import React from 'react'


const GOOGLE_BUTTON_ID = "google-sign-in-button";
declare var window: any

class GoogleSignIn extends React.Component {
    componentDidMount() {
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 200,
            height: 50,
            onsuccess: this.onSuccess
        })
    }

    onSuccess(googleUser: any) {
        console.log(googleUser)
        const profile = googleUser.getBasicProfile()
        console.log("Name: " + profile.getName())
    }

    render() {
        return (<div id={GOOGLE_BUTTON_ID} />)
    }
}


const Login: React.FC = () => {
    return (
        <div>
            <GoogleSignIn/>
        </div>
    )
}

export default Login
