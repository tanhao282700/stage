/* eslint-disable */
<template>
  <div class="Coupons goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
      <span>添加优惠券</span>
    </div>

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
      <div class="defaultLine" style="position: relative;">
        <div class="my_picker">
          <group>
            <datetime-range title="有效期"
                          :start-date="startDate"
                          :end-date="endDate"
                          format="YYYY/MM/DD"
                          v-model="params.startTime"
                          @on-change="onChangeStart"></datetime-range>
        </group>
        </div>
        <div class="my_picker my_picker2">
          <group>
            <datetime-range title="至"
                          :start-date="startDate"
                          :end-date="endDate"
                          format="YYYY/MM/DD"
                          v-model="params.endTime"
                          @on-change="onChangeEnd"></datetime-range>
          </group>
        </div>
      </div>

    <div class="submit">
      <x-button type="primary" @click.native="postData">确认添加</x-button>
    </div>

  </div>
</template>

<script>
  import { XInput, Group, DatetimeRange, XButton } from 'vux'
  export default {
    name: 'addCoupons',
    components: {
      XButton,
      XInput,
      Group,
      DatetimeRange
    },
    data () {
      return {
        startDate: '2017-01-01',
        endDate: '2020-02-02',
        value: ['2017-01-15', '03', '05'],
        params: {
          amount: '',
          lowerLimitAmount: '',
          buildQuantity: '',
          startTime: [],
          endTime: []
        }
      }
    },
    methods: {
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
        let params = JSON.parse(JSON.stringify(this.params))
        params['startTime'] = params.startTime.join('')
        params['endTime'] = params.endTime.join('')
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

