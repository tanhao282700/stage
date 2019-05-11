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
      <div v-show="index == 0" class="con">
        <div class="con_main">
          <div class="pic_swiper">
            <swiper dots-position="center" auto>
                  <swiper-item>
                    <img src="https://zayzapp01.oss-cn-shenzhen.aliyuncs.com/file/6c836029f5074df48c88c8bddbdb27f9.10dfa9ec8a136327474f0e529c8fa0ec08fac735.jpg" alt="">
                  </swiper-item>
                  <swiper-item>
                    <img src="https://zayzapp01.oss-cn-shenzhen.aliyuncs.com/file/6c836029f5074df48c88c8bddbdb27f9.10dfa9ec8a136327474f0e529c8fa0ec08fac735.jpg" alt="">
                  </swiper-item>
                  <swiper-item>
                    <img src="https://zayzapp01.oss-cn-shenzhen.aliyuncs.com/file/6c836029f5074df48c88c8bddbdb27f9.10dfa9ec8a136327474f0e529c8fa0ec08fac735.jpg" alt="">
                  </swiper-item>
                  <swiper-item>
                    <img src="https://zayzapp01.oss-cn-shenzhen.aliyuncs.com/file/6c836029f5074df48c88c8bddbdb27f9.10dfa9ec8a136327474f0e529c8fa0ec08fac735.jpg" alt="">
                  </swiper-item>
                </swiper>
          </div>
          <div class="baseInfo">
            <span>宽窄巷子宽窄巷子大武当爱我的爱我的爱的宽窄巷子大武当爱我的爱我的爱的大武当爱我的爱我的爱的</span>
            <span>¥12.00</span>
          </div>
          <div class="houseBaseInfo">
            <div class="houseBaseInfo_box">
              <div class="items">
                <span></span>
                <span>整套一居室</span>
              </div>
              <div class="items">
                <span></span>
                <span>可住两人</span>
              </div>
            </div>
            <div class="houseBaseInfo_box">
              <div class="items">
                <span></span>
                <span>一厨一独卫</span>
              </div>
              <div class="items">
                <span></span>
                <span>共一张床</span>
              </div>
            </div>
          </div>
          <div class="timer">
              <div class="equipmentTitle">当前预定时间表</div>
            <inline-calendar
              ref="calendar"
              class="inline-calendar-demo"
              :show.sync="show"
              v-model="value"
              start-date="2016-04-01"
              end-date="2018-05-30"
              :render-function="buildSlotFn">
            </inline-calendar>
          </div>
          <div class="description">
            <p>房屋描述</p>
            <p>打我打王大伟打我大武当爱我打我打王大伟打我大武当爱我的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的打我打王大伟打我大武当爱我的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的打我打王大伟打我大武当爱我的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的打我打王大伟打我大武当爱我的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的打我打王大伟打我大武当爱我的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的的爱我的爱的爱我的爱的爱我的爱我的爱我的爱我的</p>
          </div>
          <div class="equipmentTitle">服务设施</div>
          <div class="equipment">
            <div class="equip_con">
                <span class="equipName">基础设施</span>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip">
                    <span class="iconfont">&#xe60e;</span>
                    <span>无线网络</span>
                  </div>
                  <div class="equip">
                      <span class="iconfont">&#xe60e;</span>
                      <span>无线网络</span>
                    </div>
                    <div class="equip">
                        <span class="iconfont">&#xe60e;</span>
                        <span>无线网络</span>
                      </div>
                      <div class="equip">
                          <span class="iconfont">&#xe60e;</span>
                          <span>无线网络</span>
                        </div>
                        <div class="equip">
                            <span class="iconfont">&#xe60e;</span>
                            <span>无线网络</span>
                          </div>
            </div>
          </div>
          <div class="equipment">
            <div class="equip_con">
                <span class="equipName">卫浴设施</span>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip">
                    <span class="iconfont">&#xe60e;</span>
                    <span>无线网络</span>
                  </div>
                  <div class="equip">
                      <span class="iconfont">&#xe60e;</span>
                      <span>无线网络</span>
                    </div>
                    <div class="equip">
                        <span class="iconfont">&#xe60e;</span>
                        <span>无线网络</span>
                      </div>
            </div>
          </div>
          <div class="equipment">
            <div class="equip_con">
                <span class="equipName">厨房设施</span>
                <div class="equip icSelected">
                  <span class="iconfont">&#xe60e;</span>
                  <span>无线网络</span>
                </div>
                <div class="equip">
                    <span class="iconfont">&#xe60e;</span>
                    <span>无线网络</span>
                  </div>
                  <div class="equip">
                      <span class="iconfont">&#xe60e;</span>
                      <span>无线网络</span>
                    </div>
                    <div class="equip">
                        <span class="iconfont">&#xe60e;</span>
                        <span>无线网络</span>
                      </div>
            </div>
          </div>
          <div class="getMore">查看更多</div>
          <div class="equipmentTitle">预定须知</div>
          <div class="tips">
            <span></span>
            <span>大武当爱我的爱我的爱我大武当爱我的爱我的爱我的阿达瓦大的阿达瓦大</span>
          </div>
          <div class="tips">
            <span></span>
            <span>大武当爱我的爱我的爱我大武当爱我的爱我的爱我的阿达瓦大的阿达瓦大</span>
          </div>
          <div class="tips">
            <span></span>
            <span>大武当爱我的爱我的爱我大武当爱我的爱我的爱我的阿达瓦大的阿达瓦大</span>
          </div>
          <div class="tips">
            <span></span>
            <span>大武当爱我的爱我的爱我大武当爱我的爱我的爱我的阿达瓦大的阿达瓦大</span>
          </div>
          <div class="equipmentTitle">退改说明</div>
          <div class="tips">
            <span></span>
            <span>大武当爱我的爱我的爱我大武当爱我的爱我的爱我的阿达瓦大的阿达瓦大</span>
          </div>
        </div>
        <div class="bottom">
          <span>下架</span>
          <span>修改</span>
        </div>
      </div>
      <div v-show="index == 1" class="con">
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
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  Rater,
  Previewer,
  TransferDom,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  InlineCalendar
} from 'vux'
let count = 1
export default {
  name: 'houseDetail',
  directives: {
    TransferDom
  },
  components: {
    InlineCalendar,
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
      value: ['2019-05-12', '2019-05-13'],
      data3: 4.5,
      index: 0,
      list2: ['详情', '评价'],
      data: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26
      ],
      list: [
        {
          msrc:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src:
            'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        },
        {
          msrc:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src:
            'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          w: 1200,
          h: 900
        },
        {
          msrc:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
          src:
            'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
        },
        {
          msrc:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          src:
            'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          w: 800,
          h: 400
        },
        {
          msrc:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          src:
            'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
          w: 1200,
          h: 900
        }
      ],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[
            index
          ]
          // get window scroll Y
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  methods: {
    buildSlotFn () {
      return '已定'
    },
    getBack () {
      this.$router.go(-1)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    getData () {
      let that = this
      return new Promise(resolve => {
        // 模拟数据请求
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
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 初始化better-scroll
        probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click: true // 是否派发click事件
      })
      // 滑动结束松开事件
      this.scroll.on('touchEnd', pos => {
        // 上拉刷新
        if (
          pos.y < this.scroll.maxScrollY ||
          pos.y === this.scroll.maxScrollY
        ) {
          // 下拉加载
          console.log(333)
          setTimeout(() => {
            that.getData().then(res => {
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
  background: rgb(247, 247, 247);
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
        background: rgb(247, 247, 247);
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
      .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .item {
          background: #fff;
          padding: 0.16rem 0.2rem 0.24rem 0.2rem;
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
            img {
              width: 1.28rem;
              margin-left: 0.175rem;
              &:nth-child(1),
              &:nth-child(6),
              &:nth-child(11) {
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
.con {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .con_main {
    flex: 1;
    overflow: auto;
    .pic_swiper {
      height: 3.6rem;
      display: flex;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .baseInfo {
      background: #fff;
      height: 1.2rem;
      padding: 0 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      span:first-child {
        text-align: left;
        font-size: 0.28rem;
        width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
      }
      span:last-child{
        font-size: 0.36rem;
        color: #f24b45;
        font-weight: bold;
      }
    }
    .houseBaseInfo {
      height: 1.8rem;
      background: #fff;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      .houseBaseInfo_box {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        .items {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          span:first-child {
            width: 0.32rem;
            height: 0.32rem;
          }
          span:last-child {
            font-size: 0.28rem;
            padding-left: 0.1rem;
          }
        }
      }
      .houseBaseInfo_box:first-child .items:first-child span:first-child {
          background: url(../../assets/images/pic1.png) no-repeat left top/100% 100%;
      }
      .houseBaseInfo_box:first-child .items:last-child span:first-child {
          background: url(../../assets/images/pic2.png) no-repeat left top/100% 100%;
      }
      .houseBaseInfo_box:last-child .items:first-child span:first-child {
          background: url(../../assets/images/pic3.png) no-repeat left top/100% 100%;
      }
      .houseBaseInfo_box:last-child .items:last-child span:first-child {
          background: url(../../assets/images/pic4.png) no-repeat left top/100% 100%;
      }
    }
    .timer {
      /* height: 7.12rem; */
      background: #fff;
      margin-top: 0.2rem;
    }
    .description {
      background: #fff;
      margin-top: 0.2rem;
      padding-bottom: 0.2rem;
      p:first-child {
        font-size: 0.28rem;
        font-weight: bold;
        padding: 0.2rem;
      }
      p:last-child {
        color: #4a4a4a;
        font-size: 0.24rem;
        padding: 0 0.2rem 0 0.2rem;
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
    .equipmentTitle {
      font-size: 0.28rem;
      font-weight: bold;
      padding: 0.1rem 0;
      margin-top: 0.2rem;
      background: #fff;
    }
    .equipment {
      background: #fff;
      padding:0.24rem 0.2rem 0 0.2rem;
      .equip_con {
        padding-top: 0.2rem;
        padding-bottom: 0.24rem;
        display: flex;
        flex-wrap: wrap;
        min-height: 1.4rem;
        border:1px solid #d7d7d7;
        position: relative;
        .equipName {
          position: absolute;
          font-size: 0.24rem;
          top: -0.18rem;
          left: 0.4rem;
          padding: 0 0.2rem;
          background: #fff;
        }
        .equip {
          flex-basis: 25%;
          /* height: 1rem; */
          height: 0.3rem;
          margin-top: 0.3rem;
          color: #9b9b9b;
          span:first-child {
            font-size: 0.24rem;
          }
          span:last-child {
            font-size: 0.24rem;
          }
        }
        .icSelected span{
            color: #1aad19;
        }
      }
    }
    .getMore {
      font-size: 0.28rem;
      color: #1aad19;
      height: 1rem;
      background: #fff;
      line-height: 1rem;
    }
    .tips {
      display: flex;
      align-items: flex-start;
      padding: 0 0.1rem 0.2rem 0.1rem;
      background: #fff;
      span:first-child {
        width: 0.12rem;
        height: 0.12rem;
        border-radius: 0.12rem;
        background: #bdbdbd;
        margin-top: 0.12rem;
      }
      span:last-child {
        margin-left: 0.1rem;
        font-size: 0.24rem;
        color: #6c6c6c;
        text-align: left;
      }
    }
  }
  .bottom {
    height: 0.96rem;
    display: flex;
    align-items: center;
    span:first-child {
      flex: 1;
      height: 100%;
      color: #1aad19;
      font-size: 0.32rem;
      line-height: 0.96rem;
    }
    span:last-child {
      flex: 1;
      height: 100%;
      color: #fff;
      background: #1aad19;
      font-size: 0.32rem;
      line-height: 0.96rem;
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
  height: 100% !important;
}
.inline-calendar th {
  font-size: 0.28rem;
}
.inline-calendar td.is-disabled {
  font-size: 0.24rem;
  color: #353535!important;
}
.inline-calendar td > span.vux-calendar-each-date {
  font-size: 0.28rem!important;
  width: 0.52rem!important;
    height: 0.52rem!important;
    line-height: 0.5rem!important;
}
/* .inline-calendar td.is-today {
  color: white!important;
  background: #04BE02;
  border-radius: 0.1rem;
} */
.inline-calendar td.is-today {
  color: #353535!important;
}
.current {
  background: #04BE02!important;
  border-radius: 0.1rem;
  color: white;
}
.inline-calendar td.is-disabled div {
  display: none;
}
.current div{
  display: block!important;
  color:white;
}
</style>
