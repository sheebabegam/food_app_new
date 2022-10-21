import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw96E-JeiaACLrNOAP_lBdmtlYmV76iis",
  authDomain: "food-order-app-363806.firebaseapp.com",
  projectId: "food-order-app-363806",
  storageBucket: "food-order-app-363806.appspot.com",
  messagingSenderId: "242116950690",
  appId: "1:242116950690:web:76bfbfe543e0600cd0f5fb",
  measurementId: "G-80V53G27J9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage };
