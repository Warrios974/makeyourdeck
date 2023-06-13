import React, { useContext } from 'react'
import Card from './Card'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'

library.add(faChevronLeft, faChevronRight)

function Carrousel() {

  const { stateCurrentCards, loadingData } = useContext(DeckBuilderContext)
    
  const [currentCards] = stateCurrentCards

  let rowOne = []

  let rowTwo = []
  
  const seperateCards = () => {

    currentCards.forEach((card, index) => {
      if(index % 2 === 0) {
        rowTwo.push(card)
      } else {
        rowOne.push(card)
      }
    });

    return { rowOne, rowTwo }
  }

  if (currentCards.length === 0 || loadingData) {
    return (
      <Col sm={9}>
        <Row className='overflow-auto' style={{height: "40rem"}}>
          Loading
        </Row>
      </Col>
    )
  }

  if (currentCards[0].object === "error") {
    return (
      <div>
        <h3>
          {currentCards[0].status + currentCards[0].code}
        </h3>
        <p>
          {currentCards[0].details}
        </p>
      </div>
      )
  }

  seperateCards()

  return (
    <Col sm={9} className='overflow-auto'>
      <Row className='d-flex flex-row flex-nowrap'>
        { rowOne.map((card) => (
            <article key={`${card.id}`} className='col-3'>
              <Card 
                card={card}  />
            </article>
          ))
        }
      </Row>
      <Row className='d-flex flex-row flex-nowrap'>
        { rowTwo.map((card) => (
            <article key={`${card.id}`} className='col-3'>
              <Card 
                card={card}  />
            </article>
          ))
        }
      </Row>
    </Col>
  )
}

export default Carrousel 