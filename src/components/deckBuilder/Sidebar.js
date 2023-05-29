import React from 'react'
import { Col } from 'react-bootstrap'

function Sidebar(props) {

  const { currentDeck } = props
  
  if (currentDeck.cards.mainDeck === [] && currentDeck.cards.mainDeck.length < 0) return <div>Loading...</div>

  const mainDeck = currentDeck.cards.mainDeck

  return (
    <Col sm={3}>
      <aside>
      { mainDeck.map((card) => (
          <article key={`${card.id}`}>
            <span>{card.name}</span>
          </article>
        ))
      }
      </aside>
    </Col>
  )
}

export default Sidebar