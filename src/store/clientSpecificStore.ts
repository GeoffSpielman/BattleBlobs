import { Module } from 'vuex'
import { RootState } from './RootState'


interface ClientSpecificState {
  startPageButtonFade: string;
  usingBankAlias: boolean;
  colourIconPath: string;
  selectedColourHex: string;
}

const playerStore: Module<ClientSpecificState, RootState> = {
  namespaced: true,
  state: {
    startPageButtonFade: "initialFade",
    usingBankAlias: false,
    colourIconPath: require("@/assets/lobby/colour_icon_black.png"),
    selectedColourHex: "#252525",
  },

  getters: {
    getStartPageButtonFade(state){
      return state.startPageButtonFade;
    },

    getUsingBankAlias(state){
      return state.usingBankAlias;
    },

    getColourIconPath(state){
      return state.colourIconPath;
    },

    getSelectedColourHex(state){
      return state.selectedColourHex;
    }
  },

  mutations: {
    setStartPageButtonFade(state, recFade: string){
      state.startPageButtonFade = recFade
    },

    setUsingBankAlias(state, recVal: boolean){
      state.usingBankAlias = recVal;
    },

    setColourIconPath(state, recPath: string){
      state.colourIconPath = recPath;
    },

    setSelectedColourHex(state, recCode: string){
      state.selectedColourHex = recCode;
    }
  },

  actions: {   

    setStartPageButtonFade(context, recFade: string){
      context.commit('setStartPageButtonFade', recFade)
    },

    setUsingBankAlias(context, recVal: boolean){
      context.commit('setUsingBankAlias', recVal);
    },

    setColourIconPath(context, recPath: string){
      context.commit('setColourIconPath', recPath);
    },

    setSelectedColourHex(context, recCode: string){
      context.commit('setSelectedColourHex', recCode);
    }
  },
}

export default playerStore;