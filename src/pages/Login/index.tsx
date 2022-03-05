import React from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../api';

function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const GOOGLE_BUTTON_ID = 'google-sign-in-button';
declare var window: any;

interface IAuthData {
	token: string;
	is_admin: boolean;
}

interface GoogleSignInProps {
	setAuthData: (authData: IAuthData) => void
	authData: IAuthData
}

interface IPayload {
	is_admin: boolean
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({
	setAuthData,
	authData,
}) => {
	const [token, setToken] = React.useState<string>('');

	React.useEffect(() => {
		if (!authData.token && token) {
			const data = parseJwt(token) as IPayload;
			setAuthData({ token, is_admin: data.is_admin });
		}
	}, [setAuthData, token, authData]);

	const onSuccess = async (googleUser: any) => {
		const response = await axios.post(`${API_URL}/sessions`, {
			token: googleUser.getAuthResponse().id_token,
			provider: 'google',
		});

		if(response.data.status){
			setToken(response.data.token);
		}
	};

	React.useEffect(() => {
		window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
			width: 240,
			height: 50,
			longtitle: true,
			onsuccess: onSuccess,
		});
	});

	return (
		<React.Fragment>
			<div style={{ display: 'inline-block' }} id={GOOGLE_BUTTON_ID}></div>
		</React.Fragment>
	);
};

const Login: React.FC = () => {
	const { authData, setAuthData } = React.useContext(AuthContext);
	const [redirecting, setRedirecting] = React.useState<boolean>(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (authData.token) {
			setRedirecting(true);
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 2000);
		}
	}, [authData, navigate]);

	return (
		<div className="m-5">
			<div className="row d-flex justify-content-center">
				<div className="col-4 p-5 border border-dark border-2 rounded-3 text-center">
					<h1 className="mb-5">Bem vindo de volta</h1>
					{redirecting ? (
						<div>
							<div
								className="spinner-border me-5"
								role="status"
								aria-hidden="true"
							></div>
							<strong>Redirecionando...</strong>
						</div>
					) : (
						<GoogleSignIn authData={authData} setAuthData={setAuthData} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
