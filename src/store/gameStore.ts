import database from "@/store/firebase";
import {ref, set, onChildAdded, onChildRemoved, onValue} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'
import { GameStatus } from '@/models/enums'

interface GameState {
    gameStatus: GameStatus;
    currentPlayers: string[];
    whoseTurn: string;
}

const gameStore: Module<GameState, RootState> = {
    namespaced: true,
    state: {
        gameStatus: GameStatus.WaitingOnPlayers,
        currentPlayers: [],
        whoseTurn: "TBD",
    },

    getters: {
        getGameStatus(state): GameStatus {
            return state.gameStatus
        },

        getcurrentPlayersList(state): string[]{
            return state.currentPlayers;
        },

        getWhoseTurn(state): string{
            return state.whoseTurn;
        }
    },

    mutations: {
        setGameStatus(state, newGameStatus: GameStatus) {
            state.gameStatus = newGameStatus;
        },

        addCurrentPlayer(state, newPlayerKey: string){
            state.currentPlayers.push(newPlayerKey);
        },

        removeCurrentPlayer(state, keyToRemove){
            state.currentPlayers.splice(state.currentPlayers.findIndex((playerKey) => keyToRemove === playerKey), 1);
        },

        setWhoseTurn(state, playerKey: string){
            state.whoseTurn = playerKey;
        }
    },

    actions: {

        //firebase listeners
        initializeDatabaseListeners(context) {
            
            onValue(ref(database,'game/status'), (snapshot) => {
                context.commit('setGameStatus', snapshot.val());
            });
            
            
            onChildAdded(ref(database, 'game/currentPlayers'), (data) => {
                context.commit('addCurrentPlayer', data.val());
            });

            onChildRemoved(ref(database, 'game/currentPlayers'), (data) =>{
                context.commit('removeCurrentPlayer', data.key);
            });
        

            onValue(ref(database,'game/whoseTurn'), (snapshot) => {
                context.commit('setWhoseTurn', snapshot.val());
            });
        },


        setGameStatus(_, recStatus: GameStatus) {
            set(ref(database, 'game/status'), recStatus)
        },


        setCurrentPlayersList(_, recPlayersList: string[]){
            set(ref(database, 'game/currentPlayers'), recPlayersList);
        },

        addCurrentPlayer(context, newPlayerKey){
            context.commit('addCurrentPlayer', newPlayerKey);
        },

        removeCurrentPlayer(context, keyToRemove){
            context.commit('removeCurrentPlayer', keyToRemove);
        },

        setWhoseTurn(_, playerKey){
            set(ref(database, 'game/whoseTurn'), playerKey)
        },

        incrementWhoseTurn(context){
            let nextIndex: number = context.state.currentPlayers.findIndex((playerKey) => (playerKey === context.state.whoseTurn)) + 1;
            if (nextIndex >= context.state.currentPlayers.length){
                nextIndex = 0;
            }
            context.dispatch('setWhoseTurn', context.state.currentPlayers[nextIndex]);
        }
    },
}

export default gameStore;