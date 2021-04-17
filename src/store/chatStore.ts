import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'

interface ChatState {
    pairings: { [key: string]: string[] };
}

const chatStore: Module<ChatState, RootState> = {
    namespaced: true,
    state: {
        pairings: {}
    },

    getters: {
        getPairings(state): { [key: string]: string[] } {
            return state.pairings
        },
    },

    mutations: {
        addPairing(state, newPairing: { key: string; val: string[] }) {
            state.pairings[newPairing.key] = newPairing.val;
        },
    },

    actions: {
        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('chat/pairings').on('child_added', function (data) {
                context.commit('addPairing', { 'key': data.key, 'val': data.val() });
            })
        },

        generateChatPairings(context, recIDsList) {
            console.log("received the following list of IDs:")
            console.log(recIDsList);

            for (let i = 0; i < recIDsList.length - 1; i ++){
                for (let j = i + 1; j < recIDsList.length; j++){
                    let pairingRef = firebase.database.ref('chat/pairings').push()
                    pairingRef.set([recIDsList[i], recIDsList[j]]);
                }
            }
        }

    },
}

export default chatStore;