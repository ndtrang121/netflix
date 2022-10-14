import { useState, createContext } from 'react'

export const AuthContext = createContext()

const data = window.localStorage.getItem('MY_APP_STATE')
const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(data))
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
