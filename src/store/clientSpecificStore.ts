import { Module } from 'vuex'
import { RootState } from './RootState'

interface ClientSpecificState {
  startPageButtonFade: string;
}

const playerStore: Module<ClientSpecificState, RootState> = {
  namespaced: true,
  state: {
    startPageButtonFade: "initialFade"
  },

  getters: {
    getStartPageButtonFade(state){
      return state.startPageButtonFade;
    }
  },

  mutations: {
    setStartPageButtonFade(state, recFade: string){
      state.startPageButtonFade = recFade
    }
  },

  actions: {
    setStartPageButtonFade(context, recFade: string){
      context.commit('setStartPageButtonFade', recFade)
    }
  },
}

export default playerStore;