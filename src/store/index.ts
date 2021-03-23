import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import playerStore from './playerStore'
import lobbyStore from './lobbyStore'
import clientSpecificStore from './clientSpecificStore'
import {RootState} from './RootState'

 
Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    playerStore: playerStore,
    lobbyStore: lobbyStore,
    clientSpecificStore: clientSpecificStore,
  },

  state: {
    gameStatus: "",
    startPageButtonFade: "",
  },

  getters: {
    getGameStatus(state) {
      return state.gameStatus;
    },
    
  },

  mutations: {
    setGameStatus(state, recStatus: string) {
      state.gameStatus = recStatus;
    },
    
  },

  actions: {

    //connects firebase database to store, updates are now driven from database
    getFirebaseDatabase(context) {
      // DATABASE LISTENERS
      firebase.database.ref('gameStatus').on('value', function (snapshot) {
        context.commit('setGameStatus', snapshot.val());
      })
    },

    setGameStatus(_, recStatus) {
      firebase.database.ref('gameStatus').set(recStatus);
    },
    
  },
})
