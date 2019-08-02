<template>
  <div class="orderManage">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <x-input placeholder="输入订单号、客户姓名、客户手机号搜索" v-model="params.matchParam"></x-input>
      <span @click="refreshData" style="font-size: 0.36rem;" class="right headericon icon iconfont">&#xe62f;</span>
    </div>
    <div class="tabBar vux-1px-b">
      <div class="bar" @click="changeTab(1)" :class="{'active': tabIndex == 1}">
        <div class="barInfo">
          <span>驿站</span>
          <badge :text="hotelOrderNum"></badge>
        </div>
      </div>
      <div class="bar" @click="changeTab(2)" :class="{'active': tabIndex == 2}">
        <div class="barInfo">
          <span>商品</span>
          <badge :text="goodsOrderNum"></badge>
        </div>
      </div>
    </div>
    <div class="state vux-1px-b">
      <div @click="openState">
        <span v-if="params.status == 99">所有状态</span>
        <span v-if="params.status == 0">待支付</span>
        <span v-if="params.status == 1 && tabIndex == 2">待发货</span>
        <span v-if="params.status == 1 && tabIndex == 1">待确认</span>
        <span v-if="params.status == 2">申请退款</span>
        <span v-if="params.status == 3">退款失败</span>
        <span v-if="params.status == 4">退款成功</span>
        <span v-if="params.status == 5">取消订单</span>
        <span v-if="params.status == 6">待点评</span>
        <span v-if="params.status == 7">待入住</span>
        <span v-if="params.status == 8 && tabIndex == 1">入住中</span>
        <span v-if="params.status == 8 && tabIndex == 2">待收货</span>
        <span v-if="params.status == 9">已完成</span>
        <span class="arrow" :class="isStateOpen ? 'arrow-down' : ''"></span>
      </div>
      <ul v-if="isStateOpen" class="states">
        <li @click="chooseStatus(99)" class="vux-1px-b">所有状态</li>
        <li @click="chooseStatus(0)" class="vux-1px-b">待支付</li>
        <li @click="chooseStatus(1)" v-if="tabIndex == 2" class="vux-1px-b">待发货</li>
        <li @click="chooseStatus(1)" v-if="tabIndex == 1" class="vux-1px-b">待确认</li>
        <li @click="chooseStatus(2)" class="vux-1px-b">申请退款</li>
        <li @click="chooseStatus(3)" class="vux-1px-b">退款失败</li>
        <li @click="chooseStatus(4)" class="vux-1px-b">退款成功</li>
        <li @click="chooseStatus(5)" class="vux-1px-b">取消订单</li>
        <li @click="chooseStatus(6)" class="vux-1px-b">待点评</li>
        <li @click="chooseStatus(7)" v-if="tabIndex == 1" class="vux-1px-b">待入住</li>
        <li @click="chooseStatus(8)" v-if="tabIndex == 1" class="vux-1px-b">入住中</li>
        <li @click="chooseStatus(8)" v-if="tabIndex == 2" class="vux-1px-b">待收货</li>
        <li @click="chooseStatus(9)" class="vux-1px-b">已完成</li>
      </ul>
    </div>
    <div class="list_con" ref="list_con">
      <div v-if="isStateOpen" class="shadow"></div>
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" ref="content">
            <li v-for="(item,index) in data" class="item vux-1px-b">
              <div class="hotel" @click="goDetails({path: 'orderHotel', id: item.orderId})" v-if="tabIndex == 1">
                <div class="head vux-1px-b">
                  <span v-text="'订单编号：'+item.orderId "></span>
                  <span v-if="item.status == 0">待支付</span>
                  <span v-if="item.status == 1">待确认</span>
                  <span v-if="item.status == 2">申请退款</span>
                  <span v-if="item.status == 3">退款失败</span>
                  <span v-if="item.status == 4">退款成功</span>
                  <span v-if="item.status == 5">取消订单</span>
                  <span v-if="item.status == 6">待点评</span>
                  <span v-if="item.status == 7">待入住</span>
                  <span v-if="item.status == 8">入住中</span>
                  <span v-if="item.status == 9">已完成</span>
                </div>
                <div class="info vux-1px-b">
                  <div class="name">
                    <span v-text="item.customName"></span>
                    <span v-text="item.contactPhone"></span>
                  </div>
                  <div class="time">
                    <span>入离时间：</span>
                    <span v-text="item.liveStartDate"></span>
                    <span> 至 </span>
                    <span v-text="item.liveEndDate"></span>
                  </div>
                  <div class="address">
                    <span>预定房源：</span>
                    <span v-text="item.roomTitle"></span>
                  </div>
                </div>
                <div class="botton">
                  <!--<span @click="cancelOrder(item,index)" v-if="item.status == 0  || item.status == 1">取消订单</span>-->
                  <!--<span @click="changePrice(item.orderId)">修改价格</span>-->
                </div>
              </div>
              <div @click="goDetails({path: 'orderedGoods', id: item.orderId})" v-if="tabIndex == 2" class="goods">
                <div class="head vux-1px-b">
                  <span v-text="'订单编号：'+item.orderId"></span>
                  <span v-if="item.status == 0">待付款</span>
                  <span v-if="item.status == 1">待发货</span>
                  <span v-if="item.status == 2">申请退款</span>
                  <span v-if="item.status == 3">退款失败</span>
                  <span v-if="item.status == 4">退款成功</span>
                  <span v-if="item.status == 5">取消订单</span>
                  <span v-if="item.status == 6">待点评</span>
                  <span v-if="item.status == 8">待收货</span>
                  <span v-if="item.status == 9">已完成</span>
                </div>
                <div class="goodsInfo vux-1px-b">
                  <div class="pics">
                    <img :src="item.imageUrl" alt="">
                  </div>
                  <div class="infos">
                    <span v-text="item.title"></span>
                    <span v-text="'￥'+item.price"></span>
                  </div>
                </div>
                <div class="botton">
                  <!--<span v-if="item.status == 0 || tabIndex != 1">取消订单</span>-->
                  <!--<span>修改价格</span>-->
                </div>
              </div>
            </li>
            <div v-if="!isMoreData" class="no_data">
              <span></span>
              <span>暂无更多数据</span>
              <span></span>
            </div>
          </ul>
          <!-- 底部提示信息 -->
          <div v-if="isMoreData" class="bottom-tip">
            <span class="loading-hook">{{pullupMsg}}</span>
          </div>
        </div>
      </div>

      <!-- alert提示刷新成功 -->
      <div class="alert-hook" :style="{display: alertHook}">刷新成功</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { LoadMore, XInput, Badge } from 'vux'
let count = 1
export default {
  name: 'orderManage',
  components: {
    LoadMore,
    XInput,
    Badge
  },
  data () {
    return {
      isStateOpen: false,
      value: '',
      isMoreData: true,
      data: [],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none',
      params: {
        matchParam: '',
        merchantId: '',
        status: 99, // 0-待支付,1-待发货,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,8-待收货,9-已完成,99-所有状态
        // 0-待支付,1-待确认,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,7-待入住,8-入住中,9-已完成,99-所有状态
        page: 1,
        pageSize: 10
      },
      hotelOrderNum: 0,
      goodsOrderNum: 0,
      tabIndex: 1
    }
  },
  methods: {
    cancelOrder (item,index) {
      this.$http.fetchPost('/merchant/order/update/room',{operate:0,orderId:item.orderId}).then((res)=>{
          if(res.data.code == 200) {
            this.data[index].status = 5
            this.$vux.toast.show({
              text: '操作成功',
              position: 'middle'
            })
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              position: 'middle',
              type: 'warn'
            })
          }
      })
      event.stopPropagation()
    },
    changePrice (id) {
      this.$router.push({
        name: 'changePrice',
        query: {
          id: id
        }
      })
      event.stopPropagation()
    },
    goDetails (data) {
      this.$store.state.tabIndex = this.tabIndex
      this.$router.push({
        name: data.path,
        query: {
          id: data.id
        }
      })
    },
    openState () {
      this.isStateOpen = !this.isStateOpen
    },
    getBack () {
      this.$router.go(-1)
    },
    chooseStatus (status) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.params.status = status
      this.isStateOpen = false
      this.refreshData()
    },
    refreshalert () { // 刷新成功提示
      this.alertHook = 'block'
      setTimeout(() => {
        this.alertHook = 'none'
      }, 1000)
    },
    changeTab (tabIndex) {
      this.params.matchParam = ''
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.params.status = 99
      this.tabIndex = tabIndex
      this.refreshData()
    },
    getInitHotelData () {
      this.$http.fetchGet('/merchant/order/get/room/list', this.params).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
        this.hotelOrderNum = res.data.data.orderNum
        if(this.$store.state.tabIndex == 1 || !this.$store.state.tabIndex) {
          this.data = res.data.data.orderList
          if (this.data.length === this.params.pageSize) {
            this.isMoreData = true
          } else {
            this.isMoreData = false
            this.$nextTick(() => {
              if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
                this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
              }
            })
          }
          this.initScroll()
          this.$store.state.tabIndex = ''
        }
      })
    },
    getInitGoodsData () {
      this.$http.fetchGet('/merchant/order/get/goods/list', this.params).then((res) => {
        this.goodsOrderNum = res.data.data.orderNum
        if(this.$store.state.tabIndex == 2) {
          this.data = res.data.data.orderList
          if (this.data.length === this.params.pageSize) {
            this.isMoreData = true
          } else {
            this.isMoreData = false
            this.$nextTick(() => {
              if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
                this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
              }
            })
          }
          this.initScroll()
          this.$store.state.tabIndex = ''
        }
      })
    },
    initScroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
          probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true // 是否派发click事件
        })
        // 滑动过程中事件
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 30) {
            this.pulldownMsg = '释放立即刷新'
          }
        })
        // 滑动结束松开事件
        this.scroll.on('touchEnd', (pos) => { // 上拉刷新
          if (pos.y > 30) {
            this.refreshData()
          } else if (pos.y < (this.scroll.maxScrollY - 30)) { // 下拉加载
            this.loadMoreData()
          }
        })
      })
    },
    refreshData () {
      this.$refs.content.style.height = 'auto'
      this.pullupMsg = '加载中。。。'
      this.params.page = 1
      let url = ''
      if (this.tabIndex == 1) {
        url = '/merchant/order/get/room/list'
      } else {
        url = '/merchant/order/get/goods/list'
      }
      this.$http.fetchGet(url, this.params).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
        if (this.tabIndex == 1) {
          this.hotelOrderNum = res.data.data.orderNum
        } else {
          this.goodsOrderNum = res.data.data.orderNum
        }
        this.data = res.data.data.orderList
        if (this.data.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
          this.$nextTick(() => {
            if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
              this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
            }
          })
        }
        // 恢复文本值
        this.pullupMsg = '加载更多'
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })
    },
    loadMoreData () {
      if (this.data.length < this.params.pageSize || this.data.length < this.params.pageSize * this.params.page) {
        this.isMoreData = false
        return
      }
      this.params.page++
      let url = ''
      if (this.tabIndex == 1) {
        url = '/merchant/order/get/room/list'
      } else {
        url = '/merchant/order/get/goods/list'
      }
      this.$http.fetchGet(url, this.params).then((res) => {
        if (this.tabIndex == 1) {
          this.hotelOrderNum = res.data.data.orderNum
        } else {
          this.goodsOrderNum = res.data.data.orderNum
        }
        if (this.data.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
        }
        if (res.data.data.goodsList.length > 0) {
          res.data.data.goodsList.map((item) => {
            this.data.push(item)
          })
        } else {
          this.isMoreData = false
        }
        // 恢复刷新提示文本值
        this.pulldownMsg = '下拉刷新'
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.params.merchantId = this.$store.state.merchantId
    if (this.$route.query.status == 1) {
      this.params.status = 1
      this.$router.replace({})
    }
    this.getInitHotelData()
    this.getInitGoodsData()
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .orderManage {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .tabBar {
    height: 0.92rem;
    display: flex;
    align-items: center;
    background: #fff;
    .bar {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c6c6c;
      .barInfo {
        border-right: 1px solid #efefef;
        font-size: 0.28rem;
        display: inline-block;
        width: 100%;
      }
      &:last-child .barInfo{
        border-right: none;
      }
    }
    .active {
      border-bottom: 2px solid #19ad19;
      color: #1aad19;
    }
  }
  .state {
    height: 0.92rem;
    background: #fff;
    display: flex;justify-content: center;
    align-items: center;
    font-size: 0.28rem;
    position: relative;
    div {
      width: auto;
      display: flex;
      align-items: center;
    }
    .arrow {
      border-left: 0.1rem solid transparent;
      border-right: 0.1rem solid transparent;
      border-top: 0.1rem solid #5c5c5c;
      margin-left: 0.1rem;
    }
    .arrow-down {
      transform:rotate(180deg);
    }
    .states {
      position: absolute;
      /*bottom: -7.2rem;*/
      top: 0.92rem;
      width: 100%;
      background: #fff;
      min-height: 7.2rem;
      z-index: 999;
      li {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: left;
        padding-left: 0.4rem;
      }
    }
  }
  .list_con {
    flex: 1;
    overflow: hidden;
    position: relative;
    .shadow {
      width: 100%;
      height: 100%;
      position:absolute;
      background: rgba(0,0,0,.5);
      z-index: 99;
    }
  }
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .shortCon {
    height: 100vh;
  }
  .item{
    margin-top: 0.1rem;
    padding: 0 0.2rem;
    &:first-child {
      margin-top: 0;
    }
    background: #fff;
    font-size: 0.28rem;
    .hotel {
      /*height: 3.6rem;*/
      .info {
        /*height: 1.8rem;*/
        text-align: left;
        .name {
          span:first-child {
            font-size: 0.32rem;
            font-weight: bold;
            margin-right: 0.2rem;
          }
          padding: 0.1rem 0;
        }
        .time, .address {
          font-size: 0.24rem;
          color: #4a4a4a;
          line-height: 0.44rem;
        }
      }
    }
    .head {
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        color: #9b9b9b;
      }
      span:last-child {
        color: #1aad19;
      }
    }
    .botton {
      height: 1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        width: 1.76rem;
        height: 0.6rem;
        border: 1px solid #d7d7d7;
        border-radius: 0.1rem;
        line-height: 0.6rem;
        color: #353535;
        &:first-child {
          margin-right: 0.3rem;
        }
      }
    }
    .goods {
      height: 3.68rem;
      .goodsInfo {
        height: 1.88rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .pics {
          height: 1.36rem;
          width: 1.36rem;
          margin-right: 0.1rem;
          img {
            height: 1.36rem;
            width: 1.36rem;
            border-radius: 0.1rem;
          }
        }
        .infos {
          flex: 1;
          overflow: hidden;
          height: 1.36rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          span:first-child {
            font-weight: bold;
          }
          span:last-child {
            color: #ee0622;
          }
        }
      }
    }
  }

  /* 下拉、上拉提示信息 */
  .top-tip{
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1;
    width: 100%;
    height:40px;
    line-height:40px;
    text-align:center;
    color: #555;
  }

  .bottom-tip{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
    position: absolute;
    bottom: -35px;
    left: 0;
  }

  /* 全局提示信息 */
  .alert-hook{
    display: none;
    position: fixed;
    top: 62px;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: rgba(7, 17, 27, 0.5);
  }
</style>
<style>
  .vux-x-icon {
    fill: #000000;
  }
  .orderManage .weui-cell {
    width: 5.2rem;
    height: 0.56rem;
    padding: 0;
    background: rgb(240,240,240);
    border-radius: 0.3rem;
    font-size: 0.24rem;
  }
  .orderManage .weui-icon-clear:before {
    color: #19ad19;
  }
  .orderManage .weui-icon-clear {
    font-size: 0.4rem;
  }
  .orderManage .vux-x-input .weui-input {
    text-indent: 0.2rem;
  }
  .orderManage .vux-badge{
    font-size: 0.21rem;
    height: auto;
    width: auto;
    padding: 0.08rem 0.1rem;
    border-radius: 0.18rem;
  }
</style>
