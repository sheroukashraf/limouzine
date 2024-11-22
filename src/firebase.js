// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_OHyYQQr484RwNn_SnYZ0gOrSPl0tEzk",
  authDomain: "limousine-19acb.firebaseapp.com",
  projectId: "limousine-19acb",
  storageBucket: "limousine-19acb.appspot.com",
  messagingSenderId: "791397319306",
  appId: "1:791397319306:web:1a488e1e971c9c0173e373",
  measurementId: "G-5LGV28ZSC7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };