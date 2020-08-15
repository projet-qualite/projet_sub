/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";

import {router} from "./router/Route"
Vue.config.productionTip = false;


new Vue({
  el:'#app',
  render: h => h(App),
  router
}).$mount("#app");
