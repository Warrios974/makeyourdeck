import React, { useContext, useEffect, useRef, useState } from 'react'
import { ModalContext } from '../contexts/modalContext'
import style from './CardInfos.module.css'
import ManaCost from './ManaCost'
import { isDoubleFaceCard, typeCard } from '../utils/functions/magicFunction'
import { isInViewport } from '../utils/functions/mainFunction'

function CardInfos() {

    const { stateModal, stateModalData } = useContext(ModalContext)

    const [ cardInfoData ] = stateModalData

    const modalElement = useRef()

    const SingleCardContainer = () => {
        
        return (
            <div 
                ref={modalElement}
                className={style.cardInfosContainer}
                >
                <div className={style.rightPart}>
                    <img src={cardInfo.image_uris.art_crop} alt={cardInfo.name} className='' />
                </div>
                <div className={style.leftPart}>
                    <div className={style.cardInfosHeader}>
                        <h2>{cardInfo.name}</h2>
                        <ManaCost manaCost={cardInfo.mana_cost} />
                    </div>
                    <div className={style.cardInfosBody}>
                        <span>{cardInfo.set_name}</span>
                        <span>{cardInfo.type_line}</span>
                        <span>{cardInfo.oracle_text}</span>
                        <span>{cardInfo.flavor_text}</span>
                    </div>
                    <div className={style.cardInfosFooter}>
                        {typeCard(cardInfo) === 'Creature' &&
                            <span>{cardInfo.power} / {cardInfo.toughness}</span>
                        }
                    </div>
                </div>
            </div>)
    }

    const DoubleFaceCardContainer = () => {
        return (
            <div 
            className={style.cardInfosContainer}
            >double</div>
        )
    }

    if (!cardInfoData) return

    const [modalState, toggleModals] = stateModal

    const cardInfo = cardInfoData && cardInfoData.card ? cardInfoData.card : undefined
    const layoutCard = cardInfoData && cardInfoData.card.layout ? cardInfoData.card.layout : undefined

    if(modalState.cardInfos) {
        if (isDoubleFaceCard(layoutCard)) {
            return <DoubleFaceCardContainer />
        }else{
            return <SingleCardContainer />
        }
    }
}

export default CardInfos