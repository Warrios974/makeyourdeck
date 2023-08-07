import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getCard } from '../../api/MagicApi'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { isDoubleFaceCard } from '../../utils/functions/mainFunction'
import style from './Card.module.css'

function Card(props) {
  
  const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

  const { card } = props

  const [ currentDeck, setCurrentDeck, setAddCard, setRemoveCard ] = stateDeck
  const [ currentSelect ] = stateCurrentSelect

  // const [allParts, setAllParts] = useState([])

  // useEffect(() => {
  //   const setAllPartsFunction = async () => {
  //     let all_parts = []
  
  //     card.all_parts && card.all_parts.forEach( async (element) => {
  //       const card = await getCard(element.name)
  //       all_parts.push(card)
  //     });
  
  //     setAllParts(all_parts)
  //   }
  //   setAllPartsFunction()
  // })
  
  const handleDrapStart = (e, card) => {
    const stringCard = JSON.stringify(card)
    e.dataTransfer.setData("object", stringCard);
  }

  const FatoryCard = ({ layout }) => {

    if (isDoubleFaceCard(layout)){

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

    if (!isDoubleFaceCard(layout)) {
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

  const AllInfoCard = ({card}) => {

    return (
          <Row className={style.allInfoContainer}>
            <Col className={style.cardName}>{card.name}</Col>
            <Col className={style.cardType}>{card.type_line}</Col>
            <Col className={style.cardCost}>{card.cost}</Col>
          </Row>
        )
  }

  if (card === []) return <div>Loading...</div>
  
  return (
    <article className={`${style.cardContainer}`} >
      <div className={`${style.addOrRemoveLayout}`}>
        <button onClick={() => setAddCard(card)}>Ajouter</button> 
        <button onClick={() => setRemoveCard({card, from: currentSelect})}>supprimer</button>
      </div>
      <AllInfoCard card={card} />
      <FatoryCard 
        layout={card.layout}/>
      <div>
      </div>
    </article>
  )
}

export default Card