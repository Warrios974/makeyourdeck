import React, { useContext, useEffect, useState,useRef } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { isDoubleFaceCard } from '../../utils/functions/magicFunction'
import style from './Card.module.css'
import { ModalContext } from '../../contexts/modalContext'

function Card(props) {
  
  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const { stateModal, stateModalData } = useContext(ModalContext)

  const [ cardInfoData, setCardInfoData ] = stateModalData
  const [ modalState, toggleModals ] = stateModal
  const [ currentDeck, setCurrentDeck, setAddCard, setRemoveCard ] = stateDeck
  const [ currentSelect ] = stateCurrentSelect

  const { card, type, top } = props
  
  const handleDrapStart = (e, card) => {
    const stringCard = JSON.stringify(card)
    e.dataTransfer.setData("object", stringCard);
  }

  const handleClickMoreInfo = (card) => {
    setCardInfoData(card)
    toggleModals('cardInfos')
  }

  const handleClickOnAddCard = (card) => {
    setAddCard(card)
  }

  const handleClickOnRemoveCard = (element) => {
    setRemoveCard(element)
  }

  const ActionsCard = () => {

    return (
      <div className={`${style.addOrRemoveLayout}`}>
        <button onClick={() => handleClickOnAddCard(card)}>+</button> 
        <button onClick={() => handleClickOnRemoveCard({card, from: currentSelect})}>-</button>
        <button onClick={() => handleClickMoreInfo({card})}>i</button>
      </div>
    )
  }

  const ImageFactory = ({ layout }) => {

    if (isDoubleFaceCard(layout)){

      const carddoubleFaces = card.card_faces

      return (
        <Col
        className={style.doubleCardsContainer}
        >
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

    if (!isDoubleFaceCard(layout)) {
      return (
        <Col
        className={`${style.singleCardContainer} ${type === 'classed' ? style.cardClassed : ''}`}
        >
            <img 
              className='img-fluid img-thumbnail'
              src={card.image_uris['normal']} 
              alt={card.name}
              id={card.id}
              loading='lazy'
              onDragStart={(e) => handleDrapStart}
              />
              {card.quantity && <span className={style.cardQuantity}>x{card.quantity}</span>}
              <ActionsCard />
        </Col>
      )
    }

  }

  const CardFatory = () => {
    if(type === "preview"){
      return (
        <article 
          className={`${style.cardContainer}`}>
          <ImageFactory 
            layout={card.layout}
            />
          <div>
          </div>
        </article>
      )
    }
    if(type === "classed"){
      return (
        <article 
          className={`${style.cardContainerClassed}`}
          style={{top: top && top + 'rem'}}
        >
          <ImageFactory 
            layout={card.layout}
            />
          <ActionsCard />
          <div>
          </div>
        </article>
      )
    }
    if(type === "list"){
      return (
        <article 
          className={`${style.cardContainer}`}  >
          <ImageFactory 
            layout={card.layout}/>
          <div>
          </div>
          <ActionsCard />
          <div>
          </div>
        </article>
      )
    }
  }

  if (card === []) return <div>Loading...</div>
  
  return (
    <CardFatory/>
  )
}

export default Card