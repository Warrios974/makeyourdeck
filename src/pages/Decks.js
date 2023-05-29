import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

library.add(faPlus)

function Decks() {

    const handleClick = () => {
        
    }

    return (
        <div>
            <h1>DeckBuilder</h1>
            <button
            onClick={() => handleClick()}
            >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
                Construire un nouveau deck
            </button>
        </div>
    )
}

export default Decks