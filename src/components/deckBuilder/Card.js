import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import style from './Card.module.css'

function Card(props) {
  
  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const { card } = props

  const [ currentDeck, setCurrentDeck, setAddCard, setRemoveCard ] = stateDeck
  const [ currentSelect ] = stateCurrentSelect

  const handleDrapStart = (e, card) => {
    const stringCard = JSON.stringify(card)
    e.dataTransfer.setData("object", stringCard);
  }
      
  const FatoryCard = ({ layout }) => {

    const conditionDoubleFaces = layout === 'transform' || layout === 'modal_dfc' || layout === 'double_faced_token' || layout === 'art_series ' || layout === 'reversible_card '
    const conditionSingleFaces = layout !== 'transform' || layout !== 'modal_dfc' || layout !== 'double_faced_token' || layout !== 'art_series ' || layout !== 'reversible_card '

    if (conditionDoubleFaces) {

      const carddoubleFaces = card.card_faces

      return (
        <Col
        className={style.doubleCardsContainer}>
            { carddoubleFaces.map((element, index) => (
                <img 
                  className='img-fluid img-thumbnail position-absolute'
                  src={element.image_uris['normal']} 
                  key={`${index}-${card.id}-image`} 
                  alt={element.name}
                  loading='lazy'
                  />
                ))
              }
        </Col>
      )
    }

    if (conditionSingleFaces) {
      return (
        <Col
        className={style.singleCardContainer}>
            <img 
              className='img-fluid img-thumbnail'
              src={card.image_uris['normal']} 
              alt={card.name} 
              id={card.id}
              loading='lazy'
              onDragStart={(e) => handleDrapStart(e, card)}
              />
              {card.quantity && <span className={style.cardQuantity}>x{card.quantity}</span>}
        </Col>
      )
    }

  }



  if (card === []) return <div>Loading...</div>
  
  return (
    <article className={`${style.cardContainer}`} >
      <div className={`${style.addOrRemoveLayout}`}>
        <button onClick={() => setAddCard(card)}>Ajouter</button> 
        <button onClick={() => setRemoveCard({card, from: currentSelect})}>supprimer</button>
      </div>
      <FatoryCard 
        layout={card.layout}/>
      <div>
      </div>
    </article>
  )
}

export default Card