import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Header from "./components/Header";
import SignInModal from './components/SignInModal'
import DeckBuilder from "./pages/DeckBuilder";
import Decks from "./pages/Decks";

function App() {
  return (
    <>
      <Header />
      <SignInModal />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/decks" element={ <Decks /> } />
        <Route path="/deck-builder" element={ <DeckBuilder /> } />
      </Routes>
    </>
  );
}

export default App;
