import React, { useContext, useEffect } from 'react'
import Carrousel from '../components/deckBuilder/Carrousel'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'
import { DeckBuilderContext } from '../contexts/deckBuilderContext'
import SelectYourDeckType from '../components/forms/SelectYourDeckType/SelectYourDeckType'
import Sidebar from '../components/deckBuilder/Sidebar'
import { Row } from 'react-bootstrap'
import DeckSection from '../components/deckBuilder/DeckSection'

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
            <SearchAndFilterDeckForm />
            <Row>
                <Carrousel />
            </Row>
            <DeckSection />
        </>
    )
}

export default DeckBuilder