import React from 'react'

function Card(props) {

    const { card } = props
      
    const fatoryCard = (layout) => {

      if (layout === 'normal') {
        return (
          <article key={`${card.id}`}>
              <img src={card.image_uris['small']} alt={card.name} />
          </article>
        )
      }

    }

  return fatoryCard(card.layout)
}

export default Card