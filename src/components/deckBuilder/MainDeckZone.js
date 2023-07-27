import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import Card from './Card'

function MainDeckZone() {

  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const [currentSelect, setCurrentSelect] = stateCurrentSelect

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const mainDeck = currentDeck.cards.mainDeck.cards

  const handleClick = () => {
      setCurrentSelect('mainDeck')
  }

  if(mainDeck) return (
    <Col md={8} className={currentSelect === 'mainDeck' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
        <h5>MainDeckZone</h5>
          <div>
            {
              mainDeck.map((card, index) => (
                <Card 
                  key={`${index}-${card.id}`}
                  card={card}
                  />
              ))
            }
          </div>
    </Col>
  )
}

export default MainDeckZone