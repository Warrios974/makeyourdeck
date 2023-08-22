import React, { useContext } from 'react'
import { ModalContext } from '../contexts/modalContext'
import style from './CardInfos.module.css'
import ManaCost from './ManaCost'
import { typeCard } from '../utils/functions/mainFunction'

function CardInfos() {

    const { stateModal, stateModalData } = useContext(ModalContext)

    const [ cardInfoData, setCardInfoData ] = stateModalData
    const [modalState, toggleModals] = stateModal

    console.log('====');
    console.log('card',cardInfoData);
    console.log('====');

    if(modalState.cardInfos) return (
    <div className={style.cardInfosContainer}
        onClick={() => toggleModals('close')}>
        <div className={style.cardInfosMain}>
            <button className={style.closeBtn} onClick={() => toggleModals('close')}>
                X
            </button>
            <div>
                <div className={style.cardInfosHeader}>
                    <h2>{cardInfoData.name}</h2>
                    <ManaCost manaCost={cardInfoData.mana_cost} />
                </div>
                <div className={style.cardInfosImage}>
                <img src={cardInfoData.image_uris.art_crop} alt={cardInfoData.name} className='' />
                </div>
                <div className={style.cardInfosBody}>
                    <span>{cardInfoData.set_name}</span>
                    <span>{cardInfoData.type_line}</span>
                    <span>{cardInfoData.oracle_text}</span>
                    <span>{cardInfoData.flavor_text}</span>
                </div>
                <div className={style.cardInfosFooter}>
                    {typeCard(cardInfoData) === 'Creature' &&
                        <span>{cardInfoData.power} / {cardInfoData.toughness}</span>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardInfos