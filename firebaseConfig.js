// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';  // Si tu utilises Firestore
import 'firebase/auth';       // Si tu utilises Firebase Authentication
import 'firebase/database';   // Si tu utilises Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGOqlhtjk0IvdWpTe2_wznqttL_7LyAzg",
    authDomain: "jesignale-2.firebaseapp.com",
    databaseURL: "https://jesignale-2-default-rtdb.firebaseio.com",
    projectId: "jesignale-2",
    storageBucket: "jesignale-2.appspot.com",
    messagingSenderId: "24133362119",
    appId: "1:24133362119:web:5365784ed47a9dd1def9e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = firebase.firestore();  // Firestore
export const auth = firebase.auth();            // Authentication
export const realtimeDB = firebase.database();  // Realtime Database
export default firebase;
