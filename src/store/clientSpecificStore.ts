import { Module } from 'vuex'
import { RootState } from './RootState'


interface ClientSpecificState {
  startPageButtonFade: string;
  usingBankAlias: boolean;
  colourIconPath: string;
}

const playerStore: Module<ClientSpecificState, RootState> = {
  namespaced: true,
  state: {
    startPageButtonFade: "initialFade",
    usingBankAlias: false,
    colourIconPath: require("@/assets/lobby/colour_icon_black.png"),
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
    }
  },
}

export default playerStore;