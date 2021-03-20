
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
 	apiKey: "AIzaSyBRuSUDxkoll50qmwAPBcStsMu62C7GdXs",
    authDomain: "train-app-105b7.firebaseapp.com",
    databaseURL: "https://train-app-105b7.firebaseio.com",
    projectId: "train-app-105b7",
    storageBucket: "train-app-105b7.appspot.com",
    messagingSenderId: "733969777138",
    appId: "1:733969777138:web:493007095644585f166b6b",
    measurementId: "G-GNVYJR4KQY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
