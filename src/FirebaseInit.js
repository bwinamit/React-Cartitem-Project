import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { firestore } from "firebase/firestore";
// import {firebase} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIyGxqt5pSD57E9K4OaNECP98z-QSuEUk",
    authDomain: "cart-1b9af.firebaseapp.com",
    projectId: "cart-1b9af",
    storageBucket: "cart-1b9af.firebasestorage.app",
    messagingSenderId: "307489544906",
    appId: "1:307489544906:web:3eeb8394caf5544cf1f233"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// if (!firebase.apps.length) {
//      firebase.initializeApp(firebaseConfig);
//      } 
// const db = firebase.firestore();
export { db};

// export { db };