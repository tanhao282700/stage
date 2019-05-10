<template>
  <div class="goodsDetail">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
      <span>商品详情</span>
    </div>
    <div class="content">
      <tab :line-width=2 v-model="index">
        <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item>
          <div class="details">
            <div class="container">
              <div class="info">
                <img v-for="item in baseInfo.goodsImage" :src="item.url" alt="">
                <span class="name" v-text="baseInfo.title"></span>
                <div class="price">
                  <span>会员:</span>
                  <span v-text="'¥'+baseInfo.memberPrice"></span>
                  <span>原价:￥299</span>
                </div>
              </div>
              <div class="description">
                <div class="title">详情描述</div>
                <div class="item" v-for="item in baseInfo.detailsList">
                  <div v-if="item.type === 0" v-text="item.text" class="text"></div>
                  <img v-if="item.type === 1" :src="item.url" alt="">
                </div>
              </div>
            </div>
            <div v-if="status === 2" class="bottom">
              <span @click="checkGoods(2)" v-if="status === 1">下架</span>
              <span @click="checkGoods(1)" v-if="status === 2">上架</span>
              <span>修改</span>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="evaluate">
            <div class="statistics">
              <div class="statistics_con">
                <div class="left">
                  <span class="num">1</span>
                  <div class="raters">
                    <span>超赞</span>
                    <div>
                      <rater disabled v-model="data3"></rater>
                    </div>
                  </div>
                </div>
                <div class="right">132条评论</div>
              </div>
            </div>
            <div class="statisticsList">
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
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Rater, Previewer, TransferDom, Tab, TabItem, Swiper, SwiperItem } from 'vux'
// let count = 1
export default {
  name: 'goodsDetail',
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Rater,
    Previewer,
    TransferDom
  },
  data () {
    return {
      params: {
        goodId: '',
        page: 1,
        pageSize: 10
      },
      baseInfo: {},
      status: 1,
      data3: 4.5,
      index: 0,
      list2: ['详情', '评价'],
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      list: [{
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
      }],
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
    getBack () {
      this.$router.go(-1)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    getData () {
      this.$http.fetchGet('/merchant/good/get/detail', {goodId: this.$route.query.id}).then((res) => {
        this.baseInfo = res.data.data
      })
    },
    getList () {
      this.$http.fetchGet('/merchant/good/get/comments', this.params).then((res) => {

      })
    },
    checkGoods (status) {
      this.$http.fetchGet('/merchant/good/update/status', {goodId: this.$route.query.id, operate: status}).then((res) => {
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
  },
  created () {
    this.params.goodId = this.$route.query.id
    this.status = this.$route.query.tabIndex
    this.getData()
    this.getList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .goodsDetail {
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
  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /*background: rgb(247,247,247);*/
    .details {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .container {
        flex: 1;
        overflow: auto;
        .info {
          background: #fff;
          display: flex;
          flex-direction: column;
          img {
            width: 100%;
          }
          .name {
            font-size: 0.28rem;
            margin-top: 0.05rem;
            padding-left: 0.2rem;
            text-align: left;
          }
          .price {
            display: flex;
            align-items: center;
            padding-left: 0.2rem;
            span:first-child {
              font-size: 0.24rem;
              color: rgb(242,75,69);
            }
            span:nth-child(2) {
              font-size: 0.36rem;
              color: rgb(242,75,69);
            }
            span:last-child {
              font-size: 0.2rem;
              border: 1px solid #d7d7d7;
              padding: 0 0.06rem;
              margin-left: 0.2rem;
            }
          }
        }
        .description {
          margin-top: 0.2rem;
          background: #fff;
          padding: 0 0.2rem;
          .title {
            font-size: 0.28rem;
            font-weight: bold;
            padding: 0.2rem 0 0 0;
          }
          .item {
            .text {
              font-size: 0.28rem;
              color: #5d5d5d;
              text-align: left;
              margin-top: 0.2rem;
            }
            img {
              margin-top: 0.2rem;
              width: 100%;
            }
          }
        }
      }
      .bottom {
        height: 0.96rem;
        display: flex;
        span {
          flex: 1;
          line-height: 0.96rem;
          text-align: center;
          font-size: 0.32rem;
          &:first-child {
            color: #1aad19;
            background: #fff;
          }
          &:last-child {
            color: white;
            background: rgb(26,173,25);
          }
        }
      }
    }
    .evaluate {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .statistics {
        height: 1.8rem;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .statistics_con {
          width: 5.2rem;
          height: 1.16rem;
          background: rgb(247,247,247);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.16rem;
          .left {
            display: flex;
            .num {
              font-size: 0.6rem;
              font-weight: bold;
            }
            .raters {
              height: 0.9rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align: left;
              margin-left: 0.2rem;
              span:first-child {
                font-size: 0.28rem;
                font-weight: normal;
              }
            }
          }
          .right {
            font-size: 0.24rem;
          }
        }
      }
      .statisticsList {
        flex: 1;
        overflow: hidden;
        .wrapper{
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          .item{
            background: #fff;
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
        }
      }
    }
  }
</style>
<style>
  .goodsDetail .vux-tab-wrap {
    height: 0.92rem;
  }
  .goodsDetail .vux-tab-container {
    height: 0.92rem;
  }
  .goodsDetail .vux-tab {
    height: 0.92rem;
  }
  .goodsDetail .vux-tab .vux-tab-item {
    font-size: 0.28rem;
    line-height: 0.92rem;
  }
  .goodsDetail .vux-slider {
    flex: 1;
  }
  .goodsDetail .vux-swiper {
    height: 100%!important;
  }
</style>
