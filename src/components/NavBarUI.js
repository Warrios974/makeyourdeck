import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faInbox, faPlus, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ModalContext } from '../contexts/modalContext'
import { Container, Navbar } from 'react-bootstrap'
import style from './NavBarUI.module.css'
import globalStyles from '../utils/styles/global.module.css'

library.add(faHouse, faWandMagicSparkles,faInbox,faPlus)

function NavBarUI() {

  const { toggleModals } = useContext(ModalContext)

  return (
    <Navbar className={`${style.navbar}`}>
      <Container fluid className={`${globalStyles.linkContainer} flex-column`}>
          <Link to="/" className={globalStyles.link}>
            <FontAwesomeIcon icon="fa-solid fa-house" size='lg'/>
          </Link>
          <Link to="/spoiler" className={globalStyles.link}>
            <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" size='lg'/>
          </Link>
          <Link to="/decks" className={globalStyles.link}> 
            <FontAwesomeIcon icon="fa-solid fa-inbox" size='lg'/>
          </Link>
          <Link to="/deck-builder" className={globalStyles.link}>
            <FontAwesomeIcon icon="fa-solid fa-plus" size='lg'/>
          </Link>
      </Container>
    </Navbar>
  )
}

export default NavBarUI