import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import StartPage from '@/pages/Start.vue'
import InstructionsPage from '@/pages/Instructions.vue'
import LobbyPage from '@/pages/Lobby.vue'
import GamePage from '@/pages/Game.vue'
import ImageCreditsPage from '@/pages/ImageCredits.vue'
import HostPage from '@/pages/Host.vue'
import NotFoundPage from '@/pages/NotFound.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
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
    path: '/imageCredits',
    name: 'Image Credits',
    component: ImageCreditsPage
  },
  {
    path: '/Host',
    name: 'Host',
    component: HostPage
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
