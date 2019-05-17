<template>
  <div>
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置</span>
    </div>
    <div class="rest" @click="isShow=true">
      <span>物流公司</span>
      <div class="info">
        <span>{{list[params.companyId] || '请选择'}}</span>
        <x-icon type="ios-arrow-right" size="40"></x-icon>
      </div>
    </div>
    <div class="setting_item">
      <group class="w_100">
        <x-input style="margin-top:0px;" title="物流单号" placeholder="请输入物流单号" v-model="params.trackingNo"></x-input>
      </group>
    </div>
    <div class="setting_item">
      <group class="w_100">
        <x-input style="margin-top:0px;" title="寄件人电话" placeholder="请输入寄件人电话" v-model="params.senderPhone"></x-input>
      </group>
    </div>
    <div class="iphone">
      <x-button type="primary" @click.native="orderSend">确定</x-button>
    </div>

    <actionsheet class="myActionsheet"
                  v-model="isShow"
                 :menus="list"
                 :close-on-clicking-mask="false"
                 show-cancel
                 @on-click-menu="confirm"
                 @on-click-mask="confirm">
    </actionsheet>

  </div>
</template>

<script>
import { Group, XButton, PopupHeader, Popup, TransferDom, XInput, Radio, Actionsheet } from 'vux'
export default {
  name: 'Setting',
  directives: {
    TransferDom
  },
  components: {
    Actionsheet,
    PopupHeader,
    Popup,
    Group,
    XButton,
    XInput,
    Radio
  },
  data () {
    return {
      params: {
        trackingNo: '',
        companyId: '',
        senderPhone: '',
        receiverPhone: '',
        orderId: '',
      },
      isShow: false,
      list: {},
      query: null
    }
  },
  created () {
      this.params.receiverPhone = this.$route.query.receiverPhone
    this.params.orderId = this.$route.query.id
    this.getData()
  },
  mounted () {
    this.query = this.$route.query
    console.log(this.query)
  },
  methods: {
    getBack () {
      this.$router.replace({
        name: 'orderedGoods',
        query: {
          id: this.$route.query.id,
          receiverPhone: this.$route.query.receiverPhone
        }
      })
    },
    getData () {
      this.$http.fetchGet('/merchant/order/get/companys').then((res) => {
        let list = res.data.data
        list.forEach(item => {
          this.list[item.id] = item.name
        })
      })
    },
    confirm (msg) {
      this.params.companyId = msg
      this.isShow = false
    },
    orderSend () {
      if(!this.params.companyId){
        this.$vux.toast.show({
          text: '请选择物流公司',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(!this.params.senderPhone){
        this.$vux.toast.show({
          text: '请输入寄件人电话',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(!this.params.trackingNo){
        this.$vux.toast.show({
          text: '请输入物流单号',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/order/update/goods/confirm', this.params).then((res) => {
        this.$vux.loading.hide()
          if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          this.getBack()
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/main.less";
  // 设置-表单样式
  .setting_item .weui-cell {
    padding: 0 0rem!important;
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
