import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "@/store/index";
import { getCurrentUser } from '@/store/firebase';
import { getAuth } from "firebase/auth";

import StartPage from '@/pages/Start.vue'
import InstructionsPage from '@/pages/Instructions.vue'
import LobbyPage from '@/pages/Lobby.vue'
import GamePage from '@/pages/Game.vue'
import CreditsPage from '@/pages/Credits.vue'
import HostPage from '@/pages/Host.vue'
import SignInPage from '@/pages/SignIn.vue'
import EmailSignInPage from '@/pages/EmailSignIn.vue'
import AccessDenied from '@/pages/AccessDenied.vue'
import NotFoundPage from '@/pages/NotFound.vue'
import { authEntry } from '@/models/interfaces';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Start',
    component: StartPage
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: InstructionsPage
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: LobbyPage
  },
  {
    path: '/play',
    name: 'Game',
    component: GamePage
  },
  {
    path: '/credits',
    name: 'Credits',
    component: CreditsPage
  },
  {
    path: '/host',
    name: 'Host',
    component: HostPage
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInPage
  },
  {
    path: '/emailSignIn',
    name: 'EmailSignIn',
    component: EmailSignInPage
  },
  {
    path: '/accessdenied',
    name: 'AccessDenied',
    component: AccessDenied
  },  
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



function bothWhiteListsHaveLoaded(): Promise<string>{
    let start = Date.now();
    let attemptedManualRead: boolean = false;

    function waitForWhiteLists(resolve: Function, reject: Function) {
      //store has been initialized
      if (store.getters["authDataStore/getAuthorizedPlayers"].length > 0 && store.getters["authDataStore/getAuthorizedHosts"].length > 0){
        resolve("Both white lists have been initialized");
      }

      //if it's been an entire second, it's possible the user was not previously authenticated (auth = null) and didn't have permission to read these lists from the database. Try manually reading them now.
      else if ( (Date.now() - start) >= 1000 && attemptedManualRead === false){
        store.dispatch("authDataStore/manuallyReadWhiteLists"); 
        attemptedManualRead = true;
        //try again after 400 milliseconds
        setTimeout(waitForWhiteLists, 400, resolve, reject)
      }

      //wait 3000 milliseconds before giving up
      else if ( (Date.now() - start) >= 3000){
        reject("Error: Both white lists could not be loaded from firebase");
      }

      //store is not ready yet, try again in 200 milliseconds
      else {
        setTimeout(waitForWhiteLists, 200, resolve, reject)
      }
    }

    return new Promise(waitForWhiteLists);
  }




router.beforeEach(async (to, from, next) =>{

  //these routes are always available - no authentication required
  if (to.name === "Start" || to.name === "SignIn" || to.name === "EmailSignIn" || to.name ==="Instructions" || to.name === "Credits" || to.name === "AccessDenied" || to.name === "NotFound"){
    next();
    return;
  }

  //all other routes require authentication
  if (await getCurrentUser()){
  
    //user is signed in,  check if they're on the appropriate whitelist
    const auth = getAuth();
    const curEmail = auth.currentUser?.email
    
    bothWhiteListsHaveLoaded().then(() =>{

      //authorized host
      if (to.name === "Host" && store.getters["authDataStore/getHostOnWhitelist"](curEmail)){
        
        let authenticatedHost: authEntry = {
          uid: String(auth.currentUser?.uid),
          email: String(curEmail)
        }

        //check if their key in the database is not their UID (they were added manually, this is their first time hosting)
        if (store.getters["authDataStore/getHostUIDmissing"](authenticatedHost)){
          //remove the old entry in the whitelist under their email, add a new one under their UID
          store.dispatch("authDataStore/removeAuthorizedHostEmail", curEmail);          
          store.dispatch("authDataStore/addAuthorizedHostEntry", authenticatedHost);
        }        
        next(); 
      }

      //authorized player
      else if ((to.name === "Lobby" || to.name === "Game") &&  store.getters["authDataStore/getPlayerOnWhitelist"](curEmail)){
      
        let authenticatedPlayer: authEntry = {
          uid: String(auth.currentUser?.uid),
          email: String(curEmail)
        }

        //check if their key in the database is not their UID (they were added manually by a host, this is their first time playing)
        if (store.getters["authDataStore/getPlayerUIDmissing"](authenticatedPlayer)){
          //remove the old entry in the whitelist under their email, add a new one under their UID
          store.dispatch("authDataStore/removeAuthorizedPlayerEmail", curEmail);          
          store.dispatch("authDataStore/addAuthorizedPlayerEntry", authenticatedPlayer);
        }
        next();
      }
      //unauthorized, but authenticated, user -> show them the "contact your host" page
      else{
        console.log("Access denied, re-rounting you");
        store.dispatch("clientSpecificStore/setSignedInDestination", to.name);
        next({name: 'AccessDenied'});
      }
      
    }).catch((errorMessage) =>{
        console.log(errorMessage);
      }
    )
    
  }
  else {
    //user is not signed in. Remember where they were trying to go and redirect them to the sign in page
    console.log("RouterGuard declares: not signed in. Redirecting to sign in")
    store.dispatch("clientSpecificStore/setSignedInDestination", to.name);
    next({name: 'SignIn'});
  }
});

export default router

