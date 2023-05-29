import { createContext, useEffect, useState } from "react";
import { getCardsByColors, initSortCards } from "../api/MagicApi";
import { search, theFilter } from "../search/search";
import { deckBuild, theDeck } from "../search/deck";

export const DeckBuilderContext = createContext();

//Composant d'ordre superieur
export function DeckBuilderContextProvider(props) {

    const [loadingData, setLoadingData] = useState(true)

    const [filters, setFilters] = useState(theFilter)

    const [currentDeck, setCurrentDeck] = useState(theDeck)
    const addCardInDeck = (cardID,action) => {
        if (action === 'add') {
            const fetch = deckBuild(currentDeck).addCard(cardID)
        }
        setCurrentDeck()
    }
    const removeCardInDeck = (cardID,action) => {
        if (action === 'remove') {
            const fetch = deckBuild(currentDeck).removeCard(cardID)
        }
        setCurrentDeck()
    }

    const [currentCards, setCurrentCards] = useState([])
    const [nextPage, setnextPage] = useState()

    useEffect(() => {
        const initCards = async () => {
            const fetch = await search(filters)
            const cards = await initSortCards(fetch.data)
            setCurrentCards([...cards])
            setnextPage(fetch.next_page)
            setLoadingData(false)
            return fetch
        }
        initCards()
    }, [])

    useEffect(() => {
        //Current card init
        const searchFunction = async () => {
            const fetch = await search(filters)
            const cards = fetch.data ? await initSortCards(fetch.data) : await initSortCards(fetch)
            fetch.data ? setCurrentCards([...cards]) : setCurrentCards([cards])
            return fetch
        }
        searchFunction()
    }, [filters])

    useEffect(() => {
        //Current deck init
        const completDeck = async () => {
            const currentDeck = false

            return currentDeck
        }
        completDeck()
    }, [currentDeck])
    
    return (
        <DeckBuilderContext.Provider value={{ 
                stateCurrentCards : [
                    currentCards,
                    setCurrentCards
                ],
                stateNextPage : [
                    nextPage,
                    setnextPage
                ],
                stateFilters : [
                    filters,
                    setFilters
                ],
                stateDeck : [
                    currentDeck,
                    setCurrentDeck,
                    addCardInDeck,
                    removeCardInDeck
                ]
            }}>
            {(!loadingData) && props.children}
        </DeckBuilderContext.Provider>
    )
}