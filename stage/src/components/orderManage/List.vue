<template>
  <div class="orderManage">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <x-input placeholder="输入订单号、客户姓名、客户手机号搜索" v-model="value"></x-input>
      <span class="headericon icon iconfont">&#xe62f;</span>
    </div>
    <div class="tabBar vux-1px-b">
      <div class="bar active">
        <div class="barInfo">
          <span>驿站</span>
          <badge text="123"></badge>
        </div>
      </div>
      <div class="bar">
        <div class="barInfo">
          <span>商品</span>
          <badge text="123"></badge>
        </div>
      </div>
    </div>
    <div class="state vux-1px-b">
      <div @click="openState">
        <span>所有状态</span>
        <span class="arrow" :class="isStateOpen ? 'arrow-down' : ''"></span>
      </div>
      <ul v-if="isStateOpen" class="states">
        <li class="vux-1px-b">所有状态</li>
        <li class="vux-1px-b">待付款</li>
        <li class="vux-1px-b">待确认</li>
        <li class="vux-1px-b">待入住</li>
        <li class="vux-1px-b">入住中</li>
        <li class="vux-1px-b">已完成</li>
        <li class="vux-1px-b">申请退款</li>
        <li class="vux-1px-b">退款成功</li>
        <li class="vux-1px-b">退款失败</li>
      </ul>
    </div>
    <div class="list_con">
      <div v-if="isStateOpen" class="shadow"></div>
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" :class="isMoreData ? 'longCon' : 'shortCon'" >
            <li @click="goDetails({path: 'orderedGoods', id: ''})" class="item vux-1px-b">
              <div class="hotel">
                <div class="head vux-1px-b">
                  <span>订单编号：0285452115387</span>
                  <span>待付款</span>
                </div>
                <div class="info vux-1px-b">
                  <div class="name">
                    <span>吴彦祖</span>
                    <span>17394930905</span>
                  </div>
                  <div class="time">
                    <span>入离时间：</span>
                    <span>2018-11-27</span>
                    <span> 至 </span>
                    <span>2018-11-28</span>
                  </div>
                  <div class="address">
                    <span>预定房源：</span>
                    <span>宽窄巷子阿达瓦吊袜带阿伟大挖到阿伟大挖到</span>
                  </div>
                </div>
                <div class="botton">
                  <span>取消订单</span>
                  <span>修改价格</span>
                </div>
              </div>
            </li>
            <li class="item vux-1px-b">
              <div class="goods">
                <div class="head vux-1px-b">
                  <span>订单编号：0285452115387</span>
                  <span>待付款</span>
                </div>
                <div class="goodsInfo vux-1px-b">
                  <div class="pics">
                    <img src="../../assets/images/test.png" alt="">
                  </div>
                  <div class="infos">
                    <span>这里显示商品名称</span>
                    <span>￥299.00</span>
                  </div>
                </div>
                <div class="botton">
                  <span>取消订单</span>
                  <span>修改价格</span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 底部提示信息 -->
          <div class="bottom-tip">
            <span class="loading-hook">{{pullupMsg}}</span>
            <load-more :show-loading="false" tip="我是有底线的" background-color="#777"></load-more>
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
      isMoreData: false,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none'
    }
  },
  methods: {
    goDetails (data) {
      console.log(data)
      this.$router.push({
        name: data.path,
        params: {

        }
      })
    },
    openState () {
      this.isStateOpen = !this.isStateOpen
    },
    getBack () {
      this.$router.go(-1)
    },
    getData () {
      let that = this
      return new Promise(resolve => { // 模拟数据请求
        setTimeout(() => {
          that.isMoreData = false
          console.log(that.isMoreData)
          const arr = []
          for (let i = 0; i < 26; i++) {
            arr.push(count++)
          }
          resolve(arr)
        }, 1000)
      })
    },
    refreshalert () { // 刷新成功提示
      this.alertHook = 'block'
      setTimeout(() => {
        this.alertHook = 'none'
      }, 1000)
    }
  },
  created () {
    const that = this
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
        console.log(pos)
        if (pos.y > 30) {
          console.log(222)
          setTimeout(() => {
            that.getData().then((res) => {
              // 刷新数据
              that.data = res
              // 恢复刷新提示文本值
              that.pulldownMsg = '下拉刷新'
              // 刷新成功后提示
              that.refreshalert()
              // 刷新列表后，重新计算滚动区域高度
              that.scroll.refresh()
            })
          }, 2000)
        } else if (pos.y < (this.scroll.maxScrollY - 30)) { // 下拉加载
          console.log(333)
          this.pullupMsg = '加载中。。。'
          setTimeout(() => {
            that.getData().then((res) => {
              // 恢复文本值
              that.pullupMsg = '加载更多'
              that.data = this.data.concat(res)
              that.scroll.refresh()
            })
          }, 2000)
        }
      })
    })
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
  .iosHeader {
    width: 100%;
    height: 1.28rem;
    background: #fff;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 0.36rem;
    padding: 0 0.2rem 0.24rem 0.2rem;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    .headericon {
      font-size: 0.44rem;
      color: #000000;
    }
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
      bottom: -7.2rem;
      width: 100%;
      background: #fff;
      height: 7.2rem;
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
      height: 3.6rem;
      .info {
        height: 1.8rem;
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
