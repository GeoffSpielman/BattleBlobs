import database from "@/store/firebase";
import {ref, set, push, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'
import { ShipEntry } from '@/models/interfaces'
import { ShipSpawnRange } from '@/models/interfaces'
import { ShipStatus } from '@/models/enums'

interface ShipsState {
  ships: ShipEntry[];
}

const shipsStore: Module<ShipsState, RootState> = {
  namespaced: true,
  state: {
    ships: [],
  },

  getters: {

    getShipsList(state): ShipEntry[] {
      return state.ships;
    },

    getIntactOffsetsUsingKey: (state) => (recKey: string) => {
      return state.ships.find((ship) => ship.key === recKey)?.intactOffsets;
    },

    getShipUsingKey: (state) => (recKey: string) => {
      return state.ships.find((ship) => ship.key === recKey);
    },

  },

  mutations: {
    
    addShip(state, newShipEntry: ShipEntry) {
      state.ships.push(newShipEntry);
    },
    
    removeShip(state, removedShipKey: string){
      const removedShipIndex = state.ships.findIndex((shipObj) => (shipObj.key === removedShipKey));
      state.ships.splice(removedShipIndex, 1);
    },

    modifyShip(state, updatedShip: ShipEntry){
      const modifiedshipIndex = state.ships.findIndex((shipObj) => (shipObj.key === updatedShip.key));
      state.ships.splice(modifiedshipIndex, 1, updatedShip);
    },  
  },

  actions: {

    //firebase listeners
    initializeDatabaseListeners(context) {
      
      onChildAdded(ref(database, 'gameData/ships'), (data) =>{
        context.commit('addShip', data.val());
      });

      onChildRemoved(ref(database, 'gameData/ships'), (data) =>{
        context.commit('removeShip', data.key);
      });

      onChildChanged(ref(database, 'gameData/ships'), (data) =>{
        context.commit('modifyShip', data.val());
      });
    },

    createShipOffsetsOnly(context, payload: {'offsets': number[][]; 'captainKey': string; 'shipNum': number}){
        const newShipRef = push(ref(database, 'gameData/ships'));
        if (newShipRef.key === null) {
            console.log("Error initializing new ship. Firebase returned a 'null' key")
        }
        else {
            const newShipEntry: ShipEntry = {
                'key': newShipRef.key,
                'captainKey': payload.captainKey,
                'status': ShipStatus.Incomplete,
                'intactOffsets': payload.offsets,
                'damagedOffsets': [],
                anchorPoint: {'row': -99, 'col': -99},
                spawnRange: {'rowMin': -99, 'rowMax': -99, 'colMin': -99, 'colMax': -99}
            }
            set(newShipRef, newShipEntry);
            context.dispatch('playerStore/setMyShipKey', {'shipKey': newShipRef.key, 'shipNum': payload.shipNum}, {root: true});
        }
    },

    overwriteShipOffsets(context, payload: {'shipKey': string; 'offsets': number[][]}){
      set(ref(database, 'gameData/ships/' + payload.shipKey + '/intactOffsets'), payload.offsets);
    },

    deleteAllShips(context){
      set(ref(database, 'gameData/ships'), {'ghostShip': 'empty'});
    },

    overwriteShipSpawnRange(context, payload: {'shipKey': string; 'spawnRange': ShipSpawnRange}){
      set(ref(database, 'gameData/ships/' + payload.shipKey + '/spawnRange'), payload.spawnRange);
    },

    overwriteShipAnchorPoint(context, payload: {'shipKey': string; 'anchorPoint': {'row': number; 'col': number}}){
      set(ref(database, 'gameData/ships/' + payload.shipKey + '/anchorPoint'), payload.anchorPoint);
    },

    overwriteShipStatus(context, payload: {'shipKey': string; 'status': ShipStatus}){
      set(ref(database, 'gameData/ships/' + payload.shipKey + '/status'), payload.status);
    },
  },
}

export default shipsStore;