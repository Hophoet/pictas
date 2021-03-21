
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA7RiUBnZIXAGBVt4vrXOADeTzJvG_c1tw",
    authDomain: "pictas-fe1c7.firebaseapp.com",
    databaseURL: "https://pictas-fe1c7-default-rtdb.firebaseio.com",
    projectId: "pictas-fe1c7",
    storageBucket: "pictas-fe1c7.appspot.com",
    messagingSenderId: "389523068927",
    appId: "1:389523068927:web:47fbca2cb6db72b40df9ca",
    measurementId: "G-QGP8Y6NQQE"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const auth = firebase.auth();

export { storage, firestore, timestamp, auth };
