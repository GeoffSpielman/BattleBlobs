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
    myKey: "",
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

    /*
    removePlayer(state, removedPlayerKey: string){
      const removedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.key === removedPlayerKey));
      state.players.splice(removedPlayerIndex, 1);
    },
    */

    setMyKey(state, recKey: string) {
      state.myKey = recKey;
    }

  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
      firebase.database.ref('players').on('child_added', function (data) {
        context.commit('addPlayer', data.val())
      })

      /*
      firebase.database.ref('players').on('child_removed', function (data){
        context.commit('removePlayer', data.key)
      })
      */
    },

    addPlayer(_, newPlayer: PlayerEntry) {
      const newPlayerRef = firebase.database.ref('players').push();
      newPlayerRef.set(newPlayer);
    },


    removePlayer(_, recKey: string) {
      firebase.database.ref('players/' + recKey).remove()
    },

    /*
    clearPlayersList(){
      firebase.database.ref('players').remove()
    },
    */

    intializeClient(context) {
      const newClientRef = firebase.database.ref('players').push();
      if (newClientRef.key === null) {
        console.log("Error initializing new client. Firebase returned a 'null' key")
      }
      else {
        const newPlayerEntry: PlayerEntry = {
          'status': playerStatus.StartScreen,
          'key': newClientRef.key,
          'name': '',
          'alias': '',
          'color': '',
          'captainNum': 0,
          'shipOneKey': '',
          'shipTwoKey': ''
        }
        context.commit('setMyKey', newClientRef.key);
        newClientRef.set(newPlayerEntry);
      }
    },
  },
}

export default playerStore;