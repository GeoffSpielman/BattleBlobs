import database from "@/store/firebase";
import {ref, set, onChildAdded, onChildChanged} from "firebase/database";
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
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        },

        modifyPowerup(state, modifiedPowerup: PowerupEntry){
            state.powerupsList.splice(state.powerupsList.findIndex((powerup)=> powerup.name === modifiedPowerup.name), 1,  modifiedPowerup)
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        }
    },

    actions: {
        //firebase listeners
        initializeDatabaseListeners(context) {
            onChildAdded(ref(database, 'game/powerups'), (data) => {
                context.commit('addPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining, 'sortOrder': data.val().sortOrder});
            });

            onChildChanged(ref(database, 'game/powerups'), (data) => {
                context.commit('modifyPowerup', {'name': String(data.key), 'deployed': data.val().deployed, 'remaining': data.val().remaining, 'sortOrder': data.val().sortOrder});
            })

        },

        updatePowerupDeployed(_, payload: {'powerupName': string; 'newDeployedVal': number}){
            set(ref(database, 'game/powerups/' + payload.powerupName + '/deployed'), payload.newDeployedVal);
        },
        
    },
}

export default powerupStore;