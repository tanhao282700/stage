/* eslint-disable */
<template>
  <div class="Coupons goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
      <span>添加优惠券</span>
    </div>

    <div class="goodsAdd_con">
      <div class="defaultLine">
        <group>
          <x-input title="优惠金额" placeholder="请输入优惠金额" v-model="params.amount"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <x-input title="优惠门槛" placeholder="请输入优惠门槛" v-model="params.lowerLimitAmount"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <x-input title="发行张数" placeholder="请输入发行张数" v-model="params.buildQuantity"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <datetime-range title="开始时间" class="my_picker" start-date="2017-01-01" end-date="2017-02-02" format="YYYY/MM/DD" v-model="value" @on-change="onChange"></datetime-range>
          <datetime-range class="my_picker" start-date="2017-01-01" end-date="2017-02-02" format="YYYY/MM/DD" v-model="value" @on-change="onChange"></datetime-range>
        </group>
      </div>


    </div>

  </div>
</template>

<script>
  import { XInput, Group, DatetimeRange } from 'vux'
  export default {
    name: 'addCoupons',
    components: {
      XInput,
      Group,
      DatetimeRange
    },
    data () {
      return {
        value: ['2017-01-15', '03', '05'],
        params: {
          amount: '',
          lowerLimitAmount: '',
          buildQuantity: '',
          startTime: null,
          endTime: null
        }
      }
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      onChange (val) {
        console.log('change', val)
      },
      postData () {
        let params = this.params
        params['merchantId'] = this.$store.state.merchantId
        this.$http.fetchPost('/merchant/post/add/coupon', params).then((res) => {
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


  .iosHeader {
    width: 100%;
    height: 1.28rem;
    background: #fff;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.36rem;
    padding-bottom: 0.24rem;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    .headerIcon {
      position: absolute;
      left: 0.2rem;
      bottom: 0.14rem;
      font-size: 0.42rem;
      color: #000000;
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
</style>

