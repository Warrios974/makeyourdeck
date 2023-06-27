import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import CardSide from './CardSide'

function Sidebar() {

  const { stateDeck } = useContext(DeckBuilderContext)

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault(e)
    let stringData = e.dataTransfer.getData("object");
    const data = JSON.parse(stringData)
    setAddCard(data)
  }
  
  if (currentDeck.cards.mainDeck.length <= 1) return (
    <Col sm={3}>
      <aside
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}>
        Aucune carte dans votre deck
      </aside>
    </Col>
    )

  const mainDeck = currentDeck.cards.mainDeck
  
  return (
    <Col sm={3}>
      <aside 
        className='d-flex flex-column'
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        >
      { mainDeck.map((card) => (
        card.id && 
          <CardSide
          key={`${card.id}`} 
          card={card}/>
        ))
      }
      </aside>
    </Col>
  )
}

export default Sidebar