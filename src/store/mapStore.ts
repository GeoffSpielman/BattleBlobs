import firebase from './firebase'
import { ActionContext, Module } from 'vuex'
import { RootState } from './RootState'

interface MapState {
    mapSize: number;
}

const mapStore: Module<MapState, RootState> = {
    namespaced: true,
    state: {
        mapSize: 0,
    },

    getters: {
        getMapSize(state): number {
            return state.mapSize;
        },
    },

    mutations: {
        changeMapSize(state, newMapSize: number){
            state.mapSize = newMapSize;
        }
    },

    actions: {
        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('map/mapSize').on('value', function (snapshot) {
                context.commit('changeMapSize', snapshot.val());
            })
        },
        
        updateMapSize(_, newMapSize: number){
            firebase.database.ref('map/mapSize').set(newMapSize);
        }
    },
}

export default mapStore;