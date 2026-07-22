import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n'; // Add this at the very top of src/main.tsx
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
