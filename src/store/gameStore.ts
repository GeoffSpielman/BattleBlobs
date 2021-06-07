import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { GameStatus } from '@/models/enums'

interface GameState {
    gameStatus: GameStatus;
    currentPlayers: string[];
}

const gameStore: Module<GameState, RootState> = {
    namespaced: true,
    state: {
        gameStatus: GameStatus.WaitingOnPlayers,
        currentPlayers: [],
    },

    getters: {
        getGameStatus(state): GameStatus {
            return state.gameStatus
        },

        getcurrentPlayersList(state): string[]{
            return state.currentPlayers;
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
        }
    },

    actions: {

        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('game/status').on('value', function (snapshot) {
                context.commit('setGameStatus', snapshot.val());
            })
            firebase.database.ref('game/currentPlayers').on('child_added', function (data) {
                context.commit('addCurrentPlayer', data.val());
            }),
        
            firebase.database.ref('game/currentPlayers').on('child_removed', function (data){
                context.commit('removeCurrentPlayer', data.key);
            })              
        },


        setGameStatus(_, recStatus: GameStatus) {
            firebase.database.ref('game/status').set(recStatus);
        },


        setCurrentPlayersList(_, recPlayersList: string[]){
            firebase.database.ref('game/currentPlayers').set(recPlayersList);
        },

        addCurrentPlayer(context, newPlayerKey){
            context.commit('addCurrentPlayer', newPlayerKey);
        },

        removeCurrentPlayer(context, keyToRemove){
            context.commit('removeCurrentPlayer', keyToRemove);
        }
    },
}

export default gameStore;