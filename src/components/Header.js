import React, { useContext }from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBarUI from './NavBarUI'
import { Link } from 'react-router-dom'
import style from './Header.module.css'
import { ModalContext } from '../contexts/modalContext'
import globalStyles from '../utils/styles/global.module.css'

library.add(faUser)

function Header() {
  const { toggleModals } = useContext(ModalContext)
  return (
    <header className={`${style.headerContainer}`}>
      <div className={`${style.navContainer}`}>
        <div className={`${globalStyles.linkContainer} ${style.linkAccount}`}>
          <Link onClick={() => toggleModals("signIn")} className={`${globalStyles.link}`}>
            <FontAwesomeIcon icon="fa-solid fa-user" />
          </Link>
        </div>
        <NavBarUI />
      </div>
    </header>
  )
}

export default Header