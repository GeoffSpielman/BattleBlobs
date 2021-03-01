import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import playerStore from './playerStore'
import {RootState} from './RootState'
 
Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    playerState: playerStore
  },

  state: {
    gameStatus: "",
     
  },

  getters: {
    getGameStatus(state) {
      return state.gameStatus;
    },
  },

  mutations: {
    setGameStatus(state, recStatus) {
      state.gameStatus = recStatus;
    },
  },

  actions: {

    //connects firebase database to store, updates are now driven from database
    getFirebaseDatabase(context) {
      // DATASE LISTENERS
      firebase.database.ref('gameStatus').on('value', function (snapshot) {
        context.commit('setGameStatus', snapshot.val());
      })
    },

    setGameStatus(context, recStatus) {
      firebase.database.ref('gameStatus').set(recStatus);
    },
  },
})
