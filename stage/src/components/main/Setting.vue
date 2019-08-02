<template>
  <div class="mine">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置</span>
    </div>
    <div class="rest">
      <span>新消息通知</span>
      <div class="info info_switch">
        <!-- <x-switch title="" v-model="newMessage"></x-switch> -->
          <group>
            <x-switch title="" v-model="newMessage"></x-switch>
          </group>
      </div>
    </div>
    <div class="rest" @click="accountBind">
      <span>绑定账号</span>
      <div class="info">
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <div class="rest" @click="setPassword">
      <span>设置登录密码</span>
      <div class="info">
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <div class="rest" @click="setPayPassword">
      <span>设置提现密码</span>
      <div class="info">
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <div class="rest">
      <span>联系客服</span>
      <div class="info">
        <span>17343348329</span>
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <!-- <div class="rest">
      <span>清空缓存</span>
      <div class="info">
        <span>24.21M</span>
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div> -->
    <div @click="backTo" class="iphone">
      <x-button type="primary">返回用户端</x-button>
    </div>
  </div>
</template>

<script>
import { XSwitch, Group, XButton } from 'vux'
export default {
  name: 'Setting',
  components: {
    XSwitch,
    Group,
    XButton
  },
  data () {
    return {
      newMessage: true
    }
  },
  methods: {
    backTo () {
      let ua = navigator.userAgent.toLowerCase();
      //Android终端
      let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
      //Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        window.webkit.messageHandlers.onBackListener.postMessage(null)
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //Android终端
        window.AndroidListener.onBackListener()
      }
    },
    getBack () {
      this.$router.go(-1)
    },
    accountBind () {
      this.$router.push({
        name: 'accountBind'
      })
    },
    setPayPassword () {
      this.$router.push({
        name: 'setPayPassword'
      })
    },
    setPassword () {
      this.$router.push({
        name: 'setPassword'
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
  .rest {
    font-family: PingFang SC;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.15rem 0.2rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: rgb(0,0,0);
    background: #fff;
    border-bottom: 1px solid #C7C7C7;
    svg {
      width: 0.40rem;
      height: 0.40rem;
    }
    .info {
      display: flex;
      align-items: center;
      span:first-child {
        margin-right: 0.1rem;
      }
      &.info_switch{
        height: 0.5rem;
        // width: 1.2rem;
      }
    }
  }
  .iphone {
    padding: 0 0.3rem;
    padding-top: 1rem;
    button{
      width: 100%;
      height: 0.8rem;
      font-size: 0.32rem;
      color: #fff;
      border-radius: 0.4rem;
    }
  }
</style>
<style>
.mine .info .vux-x-switch.weui-cell_switch{
  /* padding: 0px; */
  /* padding-top: 0px;
  padding-bottom: 0px; */
}
.mine .info .vux-no-group-title{
  /* margin-top: 0px; */
}
.mine .info .weui-cells .weui-cell__bd {
  flex: none!important;
}
.mine .info .weui-cell__ft {
  flex: 1;
}
.mine .info .weui-switch {
  transform:scale(1.5,1.5)!important;
}
</style>
