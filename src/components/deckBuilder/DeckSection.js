import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import CommandeZone from './CommandeZone'
import MainDeckZone from './MainDeckZone'
import ReserveZone from './ReserveZone'
import { isCommanderDeck } from '../../utils/functions/mainFunction'
function DeckSection() {

    const { stateDeck } = useContext(DeckBuilderContext)

    const [currentDeck, setCurrentDeck] = stateDeck
    const [isCommander, setIsCommander] = useState()

    useEffect(() => {
        setIsCommander(isCommanderDeck(currentDeck.type))
    }, [])

    return (
        <Row className='mt-3'>
            {isCommander && <CommandeZone />}
            <MainDeckZone />
            {!isCommander && <ReserveZone />}
        </Row>
    )
}

export default DeckSection