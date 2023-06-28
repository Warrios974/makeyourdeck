import React from 'react'
import NavBarUI from './NavBarUI'
import { Col } from 'react-bootstrap'
import style from './Header.module.css'

function Header() {
  return (
    <Col xs={1} className={`${style.headerContainer} bg-dark d-flex flex-column justify-content-center`}>
      <header>
        <div>
          <NavBarUI />
        </div>
      </header>
    </Col>
  )
}

export default Header