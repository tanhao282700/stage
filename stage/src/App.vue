<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" rel="stylesheet/less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  #app {
    font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .vux-x-icon {
    fill: rgb(74,74,74);
  }
  .vux-rater a {
    font-size: 0.5rem!important;
    width: 0.4rem!important;
    height: 0.4rem!important;
  }
  .bottom-tip {
    font-size: 0.26rem!important;
  }
  .weui-loadmore__tips {
    font-size: 0.26rem!important;
  }
  .vux-loadmore.weui-loadmore_line {
    margin-top: 0.4rem;
  }
  .no_data {
    height: 0.4rem;
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    span:first-child {
      height: 1px;
      flex: 1;
      background: #d7d7d7;
      margin: 0 0.4rem;
    }
    span:last-child {
      height: 1px;
      flex: 1;
      background: #d7d7d7;
      margin: 0 0.4rem;
    }
  }
  .weui-toast {
    width: 1.8rem!important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 1.8rem!important;
  }
  .weui-toast__content {
    font-size: 0.24rem;
    margin-top: 0.2rem;
  }
  .pic_btn {
    width: 1.28rem;
    height: 1.28rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    span:first-child {
      width: 0.48rem;
      height: 0.44rem;
      background: url(./assets/images/camera.png) no-repeat center center/100% 100%;
    }
    span:last-child {
      color: #bdbdbd;
      margin-top: 0.1rem;
    }
  }
</style>
