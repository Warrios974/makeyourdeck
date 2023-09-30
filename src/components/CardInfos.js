import React, { useContext, useRef } from 'react'
import { ModalContext } from '../contexts/modalContext'
import style from './CardInfos.module.css'
import ManaCost from './ManaCost'
import { isDoubleFaceCard, typeCard } from '../utils/functions/magicFunction'

function CardInfos() {

    const { stateModal, stateModalData } = useContext(ModalContext)

    const [ cardInfoData ] = stateModalData
    const [modalState, toggleModals] = stateModal

    const modalElement = useRef()
    
    const cardInfo = cardInfoData && cardInfoData.card ? cardInfoData.card : null
    const layoutCard = cardInfoData && cardInfoData.card.layout ? cardInfoData.card.layout : null

    const SingleCardContainer = () => {
        
        return (
            <div className={style.cardInfosContainer}>
                <div 
                    ref={modalElement}
                    className={style.mainContainer}
                    >
                    <button 
                        className={style.closeBtn}
                        onClick={() => toggleModals('close')}
                    >
                        X
                    </button>
                    <div className={style.header}>
                        <img src={cardInfo.image_uris.art_crop} alt={cardInfo.name} className='' />
                    </div>
                    <div className={style.description}>
                        <div className={style.right}>
                            <img src={cardInfo.image_uris.normal} alt={cardInfo.name} className='' />
                        </div>
                        <div className={style.left}>
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
                    </div>
                </div>
            </div>
            )
    }

    const DoubleFaceCardContainer = () => {

        const cards = cardInfo.card_faces

        return (
            <div className={style.cardInfosContainer}>
                <div 
                    ref={modalElement}
                    className={style.mainContainer}
                    >
                    <button 
                        className={style.closeBtn}
                        onClick={() => toggleModals('close')}
                    >
                        X
                    </button>
                    
                    <div className={style.header}>
                        {
                            cards.map((card, index) => (
                                <img alt='' src={card.image_uris['art_crop']} />
                            ))
                        }
                    </div>
                    {
                        cards.map((card, index) => (
                            <div>
                                <div className={style.description}>
                                    <div className={style.right}>
                                        <img 
                                            src={card.image_uris['normal']} 
                                            alt='' 
                                            key={index}    
                                            />
                                    </div>
                                    <div className={style.left}>
                                        <div className={style.cardInfosHeader}>
                                            <h2>{card.name}</h2>
                                            {/* <ManaCost manaCost={card.mana_cost} /> */}
                                        </div>
                                        <div className={style.cardInfosBody}>
                                            <span>{card.type_line}</span>
                                            <span>{card.oracle_text}</span>
                                            {card.flavor_text && <span>{card.flavor_text}</span>}
                                        </div>
                                        <div className={style.cardInfosFooter}>
                                            {typeCard(card) === 'Creature' &&
                                                <span>{card.power} / {card.toughness}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    if (!cardInfoData) return

    console.log(cardInfo);

    if(modalState.cardInfos) {
        if (isDoubleFaceCard(layoutCard)) {
            return <DoubleFaceCardContainer />
        }else{
            return <SingleCardContainer />
        }
    }
}

export default CardInfos