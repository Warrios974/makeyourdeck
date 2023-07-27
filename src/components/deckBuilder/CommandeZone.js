import React, { useContext } from 'react'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { Col } from 'react-bootstrap'

function CommandeZone() {
    
    const { stateDeck } = useContext(DeckBuilderContext)

    const [currentCards, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

    const commander = currentCards.cards.commander.cards
    
    //if(commander.type !== null) return <div>Choisi ton commandant</div>
  
    if(commander) return (
        <Col md={2} className='text-center'>
            <h5>CommandeZone</h5>
            {
                commander.map((card, index) => (
                    <div key={index}>
                        <img src={card.image_uris.normal} alt='' width={'100%'} onClick={() => setRemoveCard({card, from: "commander"})}/>
                    </div>
                ))
            }
        </Col>
    )
}

export default CommandeZone