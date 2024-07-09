import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0ZOredbG89TmqVz7X0P8FOWzUF08HtQ0",
  authDomain: "empower-fec18.firebaseapp.com",
  databaseURL: "https://empower-fec18-default-rtdb.firebaseio.com",
  projectId: "empower-fec18",
  storageBucket: "empower-fec18.appspot.com",
  messagingSenderId: "611045930198",
  appId: "1:611045930198:web:9f17c2af70142cc400c577"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
