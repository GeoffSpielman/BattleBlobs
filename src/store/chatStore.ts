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
        getAllPairings(state): { [key: string]: string[] } {
            return state.pairings
        },

        getMyPairings: (state, getters, rootState, rootGetters) => (recKey: string) => {
            let pairingList: {'pairingKey': string; 'otherPlayerAlias': string}[] = [];
            for (const [pairingKey, participantsList] of Object.entries(state.pairings)) {
                if (participantsList.includes(recKey)) {
                    const otherPlayerKey = participantsList[0] === recKey ? participantsList[1] : participantsList[0];
                    pairingList.push({'pairingKey': pairingKey, 'otherPlayerAlias': rootGetters['playerStore/getAliasUsingKey'](otherPlayerKey)});
                }
            }
            return pairingList;
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
            for (let i = 0; i < recIDsList.length - 1; i++) {
                for (let j = i + 1; j < recIDsList.length; j++) {
                    let pairingRef = firebase.database.ref('chat/pairings').push()
                    pairingRef.set([recIDsList[i], recIDsList[j]]);
                }
            }
        },

        deleteAllChats(_){
            firebase.database.ref('chat').set(null);
            console.log("nuking chats");
        }

    },
}

export default chatStore;