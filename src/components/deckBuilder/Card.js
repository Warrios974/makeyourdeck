import React from 'react'
import { UrlAPI, getCards } from '../../api/MagicApi'

function Card(props) {

    const { card, currentDeck, setCurrentDeck } = props

    const addCardInDeck = async (id) => {

      const URL = UrlAPI + `/cards/${id}`

      const fetch = await getCards(URL)

      let localDeck = JSON.parse(JSON.stringify(currentDeck))

      localDeck.cards.mainDeck.push(fetch)

      setCurrentDeck(localDeck)

      console.log('====');
      console.log('currentDeck',currentDeck);
      console.log('localDeck',localDeck);
      console.log('====');
      
    }
      
    const fatoryCard = (layout) => {

      const conditionDoubleFaces = layout === 'transform' || layout === 'modal_dfc' || layout === 'double_faced_token' || layout === 'art_series ' || layout === 'reversible_card '
      const conditionSingleFaces = layout !== 'transform' || layout !== 'modal_dfc' || layout !== 'double_faced_token' || layout !== 'art_series ' || layout !== 'reversible_card '

      if (conditionDoubleFaces) {

        const carddoubleFaces = card.card_faces

        return (
          <>
            { carddoubleFaces.map((card) => (
                <img 
                  className='img-fluid img-thumbnail'
                  src={card.image_uris['normal']} 
                  alt={card.name} 
                  key={`${card.name}`} 
                  id={card.id} 
                  loading='lazy'
                  onClick={() => addCardInDeck(card.id)}/>
              ))
            }
          </>
        )
      }
      if (conditionSingleFaces) {
        return (
          <>
              <img 
                className='img-fluid img-thumbnail'
                src={card.image_uris['normal']} 
                alt={card.name} 
                id={card.id}
                loading='lazy'
                onClick={() => addCardInDeck(card.id)} />
          </>
        )
      }

    }

  if (card === []) return <div>Loading...</div>
  
  return fatoryCard(card.layout)
}

export default Card