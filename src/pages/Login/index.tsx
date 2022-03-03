import React from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';
declare var window: any;

interface GoogleSignInProps {
	setAuthData: any;
	authData: {
		token: string;
		provider: string;
	};
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({
	setAuthData,
	authData,
}) => {
	const [token, setToken] = React.useState<string>('');

	React.useEffect(() => {
		if (!authData.token && token) {
			setAuthData({ token, provider: 'google' });
		}
	}, [setAuthData, token, authData]);

	const onSuccess = (googleUser: any) => {
		setToken(googleUser.getAuthResponse().id_token);
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
		if (authData.token && authData.provider) {
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
