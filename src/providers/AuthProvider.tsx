import React, { createContext } from 'react';

interface IAuthData {
	token: string;
	is_admin: boolean;
}

interface AuthContextProps {
	authData: IAuthData;
	setAuthData: (authData: IAuthData) => void;
	cleanAuthData: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);

export const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = React.useState<IAuthData>({
		token: '',
		is_admin: false,
	});

	React.useEffect(() => {
		const token = localStorage.getItem('token') || '';
		const is_admin = localStorage.getItem('is_admin') || 'false';
		if (!authData.token && token) {
			setAuthData({
				token,
				is_admin: JSON.parse(is_admin),
			});
		}
	}, [authData]);

	const cleanAuthData = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('is_admin');
		setAuthData({
			token: '',
			is_admin: false,
		});
	};

	React.useEffect(() => {
		if (authData.token) {
			localStorage.setItem('token', authData.token);
			localStorage.setItem('is_admin', JSON.stringify(authData.is_admin));
		}
	}, [authData]);

	return (
		<AuthContext.Provider value={{ authData, setAuthData, cleanAuthData }}>
			{children}
		</AuthContext.Provider>
	);
};
