// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueHead from 'vue-head'
import router from './router/index.js';
import Vuetify from 'vuetify';
import store from './vuex/store';
require('../node_modules/vuetify/dist/vuetify.min.css');
require('vue2-animate/dist/vue2-animate.min.css')
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueHead);
Vue.use(Vuetify);

Vue.use(VueAnalytics, {
  id: 'UA-112624646-1',
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
})
