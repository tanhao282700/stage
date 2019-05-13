<template>
  <div class="mine">
    <div class="iosHeader vux-1px-b">
      <span>个人中心</span>
      <span class="headericon icon iconfont" @click="goSetting">&#xe61d;</span>
    </div>
    <div class="pictrue">
      <img :src="userInfo.headImage" alt="">
      <span>{{userInfo.nickName}}</span>
    </div>
    <div class="rest vux-1px-b" @click="myMoney" style="margin-top: 0.2rem;">
      <span>我的余额</span>
      <div class="info">
        <span>{{userInfo.balance}}</span>
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <div class="rest" @click="certification">
      <span>认证信息</span>
      <div class="info" >
        <span>{{userInfo.certificationInfo && userInfo.certificationInfo.certificationNo ? '已':'未' }}认证</span>
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
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
      userInfo: {
        nickName: '',
        headImage: '',
        balance: 0,
        withDrawCash: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.fetchGet('/merchant/center/get/main', {merchantId: this.$store.state.merchantId}).then((res) => {
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
  .mine {
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
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.32rem;
    padding-bottom: 0.24rem;
    .headericon {
      position: absolute;
      right: 0.2rem;
      bottom: 0.14rem;
      font-size: 0.42rem;
      color: #000000;
    }
  }
  .pictrue {
    height: 1.4rem;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    img {
      width: 1.08rem;
      height: 1.08rem;
      border-radius: 1.08rem;
      margin-left: 0.36rem;
      background: #ddd;
    }
    span {
      margin-left: 0.2rem;
      font-size: 0.28rem;
    }
  }
  .rest {
    width: 100%;
    height: 0.96rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 0.2rem;
    font-size: 0.28rem;
    color: rgb(98,98,98);
    background: #fff;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    .info {
      display: flex;
      align-items: center;
      span:first-child {
        margin-right: 0.1rem;
      }
    }
  }
  .iphone {
    padding: 0.44rem 0;
    font-size: 0.24rem;
    color: #9b9b9b;
  }
</style>
