import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAYKwdcALg7KPS5lMhsE783h7F2J6N9QqI",
    authDomain: "teleconsultation-72a47.firebaseapp.com",
    databaseURL: "teleconsultation-72a47.firebaseio.com",
    projectId: "teleconsultation-72a47",
    storageBucket: "teleconsultation-72a47.appspot.com",
    messagingSenderId: "265901346493",
    appId: "1:265901346493:web:a237db6cbac56ad7f7b1d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export { firebase, googleAuthProvider };