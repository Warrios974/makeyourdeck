import React, { useContext, useEffect, useState,useRef } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { isCommanderDeck, isDoubleFaceCard } from '../../utils/functions/magicFunction'
import style from './Card.module.css'
import { ModalContext } from '../../contexts/modalContext'
import { Button } from 'react-bootstrap'
import ManaCost from '../ManaCost'

function Card(props) {
  
  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const { stateModal, stateModalData } = useContext(ModalContext)

  const [ cardInfoData, setCardInfoData ] = stateModalData
  const [ modalState, toggleModals ] = stateModal
  const [ currentDeck, setCurrentDeck, setAddCard, setRemoveCard ] = stateDeck
  const [ currentSelect ] = stateCurrentSelect

  const { card, type, top } = props
  
  const isDoubleFace = isDoubleFaceCard(card.layout)
  const [currentCard, setCurrentCard] = useState(0)
  
  const [addListVisible, setAddListVisible] = useState(false)

  let manaCost = ''
  if(card.mana_cost) manaCost =  card.mana_cost
  if(card.card_faces) manaCost = card.card_faces[0].mana_cost

  const handleDrapStart = (e, card) => {
    const stringCard = JSON.stringify(card)
    e.dataTransfer.setData("object", stringCard);
  }

  const handleClickMoreInfo = (card) => {
    setCardInfoData(card)
    toggleModals('cardInfos')
  }

  const handleClickOnAddCard = (card, zone) => {
    setAddCard({ card: card, zone: zone})
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

  const handleChangeListVisibility = (value) => setAddListVisible(value)

  const AddListFactory = () => {

    const deckType = isCommanderDeck(currentDeck.type)

    return (
    <ul>
      <li>
        {deckType && <button
          onClick={() => handleClickOnAddCard(card, 'commander')}
        >Commander</button>}
      </li>
      <li>
        <button
          onClick={() => handleClickOnAddCard(card, 'mainDeck')}
        >Bibliothéque</button>
      </li>
      <li>
        {!deckType && <button
          onClick={() => handleClickOnAddCard(card, 'reserve')}
        >Reserve</button>}
      </li>
    </ul>
    )
  }

  const ActionsCard = () => {

    return (
      <div className={`${style.addOrRemoveLayout}`}>
        <div className={style.btnAddCard}>
          <button onClick={() => handleChangeListVisibility(!addListVisible)}>+</button> 
          {addListVisible && 
            <AddListFactory />
          }
        </div>
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
        <>
          <img 
              className='img-fluid img-thumbnail'
              src={localCards[currentCard].image_uris['normal']} 
              alt={localCards[currentCard].name}
              id={card.id}
              loading='lazy'
            />
        </>
      )
    }

    if (!isDoubleFace) {
      return (
        <>
            <img 
              className='img-fluid img-thumbnail'
              src={card.image_uris['normal']} 
              alt={card.name}
              id={card.id}
              loading='lazy'
              onDragStart={(e) => handleDrapStart}
              />
        </>
      )
    }

  }

  const CardFatory = () => {
    if(type === "preview"){
      return (
        <article 
          className={`${style.singleCardContainer}`} 
          onMouseLeave={() => setAddListVisible(false)}
          >
          <ImageFactory />
          <ActionsCard />
        </article>
      )
    }
    if(type === "classed"){
      return (
        <article 
          className={`${style.cardContainerClassed}`}
          onMouseLeave={() => setAddListVisible(false)}
          style={{top: top && top + 'rem'}} >
          <ImageFactory />
          <ActionsCard />
        </article>
      )
    }
    if(type === "list"){
      return (
        <article className={style.cardContainerListed}>
          <Button
              className='m-2'>
              <span>{card.quantity}x </span>
              <span>{card.name}</span>
              <ManaCost manaCost={manaCost} />
          </Button>
          <ImageFactory />
        </article>
      )
    }
  }
  
  return (
    <CardFatory/>
  )
}

export default Card