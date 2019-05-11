<template>
  <div class="myMoney">
    <div class="myMoney_top">
      <div class="happen_bg"></div>
      <div class="iosHeader vux-1px-b">
        <x-icon @click="getBack" class="headericon" type="ios-arrow-left" size="60"></x-icon>
        <span>我的余额</span>
      </div>
    </div>

    <div>
      <div class="item_title">
        账号绑定
        <!-- <a>修改</a> -->
      </div>
      <div class="setting_item setting_item_40"
           v-for="(item,index) in moneyInfo.items" :key="index">
        <span>{{item.amtDes}}</span>
        <div class="info">
          <span>{{item.amt}}</span>
        </div>
      </div>
    </div>
    <!--<div class="pictrue">-->
      <!--<img :src="userInfo.headImage" alt="">-->
      <!--<span>{{userInfo.nickName}}</span>-->
    <!--</div>-->
    <!--<div class="rest vux-1px-b" @click="myMoney" style="margin-top: 0.2rem;">-->
      <!--<span>我的余额</span>-->
      <!--<div class="info">-->
        <!--<span>{{userInfo.balance}}</span>-->
        <!--<x-icon type="ios-arrow-right" size="40"></x-icon>-->
      <!--</div>-->
    <!--</div>-->

    <div class="iphone">
      平台客服：010-123456789
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Mine',
    components: {

    },
    data () {
      return {
        moneyInfo: {
          balance: '', //账户余额
          withDrawCash: '', //提现中金额
          items: [
            {
              amt: '', // 发生金额 ,
              amtDes: '', // 金额发生描述 ,
              txDate: '', // 发生时间
            }
          ]
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      getData () {
//        /api/merchant/center/get/balance/withdraw
        this.$http.fetchGet('/merchant/center/get/balance/detail', {merchantId: this.$store.state.merchantId}).then((res) => {
          this.userInfo = res.data.data
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
    width: 100%;
    height: 1.28rem;
    background: none;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.32rem;
    padding-bottom: 0.24rem;
    color: #fff;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    .headericon {
      position: absolute;
      left: 0.2rem;
      bottom: 0.18rem;
      font-size: 0.82rem;
    }
  }
</style>
<style>
  .myMoney .vux-x-icon{
    fill: #fff;
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
</style>
