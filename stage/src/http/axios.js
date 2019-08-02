
import axios from 'axios'
import Vue from 'vue'
// import qs from 'qs'

const debug = process.env.NODE_ENV != 'production'
let baseurl = ''
if (debug) {
  baseurl = './api'
} else {
  baseurl = 'http://xyz.zbtdvip.com/api'
}

// http://zayz.zbtdvip.com  测试环境
// http://xyz.zbtdvip.com  正式环境

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = '' // 配置接口地址

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  /* if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  } */
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (!res.data.success) {
    return Promise.resolve(res)
  }
  return res
}, (error) => {
  Vue.$vux.loading.hide()
  Vue.$vux.toast.show({
    text: res.data.message,
    position: 'middle',
    type: 'warn'
  })
  console.log('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  url = baseurl + url
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
/// /返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  url = baseurl + url
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet
}
