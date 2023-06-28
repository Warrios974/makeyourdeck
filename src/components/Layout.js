import React from 'react'
import { Row } from 'react-bootstrap'
import Header from './Header'
import SignInModal from './SignInModal'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import DeckBuilder from '../pages/DeckBuilder'
import Decks from '../pages/Decks'
import style from './Layout.module.css'

function Layout() {
  return (
    <Row className='justify-content-center'>
      <Header />
      <main className={`${style.mainContainer} col-9 position-relative`}>
        <SignInModal />
        <section className="col mx-4 my-5">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/decks" element={ <Decks /> } />
            <Route path="/deck-builder" element={ <DeckBuilder /> } />
          </Routes>
        </section>
      </main>
    </Row>
  )
}

export default Layout