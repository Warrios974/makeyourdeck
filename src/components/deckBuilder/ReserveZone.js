import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import Card from './Card'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'

function ReserveZone() {

  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const [currentSelect, setCurrentSelect] = stateCurrentSelect

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const reserveDeck = currentDeck.cards.reserve !== null && currentDeck.cards.reserve.cards


  const handleClick = () => {
      setCurrentSelect('reserve')
  }

  if(reserveDeck) return (
    <Col md={12} className={currentSelect === 'reserve' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
        <h5>ReserveZone</h5>
          <div>
            {
              reserveDeck.map((card, index) => (
                <Card 
                  key={`${index}-${card.id}`}
                  card={card}
                  type='classed'
                  />
              ))
            }
          </div>
    </Col>
  )
}

export default ReserveZone