import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker regisztrálva:', registration);
      document.body.innerHTML += 'Service worker';
    })
    .catch((error) => {
      console.error('Service Worker regisztrálás hiba:', error);
      document.body.innerHTML += 'Service worker error';
    });
}

console.log('Create react app')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
