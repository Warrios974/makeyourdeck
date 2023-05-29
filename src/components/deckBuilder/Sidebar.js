import React, { useContext } from 'react'
import { Button, Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'

function Sidebar() {

  const { stateDeck } = useContext(DeckBuilderContext)

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck
  
  if (currentDeck.cards.mainDeck === [] && currentDeck.cards.mainDeck.length < 0) return <div>Loading...</div>

  const mainDeck = currentDeck.cards.mainDeck

  return (
    <Col sm={3}>
      <aside>
      { mainDeck.map((card) => (
        <Button
          key={`${card.id}`} 
          onClick={() => setRemoveCard(card.id)}
          className='m-2'>
            <span>{card.quantity}x </span>
            <span>{card.name}</span>
        </Button>
        ))
      }
      </aside>
    </Col>
  )
}

export default Sidebar