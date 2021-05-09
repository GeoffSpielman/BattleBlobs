import firebase from './firebase'
import { Module } from 'vuex'
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
        },

        modifyPowerup(state, modifiedPowerup: PowerupEntry){
            state.powerupsList.splice(state.powerupsList.findIndex((powerup)=> powerup.name === modifiedPowerup.name), 1,  modifiedPowerup)
        }
    },

    actions: {
        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('game/powerups').on('child_added', function (data) {
                context.commit('addPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining});
            }),

            firebase.database.ref('game/powerups').on('child_changed', function (data) {
                context.commit('addPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining});
            })

        },
        
    },
}

export default powerupStore;