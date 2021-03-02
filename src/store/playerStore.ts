
import firebase from './firebase'
import {Module} from 'vuex'
import {RootState} from './RootState'
import {PlayerEntry} from '@/interfaces/PlayerEntry'

export interface PlayerState {
  playersList: PlayerEntry[];

}

const playerStore: Module<PlayerState, RootState> = {
  state: {
    playersList: [], 

  },

  getters: {
    getPlayersList(state): PlayerEntry[]{
      return state.playersList;
    }
  },

  mutations: {

    addPlayerToList(state, newPlayer: PlayerEntry){
      state.playersList.push(newPlayer);
    },

    removePlayerFromList(state, removedPlayer: PlayerEntry){
      const removedPlayerIndex = state.playersList.findIndex((playerObj) => (playerObj.key === removedPlayer.key));
      state.playersList.splice(removedPlayerIndex, 1);
    }
    
  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
   
      firebase.database.ref('playersList').on('child_added', function (data){
        const newPlayer: PlayerEntry = {key: data.key, name: data.val()}; 
        context.commit('addPlayerToList', newPlayer)
      }),

      firebase.database.ref('playersList').on('child_removed', function (data){
        const removedPlayer: PlayerEntry = {key: data.key, name: data.val()};
        context.commit('removePlayerFromList', removedPlayer)
      })
    },

    addPlayerToList(_, newPlayer: PlayerEntry){
      const newPlayerRef = firebase.database.ref('playersList').push();
      newPlayerRef.set(newPlayer);
    },

    removePlayerFromList(_, recKey: string){
      firebase.database.ref('playersList/' + recKey).remove()
    },
    
    clearPlayersList(){
      firebase.database.ref('playersList').remove()
    }
  },
}

export default playerStore;