import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { sortByCost } from '../../utils/functions/magicFunction'
import Card from './Card'
import style from './MainDeck.module.css'

function MainDecktype() {

  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const [currentSelect, setCurrentSelect] = stateCurrentSelect

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const mainDeck = currentDeck.cards.mainDeck.cards

  const sortDeck = sortByCost(mainDeck)

  const top = 0

  const handleClick = () => {
    setCurrentSelect('mainDeck')
  }

  if (mainDeck) return (
    <Col md={12} className={`${currentSelect === 'mainDeck' ? 'border border-dark text-center' : 'text-center'} ${style.mainDeckContainer}`} onClick={() => handleClick()}>
      <h5>MainDecktype</h5>
      {<div className={style.mainDeck}>
        {
          sortDeck.map((list, index) => (
            list.cards.length > 0 && <div
              key={`${index}-colum`}
              className={style.column}
              style={{height: 23 + (index * 4) + 'rem'}}
            >
              <h3>{list.columnName}</h3>
              {
                list.cards.length > 0 && list.cards.map((card, index) => (
                  <Card
                    key={`${index}-${card.id}`}
                    card={card}
                    type='classed'
                    top={index * 4}
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

export default MainDecktype