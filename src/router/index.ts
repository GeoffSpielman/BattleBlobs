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

    function waitForWhiteLists(resolve: Function, reject: Function) {
      //store has been initialized
      if (store.getters["authDataStore/getAuthorizedPlayerEmails"].length > 0 && store.getters["authDataStore/getAuthorizedHostEmails"].length > 0){
        resolve("Both white lists have been initialized");
      }

      //wait 3000 milliseconds before giving up
      else if ( (Date.now() - start) >= 3000){
        reject("Error: Both white lists could not be loaded from firebase");
      }

      //store is not ready yet, try again in 50 milliseconds
      else {
        setTimeout(waitForWhiteLists, 50, resolve, reject)
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
        next();
      }
      //authorized player
      else if ((to.name === "Lobby" || to.name === "Game") &&  store.getters["authDataStore/getPlayerOnWhitelist"](curEmail)){
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






/*

function ensureFooIsSet() {
  var start = Date.now();
  return new Promise(waitForPlayersWhiteList); // set the promise object within the ensureFooIsSet object


  function waitForPlayersWhiteList(resolve: Function, reject: Function) {

      //store has been initialized
      if (store.getters["authDataStore/getAuthorizedPlayerEmails"].length > 0)
          resolve("Loaded");

      //wait 3000 milliseconds before giving up
      else if ( (Date.now() - start) >= 3000)
          reject(new Error("timeout"));

      //store is not ready yet, try again in 50 milliseconds
      else
          setTimeout(waitForPlayersWhiteList(resolve, reject), 50);
  }
}

*/

export default router

