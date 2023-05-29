import React from 'react'
import Card from './Card'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'react-bootstrap'

library.add(faChevronLeft, faChevronRight)

function Carrousel(props) {
    
  const { currentCards, currentDeck, setCurrentDeck } = props

  if (currentCards === []) return <div>Loading...</div>

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

  return (
    <Col sm={9}>
      <Row className='overflow-auto' style={{height: "40rem"}}>
        { currentCards.map((card) => (
            <article key={`${card.id}`} className='col-3'>
              <Card 
                card={card} 
                setCurrentDeck={setCurrentDeck}
                currentDeck={currentDeck} />
            </article>
          ))
        }
      </Row>
    </Col>
  )
}

export default Carrousel 