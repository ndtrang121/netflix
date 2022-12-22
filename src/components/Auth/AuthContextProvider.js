import { onAuthStateChanged } from 'firebase/auth'
import { useState, createContext, useEffect } from 'react'
import { auth } from './firebase'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // console.log(user)
                setIsAuthenticated(true)
                // ...
            } else {
                // User is signed out
                // ...
                setIsAuthenticated(false)
                // console.log('signed out')
            }
        })

        return () => unsubscribe()
    }, [])
    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
