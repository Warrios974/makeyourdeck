import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import ManaCost from '../ManaCost'

function CardSide({ card }) {

    const { stateDeck } = useContext(DeckBuilderContext)

    const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

    const manaCost = card.mana_cost ? card.mana_cost : card.card_faces[0].mana_cost

  return (
    <Button
        className='m-2'>
        <span>{card.quantity}x </span>
        <span>{card.name}</span>
        <ManaCost manaCost={manaCost} />
    </Button>
  )
}

export default CardSide