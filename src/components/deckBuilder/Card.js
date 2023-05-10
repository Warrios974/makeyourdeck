import React from 'react'

function Card(props) {

    const { card } = props
      
    const fatoryCard = (layout) => {

      const conditionDoubleFaces = layout === 'transform' || layout === 'modal_dfc' || layout === 'double_faced_token' || layout === 'art_series ' || layout === 'reversible_card '
      const conditionSingleFaces = layout !== 'transform' || layout !== 'modal_dfc' || layout !== 'double_faced_token' || layout !== 'art_series ' || layout !== 'reversible_card '

      if (conditionDoubleFaces) {

        const carddoubleFaces = card.card_faces

        return (
          <div className='card__doubleFaces'>
            { carddoubleFaces.map((card) => (
                <img src={card.image_uris['normal']} alt={card.name} key={`${card.name}`}  />
              ))
            }
          </div>
        )
      }
      if (conditionSingleFaces) {
        return (
          <>
              <img src={card.image_uris['normal']} alt={card.name} />
          </>
        )
      }

    }

  return fatoryCard(card.layout)
}

export default Card