// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/iconfont/iconfont.css'

/*  引入axios */
import axios from './http/axios'

import { ToastPlugin } from 'vux'
import VueAMap from 'vue-amap'
// import AMap from 'vue-amap';
// 引入Vuex
import store from './store'
Vue.prototype.$http = axios
Vue.use(ToastPlugin)
Vue.use(VueAMap)
Vue.config.productionTip = false
const FastClick = require('fastclick')
FastClick.attach(document.body)

import  { LoadingPlugin, ConfirmPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

VueAMap.initAMapApiLoader({
  key: '7817e03cdc916a4817be3a6da24fddcf',
  plugin: ['AMap.Autocomplete', 'AMap.Geocoder', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
