import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    clientconfig: {
      baseUrl: "https://matrix.org",
      userId: "",
      accessToken: ""
    }
  },
  mutations: {
    clientconfig(state, payload) {
      state.clientconfig = payload;
    },
    clearmessages(state) {
      state.messages = [];
    },
    newmessage(state, payload) {
      state.messages.push(payload);
    },
    updateBaseUrl(state, payload) {
      state.clientconfig.updateBaseUrl = payload;
    },
    updateUserId(state, payload) {
      state.clientconfig.userId = payload;
    },
    updateAccessToken(state, payload) {
      state.clientconfig.accessToken = payload;
    }
  },
  actions: {},
  getters: {
    messages: state => state.messages,
    room: state => state.room,
    clientconfig: state => state.clientconfig
  },
  modules: {},
  plugins: [createPersistedState()]
});
