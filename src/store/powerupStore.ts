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

        getDeployedCount: (state) => (recPowerupName: string) => {
            return state.powerupsList.find((powerup)=> powerup.name === recPowerupName)?.deployed;
        },
       
    },

    mutations: {
        addPowerup(state, newPowerup: PowerupEntry) {
            state.powerupsList.push(newPowerup);
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        },

        /*
        modifyPowerup(state, modifiedPowerup: PowerupEntry){
            state.powerupsList.splice(state.powerupsList.findIndex((powerup)=> powerup.name === modifiedPowerup.name), 1,  modifiedPowerup)
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        }
        */
        createUsingConfigData(state, payload){
            let newPowerup: PowerupEntry = {
                name: payload.name,
                deployed: payload.deployed,
                sortOrder: payload.sortOrder,
                remaining: 0
            }
            state.powerupsList.push(newPowerup);
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        },

        overwriteConfigData(state, payload){
            // eslint-disable-next-line
            let revisedPowerupData: PowerupEntry = state.powerupsList.find((powerup) => powerup.name === payload.name)!;
            revisedPowerupData.deployed = payload.deployed;
            revisedPowerupData.sortOrder = payload.sortOrder;
            const modifiedPowerupIndex = state.powerupsList.findIndex((powerup) => powerup.name === payload.name);
            state.powerupsList.splice(modifiedPowerupIndex, 1, revisedPowerupData);
        },

        createUsingGameData(state, payload){
            let newPowerup: PowerupEntry = {
                name: payload.name,
                deployed: 0,
                sortOrder: 0,
                remaining: payload.remaining
            }
            state.powerupsList.push(newPowerup);
            state.powerupsList.sort((a,b) => a.sortOrder - b.sortOrder);
        },

        overwriteGameData(state, payload){
            // eslint-disable-next-line
            let revisedPowerupData: PowerupEntry = state.powerupsList.find((powerup) => powerup.name === payload.name)!;
            revisedPowerupData.remaining = payload.remaining;
            const modifiedPowerupIndex = state.powerupsList.findIndex((powerup) => powerup.name === payload.name);
            state.powerupsList.splice(modifiedPowerupIndex, 1, revisedPowerupData);
        }
    },

    actions: {
        //firebase listeners
        initializeDatabaseListeners(context) {
            //when a new powerup is loaded, either create a new entry in the powerupsList or append the new properties to the existing entry
            onChildAdded(ref(database, 'configData/powerupsDeployed'), (data) => {
                //element already exists in array
                if (context.state.powerupsList.some((powerup) => powerup.name === data.key)){
                    context.commit('overwriteConfigData', {'name': String(data.key), 'deployed': data.val().deployed, 'sortOrder': data.val().sortOrder});
                }
                //otherwise make a new entry in the array
                else{
                    context.commit('createUsingConfigData', {'name': String(data.key), 'deployed': data.val().deployed, 'sortOrder': data.val().sortOrder});
                }
            });

            onChildChanged(ref(database, 'configData/powerupsDeployed'), (data) => {
                context.commit('overwriteConfigData', {'name': String(data.key), 'deployed': data.val().deployed, 'sortOrder': data.val().sortOrder});
            });


            onChildAdded(ref(database, 'gameData/powerupsRemaining'), (data) => {
                //element already exists in array
                if (context.state.powerupsList.some((powerup) => powerup.name === data.key)){
                    context.commit('overwriteGameData', {'name': String(data.key), 'remaining': data.val()});
                }
                //otherwise make a new entry in the array
                else{
                    context.commit('createUsingGameData', {'name': String(data.key), 'remaining': data.val()});
                }
            });

            onChildChanged(ref(database, 'gameData/powerupsRemaining'), (data) => {
                context.commit('overwriteGameData', {'name': String(data.key), 'remaining': data.val()});
            });
            

        },

        updatePowerupDeployed(_, payload: {'powerupName': string; 'newDeployedVal': number}){
            set(ref(database, 'configData/powerupsDeployed/' + payload.powerupName + '/deployed'), payload.newDeployedVal);
        },
        
    },
}

export default powerupStore;