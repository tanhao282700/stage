<template>
<div class="background_gray">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>认证信息</span>
    </div>
    <div class="clearfix">
      <div class="item_title">身份认证</div>
      <div class="setting_item setting_item_40">
        <span>真实姓名</span>
        <div class="info">
          <span>{{certificationInfo.name}}</span>
        </div>
      </div>
      <div class="setting_item setting_item_40">
        <span>证件类型</span>
        <div class="info">
          <span>{{dealType(certificationInfo.certificationType)}}</span>
        </div>
      </div>
      <div class="setting_item setting_item_40 border_none">
        <span>证件号码</span>
        <div class="info">
          <span>{{certificationInfo.certificationNo}}</span>
        </div>
      </div>

      <div class="item_title">
        账号绑定
        <!-- <a>修改</a> -->
      </div>
      <div class="setting_item setting_item_40"
          v-for="(item,index) in bindAccountList" :key="index">
        <span>{{item.name}}</span>
        <div class="info">
          <span>{{item.account || '未绑定'}}</span>
        </div>
      </div>

    </div>

</div>
</template>
<style lang="less" scoped>
@import "../../assets/css/main.less";
</style>
<script>
import { XSwitch, Group, XButton, XInput, XTextarea, Previewer } from 'vux'
export default {
  name: 'certification',
  components: {
    Previewer,
    XTextarea,
    XSwitch,
    XInput,
    Group,
    XButton
  },
  data () {
    return {
      userInfo: {
        nickName: '',
        headImage: '',
        balance: 0,
        withDrawCash: 0
      },
      certificationInfo: {
        certificationNo: '',
        certificationType: null,
        id: null,
        name: ''
      },
      bindAccountList: []
    }
  },
  created () {
    this.getData()
    this.getAccount()
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    getData () {
      this.$http.fetchGet('/merchant/center/get/main', {merchantId: this.$store.state.merchantId}).then((res) => {
        this.userInfo = res.data.data
        this.certificationInfo = this.userInfo.certificationInfo
      })
    },
    getAccount () {
      this.$http.fetchGet('/merchant/center/get/acctlist', {merchantId: this.$store.state.merchantId}).then((res) => {
        this.bindAccountList = res.data.data.bindAccountList

        this.bindAccountList.forEach(item => {
          item['name'] = this.dealAccountType(item.accountType)
        })
      })
    },
    // 0-微信 1-支付宝 2-银行卡
    dealAccountType (type) {
      let name = ''
      switch (type) {
        case 0: name = '微信'; break
        case 1: name = '支付宝'; break
        case 2: name = '银行卡'; break
        default: name = ''; break
      }
      return name
    },

    dealType (type) {
      let name = ''
      switch (type) {
        case 0: name = '身份证'; break
        case 1: name = '军官证'; break
        case 2: name = '护照'; break
        default: name = ''; break
      }
      return name
    }
  }
}
</script>
<style>
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
