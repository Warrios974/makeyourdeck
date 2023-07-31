import React, { useContext } from 'react'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { Col } from 'react-bootstrap'
import Card from './Card'

function CommandeZone() {
    

    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

    const [currentSelect, setCurrentSelect] = stateCurrentSelect

    const [currentCards, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

    const commander = currentCards.cards.commander.cards

    const handleClick = () => {
        setCurrentSelect('commander')
    }
    
    //if(commander.type !== null) return <div>Choisi ton commandant</div>
  
    if(commander) return (
        <Col md={2} className={currentSelect === 'commander' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
            <h5>CommandeZone</h5>
            {
                commander.map((card, index) => (
                    <Card 
                      key={`${index}-${card.id}`}
                      card={card}
                      />
                ))
            }
        </Col>
    )
}

export default CommandeZone