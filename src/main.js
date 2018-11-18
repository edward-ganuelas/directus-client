// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueHead from 'vue-head'
import router from './router/index.js';
import store from './vuex/store';
require('vue2-animate/dist/vue2-animate.min.css')
import VueAnalytics from 'vue-analytics'
import bootstrap from './components/bootstrap/bootstrap';


Vue.config.productionTip = false

Vue.use(VueHead);

Vue.use(VueAnalytics, {
  id: 'UA-112624646-1',
  router
})

Vue.use(bootstrap);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
})
