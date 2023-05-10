import { createContext, useEffect, useState } from "react";
import { getCardsByColors, initSortCards } from "../api/MagicApi";
import { search, theFilter } from "../search/search";

export const DeckBuilderContext = createContext();

//Composant d'ordre superieur
export function DeckBuilderContextProvider(props) {

    const [loadingData, setLoadingData] = useState(true)

    const [filters, setFilters] = useState(theFilter)

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
        const searchFunction = async () => {
            const fetch = await search(filters)
            const cards = fetch.data ? await initSortCards(fetch.data) : await initSortCards(fetch)
            fetch.data ? setCurrentCards([...cards]) : setCurrentCards([cards])
            return fetch
        }
        searchFunction()
    }, [filters])
    
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
                ]
            }}>
            {(!loadingData) && props.children}
        </DeckBuilderContext.Provider>
    )
}