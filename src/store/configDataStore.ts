import database from "@/store/firebase";
import {ref, set, onChildAdded, onChildRemoved, onValue} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'

interface ConfigDataState {
    gameID: string;
    gameName: string;
    mapSize: number;
}

const configDataStore: Module<ConfigDataState, RootState> = {
    namespaced: true,
    state: {
        gameID: "000",
        gameName: "",
        mapSize: 0,
    },

    getters: {
        getGameID(state): string{
            return state.gameID;
        },

        getGameName(state): string{
            return state.gameName
        },

        getMapSize(state): number{
            return state.mapSize
        }
    },

    mutations: {

        setGameID(state, newGameID: string){
            state.gameID= newGameID;
        },

        setGameName(state, newGameName: string){
            state.gameName = newGameName;
        },

        setMapSize(state, newMapSize: number){
            state.mapSize = newMapSize;
        }
    },

    actions: {

        //firebase listeners
        initializeDatabaseListeners(context) {
            
            onValue(ref(database,'configData/gameID'), (snapshot) => {
                context.commit('setGameID', snapshot.val());
            });
            
            onValue(ref(database,'configData/gameName'), (snapshot) => {
                context.commit('setGameName', snapshot.val());
            });

            onValue(ref(database,'configData/mapSize'), (snapshot) => {
                context.commit('setMapSize', snapshot.val());
            });
        },


        setGameID(_, recGameID: string) {
            set(ref(database, 'configData/gameID'), recGameID);
        },

        setGameName(_, recGameName: string) {
            set(ref(database, 'configData/gameName'), recGameName);
        },

        setMapSize(_, recMapSize: string) {
            set(ref(database, 'configData/mapSize'), recMapSize);
        },
    },
}

export default configDataStore;