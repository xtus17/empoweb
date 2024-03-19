import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7O521Ag-HcnEPPxgDSdkOF-CYQ5KWyMM",
  authDomain: "empower-4c703.firebaseapp.com",
  projectId: "empower-4c703",
  storageBucket: "empower-4c703.appspot.com",
  messagingSenderId: "225180827926",
  appId: "1:225180827926:web:372c9df1ac4763533b1037",
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
