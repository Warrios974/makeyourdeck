import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import CardSide from './CardSide'

function Sidebar() {

  const { stateDeck } = useContext(DeckBuilderContext)

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck
  
  const mainDeck = currentDeck.cards.mainDeck
  const reserve = currentDeck.cards.reserve
  
  return (
    <Col sm={3}>
      <aside className='d-flex flex-column'>
      { mainDeck.length > 1 && mainDeck.map((card) => (
        card.id && 
          <CardSide
          key={`${card.id}`} 
          card={card}/>
        ))
      }
      {
        mainDeck.length <= 1 && <span>No cards in your deck</span>
      }
      </aside>
      <aside>
      { reserve.length > 1 && mainDeck.map((card) => (
        card.id && 
          <CardSide
          key={`${card.id}`} 
          card={card}/>
        ))
      }
      {
        reserve.length <= 1 && <span>No cards in your reserve</span>
      }
      </aside>
    </Col>
  )
}

export default Sidebar