import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import Card from './Card'
import style from './Carrousel.module.css'

library.add(faChevronLeft, faChevronRight)

function Carrousel() {

  const { stateCurrentCards, loadingData } = useContext(DeckBuilderContext)

  const [currentCards] = stateCurrentCards

  const carrousel = useRef()

  let rowOne = []

  let rowTwo = []

  useEffect(() => {
  }, [currentCards])

  const handleScrollCarousel = (e) => {
    e.preventDefault()
    console.log('====');
    console.log('variable','scrol');
    console.log('====');
  }

  const seperateCards = () => {

    currentCards.forEach((card, index) => {
      if (index % 2 === 0) {
        rowTwo.push(card)
      } else {
        rowOne.push(card)
      }
    });

    return { rowOne, rowTwo }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
  }

  if (currentCards.length === 0 || loadingData) {
    return (
      <Col sm={12}>
        <Row className='overflow-auto' style={{ height: "40rem" }}>
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
    <Col
      sm={12}
      className={`${style.carrouselContainer}`}
      onScroll={(e) => handleScrollCarousel(e)}
      ref={carrousel}
    >
      <Col
        className={`d-flex flex-nowrap ${style.ligneContainer}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}>
        {rowOne.map((card) => (
          <Card
            key={`${card.id}`}
            card={card}
            type='preview' />
        ))
        }
      </Col>
      <Col
        className={`d-flex flex-nowrap ${style.ligneContainer}`}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}>

        {rowTwo.map((card) => (
          <Card
            key={`${card.id}`}
            card={card}
            type='preview' />
        ))
        }
      </Col>
      <div>
        Use Shift
      </div>
    </Col>
  )
}

export default Carrousel 