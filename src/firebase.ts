import firebase from "firebase/compat/app";
import {getFirestore} from "firebase/firestore"
import "firebase/compat/database";
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAewy6pRPY4lBCZNsJHLy_UHdDH-Y8VyB0",
  authDomain: "portfolio-template-51fbf.firebaseapp.com",
  databaseURL: "https://portfolio-template-51fbf-default-rtdb.firebaseio.com",
  projectId: "portfolio-template-51fbf",
  storageBucket: "portfolio-template-51fbf.appspot.com",
  messagingSenderId: "379818682476",
  appId: "1:379818682476:web:1210fb694ec6189a2d1049",
  measurementId: "G-8T9HTBZLXR",
};
const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export default firebase;
export const auth=getAuth(app)