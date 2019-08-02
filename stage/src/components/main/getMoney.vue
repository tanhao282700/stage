<template>
  <div class="getMoney">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>余额提现</span>
    </div>
    <div class="tit">提现金额</div>
    <div class="inpu">
      <div class="inpu_con vux-1px-b">
        <group>
          <x-input :show-clear=false title="¥" placeholder="请输入提现金额" v-model="value"></x-input>
        </group>
      </div>
    </div>
    <div class="info vux-1px-b">
      <span v-text="'余额¥'+baseInfo.balance"></span>
      <span @click="getAll">全部提现</span>
    </div>
    <div class="inpu pas">
      <div class="inpu_con vux-1px-b">
        <group>
          <x-input type="password" :show-clear=false title="提现密码" placeholder="请输入提现密码" v-model="passWord"></x-input>
        </group>
      </div>
    </div>
    <div class="tit2">提现到</div>
    <div class="types vux-1px-b" v-if="item.accountType!=2" v-for="(item,index) in baseInfo.bindAccountList">
      <div class="left">
        <!--<span class="ic zpay" :class="{'zpay':item.accountType==1,'we':item.accountType==0,'card':item.accountType==2}" ></span>-->
        <img class="ic zpay" v-if="item.accountType==1" src="../../assets/images/zpay.png" alt="">
        <img class="ic zpay" v-if="item.accountType==0" src="../../assets/images/we.png" alt="">
        <div class="infos">
          <span v-if="item.accountType==1">支付宝账户</span>
          <span v-if="item.accountType==0">微信账户</span>
          <span v-if="item.accountType==2">银行卡账户</span>
          <span v-text="item.account"></span>
        </div>
      </div>
      <div @click="checkChange(item.accountType,item.account)" class="right">
        <check-icon :value.sync="type === item.accountType" type="plain"></check-icon>
      </div>
    </div>
    <div @click="sendData" class="button">确认提现</div>
  </div>
</template>

<script>
  import { XInput, Group, CheckIcon } from 'vux'
  export default {
    name: 'getMoney',
    components: {
      XInput,
      Group,
      CheckIcon
    },
    data () {
      return {
        value: '',
        baseInfo: {},
        type: '',
        passWord: ''
      }
    },
    created () {
      this.getInfo()
    },
    methods: {
        checkChange(type,val){
            let tips = ''
            if(type==0) {
              tips = '未绑定微信'
            }
            if(type == 1) {
              tips = '未绑定支付宝'
            }
            if(!val) {
              this.$vux.toast.show({
                text: tips,
                position: 'middle',
                type: 'warn'
              })
                return
            }
          this.type=type
        },
      getAll () {
          this.value = this.baseInfo.balance
      },
      sendData(){
        if(!this.value){
          this.$vux.toast.show({
            text: '请输入提现金额',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(parseInt(this.value) > this.baseInfo.balance){
          this.$vux.toast.show({
            text: '提现金额不能大于余额',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.passWord) {
          this.$vux.toast.show({
            text: '请输入提现密码',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(this.passWord.length < 6 || this.passWord.length > 20) {
          this.$vux.toast.show({
            text: '提现密码在6-20位之间',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!(/^[0-9a-zA-Z]*$/g.test(this.passWord))) {
          this.$vux.toast.show({
            text: '提现密码只能输入数字或字母',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!String(this.type)){
          this.$vux.toast.show({
            text: '请输入选择提现方式',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        this.$http.fetchPost('/merchant/verify/pay/password',{merchantId: this.$store.state.merchantId,password: this.passWord}).then((res)=>{
          if(res.data.code == 200) {
          this.$http.fetchPost('/merchant/center/update/balance/withdraw',{
            accountType: this.type,
            amount: this.value,
            merchantId: this.$store.state.merchantId
          }).then((res)=>{
            if(res.data.code == 200) {
            this.$vux.toast.show({
              text: '提现成功',
              position: 'middle'
            })
            this.$router.go(-1)
          }else{
            this.$vux.toast.show({
              text: res.data.message,
              position: 'middle',
              type: 'warn'
            })
          }
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
      getInfo () {
          this.$http.fetchGet('/merchant/center/get/balance/withdraw',{merchantId: this.$store.state.merchantId}).then((res)=>{
              this.baseInfo = res.data.data
          })
      },
      getBack(){
          this.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .getMoney {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .tit {
    height: 1.2rem;
    font-size: 0.28rem;
    padding: 0 0.2rem;
    background: #fff;
    line-height: 1.2rem;
  }
  .inpu {
    height: 0.64rem;
    background: #fff;
    .inpu_con{
      height: 0.64rem;

    }
  }
  .info {
    height: 0.6rem;
    line-height: 0.6rem;
    background: #fff;
    padding: 0 0.2rem;
    span{
      font-size: 0.28rem;
      &:last-child {
        color: rgb(30,162,20);
      }
    }
  }
  .tit2 {
    height: 0.9rem;
    font-size: 0.28rem;
    padding: 0 0.2rem;
    background: #fff;
    line-height: 1.2rem;
    margin-top: 0.2rem;
  }
  .types {
    padding: 0 0.2rem;
    background: #fff;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .shadow {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 99;
    }
    .left {
      display: flex;
      align-items: flex-start;
      .ic {
        width: 0.44rem;
        height: 0.44rem;
      }
      .zpay {
        background: url(../../assets/images/zpay.png) no-repeat left top/100% 100%;
      }
      .we {
        background: url(../../assets/images/we.png) no-repeat left top/100% 100%;
      }
      .card {
        background: url(../../assets/images/card.png) no-repeat left top/100% 100%;
      }
      .infos {
        display: flex;
        flex-direction: column;
        margin-left: 0.3rem;
        span{
          font-size: 0.28rem;
          &:last-child {
            color: #bdbdbd;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
  .button {
    width: 6.7rem;
    height: 0.8rem;
    background: #19ad19;
    border-radius: 0.4rem;
    margin-left: 0.4rem;
    margin-top: 0.76rem;
    text-align: center;
    line-height: 0.8rem;
    color: white;
    font-size: 0.32rem;
  }
</style>
<style>
  .getMoney .inpu_con .weui-cells {
    margin-top: 0!important;
  }
  .getMoney .inpu_con .weui-label {
    width: auto!important;
    padding: 0 0.375rem;
    font-size: 0.4rem;
  }
  .getMoney .pas .inpu_con .weui-label {
    width: auto!important;
    padding: 0!important;
    font-size: 0.24rem;
  }
  .getMoney .inpu_con .weui-input {
    height: 0.64rem;
    line-height: 0.64rem;
    font-size: 0.28rem;
    padding-left: 0.1rem;
  }
  .getMoney .weui-cells:before {
    border-top: none!important;
  }
  .getMoney .types .weui-icon-success-circle{
    font-size: 0.4rem;
  }
  .getMoney .types .weui-icon-circle {
    font-size: 0.4rem;
  }
</style>
