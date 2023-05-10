import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from "./contexts/modalContext";
import { UserContextProvider } from './contexts/userContext';
import { DeckBuilderContextProvider } from './contexts/deckBuilderContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <ModalContextProvider>
                <DeckBuilderContextProvider>
                    <App />
                </DeckBuilderContextProvider>
            </ModalContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);
