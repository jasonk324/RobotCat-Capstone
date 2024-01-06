import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { ButtonsProvider } from './contexts/ButtonsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ButtonsProvider>
      <App />
    </ButtonsProvider>
  </React.StrictMode>
);
