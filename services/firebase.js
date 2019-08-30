import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyALRfWV3aFtbFzOImSHWHsnrKDvXAmf0s4",
  authDomain: "books-8407e.firebaseapp.com",
  databaseURL: "https://books-8407e.firebaseio.com",
  projectId: "books-8407e",
  storageBucket: "",
  messagingSenderId: "86247738096",
  appId: "1:86247738096:web:cd468aac82341987"
}

!firebase.apps.length ? firebase.initializeApp(config) : '';
// firebase.initializeApp(config);

export const auth = firebase.auth();
