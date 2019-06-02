/* eslint-disable */
<template>
  <div class="Coupons goodsAdd myCoup">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>添加优惠券</span>
    </div>

    <div class="myLine">
      <span class="typeName">优惠券类型</span>
      <div class="sele">
        <span @click="changeType1('0')" :class="{'green':params.type=='0'}" class="headericon icon iconfont">&#xe60e;</span>
        <span @click="changeType1('0')" class="name">满减券</span>
      </div>
    </div>
    <div class="myLine">
      <span class="typeName">业务类型</span>
      <div class="sele">
        <span @click="changeType2('0')" :class="{'green':params.bizType=='0'}" class="headericon icon iconfont">&#xe60e;</span>
        <span @click="changeType2('0')" class="name" style="margin-right: 0.2rem;">驿站优惠券</span>
        <span @click="changeType2(1)" :class="{'green':params.bizType=='1'}" class="headericon icon iconfont">&#xe60e;</span>
        <span @click="changeType2(1)" class="name">商品优惠券</span>
      </div>
    </div>
    <div class="defaultLine">
      <group>
        <x-input title="优惠券名称" :show-clear=false placeholder="请输入优惠券名称" v-model="params.name"></x-input>
      </group>
    </div>
      <div class="defaultLine">
        <group>
          <x-input type="number" @on-blur="check(params.amount,'amount')"  :show-clear=false title="优惠金额" placeholder="请输入优惠金额" v-model="params.amount"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <x-input type="number" @on-blur="check(params.lowerLimitAmount,'lowerLimitAmount')" :show-clear=false title="优惠门槛" placeholder="请输入优惠门槛" v-model="params.lowerLimitAmount"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <x-input type="number" @on-blur="check(params.buildQuantity,'buildQuantity')" :show-clear=false title="发行张数" placeholder="请输入发行张数" v-model="params.buildQuantity"></x-input>
        </group>
      </div>

    <div class="timeLine">
      <group>
        <calendar title="开始日期" disable-past v-model="startTime"></calendar>
      </group>
    </div>
    <div class="timeLine">
      <group>
        <calendar title="结束日期" disable-past v-model="endTime"></calendar>
      </group>
    </div>
    <div class="submit">
      <x-button type="primary" @click.native="postData">确认添加</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, Calendar, XButton } from 'vux'
  export default {
    name: 'addCoupons',
    components: {
      XButton,
      XInput,
      Group,
      Calendar
    },
    data () {
      return {
          startTime: '',
        endTime: '',
        params: {
          amount: '',
          bizType: '',
          name: '',
          type: '',
          lowerLimitAmount: '',
          buildQuantity: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    methods: {
      check (val,type) {
          if(!val || val < 0) {
              this.params[type] = 0
          }
      },
      changeType1(status) {
          this.params.type = status;
      },
      changeType2(status){
          this.params.bizType = status
      },
      getBack () {
        this.$router.go(-1)
      },
      onChangeStart (val) {
        console.log('change', val)
        this.params.startTime = val
      },
      onChangeEnd (val) {
        console.log('change', val)
        this.params.endTime = val
      },
      postData () {
          if(!this.params.type) {
            this.$vux.toast.show({
              text: '请选择优惠券类型',
              position: 'middle',
              type: 'warn'
            })
            return
          }
        if(!this.params.bizType) {
          this.$vux.toast.show({
            text: '请选择业务类型',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.params.name) {
          this.$vux.toast.show({
            text: '请填写优惠券名称',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.params.amount) {
          this.$vux.toast.show({
            text: '请输入优惠金额',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.params.lowerLimitAmount) {
          this.$vux.toast.show({
            text: '请输入优惠门槛',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(this.params.amount > this.params.lowerLimitAmount || this.params.amount == this.params.lowerLimitAmount){
          this.$vux.toast.show({
            text: '优惠门槛不能小于优惠金额',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.params.buildQuantity) {
          this.$vux.toast.show({
            text: '请输入发行张数',
            position: 'middle',
            type: 'warn'
          })
          return
        }
          console.log(this.params.startTime)
        if(!this.startTime) {
          this.$vux.toast.show({
            text: '请选择开始日期',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        if(!this.endTime) {
          this.$vux.toast.show({
            text: '请选择结束日期',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        let aa = this.startTime
        this.params.startTime = aa.replace(/-/g,'.')
        let bb = this.endTime
        this.params.endTime = bb.replace(/-/g,'.')
        this.$vux.loading.show({
          text: '加载中...'
        })
        this.params['merchantId'] = this.$store.state.merchantId
        this.$http.fetchPost('/merchant/post/add/coupon', this.params).then((res) => {
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

<style lang="less" rel="stylesheet/less" scoped>

  .Coupons {
    width: 100%;
    height: 100%;
    background: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;
  }
  .goodsAdd_con {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }


.submit {
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

  .myLine {
    display: flex;
    padding: 0 0.2rem;
    height: 1rem;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    .typeName {
      font-size: 0.28rem;
    }
    .sele {
      display: flex;
      align-items: center;
      .icon {
        font-size: 0.3rem;
        color: #d7d7d7;
        margin-right: 0.1rem;
      }
      .green {
        color: #7ed221;
      }
      .name {
        font-size: 0.24rem;
      }
    }
  }

</style>
<style>
  .goodsAdd .weui-cell {
    padding: 0 0.2rem!important;
  }
  .goodsAdd .weui-label {
    width: auto!important;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding-right: 0.4rem;
  }
  .goodsAdd .weui-input {
    height: 1rem!important;
    line-height: 1rem!important;
    text-align: right;
    font-size: 0.28rem;
  }
  .goodsAdd .weui-cell_select-after .weui-select {
    font-size: 0.28rem;
  }
  .goodsAdd .weui-cell_select .weui-cell__bd:after {
    height: 0.24rem!important;
    width: 0.24rem!important;
    top: 40%!important;
  }
  .goodsAdd .weui-cells {
    margin-top: 0!important;
  }
  .goodsAdd .switchLine .weui-cell__bd {
    flex: none!important;
  }
  .goodsAdd .switchLine .weui-cell__ft {
    flex: 1;
  }
  .goodsAdd .switchLine .weui-switch {
    transform:scale(1.5,1.5);
  }
  .goodsAdd .ggz .weui-cell__bd {
    padding-right: 0.3rem;
  }
  .calendar-header {
    padding-top: 0.1rem;
  }
  .inline-calendar a {
    font-size: 0.28rem!important;
  }
  .inline-calendar td > span.vux-calendar-each-date {
    font-size: 0.28rem!important;
  }
  .inline-calendar td > span.vux-calendar-each-date {
    font-size: 0.28rem!important;
    width: 0.52rem!important;
    height: 0.52rem!important;
    line-height: 0.5rem!important;
  }

  .myCoup .timeLine {
    height: 1rem;
    background: #fff;
  }
  .myCoup .timeLine .weui-cells:before {
    border-top: none!important;
  }
  .myCoup .timeLine .vux-calendar:before {
    border-top: none!important;
  }
  .myCoup .timeLine .weui-cell {
    height: 1rem!important;
  }
  .myCoup .timeLine .vux-label {
    font-size: 0.28rem;
  }
  .myCoup .timeLine .vux-cell-value {
    font-size: 0.28rem;
    margin-right: 0.1rem;
  }
  .myCoup .timeLine .weui-cell_access .weui-cell__ft:after {
    width: 0.18rem;
    height: 0.18rem;
    margin-top: -0.08rem;
  }
</style>

