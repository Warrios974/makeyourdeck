import React, { useContext } from 'react'
import Carrousel from '../components/deckBuilder/Carrousel'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'
import { DeckBuilderContext } from '../contexts/deckBuilderContext'
import SelectYourDeckType from '../components/forms/SelectYourDeckType/SelectYourDeckType'
import Sidebar from '../components/deckBuilder/Sidebar'
import { Row } from 'react-bootstrap'

function DeckBuilder() {
    
    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck  } = useContext(DeckBuilderContext)
  
    const [currentCards] = stateCurrentCards
    const [currentDeck] = stateDeck

    if (currentCards === []) return <main className='main'>Loading...</main>

    return (
        <>
            <SelectYourDeckType />
            <SearchAndFilterDeckForm />
            <h2>Carrousel</h2>
            <Row>
                <Carrousel />
                <Sidebar 
                    currentDeck={currentDeck}
                />
            </Row>
        </>
    )
}

export default DeckBuilder