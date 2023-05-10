import React from 'react'
import Card from './Card'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faChevronLeft, faChevronRight)

function Carrousel(props) {
    
  const { currentCards } = props

  if (currentCards === []) return <div>Loading...</div>

  return (
    <div className='carrousel'>
      <FontAwesomeIcon 
        className='carrousel__arrow carrousel__arrow--left'
        icon="fa-solid fa-chevron-left" />
      { currentCards.slice(0, 10).map((card) => (
          <article key={`${card.id}`} className='card'>
            <Card card={card}/>
          </article>
        ))
      }
      <FontAwesomeIcon
        className='carrousel__arrow carrousel__arrow--right' 
        icon="fa-solid fa-chevron-right" />
    </div>
  )
}

export default Carrousel 