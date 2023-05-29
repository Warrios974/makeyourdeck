import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faInbox, faPlus, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../contexts/modalContext'
import { Container, Nav, Navbar } from 'react-bootstrap'

library.add(faHouse, faWandMagicSparkles,faInbox,faPlus)

function NavBarUI() {

  const { toggleModals } = useContext(ModalContext)

  return (
    <Navbar>
      <Container fluid className='flex-column'>
          <Link to="/">
            <FontAwesomeIcon icon="fa-solid fa-house" size='lg'/>
          </Link>
          <Link to="/spoiler">
            <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" size='lg'/>
          </Link>
          <Link to="/decks"> 
            <FontAwesomeIcon icon="fa-solid fa-inbox" size='lg'/>
          </Link>
          <Link to="/deck-builder">
            <FontAwesomeIcon icon="fa-solid fa-plus" size='lg'/>
          </Link>
          <Nav.Link onClick={() => toggleModals("signIn")} className='text-white'>
              Se connecter
          </Nav.Link>
      </Container>
    </Navbar>
  )
}

export default NavBarUI