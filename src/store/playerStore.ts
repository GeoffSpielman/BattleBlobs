
import firebase from './firebase'
import {Module} from 'vuex'
import {RootState} from './RootState'
import {PlayerEntry} from '@/interfaces/PlayerEntry'

export interface PlayerState {
  playersList: PlayerEntry[];

}

const playerStore: Module<PlayerState, RootState> = {
  state: {
    playersList: [] 
  },

  getters: {
    getPlayersList(state): PlayerEntry[]{
      return state.playersList;
    }
  },

  mutations: {

    addPlayerToList(state, newPlayer: PlayerEntry){
      console.log(newPlayer)
      state.playersList.push(newPlayer);
    },

    clearPlayersList(state){
      state.playersList = []
    }
    
  },

  actions: {

    //connects firebase database to store, updates are now driven from database
    getFirebaseDatabase(context) {
      // DATASE LISTENERS
      firebase.database.ref('playersList').on('child_added', function (data){
        const newPlayer: PlayerEntry = {key: data.key, name: data.val()}; 
        context.commit('addPlayerToList', newPlayer)
      })
    },

    addPlayerToList(context, newPlayer: PlayerEntry){
      const newPlayerRef = firebase.database.ref('playersList').push();
      newPlayerRef.set(newPlayer);
    },

    clearPlayerList(context, recArg){
      firebase.database.ref('playersList').set(recArg)
    }
  },
}

export default playerStore;