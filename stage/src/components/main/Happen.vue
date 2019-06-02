<template>
  <div class="happen">
    <div class="happen_bg"></div>
    <div class="happen_head">门店概况</div>
    <div class="info">
      <div class="top vux-1px-b">
        <div class="left">
          <span v-text="orderData.totalOrderAmt || 0"></span>
          <span>订单总金额</span>
        </div>
        <div class="right">
          <span v-text="orderData.totalOrderNum || 0"></span>
          <span>订单总数量</span>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <div>
            <span>今日</span>
            <span v-text="orderData.todayOrderAmt || 0"></span>
          </div>
          <div>
            <span>昨日</span>
            <span v-text="orderData.yesterdayOrderAmt || 0"></span>
          </div>
        </div>
        <div class="right">
          <span v-text="orderData.todayOrderNum || 0"></span>
          <span v-text="orderData.yesterdayOrderNum || 0"></span>
        </div>
      </div>
    </div>
    <div @click="goOderManage" class="waitDo">
      <span>待确认订单</span>
      <div class="waitDo_icon">
        <badge v-if="orderData.waitConfirmOrderNum" v-text="orderData.waitConfirmOrderNum || 0"></badge>
        <x-icon type="ios-arrow-right" size="50"></x-icon>
      </div>
    </div>
    <div class="title">
      <span></span>
      <span>工具</span>
    </div>
    <div class="tools">
      <div class="item" @click="goManagePage('hotelManage')">
        <img src="../../assets/images/hotelset.png" alt="">
        <span>驿栈管理</span>
      </div>
      <div class="item" @click="goManagePage('houseList')" >
        <img src="../../assets/images/houseset.png" alt="">
        <span>房态管理</span>
      </div>
      <div @click="goManagePage('goodsManage')" class="item">
        <img src="../../assets/images/shopset.png" alt="">
        <span>商品管理</span>
      </div>
      <div @click="goManagePage('orderManage')" class="item">
        <img src="../../assets/images/orderset.png" alt="">
        <span>订单管理</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Badge, Cell } from 'vux'
export default {
  name: 'Happen',
  components: {
    Badge,
    Cell
  },
  props: ['orderData'],
  data () {
    return {

    }
  },
  methods: {
    goOderManage () {
      this.$router.push({
        path: 'orderManage',
        query: {
          status: 1
        }
      })
    },
    goManagePage (routerPath) {
      this.$router.push(routerPath)
    }
  },
  created () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/css/common.less';
  .happen {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .happen_bg {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width:100%;
    height: 3.68rem;
    .gradientHappenBg(rgba(116,226,120,1),rgba(98,192,155,1));
  }
  .happen_head {
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.36rem;
    color: white;
    z-index:2;
  }
  .info {
    width: 7.12rem;
    height: 3.2rem;
    background: white;
    border-radius: 0.1rem;
    z-index: 2;
    padding:0 0.48rem;
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      height: 1.7rem;
      display: flex;
      .left span:first-child,.right span:first-child{
        font-size: 0.48rem;
        color: #1aad19;
      }
      .left span:last-child,.right span:last-child{
        font-size: 0.24rem;
        color: #bdbdbd;
      }
    }
    .bottom {
      width: 100%;
      flex: 1;
      display: flex;
      span{
        font-size: 0.28rem;
        color: #9b9b9b;
      }
    }
    .left, .right {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .left {
      padding-left: 0.44rem;
    }
    .right {
      padding-left: 1.32rem;
    }
  }
  .waitDo {
    width: 7.12rem;
    height: 1rem;
    z-index: 2;
    background: white;
    margin-top: 0.2rem;
    border-radius: 0.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 0.36rem;
    font-size: 0.28rem;
    .waitDo_icon {
      display: flex;
      align-items: center;
    }
  }
  .title {
    width: 7.12rem;
    height: 0.76rem;
    display: flex;
    align-items: center;
    span:first-child {
      width: 0.04rem;
      height: 0.28rem;
      display: inline-block;
      background: #19ad19;
    }
    span:last-child {
      font-size: 0.28rem;
      margin-left: 0.1rem;
    }
  }
  .tools {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 7.12rem;
    .item {
      width: 3.52rem;
      height: 2.12rem;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:nth-child(3),&:nth-child(4) {
        margin-top: 0.08rem;
      }
      img {
        width: 0.96rem;
        height: 0.96rem;
      }
      span {
        font-size: 0.24rem;
        margin-top: 0.2rem;
      }
    }
  }
</style>
<style>
  .happen .vux-badge{
    font-size: 0.24rem;
    height: auto;
    width: auto;
    padding: 0.12rem 0.12rem;
    border-radius: 0.2rem;
  }
  .happen .vux-x-icon {
    fill: rgb(157,157,157);
  }
</style>
