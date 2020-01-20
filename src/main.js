import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import LoadScript from "vue-plugin-load-script";

Vue.config.productionTip = false;
Vue.use(LoadScript);

Vue.loadScript("/lib/matrix.js")
  .then(() => {
    console.log("Matrix sdk js library loaded");
  })
  .catch(() => {
    console.error("Loading matrix js library failed");
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
