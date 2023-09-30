import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import CardSide from './CardSide'
import style from './Sidebar.module.css'
import { ModalContext } from '../../contexts/modalContext'

function Sidebar() {

  const { stateDeck } = useContext(DeckBuilderContext)
  const { stateModal } = useContext(ModalContext)

  const [ modalState, toggleModals ] = stateModal

  const [currentDeck, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

  console.log('====');
  console.log('curren',currentDeck);
  console.log('====');

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

  return (
      <aside 
        className={style.sidebarContainer}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        >
        <div>
          { modalState.sideBarDeck && <button onClick={() => toggleModals('close')} > close </button>}
          { !modalState.sideBarDeck && <button onClick={() => toggleModals('sideBarDeck')} > open </button>}
        </div>
        {
          modalState.sideBarDeck && 
          <div className={style.mainContainer}>
            { (mainDeck.length > 0) && mainDeck.map((card) => (
              card.id && 
                <CardSide
                key={`${card.id}-sidebar`} 
                card={card}/>
              ))
            }
            { mainDeck.length === 0 && <span>Aucune carte dans votre deck</span> }
          </div>
        }
      </aside>
  )
}

export default Sidebar