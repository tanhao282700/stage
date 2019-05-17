<template>
<div class="background_gray">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>账号绑定</span>
    </div>
    <div class="clearfix">
        <div class="setting_item">
            <span>微信</span>
          <div class="info">
              <span></span>
              <a class="removeBind"  @click="getWechat">绑定</a>
          </div>
        </div>
      <div class="setting_item"
          v-for="(item,index) in bindAccountList" :key="index">
        <span>{{item.name}}</span>
        <div class="info" v-if="item.account">
          <span>{{item.account}}</span>
          <a class="removeBind"  @click="removeBind(item)">解绑</a>
        </div>
        <div class="info" v-else>
          <span>{{item.account}}</span>
          <a class="removeBind" @click="bind(item)">绑定</a>
        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <confirm v-model="isShow"
      show-input
      :title="operItem.name+'账号'"
      :input-attrs="{type: 'text'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      </confirm>
    </div>
</div>
</template>
<style lang="less" scoped>
@import "../../assets/css/main.less";
</style>
<script>
import { Group, XButton, XInput, Confirm, TransferDom } from 'vux'
export default {
  name: 'accoundBind',
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Group,
    XButton,
    Confirm
  },
  data () {
    return {
      bindAccountList: [],
      isShow: false,
      operItem: {
        name: ''
      }
    }
  },
  created () {
    this.getAccount()
  },
  methods: {
    getWechat () {
      let that = this
      window.wechat = function (account, openid) {

      }
      window.AndroidListener.onOpenWxListener()
    },
    getBack () {
      this.$router.go(-1)
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

    bind (item) {
      this.operItem = item
      this.isShow = true
    },

    onConfirm (msg) {
      if (msg) {
        this.bindPost(msg)
      } else {
        this.$vux.toast.show({
          text: '请输入账号',
          position: 'middle',
          type: 'warn'
        })
      }
    },
    bindPost (msg) {
      let params = {
        account: msg,
        accountType: this.operItem.accountType,
        merchantId: this.$store.state.merchantId,
        operate: 0
      }
      this.$http.fetchPost('/merchant/center/update/acct', params).then((res) => {
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          this.isShow = false
          this.getAccount()
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    removeBind (item) {
      let params = {
        account: item.account,
        accountType: item.accountType,
        merchantId: this.$store.state.merchantId,
        operate: 1
      }
      this.$http.fetchPost('/merchant/center/update/acct', params).then((res) => {
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })

          this.getAccount()
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },

    onCancel () {
      this.isShow = false
    }
  }
}
</script>
