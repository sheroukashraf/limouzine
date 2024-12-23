import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyD_OHyYQQr484RwNn_SnYZ0gOrSPl0tEzk",
    authDomain: "limousine-19acb.firebaseapp.com",
    projectId: "limousine-19acb",
    storageBucket: "limousine-19acb.appspot.com",
    messagingSenderId: "791397319306",
    appId: "1:791397319306:web:1a488e1e971c9c0173e373",
    measurementId: "G-5LGV28ZSC7",
  };
initializeApp(firebaseConfig);
createApp(App).use(router).mount('#app')
