import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import style from './BannerDeck.module.css'

library.add(faPen)

function BannerDeck() {
    
    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

    const [currentDeck] = stateDeck

    const handleClick = () => {
      console.log('====');
      console.log('Click');
      console.log('====');
    }
  
    if(currentDeck) return (
    <section className={style.bannerContainer}>
      <img src={currentDeck.image} alt="" />
      <div className={style.bannerInfoContainer}>
        <h1>{currentDeck.name}</h1>
        <span>{currentDeck.type}</span>
        <span>{currentDeck.public ? "Public" : "Pas public"}</span>
      </div>
      <button className={style.btnModifedDeck} onClick={() => handleClick()}><FontAwesomeIcon icon="fa-solid fa-pen" size='lg'/></button>
    </section>
  )
}

export default BannerDeck