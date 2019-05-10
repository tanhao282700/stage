<template>
  <div class="hotelManage">
    <div class="iosHeader">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
      <span>驿站管理</span>
    </div>
    <div class="infoTitle">驿站信息</div>
    <div class="hotelInfo" @click="editHotel">
      <img src="../../assets/images/test.png" alt="">
      <div class="description" >
        <span v-text="baseInfo.postDetail.postName"></span>
        <span v-text="baseInfo.postDetail.postDescription"></span>
      </div>
      <x-icon class="infoIcon" type="ios-arrow-right" size="50"></x-icon>
    </div>
    <div class="infoTitle secondTitle">优惠券信息</div>
    <div class="coupon">
      <span>优惠券</span>
      <div>
        <span v-text="baseInfo.couponNum+'张'"></span>
        <x-icon class="infoIcon" type="ios-arrow-right" size="50"></x-icon>
      </div>
    </div>
    <div class="infoTitle thirdTitle">
      <span v-text="'驿站评价('+baseInfo.commentInfo.commentNumber+'条)'"></span>
      <span v-show="baseInfo.commentInfo.point" v-text="baseInfo.commentInfo.point+'分'"></span>
    </div>
    <div class="assess">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 内容列表 -->
          <ul class="content">
            <li class="item vux-1px-b" v-for="item in data">
              <div class="userInfo">
                <div class="user">
                  <img src="../../assets/images/test.png" alt="">
                  <div class="nickName">
                    <span>用户昵称</span>
                    <span>2018-08-18</span>
                  </div>
                </div>
                <div class="rater">
                  <rater disabled v-model="data3"></rater>
                </div>
              </div>
              <div class="description">带娃阿伟大阿伟大阿伟大阿伟大挖到佛挡杀佛撒旦法阿斯蒂芬瓦达瓦阿伟大阿瑟的阿伟大阿伟大阿伟大阿伟大阿伟大阿伟大阿伟大</div>
              <div class="imgs">
                <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)">
              </div>
              <div class="reply">
                <span>回复</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Rater, Previewer, TransferDom } from 'vux'
let count = 1
export default {
  name: 'hotelManage',
  directives: {
    TransferDom
  },
  components: {
    Rater,
    Previewer
  },
  data () {
    return {
      baseInfo: {
        postDetail: {
          postName: '',
          postDescription: ''
        },
        commentInfo: {
          commentNumber: 0,
          point: 0,
          comments: 0
        }
      },
      params: {
        merchantId: '',
        page: 1,
        pageSize: 10
      },
      data3: 4.5,
      data: [],
      /* list: [{
          msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
          }, {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
            w: 800,
            h: 400
          },
          {
            msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
            w: 1200,
            h: 900
          }], */
      list: [],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  methods: {
    editHotel () {
      this.$router.push({
        name: 'editHotel'
      })
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    getBack () {
      this.$router.go(-1)
    },
    getData () {
      let that = this
      return new Promise(resolve => { // 模拟数据请求
        setTimeout(() => {
          that.isMoreData = false
          console.log(that.isMoreData)
          const arr = []
          for (let i = 0; i < 26; i++) {
            arr.push(count++)
          }
          resolve(arr)
        }, 1000)
      })
    },
    getInfo () {
      // 驿站信息
      this.$http.fetchGet('/merchant/post/get/main', this.params).then((res) => {
        this.baseInfo = res.data.data
        this.data = res.data.data.commentInfo.comments
      })
    }
  },
  created () {
    this.params.merchantId = this.$store.state.merchantId
    this.getInfo()
    const that = this
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', (pos) => { // 上拉刷新
        if (pos.y < (this.scroll.maxScrollY) || pos.y === (this.scroll.maxScrollY)) { // 下拉加载
          console.log(333)
          setTimeout(() => {
            that.getData().then((res) => {
              // 恢复文本值
              that.data = this.data.concat(res)
              that.scroll.refresh()
            })
          }, 2000)
        }
      })
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .hotelManage {
    width: 100%;
    height: 100%;
    background: #fff;
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
  .infoTitle {
    height: 0.8rem;
    background: rgb(247,247,247);
    text-align: left;
    line-height: 0.8rem;
    font-size: 0.28rem;
    font-weight: bold;
    padding-left: 0.2rem;
  }
  .hotelInfo {
    height: 1.44rem;
    padding-left: 0.2rem;
    padding-right: 2.08rem;
    display: flex;
    align-items: center;
    position: relative;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    img {
      width: 0.96rem;
      height: 0.96rem;
      border-radius: 0.96rem;
      margin-right: 0.12rem;
    }
    .description {
      flex: 1;
      height: 0.96rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      span:first-child {
        font-size: 0.28rem;
        font-weight: bold;
      }
      span:last-child {
        text-align: left;
        font-size: 0.24rem;
        color: #6c6c6c;
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .infoIcon {
      position:absolute;
      right: 0.2rem;
    }
  }
  .secondTitle{
    height: 0.96rem;
    line-height: 1.2rem;
  }
  .coupon {
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    height: 0.92rem;
    align-items: center;
    font-size: 0.28rem;
    color: #353535;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    div {
      display: flex;
      align-items: center;
    }
  }
  .thirdTitle {
    height: 0.96rem;
    line-height: 1.2rem;
    padding-right: 0.2rem;
    span:last-child {
      display: inline-block;
      float: right;
    }
  }
  .assess {
    flex: 1;
    overflow: hidden;
  }
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .item{
    padding:0.16rem 0.2rem 0.24rem 0.2rem;
    .userInfo {
      height: 0.72rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        img {
          width: 0.72rem;
          height: 0.72rem;
          border-radius: 0.72rem;
        }
        .nickName {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          margin-left: 0.12rem;
          span:first-child {
            font-size: 0.28rem;
            font-weight: bold;
          }
          span:last-child {
            font-size: 0.24rem;
            color: #9b9b9b;
          }
        }
      }
    }
    .description {
      font-size: 0.24rem;
      text-align: left;
      margin-top: 0.12rem;
    }
    .imgs {
      text-align: left;
      margin-top: 0.12rem;
      img{
        width: 1.28rem;
        margin-left: 0.175rem;
        &:nth-child(1),&:nth-child(6),&:nth-child(11) {
          margin-left: 0;
        }
      }
    }
    .reply {
      text-align: right;
      font-size: 0.28rem;
      color: #1aad19;
      margin-top: 0.12rem;
    }
  }
</style>
