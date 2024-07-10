import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9J5qkri2pj8BABvxz5R4KeygZMWJmEjo",
  authDomain: "empoderadasapp.firebaseapp.com",
  databaseURL: "https://empoderadasapp-default-rtdb.firebaseio.com",
  projectId: "empoderadasapp",
  storageBucket: "empoderadasapp.appspot.com",
  messagingSenderId: "183551164272",
  appId: "1:183551164272:web:9090ffd2e3a14e1912d9b5"
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
