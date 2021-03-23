import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { PlayerEntry } from '@/models/interfaces'
import { playerStatus } from '@/models/enums'

interface PlayerState {
  players: PlayerEntry[];
}

const playerStore: Module<PlayerState, RootState> = {
  namespaced: true,
  state: {
    players: [],
  },

  getters: {
    getPlayersList(state): PlayerEntry[] {
      return state.players;
    }

  },

  mutations: {

    addPlayer(state, newPlayerEntry: PlayerEntry) {
      state.players.push(newPlayerEntry);
    },
    
    removePlayer(state, removedPlayerKey: string){
      const removedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.key === removedPlayerKey));
      state.players.splice(removedPlayerIndex, 1);
    },

    modifyPlayer(state, updatedPlayer: PlayerEntry){
      const modifiedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.key === updatedPlayer.key));
      state.players.splice(modifiedPlayerIndex, 1, updatedPlayer);
    },
  

    

  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
      firebase.database.ref('players').on('child_added', function (data) {
        context.commit('addPlayer', data.val());
      }),

      firebase.database.ref('players').on('child_removed', function (data){
        context.commit('removePlayer', data.key);
      })

      firebase.database.ref('players').on('child_changed', function (data){
        context.commit('modifyPlayer', data.val());
      })
    },

    addPlayer(_, newPlayer: PlayerEntry) {
      const newPlayerRef = firebase.database.ref('players').push();
      newPlayerRef.set(newPlayer);
    },

    removePlayer(_, recKey: string) {
      firebase.database.ref('players/' + recKey).remove()
    },

    modifyPlayer(_, modifedPlayer: PlayerEntry){
      firebase.database.ref('players/' + modifedPlayer.key).set(modifedPlayer);
    },

    intializeClient(_) {
      const newClientRef = firebase.database.ref('players').push();
      if (newClientRef.key === null) {
        console.log("Error initializing new client. Firebase returned a 'null' key")
      }
      else {
        const newPlayerEntry: PlayerEntry = {
          'key': newClientRef.key,
          'status': playerStatus.StartScreen,
          'name': '',
          'alias': '',
          'color': '',
          'captainNum': 0,
          'shipOneKey': '',
          'shipTwoKey': ''
        }
        this.dispatch('clientSpecificStore/setMyKey', newClientRef.key, {root: true})
        newClientRef.set(newPlayerEntry);
      }
    },
  },
}

export default playerStore;