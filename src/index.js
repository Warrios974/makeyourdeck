import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from "./contexts/modalContext";
import { UserContextProvider } from './contexts/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </UserContextProvider>
    </BrowserRouter>
);
