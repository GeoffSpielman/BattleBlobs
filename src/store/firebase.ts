import { FirebaseApp, initializeApp } from "firebase/app";
import {Database, getDatabase } from "firebase/database";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store/index";

const firebaseConfig = {
  apiKey: "AIzaSyDhaA66yOLrw-2d57cOk7h5N1Bg6QRZlNY",
  authDomain: "battleblobs-7ad5f.firebaseapp.com",
  databaseURL: "https://battleblobs-7ad5f-default-rtdb.firebaseio.com",
  projectId: "battleblobs-7ad5f",
  storageBucket: "battleblobs-7ad5f.appspot.com",
  messagingSenderId: "692211207785",
  appId: "1:692211207785:web:23cddc0de28736731b9cf8",
  measurementId: "G-QSSY288F93"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const database: Database = getDatabase(firebaseApp);

export default database

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch("clientSpecificStore/setSignedIn", true);
    store.dispatch("clientSpecificStore/setAuthDisplayName", user.displayName);
    store.dispatch("clientSpecificStore/setAuthEmail", user.email);
    store.dispatch("clientSpecificStore/setAuthImageURL", user.photoURL);

    console.log("User is signed in! UID: " + user.uid);
    
  } else {
    store.dispatch("clientSpecificStore/setSignedIn", false);
    console.log("User is not signed in")
  }
});

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
          unsubscribe();
          resolve(userFirebase);
      }, reject);
  })
};