import { createContext, useState } from "react";

export const ModalContext = createContext();

//Composant d'ordre superieur
export function ModalContextProvider(props) {

    const [modalState, setModalState] = useState({
        signInModal : false,
        initYourDeckModal : true
    })

    //Fermer ou ouvrir les modales
    const toggleModals = modal => {
        if(modal === "signIn"){
            setModalState({
                signInModal : true,
                initYourDeckModal : false
            })
        }
        if(modal === "initYourDeck"){
            setModalState({
                signInModal : false,
                initYourDeckModal : true
            })
        }
        if(modal === "close"){
            setModalState({
                signInModal : false,
                initYourDeckModal : false
            })
        }
    }
    
    return (
        <ModalContext.Provider value={{ modalState, toggleModals }}>
            {props.children}
        </ModalContext.Provider>
    )
}