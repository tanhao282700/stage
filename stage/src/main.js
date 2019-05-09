// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/iconfont/iconfont.css'

/*  引入axios */
import axios from './http/axios';
Vue.prototype.$http = axios;

import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

//引入Vuex
import store from './store';

Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
