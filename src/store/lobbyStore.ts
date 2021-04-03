import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { ColourEntry } from '@/models/interfaces';
import { ColourStatus } from '@/models/enums';
import { ColourUpdateObject } from '@/models/interfaces';
import initialColoursArray from "@/initialization/coloursArray";

interface LobbyState {
  availableAliases: string[];
  colours: ColourEntry[];

}

const lobbyStore: Module<LobbyState, RootState> = {
  namespaced: true,
  state: {
    availableAliases: [],
    colours: initialColoursArray,
  },

  getters: {
    getAvailableAliases(state): object {
      return state.availableAliases;
    },

    getColoursList(state): object {
      return state.colours;
    },

    getColourEntry: (state) => (recHexCode: string) => {
      return state.colours.find((element)=> element.hexCode === recHexCode);
    },

    getColourAvailable: (state) => (recHexCode: string) => {
      return state.colours.find((element)=> element.hexCode === recHexCode)?.status === ColourStatus.Available;
    },

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

    overwriteColourEntry(state, newColourObj: ColourEntry){
      const colourIndex = state.colours.findIndex((element) => element.hexCode === newColourObj.hexCode);
      state.colours.splice(colourIndex, 1, newColourObj);
    }

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
        const updateObj: ColourUpdateObject = {hexCode: String(data.key), status: data.val()};
        context.dispatch('updateColours', updateObj);
      })

      firebase.database.ref('lobby/colours').on('child_changed', function (data) {
        const updateObj: ColourUpdateObject = {hexCode: String(data.key), status: data.val()};
        context.dispatch('updateColours', updateObj);
      })
    },



    //actions
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


    updateColours(context, payload: ColourUpdateObject){
      const localColourObj = context.getters['getColourEntry']("#" + payload.hexCode);
  
      if (payload.status === "available" && localColourObj?.status !== ColourStatus.Available){
        localColourObj.status = ColourStatus.Available
        context.commit('overwriteColourEntry', localColourObj);
      }
      else if (payload.status !== "available"){
        if (payload.status === context.rootGetters["playerStore/getMyKey"]){
          localColourObj.status = ColourStatus.Mine;
        }
        else{
          localColourObj.status = ColourStatus.Taken;
        }
        context.commit('overwriteColourEntry', localColourObj);
      }
    },

    reserveColour(context, recHexCode: string){
      if(context.getters['getColourAvailable'](recHexCode)){
        //release the colour previously selected if necessary
        const oldColour = context.getters['getColoursList'].find((element: ColourEntry) => element.status === ColourStatus.Mine);
        if (oldColour !== undefined){
          firebase.database.ref('lobby/colours/' + oldColour.hexCode.substring(1)).set("available");
        }

        //reserve the new colour selection
        firebase.database.ref('lobby/colours/' + recHexCode.substring(1)).set(context.rootGetters['playerStore/getMyKey']);
      }
    }
    
  },
}

export default lobbyStore;