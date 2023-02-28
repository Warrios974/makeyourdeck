import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../contexts/modalContext'

library.add(faHouse, faWandMagicSparkles)

function NavBar() {

  const { toggleModals } = useContext(ModalContext)

  return (
    <nav className='header__navbar'>
      <div className='header__navigation'>
        <Link to="/">
          <FontAwesomeIcon icon="fa-solid fa-house" size='lg'/>
        </Link>
        <Link to="/spoiler">
        <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" size='lg'/>
        </Link>
      </div>
      <div className='header__modal'>
          <button onClick={() => toggleModals("signIn")}>
              Se connecter
          </button>
      </div>
    </nav>
  )
}

export default NavBar