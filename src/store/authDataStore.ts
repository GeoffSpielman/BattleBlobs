import { authEntry } from "@/models/interfaces";
import database from "@/store/firebase";
import {ref, set, push, onChildAdded, onChildRemoved, get} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'

function formatEmailForKey(recEmail: string): string{
    //According to firebase: Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]""
    return recEmail.replaceAll(new RegExp(/[#$\].[]/g), '')
}

function compareAuthEntryEmails(a: authEntry, b: authEntry){
    return a.email.toUpperCase() < b.email.toUpperCase() ? -1 : 1;
}

interface AuthState {
    authorizedPlayers: authEntry[];
    authorizedHosts: authEntry[];
}

const authDataStore: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        authorizedPlayers: [],
        authorizedHosts: [],
    },

    getters: {
        getAuthorizedPlayers(state): authEntry[] {
            return state.authorizedPlayers
        },

        getAuthorizedHosts(state): authEntry[]{
            return state.authorizedHosts;
        },

        getPlayerOnWhitelist: (state) => (recPlayerEmail: string) => {
            return state.authorizedPlayers.some((player) => player.email === recPlayerEmail);
        },

        getPlayerUIDmissing: (state) => (recPlayerEntry: authEntry) => {
            return state.authorizedPlayers.find((player) => player.email === recPlayerEntry.email)?.uid !== recPlayerEntry.uid;
        },

        getHostOnWhitelist: (state) => (recHostEmail: string) => {
            return state.authorizedHosts.some((host) => host.email === recHostEmail);
        },

        getHostUIDmissing: (state) => (recHostEntry: authEntry) => {
            return state.authorizedHosts.find((host) => host.email === recHostEntry.email)?.uid !== recHostEntry.uid;
        },
    },

    mutations: {

        addAuthorizedPlayer(state, newAuthorizedPlayer: authEntry) {
            //keep authorized players list sorted alphabetically by email
            state.authorizedPlayers.push(newAuthorizedPlayer);
            const tempArray = state.authorizedPlayers
            tempArray.sort(compareAuthEntryEmails)
            state.authorizedPlayers = tempArray;
        },

        removeAuthorizedPlayer(state, removedAuthorizedPlayer: authEntry){
            state.authorizedPlayers.splice(state.authorizedPlayers.findIndex((player) => player.email === removedAuthorizedPlayer.email), 1);
        },

        addAuthorizedHost(state, newAuthorizedHost: authEntry) {
            state.authorizedHosts.push(newAuthorizedHost);
        },

        removeAuthorizedHost(state, removedAuthorizedHost: authEntry){
            state.authorizedHosts.splice(state.authorizedHosts.findIndex((host) => host.email === removedAuthorizedHost.email), 1);
        }

    },

    actions: {

        //firebase listeners
        initializeDatabaseListeners(context) {

            onChildAdded(ref(database, 'authData/playersWhiteList'), (data) => {
                const newPlayer: authEntry = {
                    uid: String(data.key),
                    email: data.val()
                }
                context.commit('addAuthorizedPlayer', newPlayer);
            });

            onChildRemoved(ref(database, 'authData/playersWhiteList'), (data) => {
                const removedPlayer: authEntry = {
                    uid: String(data.key),
                    email: data.val()
                }
                context.commit('removeAuthorizedPlayer', removedPlayer);
            });

            onChildAdded(ref(database, 'authData/hostWhiteList'), (data) => {
                const newHost: authEntry = {
                    uid: String(data.key),
                    email: data.val()
                }
                context.commit('addAuthorizedHost', newHost);
            });

            onChildRemoved(ref(database, 'authData/hostWhiteList'), (data) => {
                const removedHost: authEntry = {
                    uid: String(data.key),
                    email: data.val()
                }
                context.commit('removeAuthorizedHost', removedHost);
            });
        },

        addAuthorizedPlayerEmail(_, newAuthorizedPlayerEmail: string){
            set((ref(database, 'authData/playersWhiteList/' + formatEmailForKey(newAuthorizedPlayerEmail))), newAuthorizedPlayerEmail);
        },

        removeAuthorizedPlayerEmail(context, removedAuthorizedPlayerEmail: string){
            //find the entry that has the given email address (key could be email or UID)
            const keyToRemove = context.state.authorizedPlayers.find((player) => player.email === removedAuthorizedPlayerEmail)?.uid;
            set(ref(database, 'authData/playersWhiteList/' + keyToRemove), null);
        },

        addAuthorizedPlayerEntry(_, newAuthorizedPlayer: authEntry){
            set(ref(database, 'authData/playersWhiteList/' + newAuthorizedPlayer.uid), newAuthorizedPlayer.email);
        },

        removeAuthorizedHostEmail(context, removedAuthorizedHostEmail: string){
            //find the entry that has the given email address (key could be email or UID)
            const keyToRemove = context.state.authorizedHosts.find((host) => host.email === removedAuthorizedHostEmail)?.uid;
            set(ref(database, 'authData/hostWhiteList/' + keyToRemove), null);
        },

        addAuthorizedHostEntry(_, newAuthorizedHost: authEntry){
            set(ref(database, 'authData/hostWhiteList/' + newAuthorizedHost.uid), newAuthorizedHost.email);
        },
    },
}

export default authDataStore;