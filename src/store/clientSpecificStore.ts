import { Module } from 'vuex'
import { RootState } from './RootState'


interface ClientSpecificState {
  startPageButtonFade: string;
  usingBankAlias: boolean;
  colourIconPath: string;
  selectedColourHex: string;
  shipOneOffsets: number[][];
  shipTwoOffsets: number[][];
  colourAssistanceOn: boolean;
}

const playerStore: Module<ClientSpecificState, RootState> = {
  namespaced: true,
  state: {
    startPageButtonFade: "initialFade",
    usingBankAlias: false,
    colourIconPath: require("@/assets/lobby/colour_icon_black.png"),
    selectedColourHex: "#252525",
    shipOneOffsets: [],
    shipTwoOffsets: [],
    colourAssistanceOn: false,
  },

  getters: {
    getStartPageButtonFade(state): string{
      return state.startPageButtonFade;
    },

    getUsingBankAlias(state): boolean{
      return state.usingBankAlias;
    },

    getColourIconPath(state): string{
      return state.colourIconPath;
    },

    getSelectedColourHex(state): string{
      return state.selectedColourHex;
    },

    getShipOffsets: (state) => (recShipNum: number) => {
      if (recShipNum === 1){
        return state.shipOneOffsets;
      }
      else if (recShipNum === 2){
        return state.shipTwoOffsets; 
      }
    },

    getColourAssitanceOn(state): boolean {
      return state.colourAssistanceOn;
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
    },

    setShipOffsets(state, payload){
      if (payload.whichShip === 1){
        state.shipOneOffsets = payload.offsets;
      } else if (payload.whichShip === 2){
        state.shipTwoOffsets = payload.offsets;
      }
    },

    setColourAssitanceOn(state, recVal: boolean){
      state.colourAssistanceOn = recVal;
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
    },

    setShipOffsets(context, payload){
      context.commit('setShipOffsets', payload);
    },

    setColourAssistanceOn(context, recVal: boolean){
      context.commit('setColourAssitanceOn', recVal);
    }
  },
}

export default playerStore;