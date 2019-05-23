<template>
  <div class="main">
    <div class="main_con">
      <router-view v-bind:orderData="orderData" />
    </div>
    <div class="main_foot vux-1px-t">
      <tabbar @on-index-change="tabChange">
        <tabbar-item :selected="happenSelected" link="/happen">
          <img slot="icon" src="../../assets/images/happen_noclick.png">
          <img slot="icon-active" src="../../assets/images/happen_click.png">
          <span slot="label">概况</span>
        </tabbar-item>
        <tabbar-item :selected="newsSelected" :badge="String(undoMessage) || 0" link="/news">
          <img slot="icon" src="../../assets/images/news_noclick.png">
          <img slot="icon-active" src="../../assets/images/news_click.png">
          <span slot="label">消息</span>
        </tabbar-item>
        <tabbar-item :selected="mineSelected" link="/mine">
          <img slot="icon" src="../../assets/images/mine_noclick.png">
          <img slot="icon-active" src="../../assets/images/mine_click.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import md5 from 'js-md5'
import axios from 'axios'

export default {
  name: 'Main',
  components: {
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      happenSelected: true,
      newsSelected: false,
      mineSelected: false,
      orderData: {},
      undoMessage: 0
    }
  },
  methods: {
    tabChange () {

    },
    getData () {
       this.$http.fetchPost('/merchant/login', {account: '18380447483', password: md5('123456')}).then((res) => {
         axios.defaults.headers.common['token'] = res.data.data.token
         this.waitDoOrders(res.data.data.merchantId)
         this.getundoMessage(res.data.data.merchantId)
         this.$store.state.merchantId = res.data.data.merchantId
       })
      /*let userId = this.$route.query.userId
      /!*userId = '1556954666365000'*!/
      if(userId) {
          this.$store.state.userId = userId
      }
      this.$http.fetchPost('/merchant/token/login', {userId: this.$store.state.userId, key: md5(this.$store.state.userId+':@!')}).then((res) => {
        if(res.data.code === 200) {
          axios.defaults.headers.common['token'] = res.data.data.token
          this.waitDoOrders(res.data.data.merchantId)
          this.getundoMessage(res.data.data.merchantId)
          this.$store.state.merchantId = res.data.data.merchantId
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })*/
    },
    waitDoOrders (merchantId) {
      this.$http.fetchGet('/merchant/order/get/statistic', {merchantId: merchantId}).then((res) => {
        this.orderData = res.data.data
      })
    },
    getundoMessage (merchantId) {
      this.$http.fetchGet('/merchant/center/statistic/message', {merchantId: merchantId}).then((res) => {
        this.undoMessage = res.data.data.newMessageNum
      })
    }
  },
  created () {
    /*window.AndroidListener.onHideDialog()
    console.log(this.$route.query.userId)*/
    /*this.$vux.loading.show({
      text: '加载中...'
    })*/
    console.log(this.$route.query)
    if (this.$route.path === '/happen') {
      this.happenSelected = true
    }
    if (this.$route.path === '/news') {
      this.newsSelected = true
    }
    if (this.$route.path === '/mine') {
      this.mineSelected = true
    }
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .main_con {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
  .main_foot {
    width: 100%;
    height: 1rem;
  }
</style>
<style>
  .main .weui-tabbar {
    height: 100%;
  }
  .main .weui-tabbar__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .main .weui-tabbar__icon {
    width: 0.48rem;
    height: 0.48rem;
  }
  .main .weui-tabbar__label {
    font-size: 0.2rem;
  }
  .main .main_foot .vux-badge {
    display: inline-block;
    text-align: center;
    background: #f74c31;
    color: #fff;
    font-size: 0.2rem;
    height: 0.28rem;
    width: 0.28rem;
    line-height: 0.28rem;
    border-radius: 0.28rem;
    padding: 0;
    background-clip: padding-box;
    vertical-align: middle;
  }
  .main .weui-tabbar {
    background-color: #fff;
  }
</style>
