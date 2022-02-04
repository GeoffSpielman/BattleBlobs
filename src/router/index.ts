import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import StartPage from '@/pages/Start.vue'
import InstructionsPage from '@/pages/Instructions.vue'
import LobbyPage from '@/pages/Lobby.vue'
import GamePage from '@/pages/Game.vue'
import CreditsPage from '@/pages/Credits.vue'
import HostPage from '@/pages/Host.vue'
import LoginPage from '@/pages/Login.vue'
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
    path: '/login',
    name: 'Login',
    component: LoginPage
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

export default router
