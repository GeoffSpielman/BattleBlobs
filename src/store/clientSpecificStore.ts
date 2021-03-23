import { Module } from 'vuex'
import { RootState } from './RootState'

interface ClientSpecificState {
  myKey: string;
  startPageButtonFade: string;
}

const playerStore: Module<ClientSpecificState, RootState> = {
  namespaced: true,
  state: {
    myKey: "initial dummy key",
    startPageButtonFade: "initialFade",
  },

  getters: {
    getMyKey(state){
      return state.myKey;
    },

    getStartPageButtonFade(state){
      return state.startPageButtonFade;
    },
  
  },

  mutations: {

    setMyKey(state, recKey: string) {
      state.myKey = recKey;
    },

    setStartPageButtonFade(state, recFade: string){
      state.startPageButtonFade = recFade
    },

  },

  actions: {
    setMyKey(context, recKey: string){
      context.commit('setMyKey', recKey);  
    },

    setStartPageButtonFade(context, recFade: string){
      context.commit('setStartPageButtonFade', recFade)
    },
  },
}

export default playerStore;