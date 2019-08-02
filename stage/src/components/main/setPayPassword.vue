<template>
<div class="editHotel">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置提现密码</span>
    </div>
    <div class="clearfix">

      <div class="setting_item">
        <span>手机号</span>
        <div style="text-align: left;" class="password">
          {{params.phoneNumber}}
        </div>
      </div>
      <div class="setting_item">
        <span>验证码</span>
        <div class="password">
          <group class="w_100 password_group">
            <x-input :show-clear=false type="number" title="" placeholder="请输入验证码" v-model="params.verifyCode"></x-input>
          </group>
          <span @click="getCode" style="padding: 0.1rem 0.2rem;border: 1px solid #1AAD19;border-radius: 0.25rem;position: absolute;right:0;top:0.14rem;">获取验证码</span>
        </div>
      </div>
      <div class="setting_item">
        <span>提现密码</span>
        <div class="password">
          <group class="w_100 password_group">
            <x-input :show-clear=false title="" :type='isShow1 ? "text": "password"' placeholder="6-20位数字或字母" v-model="params.newPassword"></x-input>
          </group>
          <i class="iconfont icon-xianshi" v-if="isShow1" @click="isShow1=!isShow1"></i>
          <i class="iconfont icon-yincang" v-else @click="isShow1=!isShow1"></i>
        </div>
      </div>
      <div class="setting_item border_base_bottom">
        <span>确认密码</span>
        <div class="password">
          <group class="w_100 password_group">
            <x-input :show-clear=false title="" :type='isShow2 ? "text": "password"' placeholder="请输入确认密码" v-model="doublePassword"></x-input>
          </group>
          <i class="iconfont icon-xianshi" v-if="isShow2" @click="isShow2=!isShow2"></i>
          <i class="iconfont icon-yincang" v-else @click="isShow2=!isShow2"></i>
        </div>
      </div>
    </div>

    <div class="submit">
      <x-button type="primary" @click.native="postData">确认</x-button>
    </div>

</div>
</template>
<style lang="less" scoped>
@import "../../assets/css/main.less";
</style>
<script>
import { XSwitch, Group, XButton, XInput, XTextarea, Previewer, TransferDom } from 'vux'
export default {
  name: 'Mine',
  directives: {
    TransferDom
  },
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
      newMessage: true,
      isShow1: false,
      isShow2: false,
      params: {
        uuid: '',
        newPassword: '',
        verifyCode: '',
        phoneNumber: ''
      },
      doublePassword: ''
    }
  },
  created(){
      this.params.phoneNumber = this.$store.state.phoneNumber
  },
  methods: {
      getUuid () {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
      },
    getCode () {
          let uuid = this.getUuid()
        this.$http.fetchGet('/merchant/verify/code/send',{mobile: this.params.phoneNumber,uuid: uuid}).then((res)=>{
            if(res.data.code == 200) {
                this.params.uuid = uuid
              this.$vux.toast.show({
                text: '获取验证码成功',
                position: 'middle'
              })
            } else {
              this.$vux.toast.show({
                text: res.data.message,
                position: 'middle',
                type: 'warn'
              })
            }
        })
    },
    getBack () {
      this.$router.go(-1)
    },

    postData () {
            if(!this.params.verifyCode) {
              this.$vux.toast.show({
                text: '请输入验证码',
                position: 'middle',
                type: 'warn'
              })
              return
            }
      if(!this.params.newPassword) {
        this.$vux.toast.show({
          text: '请输入提现密码',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(!this.doublePassword) {
        this.$vux.toast.show({
          text: '请输入确认密码',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(this.params.newPassword != this.doublePassword) {
        this.$vux.toast.show({
          text: '两次密码输入不一致',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(this.params.newPassword.length < 6 || this.params.newPassword.length > 20) {
        this.$vux.toast.show({
          text: '提现密码在6-20位之间',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if(!(/^[0-9a-zA-Z]*$/g.test(this.params.newPassword))) {
        this.$vux.toast.show({
          text: '提现密码只能输入数字或字母',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      let params = this.params
      params['merchantId'] = this.$store.state.merchantId
      this.$http.fetchPost('/merchant/reset/pay/password', params).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          this.$router.go(-1)
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
