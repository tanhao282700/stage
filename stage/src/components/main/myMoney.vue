<template>
  <div class="myMoney">
    <div class="myMoney_top">
      <div class="happen_bg"></div>
      <div class="iosHeader vux-1px-b">
        <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
        <span>我的余额</span>
      </div>
      <div class="money_con">我的余额(元)</div>
      <div class="money_con money_con2" v-text="moneyInfo.balance"></div>
      <div class="money_con money_con3" v-text="'提现中：'+moneyInfo.withDrawCash"></div>
      <div class="tixian">
        <!--<span>充值</span>-->
        <span @click="getMoney">提现</span>
      </div>
    </div>

    <div style="flex: 1;display: flex;flex-direction: column;">
      <div class="item_title">
        <span>余额明细</span>
        <div class="status" style="display: flex">
          <div @click="test(1)">
            <check-icon :value.sync="params.status == 1">已入账</check-icon>
          </div>
          <div @click="test(0)">
            <check-icon :value.sync="params.status == 0">未入账</check-icon>
          </div>
        </div>
      </div>
      <div class="list_con" ref="list_con">
        <div class="wrapper" ref="wrapper">
          <div class="bscroll-container">
            <!-- 刷新提示信息 -->
            <div class="top-tip">
              <span class="refresh-hook">{{pulldownMsg}}</span>
            </div>
            <!-- 内容列表 -->
            <ul class="content" ref="content">
              <li class="setting_item_two_line"
                   v-for="(item,index) in moneyInfo.items" :key="index">
                <div class="left">
                  <div class="content">{{item.amtDes}}</div>
                  <div class="time">{{item.txDate}}</div>
                </div>
                <div class="info orange">
                  <span>{{'+'+item.amt}}</span>
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
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { CheckIcon } from 'vux'
  export default {
    name: 'Mine',
    components: {
      CheckIcon
    },
    data () {
      return {
        pulldownMsg: '下拉刷新',
        pullupMsg: '加载更多',
        alertHook: 'none',
        isMoreData: true,
        moneyInfo: {
          balance: '', //账户余额
          withDrawCash: '', //提现中金额
          items: []
        },
        params: {
          merchantId: '',
          startDate: '',
          endDate: '',
          status: 1,
          page: 1,
          pageSize: 10
        }
      }
    },
    created () {
      this.$vux.loading.show({
        text: '加载中...'
      })
        this.params.merchantId = this.$store.state.merchantId
      this.getData()
    },
    methods: {
      getMoney(){
          this.$router.push({
              name: 'getMoney'
          })
      },
        test(status){
          this.params.status = status
          this.refreshData()
        },
      getBack () {
        this.$router.go(-1)
      },
      getData () {
//        /api/merchant/center/get/balance/withdraw
        this.$http.fetchGet('/merchant/center/get/balance/detail', this.params).then((res) => {
          this.moneyInfo = res.data.data
          if (this.moneyInfo.items.length === this.params.pageSize) {
            this.isMoreData = true
          } else {
            this.isMoreData = false
            this.$nextTick(() => {
              if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
                this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
              }
            })
          }
          setTimeout(() => {
            this.$vux.loading.hide()
          }, 500)
          this.initScroll()
        })
      },
      myMoney(){
        this.$router.push({
          name: 'myMoney'
        })
      },
      certification () {
        this.$router.push({
          name: 'certification'
        })
      },
      goSetting () {
        this.$router.push({
          name: 'Setting'
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
        this.$http.fetchGet('/merchant/center/get/balance/detail', this.params).then((res) => {
          this.moneyInfo = res.data.data
          if (this.moneyInfo.items.length === this.params.pageSize) {
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
        if (this.moneyInfo.items.length < this.params.pageSize || this.moneyInfo.items.length < this.params.pageSize * this.params.page) {
          this.isMoreData = false
          return
        }
        this.params.page++
        this.$http.fetchGet('/merchant/center/get/balance/detail', this.params).then((res) => {
          if (this.moneyInfo.items.length === this.params.pageSize) {
            this.isMoreData = true
          } else {
            this.isMoreData = false
          }
          if (res.data.data.items.length > 0) {
            res.data.data.goodsList.map((item) => {
              this.moneyInfo.items.push(item)
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/css/common.less';
  @import "../../assets/css/main.less";
  .myMoney {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    .myMoney_top{
      height: 4.3rem;
      width:100%;
      position: relative;
      z-index: 2;
      .money_con{
        position: relative;
        z-index: 2;
        font-size:0.28rem;
        line-height: 0.4rem;
        font-weight: 100;
        color: #fff;
        &.money_con2{
          font-size:0.48rem;
          line-height:0.8rem;
        }
        &.money_con3{
          font-size:0.24rem;
          line-height:0.6rem;
        }
      }
    }
    .happen_bg {
      position: absolute;
      z-index: 0;
      left: 0;
      top: 0;
      width:100%;
      height: 4.3rem;
      .gradientHappenBg(rgba(255,153,155,1),rgba(255,189,79,1));
    }
  }
  .iosHeader {
    background: none!important;
    color: #fff;
  }
  .tixian {
    height: 0.6rem;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
    margin-top: 0.2rem;
    span {
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: #fff;
      width: 1.6rem;
      border: 1px solid white;
      border-radius: 0.1rem;
      &:first-child {
        margin-right: 0.2rem;
      }
    }
  }
  .list_con {
    flex: 1;
    overflow: hidden;
    .content {
      display: flex;
      flex-direction: column;
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  /* 下拉、上拉提示信息 */
  .top-tip {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
  }

  .bottom-tip {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    /*background: #f2f2f2;*/
    position: absolute;
    bottom: -35px;
    left: 0;
  }

  /* 全局提示信息 */
  .alert-hook {
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
  .myMoney .vux-x-icon{
    fill: #fff!important;
  }

  .setting_item .weui-cell {
    padding: 0 0rem!important;
    width: 100%;
    box-sizing: border-box;
  }
  .setting_item  .weui-label {
    width: auto!important;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding-right: 0.4rem;
  }
  .setting_item  .weui-input {
    height: 1rem!important;
    line-height: 1rem!important;
    text-align: right;
    font-size: 0.28rem;
  }
  .weui-textarea-counter{
    font-size: 0.24rem;
  }
  .setting_item  .weui-cell_select-after .weui-select {
    font-size: 0.28rem;
  }

  .setting_item  .weui_icon_clear{
    font-size: 0.28rem;
  }
  .setting_item .weui-cell_select .weui-cell__bd:after {
    height: 0.24rem!important;
    width: 0.24rem!important;
    top: 40%!important;
  }
  .setting_item  .weui-cells {
    margin-top: 0!important;
  }

  .myMoney .status .weui-icon-success {
    font-size: 0.3rem;
  }
  .myMoney .status .weui-icon-circle {
    font-size: 0.3rem;
  }
</style>
