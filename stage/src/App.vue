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
    width: auto!important;
    min-width: 10em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 1.8rem!important;
  }
  .weui-toast__content {
    font-size: 0.24rem!important;
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

// comfirm样式
.weui-dialog{
  max-width: 80%!important;
  border-radius: 0.15rem!important;
  .weui-dialog__title{
    font-size: 0.28rem;
  }

  .vux-prompt{
    .vux-prompt-msgbox{
      padding: 0.15rem 0.2rem;
      font-size: 0.28rem;
    }
  }
  .weui-dialog__ft{
    a{
      font-size: 0.28rem;
      line-height: 0.8rem;
    }
  }
}

// 设置-表单样式
.setting_item .weui-cell{
  padding: 0 0rem!important;
  margin-top:0rem!important;
  width: 100%;
  box-sizing: border-box;
}
  .setting_item .weui-cells{
    padding: 0 0rem!important;
    margin-top:0rem!important;
    width: 100%;
    box-sizing: border-box;
}
.setting_item .weui-cells:after{
  border: none!important;
}
.setting_item  .weui-label {
  width: auto!important;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.28rem;
  padding-right: 0.4rem;
}
.setting_item  .weui-input {
  height: 0.9rem!important;
  line-height: 1rem!important;
  text-align: right;
  font-size: 0.28rem;
}
.setting_item .password{
  .weui-cells{
    padding-top: 0px!important;
    margin-top: 0px!important;
  }
  .weui-cells:before{
    border:none!important;
  }
}

.setting_item .password .weui-input {
    text-align: left;
  }

  /*底部弹窗样式*/
  .myActionsheet{
    .weui-actionsheet__cell{
      height:0.7rem;
      font-size:0.28rem;
      line-height:0.7rem;
    }
  }
  .my_popup{
    .vux-popup-dialog{
      font-size:0.28rem;
      .vux-popup-header{
        height:0.7rem;
        font-size:0.28rem;
        line-height:0.7rem;
      }
      .weui-cells{
        label{
          height:0.6rem;
          font-size:0.28rem;
          line-height:0.6rem;
          border-bottom:1px solid #ddd;
          .weui-icon-checked:before{
            font-size:0.3rem;
          }
        }

      }
    }
  }

  // 设置-表单样式
  .orderSend .setting_item .weui-cell {
    padding: 0 0rem!important;
    width: 100%;
    box-sizing: border-box;
  }
  .orderSend .setting_item .weui-cells:after{
    border: none!important;
  }
  .orderSend .setting_item  .weui-label {
    width: auto!important;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding-right: 0.4rem;
  }
  .orderSend .setting_item  .weui-input {
    height: 0.9rem!important;
    line-height: 1rem!important;
    text-align: right;
    font-size: 0.28rem;
  }

</style>
