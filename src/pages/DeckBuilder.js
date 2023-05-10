import React, { createContext, useContext, useEffect, useState } from 'react'
import Carrousel from '../components/deckBuilder/Carrousel'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'
import { DeckBuilderContext } from '../contexts/deckBuilderContext'
import SelectYourDeckType from '../components/forms/SelectYourDeckType/SelectYourDeckType'

function DeckBuilder() {
    
    const { stateCurrentCards, stateNextPage, stateFilters  } = useContext(DeckBuilderContext)
  
    const [currentCards, setCurrentCards] = stateCurrentCards
    const [nextPage, setNextPage] = stateNextPage
    const [filters , setFilters] = stateFilters

    if (currentCards === []) return <main className='main'>Loading...</main>

    return (
        <main className='main'>
            <SelectYourDeckType />
            <SearchAndFilterDeckForm 
                setCurrentCards={setCurrentCards}
                filters={filters}
                />
            <h2>Carrousel</h2>
            <Carrousel
                nextPage={nextPage}
                currentCards={currentCards} />
        </main>
    )
}

export default DeckBuilder