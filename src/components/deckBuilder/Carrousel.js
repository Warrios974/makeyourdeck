import React from 'react'
import Card from './Card'

function Carrousel(props) {
    
  const { currentCards } = props

  if (currentCards === []) return <div>Loading...</div>

  console.log('====');
  console.log('currentCards',currentCards);
  console.log('====');

  return (
    <div>
      <h2>Carrousel</h2>
      { currentCards.slice(0, 5).map((card) => (
          <div key={ card.id }>
              <Card
              card={card}/>
          </div>
        ))
      }
    </div>
  )
}

export default Carrousel 