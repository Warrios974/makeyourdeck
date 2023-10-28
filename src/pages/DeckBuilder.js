import React, { useContext, useEffect } from 'react'
import BannerDeck from '../components/deckBuilder/BannerDeck'
import Carrousel from '../components/deckBuilder/Carrousel'
import DeckSection from '../components/deckBuilder/DeckSection'
import Sidebar from '../components/deckBuilder/Sidebar'
import SelectYourDeckType from '../components/forms/SelectYourDeckType/SelectYourDeckType'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'
import { DeckBuilderContext } from '../contexts/deckBuilderContext'

function DeckBuilder() {
    
    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)
  
    const [currentSelect, setCurrentSelect] = stateCurrentSelect

    const [currentCards] = stateCurrentCards
    const [currentDeck] = stateDeck

    if (currentCards === []) return <main className='main'>Loading...</main>

    if (!currentDeck.isInit && currentDeck.type === null) return (
        <>
            <SelectYourDeckType />
        </>
    )

    return (
        <>
            <BannerDeck />
            <SearchAndFilterDeckForm />
            <Carrousel />
            <DeckSection />
            <Sidebar />
        </>
    )
}

export default DeckBuilder