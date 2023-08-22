import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import ManaCost from '../ManaCost'

function CardSide({ card }) {

    const { stateDeck } = useContext(DeckBuilderContext)

    const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  return (
    <div>
    <Button
        onClick={() => setRemoveCard(card)}
        className='m-2'>
        
        <span>{card.quantity}x </span>
        <span>{card.name}</span>
        <ManaCost manaCost={card.mana_cost} />

    </Button>
    </div>
  )
}

export default CardSide