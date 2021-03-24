import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { PlayerEntry } from '@/models/interfaces'
import { playerStatus } from '@/models/enums'

interface PlayerState {
  myKey: string;
  players: PlayerEntry[];
}

const playerStore: Module<PlayerState, RootState> = {
  namespaced: true,
  state: {
    myKey: "initial dummy key",
    players: [],
  },

  getters: {
    getMyKey(state){
      return state.myKey;
    },

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

    setMyKey(state, recKey: string) {
      state.myKey = recKey;
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

    intializeClient(context) {
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
        context.commit('setMyKey', newClientRef.key)
        newClientRef.set(newPlayerEntry);
      }
    },

    setMyKey(context, recKey: string){
      context.commit('setMyKey', recKey);  
    },

    setMyStatus(context, recStatus: playerStatus){
      firebase.database.ref('players/' + context.state.myKey + '/status').set(recStatus);
    }
  },
}

export default playerStore;