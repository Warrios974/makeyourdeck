import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import { DeckBuilderContext } from '../../contexts/deckBuilderContext'
import { sortByType } from '../../utils/functions/magicFunction'
import Card from './Card'

function CommandeZone() {
    

    const { stateCurrentCards, stateNextPage, stateFilters, stateDeck, stateCurrentSelect } = useContext(DeckBuilderContext)

    const [currentSelect, setCurrentSelect] = stateCurrentSelect

    const [currentCards, setCurrentDeck, setAddCard, setRemoveCard] = stateDeck

    const commanderCards = currentCards.cards.commander.cards

    const handleClick = () => {
        setCurrentSelect('commander')
    }

    const sortCards = sortByType(commanderCards)

    console.log('====');
    console.log('sortCards',sortCards);
    console.log('====');
    
    //if(commander.type !== null) return <div>Choisi ton commandant</div>
  
    if(commanderCards) return (
        <Col md={2} className={currentSelect === 'commander' ? 'border border-dark text-center' : 'text-center'} onClick={() => handleClick()}>
            <h5>CommandeZone</h5>
            {
                sortCards.map((card, index) => (
                    <Card 
                      key={`${index}-${card.id}`}
                      type='preview'
                      card={card}
                      />
                ))
            }
        </Col>
    )
}

export default CommandeZone