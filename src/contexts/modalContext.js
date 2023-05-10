import { createContext, useState } from "react";

export const ModalContext = createContext();

//Composant d'ordre superieur
export function ModalContextProvider(props) {

    const [modalState, setModalState] = useState({
        signInModal : false
    })

    //Fermer ou ouvrir les modales
    const toggleModals = modal => {
        if(modal === "signIn"){
            setModalState({
                signInModal : true
            })
        }
        if(modal === "close"){
            setModalState({
                signInModal : false
            })
        }
    }
    
    return (
        <ModalContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </ModalContext.Provider>
    )
}