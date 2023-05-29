import React from 'react'
import NavBarUI from './NavBarUI'
import { Col } from 'react-bootstrap'

function Header() {
  return (
    <Col xs={1} className='sidebar bg-dark d-flex flex-column justify-content-center' fixed="top">
      <header>
        <div>
          <NavBarUI />
        </div>
      </header>
    </Col>
  )
}

export default Header