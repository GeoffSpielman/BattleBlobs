import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import HomePage from '@/pages/Home.vue'
import InstructionsPage from '@/pages/Instructions.vue'
import LobbyPage from '@/pages/Lobby.vue'
import GameScreenPage from '@/pages/GameScreen.vue'
import TestingPage from '@/pages/Testing.vue'
import NotFoundPage from '@/pages/NotFound.vue'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
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
    name: 'GameScreen',
    component: GameScreenPage
  },
  {
    path: '/testing',
    name: 'Testing',
    component: TestingPage
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
