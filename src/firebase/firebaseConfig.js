
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCkqBcpJ4SJIv0d8fLoOOvl-IJO7Lf_76c",
  authDomain: "ecommerce-ktm.firebaseapp.com",
  projectId: "ecommerce-ktm",
  storageBucket: "ecommerce-ktm.appspot.com",
  messagingSenderId: "612161044935",
  appId: "1:612161044935:web:bd0a6ebd923dad44e319e2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);
const firebase = initializeApp(firebaseConfig)
export {app,auth,db,storage,firebase}