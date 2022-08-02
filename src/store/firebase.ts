import { FirebaseApp, initializeApp } from "firebase/app";
import {Database, getDatabase, onDisconnect, ref} from "firebase/database";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import store from "@/store/index";
import { PlayerStatus } from "@/models/enums";

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




function playerListHasLoaded(): Promise<string>{
  let start = Date.now();

  function waitForPlayersList(resolve: Function, reject: Function) {
    //store has been initialized
    if (store.getters["playerStore/getPlayersList"].length > 0){
      resolve("Players list has been initialized");
    }

    //wait 2500 milliseconds before giving up
    else if ( (Date.now() - start) >= 2500){
      reject("Error: Players list was not loaded from firebase");
    }

    //store is not ready yet, try again in 200 milliseconds
    else {
      setTimeout(waitForPlayersList, 200, resolve, reject)
    }
  }

  return new Promise(waitForPlayersList);
}




const auth = getAuth();

onAuthStateChanged(auth, async(user) => {

  //user is signed in
  if (user) {
    store.dispatch("clientSpecificStore/setSignedIn", true);
    store.dispatch("clientSpecificStore/setAuthDisplayName", user.displayName);
    store.dispatch("clientSpecificStore/setAuthEmail", user.email);
    store.dispatch("clientSpecificStore/setAuthImageURL", user.photoURL);


    playerListHasLoaded().then(() =>{

      //if an entry for this UID does NOT already exist in the playersData database
      if (!store.getters['playerStore/getUIDinDatabase'](user.uid)){

        //create a new entry for this player
        store.dispatch("playerStore/intializePlayer", {'uid': user.uid, 'name': user.displayName}).then(() => {
          //if the user gets disconnected, the database needs to be aware to inform the host and other players
          onDisconnect(ref(database, "players/" + user.uid + "/status")).set(PlayerStatus.Disconnected);
        });
      }

      //if the entry already exists, just re-connect the disconnection listeners
      else{
        store.dispatch("playerStore/setMyUID", user.uid);
        onDisconnect(ref(database, "players/" + user.uid + "/status")).set(PlayerStatus.Disconnected);
      }
        
    }).catch((errorMessage) =>{
        console.log(errorMessage);
      }
    )    

  //user is NOT signed in
  } else 
    store.dispatch("clientSpecificStore/setSignedIn", false);
});

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
          unsubscribe();
          resolve(userFirebase);
      }, reject);
  })
};

export default database