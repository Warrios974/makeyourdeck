import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import Card from './Card'
import { sortByCost } from '../../utils/functions/mainFunction'

function MainDeckZone() {

  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const [currentSelect, setCurrentSelect] = stateCurrentSelect

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const mainDeck = currentDeck.cards.mainDeck.cards

  const sortDeck = sortByCost(mainDeck)

  const handleClick = () => {
      setCurrentSelect('mainDeck')
  }

  if(mainDeck) return (
    <Col md={8} className={currentSelect === 'mainDeck' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
        <h5>MainDeckZone</h5>
        {<Row>
            {
              sortDeck.map((list, index) => (
                <Col 
                  md={3}
                  key={`${index}-colum`}
                  >
                  {
                    list.length > 0 && list.map((card, index) => (
                      <Card 
                        key={`${index}-${card.id}`}
                        card={card}
                        />
                    ))
                  }
                </Col>
              ))
            }
        </Row>}
    </Col>
  )
}

export default MainDeckZone