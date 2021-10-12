import React, { createContext } from 'react'


interface IAuthData {
    token: string
    provider: string
}

export const AuthContext = createContext({ 
    authData: {
        token: '',
        provider: ''
    },
    setAuthData: (authData: IAuthData) => {}
})


export const AuthProvider: React.FC = ({ children }) => {
    const [authData, setAuthData] = React.useState<IAuthData>({ token: '', provider: ''})

    React.useEffect(() => {
        if(authData.token){
            localStorage.setItem('token', authData.token)
            localStorage.setItem('auth_provider', authData.provider)
        }
    }, [authData])
    
    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            { children}
        </AuthContext.Provider>
    )
}
