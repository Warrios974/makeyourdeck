import React from 'react'
import Header from './Header'
import SignInModal from './SignInModal'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import DeckBuilder from '../pages/DeckBuilder'
import Decks from '../pages/Decks'
import style from './Layout.module.css'
import CardInfos from './CardInfos'

function Layout() {
  return (
      <main className={style.mainContainer}>
        <Header />
        <SignInModal />
        <section className={style.mainSection}>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/decks" element={ <Decks /> } />
            <Route path="/deck-builder" element={ <DeckBuilder /> } />
          </Routes>
          <CardInfos />
        </section>
      </main>
  )
}

export default Layout