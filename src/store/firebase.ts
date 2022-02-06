import { FirebaseApp, initializeApp } from "firebase/app";
import {Database, getDatabase } from "firebase/database";

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