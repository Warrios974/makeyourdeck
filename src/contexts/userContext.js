import { createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { auth } from "../firebase-confing";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    
    const provider = new GoogleAuthProvider();

    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    const signIn = () => signInWithPopup(auth, provider)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        })
        return unsubscribe;
    }, [])
    
    return (
        <UserContext.Provider value={{ currentUser, signIn }}>
            {(!loadingData) && props.children}
        </UserContext.Provider>
    )
}