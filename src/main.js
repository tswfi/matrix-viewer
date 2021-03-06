import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";
import vuetify from "./plugins/vuetify";
import VueChatScroll from "vue-chat-scroll";
import moment from "moment";

Vue.use(VueChatScroll);

Vue.config.productionTip = false;
Vue.use(LoadScript);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD");
  }
});

Vue.loadScript("lib/matrix.js")
  .then(() => {
    console.log("Matrix sdk js library loaded");
  })
  .catch(() => {
    console.error("Loading matrix js library failed");
  });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
