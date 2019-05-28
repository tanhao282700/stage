<template>
<div class="background_gray">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>账号绑定</span>
    </div>
    <div class="clearfix">
        <!--<div class="setting_item">
            <span>微信</span>
          <div class="info">
              <span></span>
              <a class="removeBind"  @click="getWechat">绑定</a>
          </div>
        </div>-->
      <div class="setting_item"
          v-for="(item,index) in bindAccountList" v-if="item.accountType != 2" :key="index">
        <span>{{item.name}}</span>
        <div class="info">
          <span>{{item.account}}</span>
          <a class="removeBind"  @click="bind(item)">{{item.account?'解绑':'绑定'}}</a>
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
      window.wechat = function (openid, name) {
        that.$vux.loading.show({
          text: '加载中...'
        })
        let params = {
          account: name,
          openid: openid,
          accountType: that.operItem.accountType,
          merchantId: that.$store.state.merchantId,
          operate: 0
        }
        that.$http.fetchPost('/merchant/center/update/acct', params).then((res) => {
          setTimeout(() => {
            that.$vux.loading.hide()
          }, 500)
          if (res.data.code === 200) {
            that.$vux.toast.show({
              text: '操作成功',
              position: 'middle'
            })
            that.isShow = false
            that.getAccount()
          } else {
            that.$vux.toast.show({
              text: res.data.message,
              position: 'middle',
              type: 'warn'
            })
          }
        })
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
      if(item.account){
          //解绑
          this.offBind(item)
      }else{
          //绑定
        if(item.accountType == 0) {
            //微信
          this.getWechat()
        }else{
            this.isShow = true
        }
      }
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
    offBind (item) {
      this.$vux.loading.show({
        text: '加载中...'
      })
        let params = {
          account: '',
          accountType: this.operItem.accountType,
          openid: item.openid || '',
          merchantId: this.$store.state.merchantId,
          operate: 1
        }
      this.$http.fetchPost('/merchant/center/update/acct', params).then((res) => {
        this.$vux.loading.hide()
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

    onCancel () {
      this.isShow = false
    }
  }
}
</script>
