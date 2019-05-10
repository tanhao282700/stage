<template>
  <div class="houseDetail">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>房态管理</span>
      <span>修改价格</span>
    </div>
    <div class="content">
      <tab :scroll-threshold=3 :line-width=2 v-model="index">
        <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item>
          <div class="details">
            <div class="container">
              <div class="pic_swiper">
                <!-- <swiper auto>
                  <swiper-item>
                    1
                  </swiper-item>
                  <swiper-item>
                    2
                  </swiper-item>
                  <swiper-item>
                    3
                  </swiper-item>
                  <swiper-item>
                    4
                  </swiper-item>
                </swiper> -->
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="evaluate">
            <div class="statistics">
              <div class="statistics_con">
                <div class="left">
                  <span class="num">4.5</span>
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
let count = 1
export default {
  name: 'houseDetail',
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
    }
  },
  created () {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .houseDetail {
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
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 0.36rem;
    padding: 0 0.2rem 0.24rem 0.2rem;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    span:last-child {
      font-size: 0.28rem;
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .details {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .container {
        flex: 1;
        overflow: auto;
        .pic_swiper {
          height: 3.6rem;
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
  .houseDetail .vux-tab-wrap {
    height: 0.92rem;
  }
  .houseDetail .vux-tab-container {
    height: 0.92rem;
  }
  .houseDetail .vux-tab {
    height: 0.92rem;
  }
  .houseDetail .vux-tab .vux-tab-item {
    font-size: 0.28rem;
    line-height: 0.92rem;
  }
  .houseDetail .vux-slider {
    flex: 1;
  }
  .houseDetail .vux-swiper {
    height: 100%!important;
  }
</style>
