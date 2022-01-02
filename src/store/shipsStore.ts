import firebase from './firebase'
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
    getFirebaseDatabase(context) {
      firebase.database.ref('ships').on('child_added', function (data) {
        context.commit('addShip', data.val());
      }),

      firebase.database.ref('ships').on('child_removed', function (data){
        context.commit('removeShip', data.key);
      })

      firebase.database.ref('ships').on('child_changed', function (data){
        context.commit('modifyShip', data.val());
      })
    },

    createShipOffsetsOnly(context, payload: {'offsets': number[][]; 'captainKey': string; 'shipNum': number}){
        const newShipRef = firebase.database.ref('ships').push();
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
              newShipRef.set(newShipEntry);
              context.dispatch('playerStore/setMyShipKey', {'shipKey': newShipRef.key, 'shipNum': payload.shipNum}, {root: true});
          }

    },

    overwriteShipOffsets(context, payload: {'shipKey': string; 'offsets': number[][]}){
      firebase.database.ref('ships/' + payload.shipKey + '/intactOffsets').set(payload.offsets);
    },

    deleteAllShips(context){
      firebase.database.ref('ships').set({'ghostShip': 'empty'});
    },

    overwriteShipSpawnRange(context, payload: {'shipKey': string; 'spawnRange': ShipSpawnRange}){
      firebase.database.ref('ships/' + payload.shipKey + '/spawnRange').set(payload.spawnRange);
    },

    overwriteShipAnchorPoint(context, payload: {'shipKey': string; 'anchorPoint': {'row': number; 'col': number}}){
      firebase.database.ref('ships/' + payload.shipKey + '/anchorPoint').set(payload.anchorPoint);
    },

    overwriteShipStatus(context, payload: {'shipKey': string; 'status': ShipStatus}){
      firebase.database.ref('ships/' + payload.shipKey + '/status').set(payload.status);
    },
  
  },
}

export default shipsStore;