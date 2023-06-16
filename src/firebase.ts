import firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore"
import "firebase/compat/database";
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAZALq2kLkzfB3rOtDyzETLJKeHiCkqUVY",
  authDomain: "portfolio-template-bc671.firebaseapp.com",
  databaseURL: "https://portfolio-template-bc671-default-rtdb.firebaseio.com",
  projectId: "portfolio-template-bc671",
  storageBucket: "portfolio-template-bc671.appspot.com",
  messagingSenderId: "798002836055",
  appId: "1:798002836055:web:562e3b760fd72a46bba912",
  measurementId: "G-KNF8T0SL3X"
};
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;
export const auth=getAuth(app)