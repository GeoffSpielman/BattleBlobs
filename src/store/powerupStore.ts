import firebase from './firebase'
import { ActionContext, Module } from 'vuex'
import { RootState } from './RootState'
import {PowerupEntry} from "@/models/interfaces"

interface PowerupState {
    powerupsList: PowerupEntry[];
}

const powerupStore: Module<PowerupState, RootState> = {
    namespaced: true,
    state: {
        powerupsList: []
    },

    getters: {
        getPowerupsList(state): PowerupEntry[] {
            return state.powerupsList;
        },
    },

    mutations: {
        addPowerup(state, newPowerup: PowerupEntry) {
            state.powerupsList.push(newPowerup);
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        },

        modifyPowerup(state, modifiedPowerup: PowerupEntry){
            state.powerupsList.splice(state.powerupsList.findIndex((powerup)=> powerup.name === modifiedPowerup.name), 1,  modifiedPowerup)
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        }
    },

    actions: {
        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('game/powerups').on('child_added', function (data) {
                context.commit('addPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining, 'sortOrder': data.val().sortOrder});
            }),

            firebase.database.ref('game/powerups').on('child_changed', function (data) {
                context.commit('modifyPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining, 'sortOrder': data.val().sortOrder});
            })

        },

        updatePowerupDeployed(_, payload: {'powerupName': string; 'newDeployedVal': number}){
            firebase.database.ref('game/powerups/' + payload.powerupName + '/deployed').set(payload.newDeployedVal);
        },
        
    },
}

export default powerupStore;