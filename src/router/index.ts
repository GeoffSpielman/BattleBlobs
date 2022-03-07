import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "@/store/index";
import { getCurrentUser } from '@/store/firebase';

import StartPage from '@/pages/Start.vue'
import InstructionsPage from '@/pages/Instructions.vue'
import LobbyPage from '@/pages/Lobby.vue'
import GamePage from '@/pages/Game.vue'
import CreditsPage from '@/pages/Credits.vue'
import HostPage from '@/pages/Host.vue'
import SignInPage from '@/pages/SignIn.vue'
import EmailSignInPage from '@/pages/EmailSignIn.vue'
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



router.beforeEach(async (to, from, next) =>{

  //these routes are always available - no authentication required
  if (to.name === "Start" || to.name === "SignIn" || to.name === "EmailSignIn" || to.name ==="Instructions" || to.name === "Credits" || to.name === "NotFound"){
    next();
    return;
  }

  //all other routes require authentication
  if (await getCurrentUser()){
    //user is signed in, now check if they're on the whitelist
    console.log("RouterGuard declares: signed in! TO DO: check if on whitelist")
    next();
  }
  else {
    //user is not signed in. Remember where they were trying to go and redirect them to the sign in page
    console.log("RouterGuard declares: not signed in. Redirecting to sign in")
    store.dispatch("clientSpecificStore/setSignedInDestination", to.name);
    next({name: 'SignIn'});
  }

});


export default router

