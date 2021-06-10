import firebase from './firebase'
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
        getFirebaseDatabase(context) {
            firebase.database.ref('game/status').on('value', function (snapshot) {
                context.commit('setGameStatus', snapshot.val());
            }),

            firebase.database.ref('game/currentPlayers').on('child_added', function (data) {
                context.commit('addCurrentPlayer', data.val());
            }),
        
            firebase.database.ref('game/currentPlayers').on('child_removed', function (data){
                context.commit('removeCurrentPlayer', data.key);
            }),

            firebase.database.ref('game/whoseTurn').on('value', function (snapshot) {
                context.commit('setWhoseTurn', snapshot.val());
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
        },

        setWhoseTurn(_, playerKey){
            firebase.database.ref('game/whoseTurn').set(playerKey);
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