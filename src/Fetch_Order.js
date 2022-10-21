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

const foodCollectionRef = collection(db, "order-data");

class Fetch_Order {
  getAllItem = () => {
    // getAllBooks
    return getDocs(foodCollectionRef);
  };

  getItem = (id) => {
    // getBook
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
}

export default new Fetch_Order();
