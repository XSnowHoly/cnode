// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/scss/index.scss'
import VueMaterial from 'vue-material'
import axios from 'axios'
import store from './stores/index.js'
import Vuex from 'vuex'


Vue.config.productionTip = false
Vue.use(VueMaterial)

Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
