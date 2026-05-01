import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TextsProvider } from './context/TextsProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TextsProvider>
      <App />
    </TextsProvider>
  </React.StrictMode>
);
