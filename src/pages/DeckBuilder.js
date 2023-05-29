import React, { createContext, useContext, useEffect, useState } from 'react'
import Carrousel from '../components/deckBuilder/Carrousel'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'
import { DeckBuilderContext } from '../contexts/deckBuilderContext'
import SelectYourDeckType from '../components/forms/SelectYourDeckType/SelectYourDeckType'
import Sidebar from '../components/deckBuilder/Sidebar'
import { Col, Row } from 'react-bootstrap'

function DeckBuilder() {
    
    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck  } = useContext(DeckBuilderContext)
  
    const [currentCards, setCurrentCards] = stateCurrentCards
    const [nextPage, setNextPage] = stateNextPage
    const [filters , setFilters] = stateFilters
    const [currentDeck , setCurrentDeck] = stateDeck

    if (currentCards === []) return <main className='main'>Loading...</main>

    return (
        <div>
            <SelectYourDeckType 
                currentDeck={currentDeck}
                setCurrentDeck={setCurrentDeck}
                filters={filters}
                setFilters={setFilters}
            />
            <SearchAndFilterDeckForm 
                setCurrentCards={setCurrentCards}
                filters={filters}
                setFilters={setFilters}
                />
            <h2>Carrousel</h2>
            <Row>
                <Carrousel
                    nextPage={nextPage}
                    currentCards={currentCards}
                    currentDeck={currentDeck}
                    setCurrentDeck={setCurrentDeck} />
                <Sidebar 
                    currentDeck={currentDeck}
                />
            </Row>
        </div>
    )
}

export default DeckBuilder