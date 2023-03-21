import React, { useEffect, useState } from 'react'
import { getCardsByColors } from '../api/MagicApi'
import Carrousel from '../components/deckBuilder/Carrousel'
import SearchAndFilterDeckForm from '../components/forms/searchAndFilterForm/SearchAndFilterDeckForm'

function DeckBuilder() {

    const [currentCards, setCurrentCards] = useState([])
    const [nextPage, setnextPage] = useState()

    useEffect(() => {
        const initCards = async () => {
            const cards = await getCardsByColors('white')
            setCurrentCards([...cards.data])
            setnextPage(cards.next_page)
            return cards
        }
        initCards()
    }, [])
    
    if (currentCards === []) return <main className='main'>Loading...</main>

    return (
        <main className='main'>
            <SearchAndFilterDeckForm 
                setCurrentCards={setCurrentCards}/>
            <Carrousel
                nextPage={nextPage}
                currentCards={currentCards} />
        </main>
    )
}

export default DeckBuilder