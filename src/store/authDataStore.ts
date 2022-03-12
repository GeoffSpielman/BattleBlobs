import database from "@/store/firebase";
import {ref, set, push, onChildAdded, onChildRemoved} from "firebase/database";
import { Module } from 'vuex'
import { RootState } from './RootState'

function formatEmailForDatabaseKey(recEmail: string): string{
    //According to firebase: Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]""
    return recEmail.replaceAll(new RegExp(/[#$\].[]/g), '')
}

interface AuthState {
    authorizedPlayerEmails: string[];
    authorizedHostEmails: string[];
}

const authDataStore: Module<AuthState, RootState> = {
    namespaced: true,
    state: {
        authorizedPlayerEmails: [],
        authorizedHostEmails: [],
    },

    getters: {
        getAuthorizedPlayerEmails(state): string[] {
            return state.authorizedPlayerEmails
        },

        getAuthorizedHostEmails(state): string[]{
            return state.authorizedHostEmails;
        },

        getPlayerOnWhitelist: (state) => (recPlayerEmail: string) => {
            return state.authorizedPlayerEmails.includes(recPlayerEmail)
        },

        getHostOnWhitelist: (state) => (recHostEmail: string) => {
            return state.authorizedHostEmails.includes(recHostEmail)
        },
    },

    mutations: {

        addAuthorizedPlayerEmail(state, newAuthorizedPlayerEmail: string) {
            state.authorizedPlayerEmails.push(newAuthorizedPlayerEmail);
            const tempArray = state.authorizedPlayerEmails
            tempArray.sort()
            state.authorizedPlayerEmails = tempArray;
        },

        removeAuthorizedPlayerEmail(state, removedAuthorizedPlayerEmail: string){
            state.authorizedPlayerEmails.splice(state.authorizedPlayerEmails.indexOf(removedAuthorizedPlayerEmail), 1);
        },

        addAuthorizedHostEmail(state, newAuthorizedHostEmail: string) {
            state.authorizedHostEmails.push(newAuthorizedHostEmail);
            const tempArray = state.authorizedHostEmails
            tempArray.sort()
            state.authorizedHostEmails = tempArray;
        },

        removeAuthorizedHostEmail(state, removedAuthorizedHostEmail: string){
            state.authorizedHostEmails.splice(state.authorizedHostEmails.indexOf(removedAuthorizedHostEmail), 1);
        }

    },

    actions: {

        //firebase listeners
        initializeDatabaseListeners(context) {

            onChildAdded(ref(database, 'authData/playersWhiteList'), (data) => {
                context.commit('addAuthorizedPlayerEmail', data.val());
            });

            onChildRemoved(ref(database, 'authData/playersWhiteList'), (data) => {
                context.commit('removeAuthorizedPlayerEmail', data.val());
            });

            onChildAdded(ref(database, 'authData/hostWhiteList'), (data) => {
                context.commit('addAuthorizedHostEmail', data.val());
            });

            onChildRemoved(ref(database, 'authData/hostWhiteList'), (data) => {
                context.commit('removeAuthorizedHostEmail', data.val());
            })
        },

        addAuthorizedPlayerEmail(_, newAuthorizedPlayerEmail: string){
            set((ref(database, 'authData/playersWhiteList/' + formatEmailForDatabaseKey(newAuthorizedPlayerEmail))), newAuthorizedPlayerEmail);
        },

        removeAuthorizedPlayerEmail(_, removedAuthorizedPlayerEmail: string){
            set(ref(database, 'authData/playersWhiteList/' + formatEmailForDatabaseKey(removedAuthorizedPlayerEmail)), null);
        }

    },
}

export default authDataStore;