import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentReference,
} from "firebase/firestore";
class DataService {
  addData = (data: any, collectionName: any) => {
    const CollectionRef = collection(db, collectionName);
    return addDoc(CollectionRef, data);
  };
  updateData = (id: string, updatedRecipe: any, collectionName: any) => {
    const data = doc(db, collectionName, id);
    return updateDoc(data, updatedRecipe);
  };
  updateImageToggle = (id: string, updatedStatus: any, collectionName: any) => {
    console.log("hi");

    const data = doc(db, collectionName, id);
    console.log("updated");

    return updateDoc(data, { ...data, active: updatedStatus });
  };
  deleteData = (id, collectionName: any) => {
    const data = doc(db, collectionName, id);
    console.log(data);

    return deleteDoc(data);
  };
  getAllData = (collectionName: any) => {
    return getDocs(collectionName);
  };
  getRecipe = (id: string) => {
    const recipeDoc = doc(db, "recipes", id);
    return getDoc(recipeDoc);
  };
}
export default new DataService();
