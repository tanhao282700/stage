<template>
  <div class="orderedGoods">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>订单详情</span>
    </div>
    <div class="con">
      <div class="con_content">
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">订单金额</span>
          <span class="redText">¥{{detail.orderAmt || 0}}</span>
        </div>
        <div class="price defaultLine p-lr">
          <span class="defaultText">订单状态</span>
          <span class="redText">{{dealStatus(detail.orderStatus)}}</span>
        </div>

        <div class="clearfix">
          <div class="defaultTitle defaultText">
            <!--<span>定制项目</span>-->
            <span>商品信息</span>
          </div>
          <div class="custom orderedHouse"
              v-for="(item, index) in detail.goodsInfo" :key="index">
            <div class="img">
              <img :src="item.imageUrl" alt="">
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <span>x{{item.quantity}}</span>
            </div>
            <span class="price redText">¥{{item.price}}</span>
            <!--<div class="collect">-->
              <!--<span class="collect-icon icon iconfont">&#xe696;</span>-->
              <!--<span class="txt">联系买家</span>-->
            <!--</div>-->
          </div>
        </div>

        <div class="defaultTitle defaultText">
          <span>优惠信息</span>
        </div>
        <div class="price defaultLine p-lr"
             v-for="(item, index) in detail.couponInfo" :key="index">
          <span class="defaultText">
            【{{item.couponType == 0 ? '商家券': '平台券'}}】
            {{item.title}}
          </span>
          <span class="redText">-¥{{item.amount}}</span>
        </div>

        <div class="defaultTitle defaultText">
          <span>收货信息</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">收货人姓名</span>
          <span class="defaultText">{{detail.receiverName}}</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">电话号码</span>
          <span class="defaultText">{{detail.receiverPhone}}</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">收货地址</span>
          <span class="defaultText">{{detail.receiverAddress}}</span>
        </div>

        <!--待收货-->
        <div v-if="detail.orderStatus >= 8">
          <div class="defaultTitle defaultText">
            <span>物流信息</span>
          </div>
          <div class="price defaultLine vux-1px-b p-lr">
            <span class="defaultText">物流公司</span>
            <span class="defaultText">{{detail.company}}</span>
          </div>
          <div class="price defaultLine vux-1px-b p-lr">
            <span class="defaultText">物流单号</span>
            <span class="defaultText">{{detail.trackingNo}}</span>
          </div>
        </div>


        <div v-if="detail.refundReason">
          <div class="defaultTitle defaultText">
            <span>退款理由</span>
          </div>
          <div class="words">
            {{detail.refundReason}}
          </div>
        </div>
        <div v-if="detail.orderStatus == 2">
          <div class="defaultTitle defaultText">
            <span>拒绝退款原因</span>
          </div>
          <div class="words">
            <group class="w_100">
              <x-textarea :max="200" name="description" v-model="reasons" placeholder="请输入拒绝退款原因"></x-textarea>
            </group>
          </div>
        </div>
        <div v-if="detail.orderStatus == 3">
          <div class="defaultTitle defaultText">
            <span>拒绝退款原因</span>
          </div>
          <div class="words">
            {{detail.refundFailReason}}
          </div>
        </div>

        <div class="bottomLine" style="padding-top: 0.2rem;">
          订单编号：{{detail.orderId}}
        </div>
        <div style="padding-bottom: 0.2rem;">
          <div class="bottomLine"
               v-for="(item, index) in detail.scheduleInfo" :key="index">
            {{item.tradeDes}}：{{item.completeTime}}
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="detail.orderStatus == 2">
      <span @click="refused">拒绝退款</span>
      <span @click="agree">同意退款</span>
    </div>

    <!--待发货-->
    <div class="bottom"
         v-if="detail.orderStatus == 1 || detail.orderStatus == 3"
          @click="oderSend">
      <span>去发货</span>
    </div>
  </div>
</template>

<script>
import { XTextarea } from 'vux'
export default {
  name: 'orderedGoods',
  components: {
    XTextarea
  },
  data () {
    return {
      // 商品 0-待支付,1-待发货,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,8-待收货,9-已完成,99-所有状态
      // 驿站 0-待支付,1-待确认,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,7-待入住,8-入住中,9-已完成,99-所有状态
      oderStatus: 1,
      reasons: '',
      detail: {
        company: '中通快递', // 物流公司 ,
        scheduleInfo: '', // 订单流程进度信息 ,
        trackingNo: '656565+65656565', //  物流单号
        goodsInfo: [], // 商品清单信息 ,
        orderAmt: 6, // 订单金额 ,
        orderId: '65464654165', // 订单号 ,
        orderStatus: 4, // 订单状态【0-待支付,1-待发货,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,8-待收货,9-已完成,99-所有状态】
        couponInfo: [], // 优惠信息 ,
        receiverAddress: '成都市高新区天府三街', //  收货地址 ,
        receiverName: '古天乐', // : 收货人姓名 ,
        receiverPhone: '15700350000', // 收货人电话 ,
        refundFailReason: '', // 退款失败理由 ,
        refundReason: '' // 退款理由 ,
      },
      //      测试数据
      couponInfo: [
        {
          amount: 99.00,
          couponType: 0, // 优惠券类型【0-商家券 1-平台券】 ,
          title: '满200减20'
        },
        {
          amount: 99.00,
          couponType: 0, // 优惠券类型【0-商家券 1-平台券】 ,
          title: '满200减20'
        },
        {
          amount: 99.00,
          couponType: 0, // 优惠券类型【0-商家券 1-平台券】 ,
          title: '满200减20'
        }
      ],
      goodsInfo: [
        {
          price: 99.00,
          quantity: 2,
          title: '我是标题',
          imageUrl: '/static/img/test.7f2f298.png'
        },
        {
          price: 99.00,
          quantity: 2,
          title: '我是标题',
          imageUrl: '/static/img/test.7f2f298.png'
        },
        {
          price: 99.00,
          quantity: 2,
          title: '我是标题',
          imageUrl: '/static/img/test.7f2f298.png'
        }
      ],
      scheduleInfo: [
        {
          completeTime: '2019-01-15 15:30',
          tradeDes: '下单时间'
        },
        {
          completeTime: '2019-01-15 15:30',
          tradeDes: '付款时间'
        },
        {
          completeTime: '2019-01-15 15:30',
          tradeDes: '发货时间'
        }
      ]
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.detail.goodsInfo = this.goodsInfo
    this.detail.couponInfo = this.couponInfo
    this.detail.scheduleInfo = this.scheduleInfo
    this.getDetail()
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    oderSend () {
      this.$router.replace({
        name: 'orderSend',
        /*query: {
          orderId: this.detail.orderId,
          receiverPhone: this.detail.receiverPhone,
          senderPhone: this.detail.senderPhone
        }*/
        query: {
          id: this.$route.query.id,
          receiverPhone: this.detail.receiverPhone
        }
      })
    },
    //    拒绝退款
    refused () {
      if (!this.reasons) {
        this.$vux.toast.show({
          text: '请输入拒绝退款原因',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.postData(1)
    },
    agree () {
      this.postData(0)
    },
    postData (flag) {
        let params = {}
        if(flag == 1){
          params = {
            operate: flag, // 操作【0-取消订单,1-确认订单,2-办理入住,3-同意退款,4-拒绝退款,5-修改价格】 ,
            orderId: this.detail.orderId, // 订单编号 ,
            refuseReason: this.reasons // 拒绝理由【拒绝退款时必输】
          }
        }
        if(flag == 0){
          params = {
            operate: flag, // 操作【0-取消订单,1-确认订单,2-办理入住,3-同意退款,4-拒绝退款,5-修改价格】 ,
            orderId: this.detail.orderId, // 订单编号 ,
          }
        }
      this.$http.fetchPost('/merchant/order/update/goods', params).then((res) => {
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          this.getBack()
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    getDetail () {
      this.$http.fetchGet('/merchant/order/get/goods/detail', {orderId: this.$route.query.id}).then((res) => {
        setTimeout(() => {
        this.$vux.loading.hide()
      }, 500)
          this.detail = res.data.data
      })
    },
    dealStatus (status) {
      let name = ''
      switch (status) {
        case 0: name = '待支付'; break
        case 1: name = '待发货'; break
        case 2: name = '申请退款'; break
        case 3: name = '退款失败'; break
        case 4: name = '退款成功'; break
        case 5: name = '取消订单'; break
        case 6: name = '待点评'; break
        case 8: name = '待收货'; break
        case 9: name = '已完成'; break
        case 99: name = '所有状态'; break
        default: name = '所有状态'; break
      }
      return name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .orderedGoods {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .con{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: #fff;
    .defaultLine {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .infoLine {
      display: flex;
      align-items: center;
      span:last-child {
        margin-left: 0.4rem;
      }
    }
    .p-lr {
      padding: 0 0.2rem;
    }
    .defaultText {
      font-size: 0.28rem;
    }
    .redText {
      font-size: 0.28rem;
      color: #f24b45;
    }
    .defaultTitle {
      height: 0.72rem;
      background: rgb(247,247,247);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: left;
      line-height: 0.72rem;
      padding: 0 0.2rem;
    }
    .price {
      height: 0.8rem;
    }
    .words {
      padding: 0.2rem 0.2rem;
      font-size: 0.28rem;
      text-align: left;
    }
    .bottomLine {
      font-size: 0.24rem;
      color: #9b9b9b;
      background: #f7f7f7;
      text-align: left;
      padding: 0.05rem 0.2rem;
    }
    .orderedHouse {
      height: 2rem;
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      .img {
        height: 1.6rem;
        width: 2.4rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
      }
      .info {
        flex: 1;
        height: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 0.2rem;
        p {
          font-size: 0.28rem;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }
        span {
          font-size: 0.28rem;
          color: #353535;
        }
      }
      .price {
        height: 1.6rem;
        display: flex;
        align-items: flex-end;
      }
    }
    .custom {
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #C7C7C7;
        color: #C7C7C7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child:after {
        height: 0;
        border: none;
      }
      &:last-child {
        border-bottom: none;
      }
      .img {
        width: 2rem;
        height: 1.56rem;
      }
      .collect {
        position: absolute;
        width: 1.2rem;
        height: 1rem;
        right: 0.2rem;
        top: 0.05rem;
        background: rgb(23,173,25);
        border-radius: 0.1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .collect-icon {
          color: white;
          font-size: 0.36rem;
        }
        .txt {
          font-size: 0.2rem;
          color: white;
        }
      }
    }
  }
  .bottom {
    height: 0.96rem;
    display: flex;
    font-size: 0.28rem;
    span {
      flex: 1;
      line-height: 0.96rem;
      &:first-child {
        background: #fff;
      }
      &:last-child {
        background: rgb(26,173,25);
        color: white;
      }
    }
  }
</style>
