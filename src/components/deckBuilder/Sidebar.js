import React, { useContext, useState } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import CardSide from './CardSide'
import style from './Sidebar.module.css'
import { ModalContext } from '../../contexts/modalContext'
import Card from './Card'

function Sidebar() {

  const { stateDeck } = useContext(DeckBuilderContext)
  const { stateModal } = useContext(ModalContext)

  const [ modalState, toggleModals ] = stateModal

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault(e)
    let stringData = e.dataTransfer.getData("object");
    const data = JSON.parse(stringData)
    setAddCard(data)
  }

  const mainDeck = currentDeck.cards.mainDeck.cards
  const reserve = currentDeck.cards.reserve === null ? null : currentDeck.cards.reserve.cards
  const commander = currentDeck.cards.commander === null ? null : currentDeck.cards.commander.cards

  const mainDeckCurrentCards = currentDeck.cards.mainDeck.currentTotalCards
  const reserveCurrentCards = reserve ? currentDeck.cards.reserve.currentTotalCards : null

  const mainDeckTotalCards = currentDeck.cards.mainDeck.total
  const reserveTotalCards = reserve ? currentDeck.cards.reserve.total : null

  return (
      <aside 
        className={`${style.sidebarContainer} ${modalState.sideBarDeck ? style.open : style.close}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        >
        <div>
          { modalState.sideBarDeck && <button onClick={() => toggleModals('close')} > close </button>}
          { !modalState.sideBarDeck && <button onClick={() => toggleModals('sideBarDeck')} > open </button>}
        </div>
          <div className={`${style.mainContainer}`}>
            {commander !== null && <div className={style.cardsContainer}>
              <h3>Commander zone</h3>
              { (commander.length > 0) && commander.map((card) => (
                card.id && 
                  <Card
                  key={`${card.id}-sidebar`} 
                  type='list'
                  card={card}/>
                ))
              }
              { commander.length === 0 && <span>Aucune carte de commander</span> }
            </div>}
            
            <div className={style.cardsContainer}>
              <h3>Main deck zone { mainDeckCurrentCards !== null  && <span>{mainDeckCurrentCards + "/" + mainDeckTotalCards}</span> }</h3>
              { (mainDeck.length > 0) && mainDeck.map((card) => (
                card.id && 
                  <Card
                  key={`${card.id}-sidebar`} 
                  type='list'
                  card={card}/>
                ))
              }
              { mainDeck.length === 0 && <span>Aucune carte dans votre deck</span> }
            </div>

            {reserve !== null && <div className={style.cardsContainer}>
              <h3>Reserve zone { reserveCurrentCards !== null && <span>{reserveCurrentCards}/{reserveTotalCards}</span> }</h3>
              { (reserve.length > 0) && reserve.map((card) => (
                card.id && 
                  <Card
                  key={`${card.id}-sidebar`} 
                  type='list'
                  card={card}/>
                ))
              }
              { reserve.length === 0 && <span>Aucune carte dans votre reserve</span> }
            </div>}
          </div>
          
      </aside>
  )
}

export default Sidebar