import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import {RootState} from './RootState'

import playerStore from './playerStore'
import lobbyStore from './lobbyStore'
import clientSpecificStore from './clientSpecificStore'
import shipsStore from './shipsStore'
import gameStore from './gameStore'
import chatStore from './chatStore'
import powerupStore from './powerupStore'
import mapStore from './mapStore'
 
Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    playerStore: playerStore,
    lobbyStore: lobbyStore,
    clientSpecificStore: clientSpecificStore,
    shipsStore: shipsStore,
    gameStore: gameStore,
    chatStore: chatStore,
    powerupStore: powerupStore,
    mapStore: mapStore,
  },

  state: {
  
  },

  getters: {
    
  },

  mutations: {
    
  },

  actions: {    
    
  },
})
