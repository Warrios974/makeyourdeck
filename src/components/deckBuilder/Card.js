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
  
  const isDoubleFace = isDoubleFaceCard(card.layout)
  const carddoubleFaces = card.card_faces ? card.card_faces : []
  const [currentCard, setCurrentCard] = useState(0)

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

  const handleClickTurnCard = () => {
    if (currentCard === 0) {
      setCurrentCard(1)
    } 
    if (currentCard === 1) {
      setCurrentCard(0)
    } 
  }

  const ActionsCard = () => {

    return (
      <div className={`${style.addOrRemoveLayout}`}>
        <button onClick={() => handleClickOnAddCard(card)}>+</button> 
        <button onClick={() => handleClickOnRemoveCard({card, from: currentSelect})}>-</button>
        <button onClick={() => handleClickMoreInfo({card})}>i</button>
        {
          isDoubleFace && <button onClick={() => handleClickTurnCard()}>T</button>
        }
      </div>
    )
  }

  const ImageFactory = () => {

    if (isDoubleFace){

      const localCards = JSON.parse(JSON.stringify(card.card_faces))

      return (
        <Col
        className={style.singleCardContainer}
        >
          <img 
              className='img-fluid img-thumbnail'
              src={localCards[currentCard].image_uris['normal']} 
              alt={localCards[currentCard].name}
              id={card.id}
              loading='lazy'
            />
            <ActionsCard />
        </Col>
      )
    }

    if (!isDoubleFace) {
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
          <ImageFactory />
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
          <ImageFactory />
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
          <ImageFactory />
          <div>
          </div>
          <ActionsCard />
          <div>
          </div>
        </article>
      )
    }
  }
  
  return (
    <CardFatory/>
  )
}

export default Card