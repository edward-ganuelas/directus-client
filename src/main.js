// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueHead from 'vue-head'
import router from './router/index.js';
import Vuetify from 'vuetify';
require('../node_modules/vuetify/dist/vuetify.min.css');
require('vue2-animate/dist/vue2-animate.min.css')

Vue.config.productionTip = false

Vue.use(VueHead);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
