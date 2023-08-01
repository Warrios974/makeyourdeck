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

  useEffect(() => {
    const addListener = () => {
      const { current } = carrousel

      if (!current) {
        return
      }

      if (current) {
        current.addEventListener('wheel', function (e) {
          e.preventDefault()
          current.scrollLeft += e.deltaY - 50
        }, { passive: false });
      }
    }
    addListener()
  })

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
      className={`overflow-auto ${style.carrouselContainer}`}
      ref={carrousel}
    >
      <Row
        className={`d-flex flex-row flex-nowrap ${style.ligneContainer}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}>
        {rowOne.map((card) => (
          <Card
            key={`${card.id}`}
            card={card} />
        ))
        }
      </Row>
      <Row
        className={`d-flex flex-row flex-nowrap ${style.ligneContainer}`}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}>

        {rowTwo.map((card) => (
          <Card
            key={`${card.id}`}
            card={card} />
        ))
        }
      </Row>
    </Col>
  )
}

export default Carrousel 