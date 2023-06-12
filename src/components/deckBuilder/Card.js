import React, { useContext } from 'react'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { Col } from 'react-bootstrap'

function Card(props) {
  
  const { stateDeck } = useContext(DeckBuilderContext)

  const { card } = props

  const [ currentDeck, setCurrentDeck, setAddCard, setRemoveCard ] = stateDeck
      
    const fatoryCard = (layout) => {

      const conditionDoubleFaces = layout === 'transform' || layout === 'modal_dfc' || layout === 'double_faced_token' || layout === 'art_series ' || layout === 'reversible_card '
      const conditionSingleFaces = layout !== 'transform' || layout !== 'modal_dfc' || layout !== 'double_faced_token' || layout !== 'art_series ' || layout !== 'reversible_card '

      if (conditionDoubleFaces) {

        const carddoubleFaces = card.card_faces

        return (
          <>
              <Col 
              onClick={() => setAddCard(card)}
              className='position-relative'
              key={`${card.id}-container`} 
              >
              { carddoubleFaces.map((element, index) => (
                <img 
                  className='img-fluid img-thumbnail position-absolute'
                  src={element.image_uris['normal']} 
                  alt={element.name}
                  loading='lazy'
                  key={`${index}-${card.id}-image`} 
                  />
                  ))
                }
              </Col>
          </>
        )
      }
      if (conditionSingleFaces) {
        return (
          <>
              <img 
                className='img-fluid img-thumbnail'
                src={card.image_uris['normal']} 
                alt={card.name} 
                id={card.id}
                loading='lazy'
                onClick={() => setAddCard(card)} />
          </>
        )
      }

    }

  if (card === []) return <div>Loading...</div>
  
  return fatoryCard(card.layout)
}

export default Card