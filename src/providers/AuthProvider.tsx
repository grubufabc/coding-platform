import React, { createContext } from 'react'


export const AuthContext = createContext(['', (token: string) => {}])


export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = React.useState<string>('')
    
    return (
        <AuthContext.Provider value={[ token, setToken ]}>
            { children }
        </AuthContext.Provider>
    )
}
