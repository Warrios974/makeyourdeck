import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../contexts/modalContext'

function NavBar() {

  const { toggleModals } = useContext(ModalContext)

  return (
    <nav className='header__navbar'>
      <div className='header__navigation'>
        <Link to="/">
            Accueil
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