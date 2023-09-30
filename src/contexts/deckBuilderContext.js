import { createContext, useEffect, useState } from "react";
import { getAutocomplete, getCard, initSortCards } from "../api/MagicApi";
import { search, theFilter } from "../search/search";
import { deckBuild, theDeck } from "../search/deck";
import { sortByColors } from "../utils/functions/magicFunction";

export const DeckBuilderContext = createContext();

//Composant d'ordre superieur
export function DeckBuilderContextProvider(props) {

    const [loadingData, setLoadingData] = useState(true)

    const [filters, setFilters] = useState(theFilter)

    const [currentDeck, setCurrentDeck] = useState(theDeck)
    const [addCard, setAddCard] = useState()
    const [removeCard, setRemoveCard] = useState('')

    const [currentCards, setCurrentCards] = useState([])
    const [nextPage, setnextPage] = useState()
    const [currentSelect, setCurrentSelect] = useState('mainDeck')

    const getAutocompleteList = async (value) => {
  
      if ((value.length >= 2 || value.length === 0)) {
  
        const data = await getAutocomplete(value)
    
        const list = data.data
    
        return list
    
      }

      return []
    }

    const getSingleCard = async (value) => {
  
        const data = await getCard(value)

        return data
    }

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
            const filterColor = fetch.data ? await initSortCards(fetch.data) : await initSortCards(fetch)
            const cards = await sortByColors(filterColor) 
            fetch.data ? setCurrentCards([...cards]) : setCurrentCards([cards])
            return fetch
        }
        searchFunction()
    }, [filters])

    useEffect(() => {
        //Current deck init
        const addCardInDeck = async () => {
            if (addCard) {
                setLoadingData(true)
                const init = deckBuild(currentDeck)
                const newDeck = init.addCard(addCard, currentSelect)
                setCurrentDeck(newDeck)
                setAddCard()
                setLoadingData(false)
                
                return newDeck
            }
        }
        addCardInDeck()
    }, [addCard])

    useEffect(() => {
        const removeCardInDeck = async () => {
            if (removeCard) {
                const init = await deckBuild(currentDeck)
                const newDeck = await init.removeCard(removeCard.card, removeCard.from)
                setCurrentDeck(newDeck)
                setRemoveCard()
            }
        }
        removeCardInDeck()
    }, [removeCard])

    useEffect(() => {
        const changeFilter = async () => {
            
        }
        changeFilter()
    }, [currentSelect])
    
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
                stateCurrentSelect : [
                    currentSelect,
                    setCurrentSelect,
                ],
                loadingData,
                setLoadingData,
                getAutocompleteList,
                getSingleCard
                
            }}>
            {(!loadingData) && props.children}
        </DeckBuilderContext.Provider>
    )
}