import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Header from "./components/Header";
import SignInModal from './components/SignInModal'
import DeckBuilder from "./pages/DeckBuilder";
import Decks from "./pages/Decks";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container fluid>
      <Row >
        <Header />
        <main className='row position-relative'>
          <SignInModal />
          <Col xs={1} />
          <section className="col mx-5 my-5">
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/decks" element={ <Decks /> } />
              <Route path="/deck-builder" element={ <DeckBuilder /> } />
            </Routes>
          </section>
        </main>
      </Row>
    </Container>
  );
}

export default App;
