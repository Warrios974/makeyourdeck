import { createContext, useState } from "react";

export const ModalContext = createContext();

//Composant d'ordre superieur
export function ModalContextProvider(props) {

    const [modalState, setModalState] = useState({
        signInModal : false,
        initYourDeckModal : false,
        cardInfos : false,
        sideBarDeck : true,
    })

    const [cardInfoData, setCardInfoData] = useState()

    //Fermer ou ouvrir les modales
    const toggleModals = modal => {
        if(modal === "signIn"){
            setModalState({
                signInModal : true,
                initYourDeckModal : false,
                cardInfos : false,
                sideBarDeck : false,
            })
        }
        if(modal === "initYourDeck"){
            setModalState({
                signInModal : false,
                initYourDeckModal : true,
                cardInfos : false,
                sideBarDeck : false,
            })
        }
        if(modal === "cardInfos"){
            setModalState({
                signInModal : false,
                initYourDeckModal : false,
                cardInfos : true,
                sideBarDeck : false,
            })
        }
        if(modal === "sideBarDeck"){
            setModalState({
                signInModal : false,
                initYourDeckModal : false,
                cardInfos : false,
                sideBarDeck : true,
            })
        }
        if(modal === "close"){
            setModalState({
                signInModal : false,
                initYourDeckModal : false,
                cardInfos : false,
                sideBarDeck : false,
            })
        }
    }

    return (
        <ModalContext.Provider value={{ 
            stateModal : [
                modalState,
                toggleModals
            ],
            stateModalData : [
                cardInfoData,
                setCardInfoData
            ]
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}