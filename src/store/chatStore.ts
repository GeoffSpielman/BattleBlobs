import database from "@/store/firebase";
import {ref, push, set, onChildAdded} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'
import {ChatEntry} from "@/models/interfaces"

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
            let pairingList: ChatEntry[] = [];
            for (const [pairingKey, participantsList] of Object.entries(state.pairings)) {
                if (participantsList.includes(recKey)) {
                    const otherPlayerKey = participantsList[0] === recKey ? participantsList[1] : participantsList[0];
                    pairingList.push({
                        'pairingKey': pairingKey, 
                        'otherPlayerAlias': rootGetters['playerStore/getAliasUsingKey'](otherPlayerKey),
                        'otherPlayerColour': rootGetters['playerStore/getColourUsingKey'](otherPlayerKey), 
                        'showNotification': false
                    });
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
        initializeDatabaseListeners(context) {
            onChildAdded(ref(database, 'gameData/chat/pairings'), (data) => {
                context.commit('addPairing', { 'key': data.key, 'val': data.val() });
            });
        },

        generateChatPairings(context, recIDsList) {
            for (let i = 0; i < recIDsList.length - 1; i++) {
                for (let j = i + 1; j < recIDsList.length; j++) {
                    set(push(ref(database, 'gameData/chat/pairings')), [recIDsList[i], recIDsList[j]]); 
                }
            }
        },

        deleteAllChats(_) {
            set(ref(database, 'gameData/chat'), null);
        }
    },
}

export default chatStore;