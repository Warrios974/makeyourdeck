import { createContext, useEffect, useState } from "react";
import { initSortCards } from "../api/MagicApi";
import { search, theFilter } from "../search/search";
import { deckBuild, theDeck } from "../search/deck";

export const DeckBuilderContext = createContext();

//Composant d'ordre superieur
export function DeckBuilderContextProvider(props) {

    const [loadingData, setLoadingData] = useState(true)

    const [filters, setFilters] = useState(theFilter)

    const [currentDeck, setCurrentDeck] = useState(theDeck)
    const [addCard, setAddCard] = useState('')
    const [removeCard, setRemoveCard] = useState('')

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
            setCurrentCards([])
            const fetch = await search(filters)
            const cards = fetch.data ? await initSortCards(fetch.data) : await initSortCards(fetch)
            fetch.data ? setCurrentCards([...cards]) : setCurrentCards([cards])
            return fetch
        }
        searchFunction()
    }, [filters])

    useEffect(() => {
        //Current deck init
        const addCardInDeck = async () => {
            setLoadingData(true)
            const init = await deckBuild(currentDeck)
            const newDeck = await init.addCard(addCard)
            setCurrentDeck(newDeck)
            setAddCard()
            setLoadingData(false)
            return newDeck
        }
        addCardInDeck()
    }, [addCard])

    useEffect(() => {
        const removeCardInDeck = async () => {
            const init = await deckBuild(currentDeck)
            const newDeck = await init.removeCard(removeCard)
            setCurrentDeck(newDeck)
            setRemoveCard()
        }
        removeCardInDeck()
    }, [removeCard])
    
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
                    setAddCard,
                    setRemoveCard
                ],
                loadingData,
                setLoadingData
            }}>
            {(!loadingData) && props.children}
        </DeckBuilderContext.Provider>
    )
}