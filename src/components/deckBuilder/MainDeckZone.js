import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { sortByCost } from '../../utils/functions/mainFunction'
import Card from './Card'
import style from './MainDeck.module.css'

function MainDeckZone() {

  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const [currentSelect, setCurrentSelect] = stateCurrentSelect

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const mainDeck = currentDeck.cards.mainDeck.cards

  const sortDeck = sortByCost(mainDeck)

  const handleClick = () => {
    setCurrentSelect('mainDeck')
  }

  if (mainDeck) return (
    <Col md={12} className={currentSelect === 'mainDeck' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
      <h5>MainDeckZone</h5>
      {<div className={style.mainDeckContainer}>
        {
          sortDeck.map((list, index) => (
            list.cards.length > 0 && <div
              key={`${index}-colum`}
            >
              <h3>{list.columnName}</h3>
              {
                list.cards.length > 0 && list.cards.map((card, index) => (
                  <Card
                    key={`${index}-${card.id}`}
                    card={card}
                  />
                ))
              }
            </div>
          ))
        }
      </div>}
    </Col>
  )
}

export default MainDeckZone