import { db } from "./firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const bookCollectionRef = collection(db, "user-data");

class Fetch_Data {
  getAllData = () => {
    // getAllBooks
    return getDocs(bookCollectionRef);
  };

  getData = (id) => {
    // getBook
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new Fetch_Data();
