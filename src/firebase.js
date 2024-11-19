
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAeDrOihF0qjdD46iZDia6iriedelndxTs",
  authDomain: "personalaccountingprj.firebaseapp.com",
  projectId: "personalaccountingprj",
  storageBucket: "personalaccountingprj.appspot.com",
  messagingSenderId: "896608154893",
  appId: "1:896608154893:web:7b2ed5154656027fb3ec44",
  measurementId: "G-ZLMJ078Q4J",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
