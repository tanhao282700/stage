<template>
  <div class="orderedGoods">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
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

        <div v-if="detail.roomInfo">
          <div class="defaultTitle defaultText">
            <span>预定房源</span>
          </div>
          <div class="orderedHouse"
               v-for="(item, index) in detail.roomInfo" :key="index">
            <div class="img">
              <img :src="item.url" alt="">
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <span>{{item.liveDay}}</span>
            </div>
            <span class="price redText">¥{{item.amount}}</span>
          </div>
        </div>

        <div class="clearfix" v-if="detail.customProjectInfo">
          <div class="defaultTitle defaultText">
            <span>定制项目</span>
          </div>
          <div class="custom orderedHouse"
               v-for="(item, index) in detail.customProjectInfo" :key="index">
            <div class="img">
              <img :src="item.url" alt="">
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <span>x{{item.number}}</span>
            </div>
            <span class="price redText">¥{{item.amount}}</span>
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
          <span>预定信息</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">预定人姓名</span>
          <span class="defaultText">{{detail.userName}}</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">电话号码</span>
          <span class="defaultText">{{detail.userPhone}}</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">入住时间</span>
          <span class="defaultText">{{detail.checkInDate}}</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">离店时间</span>
          <span class="defaultText">{{detail.leaveDate}}</span>
        </div>

        <div v-if="detail.travellerInfo">
          <div class="defaultTitle defaultText">
            <span>入住人信息</span>
          </div>
          <div class="price infoLine vux-1px-b p-lr"
               v-for="(item, index) in detail.travellerInfo" :key="index">
            <span class="defaultText">{{item.name}}</span>
            <span class="defaultText">{{item.idCard}}</span>
          </div>
        </div>



        <div>
          <div class="defaultTitle defaultText">
            <span>留言</span>
          </div>
          <div class="words">
            {{detail.leaveMessage}}
          </div>
        </div>

        <div v-if="detail.orderStatus == 2">
          <div class="defaultTitle defaultText">
            <span>退款理由</span>
          </div>
          <div class="words">
            <group class="w_100">
              <x-textarea :max="200" name="description" v-model="detail.refundReason" placeholder="请输入退款理由"></x-textarea>
            </group>
          </div>
        </div>
        <div v-if="detail.orderStatus == 4">
          <div class="defaultTitle defaultText">
            <span>退款理由</span>
          </div>
          <div class="words">
            {{detail.refundReason}}
          </div>
        </div>
        <div v-if="detail.orderStatus == 3">
          <div class="defaultTitle defaultText">
            <span>退款失败理由</span>
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
    <div class="bottom" v-if="detail.orderStatus == 0">
      <span @click="postData(0)">取消订单</span>
      <span @click="postData(5)">修改价格</span>
    </div>

    <div class="bottom" v-if="detail.orderStatus == 1">
      <span @click="postData(0)">取消订单</span>
      <span @click="postData(1)">修改价格</span>
    </div>

    <div class="bottom" v-if="detail.orderStatus == 7">
      <span @click="postData(0)">取消订单</span>
      <span @click="postData(2)">确认入住</span>
    </div>
    <div class="bottom" v-if="detail.orderStatus == 2">
      <span @click="refused(0)">拒绝退款</span>
      <span @click="postData(3)">同意退款</span>
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
      detail: {
        checkInDate: '2019-01-02', // 入住时间
        couponInfo: [], // 优惠信息
        customProjectInfo: [], // 定制项目订单信息 ,
        leaveDate: '2019-01-03', // 离店时间 ,
        leaveMessage: '我是留言', // 留言信息
        orderAmt: 50, // 订单金额
        orderId: '', // 订单号
        orderStatus:1,
        refundFailReason: '', // 退款失败理由
        refundReason: '', // 退款理由
        roomInfo: [], // 房源订单信息
        scheduleInfo: [], // 订单流程进度信息
        travellerInfo: [], // 入住人信息
        userName: '小白', // 预定人姓名 ,
        userPhone: '15700353375'// 预定人电话
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
      ],
      travellerInfo: [
        {
          idCard: '64165416541651461',
          name: '张三'
        },
        {
          idCard: '64165416541651461',
          name: '张三'
        }
      ],
      customProjectInfo: [
        {
          amount: 99.00,
          number: 2,
          title: '我是标题',
          url: '/static/img/test.7f2f298.png'
        },
        {
          amount: 99.00,
          number: 2,
          title: '我是标题',
          url: '/static/img/test.7f2f298.png'
        }
      ],
      roomInfo: [
        {
          amount: 99.00,
          liveDay: 2,
          title: '我是标题',
          url: '/static/img/test.7f2f298.png'
        }
      ]
    }
  },
  created () {
    this.detail.travellerInfo = this.travellerInfo
    this.detail.couponInfo = this.couponInfo
    this.detail.scheduleInfo = this.scheduleInfo
    this.detail.customProjectInfo = this.customProjectInfo
    this.detail.roomInfo = this.roomInfo
    this.getDetail()
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    oderSend () {
      this.$router.replace({
        name: 'orderSend',
        query: {
          orderId: this.detail.orderId,
          receiverPhone: this.detail.receiverPhone,
          senderPhone: this.detail.senderPhone
        }
      })
    },
    //    拒绝退款
    refused () {
      if (!this.detail.refundReason) {
        this.$vux.toast.show({
          text: '拒绝理由为必填',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.postData(4)
    },
    postData (flag) {
      let params = {
        amount: 0, // 订单金额【修改价格时必输】 ,
        operate: flag, // 操作【0-取消订单,1-确认订单,2-办理入住,3-同意退款,4-拒绝退款,5-修改价格】 ,
        orderId: '000', // 订单编号 ,
        refuseReason: this.detail.refundReason // 拒绝理由【拒绝退款时必输】
      }
      this.$http.fetchPost('/merchant/order/update/room', params).then((res) => {
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
            type: 'warn',
            time:99999
          })
        }
      })
    },
    getDetail () {
      this.$http.fetchGet('/merchant/order/get/room/detail', {orderId: '00123'}).then((res) => {
        //          this.detail = res.data.data
      })
    },
    dealStatus (status) {
//      驿站 0-待支付,1-待确认,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,7-待入住,8-入住中,9-已完成,99-所有状态
      let name = ''
      switch (status) {
        case 0: name = '待支付'; break
        case 1: name = '待确认'; break
        case 2: name = '申请退款'; break
        case 3: name = '退款失败'; break
        case 4: name = '退款成功'; break
        case 5: name = '取消订单'; break
        case 6: name = '待点评'; break
        case 7: name = '待入住'; break
        case 8: name = '入住中'; break
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
