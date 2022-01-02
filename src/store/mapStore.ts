import firebase from './firebase'
import {Module } from 'vuex'
import { RootState } from './RootState'
import { determineShipSpawnRange } from "@/algorithms/determineShipSpawnRange";
import { addShipToMap } from "@/algorithms/addShipToMap";
import { ShipSpawnRange, GridSquare, AddShipToMapReturn } from "@/models/interfaces";
import { MapType, PowerupName, ShipStatus } from "@/models/enums"

interface MapState {
    mapSize: number;
    mapData: {[coords: string]: GridSquare};
}

const mapStore: Module<MapState, RootState> = {
    namespaced: true,
    state: {
        mapSize: 0,
        mapData: {},
    },

    getters: {
        getMapSize(state): number {
            return state.mapSize;
        },

        getMapData(state): {[coords: string]: GridSquare}{
            return state.mapData;
        }
    },

    mutations: {
        changeMapSize(state, newMapSize: number){
            state.mapSize = newMapSize;
        },

        addSquareToMap(state, newSquare: GridSquare){
            state.mapData[newSquare.row + "," + newSquare.col] = newSquare;
        },

        removeSquareFromMap(state, recSquareKey: string){
            delete state.mapData[recSquareKey];
        },

        updateMapSquare(state, recSquare: GridSquare){
            state.mapData[recSquare.row + "," + recSquare.col] = recSquare;
        }

    },

    actions: {
        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('map/mapSize').on('value', function (snapshot) {
                context.commit('changeMapSize', snapshot.val());
            }),

            firebase.database.ref('map/mapData').on("child_added", function(data){
                context.commit('addSquareToMap', data.val())
            }),

            firebase.database.ref('map/mapData').on('child_removed', function (data){
                context.commit('removeSquareFromMap', data.key);
            }),

            firebase.database.ref('map/mapData').on('child_changed', function (data){
                context.commit('updateMapSquare', data.val());
            })
        },
        
        updateMapSize(_, newMapSize: number){
            firebase.database.ref('map/mapSize').set(newMapSize);
        },

        initializeMap(context){

            //create a new, empty map and populate it
            let newMap: {[coords: string]: GridSquare} = {};
            for (let rowIdx = 0; rowIdx < context.state.mapSize; rowIdx ++){
                for (let colIdx = 0; colIdx < context.state.mapSize; colIdx ++){
                    newMap[rowIdx + "," + colIdx] = {row: rowIdx, col: colIdx, revealed: false, mapType: MapType.Water, powerup: PowerupName.None, captains: []};
                }
            }
            
            //iterate through all active players
            let activePlayers: string[] = context.rootGetters["gameStore/getcurrentPlayersList"];
            activePlayers.forEach(function(playerKey){

                //iterate through each ship belonging to the current player
                let shipKeys: string[] = context.rootGetters["playerStore/getShipKeysUsingKey"](playerKey);
                shipKeys.forEach(function(shipKey){
                    
                    //Compute the spawn ranges for the ship
                    let spawnRange: ShipSpawnRange = determineShipSpawnRange(context.rootGetters["shipsStore/getIntactOffsetsUsingKey"](shipKey), context.state.mapSize)
                    context.dispatch('shipsStore/overwriteShipSpawnRange', {'shipKey': shipKey, 'spawnRange': spawnRange}, {root: true});

                    //Add the ship to the map
                    let result: AddShipToMapReturn = addShipToMap(context.rootGetters["shipsStore/getShipUsingKey"](shipKey), newMap, context.state.mapSize);

                    if (result.successful){
                        newMap = result.mapData;
                        //update the ship with it's new anchor point and status
                        context.dispatch('shipsStore/overwriteShipAnchorPoint', {'shipKey': shipKey, 'anchorPoint': result.anchorPoint}, {root: true});
                        context.dispatch('shipsStore/overwriteShipStatus', {'shipKey': shipKey, 'status': ShipStatus.Hidden}, {root: true});
                    }
                    else{
                        console.log("Uh oh, algorithm couldn't place ship " + shipKey);
                    }
                })
            })

            //upload the initialized map
            firebase.database.ref('map/mapData').set(newMap);
        },

        revealSquare(context, coordString: string){
            firebase.database.ref('map/mapData/' + coordString + '/revealed').set(true);
        }


    },
}

export default mapStore;