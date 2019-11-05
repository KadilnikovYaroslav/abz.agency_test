import Vue from "vue"
import zenscroll from "zenscroll"
import "./vee-validate"
import VueMask from 'v-mask'

import App from "./App.vue"

Vue.use(zenscroll);
Vue.use(VueMask);

Vue.config.productionTip = false;

export const updateListUser = new Vue(); // Для обновления users после успешной регистрации

// Added polyfill for support fetch IE11
require('es6-promise').polyfill();
require('isomorphic-fetch');

new Vue({
  render: h => h(App),
}).$mount('#app');
