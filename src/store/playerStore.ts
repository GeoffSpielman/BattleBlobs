import database from "@/store/firebase";
import {ref, set, push, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'
import { PlayerEntry } from '@/models/interfaces'
import { PlayerStatus } from '@/models/enums'
import { PowerupName } from '@/models/enums'

interface PlayerState {
  myUID: string;
  players: PlayerEntry[];
}

const playerStore: Module<PlayerState, RootState> = {
  namespaced: true,
  state: {
    myUID: "",
    players: [],
  },

  getters: {

    getUIDinDatabase: (state) => (recUID: string) => {
      return state.players.some((player) => player.uid === recUID);
    },
    
    getMyUID(state): string{
      return state.myUID;
    },

    getPlayersList(state): PlayerEntry[] {
      return state.players;
    },

    getNameAvailable: (state) => (recName: string) => {
      return state.players.findIndex((player)=> player.name?.toLowerCase() === recName.toLowerCase()) === -1 ? true: false
    },

    getAliasAvailable: (state) => (recAlias: string) => {
      return state.players.findIndex((player)=> player.alias?.toLowerCase() === recAlias.toLowerCase()) === -1 ? true: false
    },

    getMyName(state): string | undefined{
      return state.players.find((player) => player.uid === state.myUID)?.name;
    },

    getMyAlias(state): string | undefined{      
      return state.players.find((player) => player.uid === state.myUID)?.alias;
    },

    getMyColour(state): string | undefined{
      return state.players.find((player) => player.uid === state.myUID)?.colour;
    },

    getMyShipKey: (state) => (recShipNum: number) => {
      const playerObj = state.players.find((player) => player.uid === state.myUID);
      if (recShipNum === 1){
        return playerObj?.shipOneKey;
      }
      else if (recShipNum === 2){
        return playerObj?.shipTwoKey;
      }
    },

    getMyCaptainNumber(state): number | undefined{
      return state.players.find((player) => player.uid === state.myUID)?.captainNum;
    },

    getPlayersReadyCount(state): number{
      let counter: number = 0;
      state.players.forEach(player => {
        if (player.status === PlayerStatus.ReadyToStart){
          counter ++;
        }
      })
      return counter;
    },

    getAliasUsingUID: (state) => (recUID: string) => {
      return state.players.find((player) => player.uid === recUID)?.alias;
    },

    getColourUsingUID: (state) => (recUID: string) => {
      return state.players.find((player) => player.uid === recUID)?.colour;
    },

    getCaptainNumUsingUID: (state) => (recUID: string) => {
      return state.players.find((player) => player.uid === recUID)?.captainNum;
    },

    getPowerupsUsingUID: (state) => (recUID: string) => {
      return state.players.find((player) => player.uid === recUID)?.powerups;
    },

    getShipKeysUsingUID: (state) => (recUID: string) => {
      return [state.players.find((player) => player.uid === recUID)?.shipOneKey, state.players.find((player) => player.uid === recUID)?.shipTwoKey]
    },

    getCaptainNumberUsingUID: (state) => (recUID: string) => {
      return state.players.find((player) => player.uid === recUID)?.captainNum;
    },

  },

  mutations: {
    
    addPlayer(state, newPlayerEntry: PlayerEntry) {
      state.players.push(newPlayerEntry);
    },
    
    removePlayer(state, removedPlayerUID: string){
      const removedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.uid === removedPlayerUID));
      state.players.splice(removedPlayerIndex, 1);
    },

    modifyPlayer(state, updatedPlayer: PlayerEntry){
      const modifiedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.uid === updatedPlayer.uid));
      state.players.splice(modifiedPlayerIndex, 1, updatedPlayer);
    },

    setMyUID(state, recUID: string) {
      state.myUID = recUID;
    },
  
  },

  actions: {

    //firebase listeners
    initializeDatabaseListeners(context) {

      onChildAdded(ref(database, 'players'), (data) => {
        context.commit('addPlayer', data.val());
      });

      onChildRemoved(ref(database, 'players'), (data) => {
        context.commit('removePlayer', data.key);
      });

      onChildChanged(ref(database, 'players'), (data) => {
        context.commit('modifyPlayer', data.val());
      });
    },

    
    addPlayer(_, newPlayer: PlayerEntry) {
      set(push(ref(database, 'players')), newPlayer);
    },

    removePlayer(_, recUID: string) {
      set(ref(database, 'players/' + recUID), null);
    },

    modifyPlayer(_, modifiedPlayer: PlayerEntry){
      set(ref(database, 'players/' + modifiedPlayer.uid), modifiedPlayer);
    },

    intializePlayer(context, payload: {'uid': string; 'name': string}) {
      
      const newPlayerEntry: PlayerEntry = {
        'uid': payload.uid,
        'status': PlayerStatus.StartScreen,
        'name': payload.name === null ? '' : payload.name,
        'alias': '',
        'colour': '',
        'captainNum': -1,
        'shipOneKey': '',
        'shipTwoKey': '',
        'powerups': {[PowerupName.None]: -1},
      }

      context.commit('setMyUID', payload.uid);
      set(ref(database, 'players/' + payload.uid), newPlayerEntry);
    },
    

    setMyUID(context, recUID: string){
      context.commit('setMyUID', recUID);  
    },

    setMyStatus(context, recStatus: PlayerStatus){
      //first make sure you haven't been removed from the database
      if (context.state.players.some((playerObj) => (playerObj.uid === context.state.myUID))){
        set(ref(database, 'players/' + context.state.myUID + '/status'), recStatus);
      }
    },

    setMyName(context, recName: string){
      set(ref(database, 'players/' + context.state.myUID + '/name'), recName);
    },

    setMyAlias(context, recAlias: string){
      set(ref(database, 'players/' + context.state.myUID + '/alias'), recAlias);
    },

    setMyShipKey(context, payload: {'shipKey': string; 'shipNum': number}){
      if (payload.shipNum === 1){
        set(ref(database, 'players/' + context.state.myUID + '/shipOneKey'), payload.shipKey);

      }
      else if (payload.shipNum === 2){
        set(ref(database, 'players/' + context.state.myUID + '/shipTwoKey'), payload.shipKey);
      }
    },


    lockedInUploadData(context){
      //set the colour hex code
      set(ref(database, 'players/' + context.state.myUID + '/colour'), context.rootGetters['clientSpecificStore/getSelectedColourHex'].substring(1));
      
      for (let i = 1; i < 3; i++){
        //If client's ship key has never been set, create a new entry in ships store
        if (context.getters.getMyShipKey(i) === ""){
          const payloadForCreation = {'offsets': context.rootGetters['clientSpecificStore/getShipOffsets'](i), 'captainKey': context.state.myUID, 'shipNum': i}
          context.dispatch('shipsStore/createShipOffsetsOnly', payloadForCreation, {root: true});
          
          //otherwise modify the entry in the ships store
        } else{
          context.dispatch('shipsStore/overwriteShipOffsets', {'shipKey': context.getters.getMyShipKey(i), 'offsets': context.rootGetters['clientSpecificStore/getShipOffsets'](i)}, {root: true});
        }

      }
    },
   
    deleteAllPlayersExceptMe(context){
      const myPlayerObj = context.state.players.find((player) => player.uid === context.state.myUID);
      if (myPlayerObj !== undefined){
        set(ref(database, 'players/'), {[context.state.myUID]: myPlayerObj});
      }
      else{
        console.log("Couldn't find host's own entry in the players database");
      }
    },

    addPlayersToGame(context){
      let readyPlayerUIDsList: string[] = [];
      let captainNum: number = 1;
      context.state.players.forEach(playerObj => {
        if (playerObj.status === PlayerStatus.ReadyToStart){
          readyPlayerUIDsList.push(String(playerObj.uid));
          set(ref(database, 'players/' + playerObj.uid + '/status'), PlayerStatus.InGame);
          set(ref(database, 'players/' + playerObj.uid + '/captainNum'), captainNum);
          captainNum ++;
        }
      });
      context.dispatch('gameDataStore/setCurrentPlayersList', readyPlayerUIDsList, {root: true});
      context.dispatch('chatStore/generateChatPairings', readyPlayerUIDsList, {root: true});
      context.dispatch('gameDataStore/setWhoseTurn', readyPlayerUIDsList[0], {root: true});
    }
  },
}

export default playerStore;