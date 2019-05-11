<template>
  <div class="orderedGoods">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
      <span>订单管理</span>
    </div>
    <div class="con">
      <div class="con_content">
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">订单金额</span>
          <span class="redText">¥569.00</span>
        </div>
        <div class="price defaultLine p-lr">
          <span class="defaultText">订单状态</span>
          <span class="redText">待付款</span>
        </div>
        <div class="defaultTitle defaultText">
          <span>预定房源</span>
        </div>
        <div class="orderedHouse">
          <div class="img">
            <img src="../../assets/images/test.png" alt="">
          </div>
          <div class="info">
            <p>带娃带娃阿伟大阿伟大吊袜带</p>
            <span>2晚</span>
          </div>
          <span class="price redText">¥239</span>
        </div>

        <div class="clearfix">
          <div class="defaultTitle defaultText">
            <!--<span>定制项目</span>-->
            <span>商品信息</span>
          </div>
          <div class="custom orderedHouse">
            <div class="img">
              <img src="../../assets/images/test.png" alt="">
            </div>
            <div class="info">
              <p>温馨客厅鲜花</p>
              <span>x1</span>
            </div>
            <span class="price redText">¥239</span>
          </div>
          <div class="custom orderedHouse">
            <div class="img">
              <img src="../../assets/images/test.png" alt="">
            </div>
            <div class="info">
              <p>温馨客厅鲜花</p>
              <span>x1</span>
            </div>
            <span class="price redText">¥239</span>
            <div class="collect">
              <span class="collect-icon icon iconfont">&#xe696;</span>
              <span class="txt">联系买家</span>
            </div>
          </div>
        </div>

        <div class="defaultTitle defaultText">
          <span>优惠信息</span>
        </div>
        <div class="price defaultLine p-lr">
          <span class="defaultText">【全场劵】 满200减20</span>
          <span class="redText">-¥</span>
        </div>
        <div class="defaultTitle defaultText">
          <span>预定信息</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">预订人姓名</span>
          <span class="defaultText">吴彦祖</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">电话号码</span>
          <span class="defaultText">18482105918</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">入住时间</span>
          <span class="defaultText">2018-11-27</span>
        </div>
        <div class="price defaultLine vux-1px-b p-lr">
          <span class="defaultText">离店时间</span>
          <span class="defaultText">2018-11-28</span>
        </div>
        <div class="defaultTitle defaultText">
          <span>入住人信息</span>
        </div>
        <div class="price infoLine vux-1px-b p-lr">
          <span class="defaultText">张三</span>
          <span class="defaultText">5102658465465465</span>
        </div>
        <div class="price infoLine vux-1px-b p-lr">
          <span class="defaultText">李四</span>
          <span class="defaultText">5102658465465465</span>
        </div>
        <div class="defaultTitle defaultText">
          <span>留言</span>
        </div>
        <div class="words">
          带娃挖到挖到挖到挖的挖的挖到阿伟大阿伟大阿伟大阿伟大
        </div>
        <div class="bottomLine" style="padding-top: 0.2rem;">
          订单编号：1654654
        </div>
        <div class="bottomLine">
          下单时间：2018-11-27 15:00:39
        </div>
        <div class="bottomLine">
          付款时间：2018-11-27 15:00:39
        </div>
        <div class="bottomLine" style="padding-bottom: 0.2rem;">
          确认时间：2018-11-27 15:00:39
        </div>
      </div>
    </div>
    <!--<div class="bottom">-->
    <!--<span>取消订单</span>-->
    <!--<span>修改价格</span>-->
    <!--</div>-->

    <!--待发货-->
    <div class="bottom" v-if="oderStatus == 1">
      <span>去发货</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderedGoods',
    components: {

    },
    data () {
      return {
        // 商品 0-待支付,1-待发货,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,8-待收货,9-已完成,99-所有状态
        // 驿站 0-待支付,1-待确认,2-申请退款,3-退款失败,4-退款成功,5-取消订单,6-待点评,7-待入住,8-入住中,9-已完成,99-所有状态
        oderStatus: 1
      }
    },
    created(){
      this.getDetail()
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      getDetail(){
        this.$http.fetchGet('/merchant/order/get/goods/detail', {orderId: '00123'}).then((res) => {
          this.userInfo = res.data.data
        })
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
