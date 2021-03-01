import firebase from './firebase';
const playerStore = {
    state: {
        playersList: []
    },
    getters: {
        getPlayersList(state) {
            return state.playersList;
        }
    },
    mutations: {
        /*
        setPlayersList(state, recList){
          state.playersList = recList;
        },
        */
        addPlayerToList(state, recPlayerID, recPlayerName) {
            state.playersList.push({ recPlayerID: recPlayerName });
        }
    },
    actions: {
        //connects firebase database to store, updates are now driven from database
        getFirebaseDatabase(context) {
            // DATASE LISTENERS
            firebase.database.ref('playersList').on('child_added', function (data) {
                context.commit('addPlayerToList', data.key, data.val());
            });
        },
        addPlayerToList(context, newPlayer) {
            const newPlayerRef = firebase.database.ref('playersList').push();
            newPlayerRef.set(newPlayer);
            //alert("pushed " + newPlayer + " to list. Key: " + newPlayerRef.key)
        }
    },
};
export default playerStore;
//# sourceMappingURL=playerStore.js.map