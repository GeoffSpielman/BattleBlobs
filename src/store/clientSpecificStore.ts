import { startAfter } from 'firebase/database';
import { Module } from 'vuex'
import { RootState } from './RootState'


interface ClientSpecificState {
  startPageButtonFade: string;
  usingBankAlias: boolean;
  colourIconPath: string;
  selectedColourHex: string;
  shipOneOffsets: number[][];
  shipTwoOffsets: number[][];
  colourAssistanceMode: boolean;
  signedIn: boolean;
  authDisplayName: string;
  authEmail: string;
  authImageURL: string;
  signedInDestination: string;
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
    colourAssistanceMode: false,
    signedIn: false,
    authDisplayName: "",
    authEmail: "",
    authImageURL: "",
    signedInDestination: "Lobby",
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

    getColourAssistanceMode(state): boolean {
      return state.colourAssistanceMode;
    },

    getSignedIn(state): boolean {
      return state.signedIn;
    },

    getAuthDisplayName(state): string {
      return state.authDisplayName;
    },

    getAuthEmail(state): string {
      return state.authEmail;
    },

    getAuthImageURL(state): string {
      return state.authImageURL;
    },
    
    getSignedInDestination(state): string {
      return state.signedInDestination;
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

    setColourAssistanceMode(state, recVal: boolean){
      state.colourAssistanceMode = recVal;
    },

    setSignedIn(state, recVal: boolean){
      state.signedIn = recVal;
    },

    setAuthDisplayName(state, newDisplayName: string) {
      state.authDisplayName = newDisplayName;
    },

    setAuthEmail(state, newAuthEmail: string) {
      state.authEmail = newAuthEmail;
    },

    setAuthImageURL(state, newAuthImageURL: string) {
      state.authImageURL = newAuthImageURL;
    },

    setSignedInDestination(state, newDesination: string){
      state.signedInDestination = newDesination;
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

    setColourAssistanceMode(context, recVal: boolean){
      context.commit('setColourAssistanceMode', recVal);
    },

    setSignedIn(context, recVal: boolean){
      context.commit('setSignedIn', recVal);
    },

    setAuthDisplayName(context, recVal: string) {
      context.commit('setAuthDisplayName', recVal);
    },

    setAuthEmail(context, recVal: string) {
      context.commit('setAuthEmail', recVal);
    },

    setAuthImageURL(context, recVal: string) {
      context.commit('setAuthImageURL', recVal);
    },

    setSignedInDestination(context, recVal: string){
      context.commit('setSignedInDestination', recVal);
    }
  },
}

export default playerStore;