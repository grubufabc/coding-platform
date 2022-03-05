import React, { createContext } from 'react';

interface IAuthData {
	token: string;
	is_admin: boolean;
}

interface AuthContextProps {
	authData: IAuthData;
	setAuthData: (authData: IAuthData) => void;
}

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = React.useState<IAuthData>({
		token: '',
		is_admin: false,
	});

	const [init, setInit] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!authData.token && !init) {
			setInit(true);
			const token = localStorage.getItem('token') || '';
			const is_admin = localStorage.getItem('is_admin') || 'false';
			setAuthData({
				token,
				is_admin: JSON.parse(is_admin),
			});
		}
	}, [authData, init]);

	React.useEffect(() => {
		if (authData.token) {
			localStorage.setItem('token', authData.token);
			localStorage.setItem('is_admin', JSON.stringify(authData.is_admin));
		}
	}, [authData]);

	return (
		<AuthContext.Provider value={{ authData, setAuthData }}>
			{children}
		</AuthContext.Provider>
	);
};
