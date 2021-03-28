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
    getAvailableAliases(state): object {
      return state.availableAliases;
    },

    getColoursList(state): object {
      return state.availableColours;
    }

  },

  mutations: {

    addAvailableAlias(state, newAlias: string) {
      state.availableAliases.push(newAlias);
      const tempArray = state.availableAliases
      tempArray.sort()
      state.availableAliases = tempArray;
    },

    removeAvailableAlias(state, removedAlias: string) {
      state.availableAliases.splice(state.availableAliases.indexOf(removedAlias), 1);
    },

    addColour(state, newColour: string) {
      state.availableColours.push(newColour);
    },

    removeColour(state, removedColour: string) {
      state.availableColours.splice(state.availableColours.indexOf(removedColour), 1);
    },

  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
      firebase.database.ref('lobby/aliases').on('child_added', function (data) {
        if (data.val() === 'available' && context.state.availableAliases.indexOf(String(data.key)) === -1) {
          context.commit('addAvailableAlias', data.key);
        }
      })

      firebase.database.ref('lobby/aliases').on('child_changed', function (data) {
        if (data.val() === 'available' && context.state.availableAliases.indexOf(String(data.key)) === -1) {
          context.commit('addAvailableAlias', data.key);
        }
        else if (data.val() !== 'available' && context.state.availableAliases.indexOf(String(data.key)) !== -1) {
          context.commit('removeAvailableAlias', data.key);
        }
      })

      firebase.database.ref('lobby/colours').on('child_added', function (data) {
        if (data.val() === 'available') {
          context.commit('addColour', data.key);
        }
      })
    },

    allocateName(context, recName: string) {
      return new Promise((resolve, reject) => {
        //user requests their current name again (due to v-textfield 'on change' bug)
        if (recName === context.rootGetters['playerStore/getMyName']){
          resolve("SUCCESS: Your name is already set to " + recName);
        }
        //ensure no other players are currently using this name
        else if (context.rootGetters['playerStore/getNameAvailable'](recName)) {

          //set player's name in the player store
          context.dispatch('playerStore/setMyName', recName, { root: true });
          resolve("SUCCESS: Name set to '" + recName + "'");
        }
        else {
          reject('FAIL: Name is already in use, please choose another')
        }
      })
    },


    reserveAlias(context, recAlias: string) {
      firebase.database.ref('lobby/aliases/' + recAlias).set(context.rootGetters['playerStore/getMyKey']);
    },

    releaseAlias(_, recAlias: string) {
      firebase.database.ref('lobby/aliases/' + recAlias).set('available');
    },

    allocateAlias(context, recAlias: string) {
      return new Promise((resolve, reject) => {
        //user requests their current alias again (due to v-textfield 'on change' bug)
        if (recAlias === context.rootGetters['playerStore/getMyAlias']){
          resolve("SUCCESS: Alias " + recAlias + " has already been reserved for you");
        }
        //ensure no other players are currently using this alias
        else if (context.rootGetters['playerStore/getAliasAvailable'](recAlias)) {

          //if the user's old alias was in the bank, we need to release it
          if(context.rootGetters['clientSpecificStore/getUsingBankAlias']){
            context.dispatch('releaseAlias', context.rootGetters['playerStore/getMyAlias']);
          }

          //user clicked alias from bank or typed it out - need to claim it
          if (context.getters.getAvailableAliases.findIndex(
            (element: string) => element.toLowerCase() === recAlias.toLowerCase()) !== -1) {
            context.dispatch('reserveAlias', recAlias);            
            context.dispatch('clientSpecificStore/setUsingBankAlias', true, { root: true });
          }
          else{
            context.dispatch('clientSpecificStore/setUsingBankAlias', false, { root: true });
          }
          //actually set player's alias in the player store
          context.dispatch('playerStore/setMyAlias', recAlias, { root: true });
          resolve("SUCCESS: Alias '" + recAlias + "' succesfully reserved");

        }
        else {
          reject('FAIL: Alias is already in use, please choose another')
        }

      })
    },

    
  },
}

export default lobbyStore;