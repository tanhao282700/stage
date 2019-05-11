<template>
<div class="editHotel">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置登录密码</span>
    </div>
    <div class="clearfix">

      <div class="setting_item">
        <span>当前密码</span>
        <div class="password">
          <group class="w_100 password_group">
            <x-input title="" :type='isShow1 ? "text": "password"' placeholder="请输入当前密码" v-model="params.oldPassword"></x-input>
          </group>
          <i class="iconfont icon-xianshi" v-if="isShow1" @click="isShow1=!isShow1"></i>
          <i class="iconfont icon-yincang" v-else @click="isShow1=!isShow1"></i>
        </div>
      </div>
      <div class="setting_item border_base_bottom">
        <span>新密码</span>
        <div class="password">
          <group class="w_100 password_group">
            <x-input title="" :type='isShow2 ? "text": "password"' placeholder="请输入新密码" v-model="params.newPassword"></x-input>
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
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    getBack () {
      this.$router.go(-1)
//      this.$router.replace({
//          name: 'Setting'
//      })
    },

    postData () {
      let params = this.params
      params['merchantId'] = this.$store.state.merchantId
      this.$http.fetchPost('/merchant/update/login/password', params).then((res) => {
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
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
    }
  }
}
</script>
