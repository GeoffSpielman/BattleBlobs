import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'

interface LobbyState {
  availableAliases: string[];
  availableColours: string[];

}

const lobbyStore: Module<LobbyState, RootState> = {
  namespaced: true,
  state: {
    availableAliases: [],
    availableColours: [],
  },

  getters: {
    getAliasesList(state): object {
      return state.availableAliases;
    },

    getColoursList(state): object {
      return state.availableColours;
    }

  },

  mutations: {

    addAlias(state, newAlias: string) {
      state.availableAliases.push(newAlias);
    },

    addColour(state, newColour: string) {
      state.availableColours.push(newColour);
    },
    
    removeAlias(state, removedAlias: string){
      state.availableAliases.splice(state.availableAliases.indexOf(removedAlias), 1);
    },

    removeColour(state, removedColour: string){
      state.availableColours.splice(state.availableColours.indexOf(removedColour), 1);
    },

  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
      firebase.database.ref('lobby/aliases').on('child_added', function (data) {
        if ( data.val() === 'available'){
          context.commit('addAlias', data.key);
        }
      })

      firebase.database.ref('lobby/colours').on('child_added', function (data) {
        if ( data.val() === 'available'){
          context.commit('addColour', data.key);
        }
      })
    },
  },
}

export default lobbyStore;