import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCIyGxqt5pSD57E9K4OaNECP98z-QSuEUk",
  authDomain: "cart-1b9af.firebaseapp.com",
  projectId: "cart-1b9af",
  storageBucket: "cart-1b9af.firebasestorage.app",
  messagingSenderId: "307489544906",
  appId: "1:307489544906:web:3eeb8394caf5544cf1f233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
