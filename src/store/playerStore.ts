import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { PlayerEntry } from '@/models/interfaces'
import { PlayerStatus } from '@/models/enums'
import { PowerupName } from '@/models/enums'

interface PlayerState {
  myKey: string;
  players: PlayerEntry[];
}

const playerStore: Module<PlayerState, RootState> = {
  namespaced: true,
  state: {
    myKey: "",
    players: [],
  },

  getters: {
    getMyKey(state): string{
      return state.myKey;
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
      return state.players.find((player) => player.key === state.myKey)?.name;
    },

    getMyAlias(state): string | undefined{      
      return state.players.find((player) => player.key === state.myKey)?.alias;
    },

    getMyShipKey: (state) => (recShipNum: number) => {
      const playerObj = state.players.find((player) => player.key === state.myKey);
      if (recShipNum === 1){
        return playerObj?.shipOneKey;
      }
      else if (recShipNum === 2){
        return playerObj?.shipTwoKey;
      }
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

    getPlayerKeyInDatabase: (state) => (recKey: string) => {
      return (state.players.findIndex((player) => player.key === recKey) === -1) ? false : true;
    },

    getAliasUsingKey: (state) => (recKey: string) => {
      return state.players.find((player) => player.key === recKey)?.alias;
    },

    getColourUsingKey: (state) => (recKey: string) => {
      return state.players.find((player) => player.key === recKey)?.colour;
    },

    getCaptainNumUsingKey: (state) => (recKey: string) => {
      return state.players.find((player) => player.key === recKey)?.captainNum;
    },

    getPowerupsUsingKey: (state) => (recKey: string) => {
      return state.players.find((player) => player.key === recKey)?.powerups;
    },

  },

  mutations: {
    
    addPlayer(state, newPlayerEntry: PlayerEntry) {
      state.players.push(newPlayerEntry);
    },
    
    removePlayer(state, removedPlayerKey: string){
      const removedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.key === removedPlayerKey));
      state.players.splice(removedPlayerIndex, 1);
    },

    modifyPlayer(state, updatedPlayer: PlayerEntry){
      const modifiedPlayerIndex = state.players.findIndex((playerObj) => (playerObj.key === updatedPlayer.key));
      state.players.splice(modifiedPlayerIndex, 1, updatedPlayer);
    },

    setMyKey(state, recKey: string) {
      state.myKey = recKey;
    },
  
  },

  actions: {

    //firebase listeners
    getFirebaseDatabase(context) {
      firebase.database.ref('players').on('child_added', function (data) {
        context.commit('addPlayer', data.val());
      }),

      firebase.database.ref('players').on('child_removed', function (data){
        context.commit('removePlayer', data.key);
      })

      firebase.database.ref('players').on('child_changed', function (data){
        context.commit('modifyPlayer', data.val());
      })
    },

    addPlayer(_, newPlayer: PlayerEntry) {
      const newPlayerRef = firebase.database.ref('players').push();
      newPlayerRef.set(newPlayer);
    },

    removePlayer(_, recKey: string) {
      firebase.database.ref('players/' + recKey).remove()
    },

    modifyPlayer(_, modifedPlayer: PlayerEntry){
      firebase.database.ref('players/' + modifedPlayer.key).set(modifedPlayer);
    },

    intializeClient(context) {
      const newClientRef = firebase.database.ref('players').push();
      if (newClientRef.key === null) {
        console.log("Error initializing new client. Firebase returned a 'null' key")
      }
      else {
        const newPlayerEntry: PlayerEntry = {
          'key': newClientRef.key,
          'status': PlayerStatus.StartScreen,
          'name': '',
          'alias': '',
          'colour': '',
          'captainNum': -1,
          'shipOneKey': '',
          'shipTwoKey': '',
          'powerups': {[PowerupName.None]: -1},
        }
        context.commit('setMyKey', newClientRef.key)
        newClientRef.set(newPlayerEntry);
      }
    },

    setMyKey(context, recKey: string){
      context.commit('setMyKey', recKey);  
    },

    setMyStatus(context, recStatus: PlayerStatus){
      //first make sure you haven't been removed from the database
      if (context.state.players.findIndex((playerObj) => (playerObj.key === context.state.myKey)) !== -1){
        firebase.database.ref('players/' + context.state.myKey + '/status').set(recStatus);
      }      
    },

    setMyName(context, recName: string){
      firebase.database.ref('players/' + context.state.myKey + '/name').set(recName);
    },

    setMyAlias(context, recAlias: string){
      firebase.database.ref('players/' + context.state.myKey + '/alias').set(recAlias);
    },

    setMyShipKey(context, payload: {'shipKey': string; 'shipNum': number}){
      if (payload.shipNum === 1){
        firebase.database.ref('players/' + context.state.myKey + '/shipOneKey').set(payload.shipKey);

      }
      else if (payload.shipNum === 2){
        firebase.database.ref('players/' + context.state.myKey + '/shipTwoKey').set(payload.shipKey);
      }
    },


    lockedInUploadData(context){
      //set the colour hex code
      firebase.database.ref('players/' + context.state.myKey + '/colour').set(context.rootGetters['clientSpecificStore/getSelectedColourHex'].substring(1));
      
      for (let i = 1; i < 3; i++){
        //If client's ship key has never been set, create a new entry in ships store
        if (context.getters.getMyShipKey(i) === ""){
          const payloadForCreation = {'offsets': context.rootGetters['clientSpecificStore/getShipOffsets'](i), 'shipNum': i}
          context.dispatch('shipsStore/createShipOffsetsOnly', payloadForCreation, {root: true});
          
          //otherwise modify the entry in the ships store
        } else{
          context.dispatch('shipsStore/overwriteShipOffsets', {'shipKey': context.getters.getMyShipKey(i), 'offsets': context.rootGetters['clientSpecificStore/getShipOffsets'](i)}, {root: true});
        }

      }
    },
   
    deleteAllPlayersExceptMe(context){
      const myPlayerObj = context.state.players.find((player) => player.key === context.state.myKey);
      if (myPlayerObj !== undefined){
        firebase.database.ref('players/').set({[context.state.myKey]: myPlayerObj});
      }
      else{
        console.log("Couldn't find host's own entry in the players database");
      }
    },

    addPlayersToGame(context){
      let readyPlayerIDsList: string[] = [];
      let captainNum: number = 1;
      context.state.players.forEach(playerObj => {
        if (playerObj.status === PlayerStatus.ReadyToStart){
          readyPlayerIDsList.push(String(playerObj.key));
          firebase.database.ref('players/' + playerObj.key + '/status').set(PlayerStatus.InGame);
          firebase.database.ref('players/' + playerObj.key + '/captainNum').set(captainNum);
          captainNum ++;
        }
      });
      context.dispatch('gameStore/setCurrentPlayersList', readyPlayerIDsList, {root: true});
      context.dispatch('chatStore/generateChatPairings', readyPlayerIDsList, {root: true});
    }
  },
}

export default playerStore;