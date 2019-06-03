/* eslint-disable */
<template>
  <div class="Coupons goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>驿站优惠券</span>
      <x-icon @click="addCoupons" class="right" type="ios-plus-empty" size="60"></x-icon>
    </div>

    <div class="cons">
      <div class="cons_box">
      <div class="custom orderedHouse" v-for="(item, index) in list" :key="index">
        <div class="img">
          <!--<img src="../../assets/images/money.png" alt="">-->
          <div class="prices">
            <span>¥</span>
            <span v-text="item.amount"></span>
          </div>
          <div class="tips" v-text="'满'+item.lowerLimitAmount+'元可用'"></div>
        </div>
        <div class="info">
          <div class="cous_type">
            <span>{{item.type  == 0 ?'满减卷':'折扣卷'}}</span>
            <span>{{item.bizType  == 0 ?'驿栈优惠券':'商品优惠券'}}</span>
          </div>
          <p>{{'已领'+item.getQuantity+'剩余'+item.remainingQuantity+'已使用'+item.usedQuantity}}</p>
          <p>{{item.name}}</p>
          <span class="time">{{item.startTime}} - {{item.endTime}}</span>
        </div>
        <div class="isUsed" style="">
          <group>
            <x-switch title="启用状态" v-model="item.status == 0"></x-switch>
          </group>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Group, XSwitch } from 'vux'
export default {
  name: 'coupons',
  components: {
    Group,
    XSwitch
  },
  data () {
    return {
      aa: true,
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    addCoupons () {
      this.$router.push({
        name: 'addCoupons'
      })
    },
    getBack () {
      this.$router.go(-1)
    },
    getData () {
      let params = {
        page: 1,
        pageSize: 100,
        merchantId: this.$store.state.merchantId
      }
      this.$http.fetchGet('/merchant/post/get/couponlist', params).then((res) => {
        this.list = res.data.data.coupons
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

  .cons{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .orderedHouse {
      /* height: 1.8rem; */
      height: 2.3rem;
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      background: #fff;
      margin-top: 0.2rem;
      .img {
        height: 1.8rem;
        width: 2.08rem;
        background: #f14b44;
        border-radius: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        .prices {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          span:first-child {
            color: white;
            font-size: 0.3rem;
            margin-top: 0.2rem;
            margin-right: 0.1rem;
          }
          span:last-child {
            color: white;
            font-size: 0.7rem;
            font-weight: bold;
          }
        }
        .tips {
          color: white;
          font-size: 0.28rem;
        }
        /*img {
          width: 100%;
          height: 100%;
        }*/
      }
      .info {
        flex: 1;
        /* height: 1.6rem; */
        height: 2.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 0.2rem;
        padding: 0.16rem 0;
        .cous_type{
          span{
            background: rgb(241,75,68);
            color: #fff;
            font-size: 0.24rem;
            padding: 0.04rem 0.14rem;
          }
        }
        p {
          font-size: 0.24rem;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
          margin: 0.1rem 0;
        }
        p:last-child {
          margin-tOP: 0;
        }
        .time {
          font-size: 0.2rem;
          color: rgb(108,108,108);
        }
      }
      .price {
        height: 1.6rem;
        display: flex;
        align-items: flex-end;
      }
    }
  }

</style>
<style>
.goodsAdd .switchLine .weui-cell__bd {
    flex: none!important;
  }
  .goodsAdd .switchLine .weui-cell__ft {
    flex: 1;
  }
  .Coupons .switchLine .weui-cell__bd label {
    font-size: 0.24rem;
  }
  .goodsAdd .switchLine .weui-switch {
    transform:scale(1.5,1.5);
  }
  .Coupons .isUsed .weui-cells:before {
    border-top: none!important;
  }
  .Coupons .isUsed .weui-cells:after {
    border-bottom: none!important;
  }
</style>
