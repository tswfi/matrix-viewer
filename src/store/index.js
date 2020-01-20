import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: { title: "Title...", id: "" },
    messages: [
      { id: 1, msg: "foobar1" },
      { id: 2, msg: "foobar2" },
      { id: 3, msg: "foobar3" }
    ],
    baseUrl: "https://matrix.org",
    userId: "",
    accessToken: ""
  },
  mutations: {},
  actions: {},
  getters: {
    room: state => {
      return state.room;
    },
    messages: state => {
      return state.messages;
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
