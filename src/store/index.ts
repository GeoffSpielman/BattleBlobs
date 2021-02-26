import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*testList: [],*/
    testVal: "blue"
  },

  getters: {
    getTestVal(state) {
      return state.testVal;
    }
  },

  mutations: {
    setTestVal(state, recVal) {
      state.testVal = recVal;
    }
  },

  actions: {

    //connects firebase database to store, updates are now driven from database
    getFirebaseDatabase(context) {
      firebase.database.ref('firstVal').on('value', function (snapshot) {
        context.commit('setTestVal', snapshot.val());
      })
    },

    setTestVal(context, recVal) {
      firebase.database.ref('firstVal').set(recVal);
    }
  },
  modules: {
  }
})
