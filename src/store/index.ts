import Vue from 'vue'
import Vuex from 'vuex'
import {RootState} from './RootState'

import playerStore from './playerStore'
import lobbyStore from './lobbyStore'
import clientSpecificStore from './clientSpecificStore'
import shipsStore from './shipsStore'

import chatStore from './chatStore'
import powerupStore from './powerupStore'
import mapStore from './mapStore'

import authDataStore from './authDataStore'
import gameDataStore from './gameDataStore'
import configDataStore from './configDataStore'
 
Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    playerStore: playerStore,
    lobbyStore: lobbyStore,
    clientSpecificStore: clientSpecificStore,
    shipsStore: shipsStore,
    chatStore: chatStore,
    powerupStore: powerupStore,
    mapStore: mapStore,

    authDataStore: authDataStore,
    gameDataStore: gameDataStore,
    configDataStore: configDataStore,
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
