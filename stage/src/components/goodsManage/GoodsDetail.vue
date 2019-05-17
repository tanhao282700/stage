<template>
  <div class="goodsDetail">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
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
            <div class="bottom">
              <span @click="checkGoods(2)" v-if="status == 1">下架</span>
              <span @click="checkGoods(1)" v-if="status == 2">上架</span>
              <span @click="getEdit">修改</span>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="evaluate">
            <div class="statistics">
              <div class="statistics_con">
                <div class="left">
                  <span class="num" v-text="commentsInfo.point || 5"></span>
                  <div class="raters">
                    <span>超赞</span>
                    <div>
                      <rater disabled v-model="commentsInfo.point || 5"></rater>
                    </div>
                  </div>
                </div>
                <div class="right" v-text="commentsInfo.commentNumber+'条评论'"></div>
              </div>
            </div>
            <div class="statisticsList" ref="list_con">
              <div class="wrapper" ref="wrapper">
                <div class="bscroll-container">
                  <!-- 刷新提示信息 -->
                  <div class="top-tip">
                      <span class="refresh-hook">{{pulldownMsg}}</span>
                    </div>
                  <!-- 内容列表 -->
                  <ul class="content" ref="content">
                    <li class="item vux-1px-b" v-for="(item,parentIndex) in commentsInfo.comments">
                      <div class="userInfo">
                        <div class="user">
                          <img :src="item.head_image" alt="">
                          <div class="nickName">
                            <span v-text="item.nick_name"></span>
                            <span v-text="item.comment_date"></span>
                          </div>
                        </div>
                        <div class="rater">
                          <rater disabled v-model="item.comment_point"></rater>
                        </div>
                      </div>
                      <div class="description" v-text="item.comment_text"></div>
                      <div class="description" style="color:#5d5d5d;" v-if="item.replyText" v-text="'我：'+item.replyText"></div>

                      <div class="imgs">
                        <img class="previewer-demo-img" v-for="(child, index) in item.commentImageInfo" :src="child.url" width="100" @click="show(parentIndex,index)">
                      </div>
                      <div v-if="!item.replyText" class="reply">
                        <span @click="showDialog(item.id)">回复</span>
                      </div>
                    </li>
                    <div v-if="!isMoreData" class="no_data">
                        <span></span>
                        <span>暂无更多数据</span>
                        <span></span>
                      </div>
                  </ul>
                  <!-- 底部提示信息 -->
                  <div v-if="isMoreData" class="bottom-tip">
                      <span class="loading-hook">{{pullupMsg}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewList" ref="previewer" :options="options"></previewer>
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
      currentCommentId: '',
      commentsValue: '',
      showToast: false,
      previewList: [],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none',
      isMoreData: true,
      commentsInfo: [],
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
      data: [],
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
    showDialog(id) {
      this.currentCommentId = id
      this.showToast = true
    },
    replyComment () {
      if(!this.commentsValue){
        this.$vux.toast.show({
          text: '请输入内容',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.$http.fetchPost('/merchant/good/add/commentreply',{commentId: this.currentCommentId,merchantId:this.$store.state.merchantId,replyText:this.commentsValue}).then((res)=>{
        if(res.data.code == 200) {
          this.$vux.toast.show({
            text: '评论成功',
            position: 'middle',
            type: 'warn'
          })
          this.commentsInfo.comments.map((item)=>{
            if(item.id === this.currentCommentId){
              item.replyText = this.commentsValue
            }
          })
          this.currentCommentId = ''
          this.commentsValue = ''
          this.showToast = false
        }else{
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    getBack () {
      this.$router.go(-1)
    },
    show (parent,index) {
      this.previewList = this.commentsInfo.comments[parent].commentImageInfo
      this.previewList.map((item)=>{
        item.msrc = item.src = item.url
        item.w = item.h = 0
      })
      this.$nextTick(()=>{
        this.$refs.previewer.show(index)
      })
    },
    getData () {
      this.$http.fetchGet('/merchant/good/get/detail', {goodId: this.$route.query.id}).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
          this.baseInfo = res.data.data
      })
    },
    getList () {
      this.$http.fetchGet('/merchant/good/get/comments', this.params).then((res) => {
        this.commentsInfo = res.data.data
        if (this.commentsInfo.comments.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
          this.$nextTick(() => {
            if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
              this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
            }
          })
        }
        this.initScroll()
      })
    },
    refreshData () {
      this.$refs.content.style.height = 'auto'
      this.pullupMsg = '加载中。。。'
      this.params.page = 1
      this.$http.fetchGet('/merchant/good/get/comments', this.params).then((res) => {
        this.commentsInfo = res.data.data
        if (this.commentsInfo.comments.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
          this.$nextTick(() => {
            if (this.$refs.list_con.offsetHeight > this.$refs.content.offsetHeight) {
              this.$refs.content.style.height = this.$refs.list_con.offsetHeight + 2 + 'px'
            }
          })
        }
        // 恢复文本值
        this.pullupMsg = '加载更多'
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })
    },
    loadMoreData () {
      if (this.commentsInfo.comments.length < this.params.pageSize || this.commentsInfo.comments.length < this.params.pageSize * this.params.page) {
        this.isMoreData = false
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.params.page++
      this.$http.fetchGet('/merchant/good/get/comments', this.params).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
        if (this.commentsInfo.comments.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
        }
        if (res.data.data.comments.length > 0) {
          res.data.data.comments.map((item) => {
            this.commentsInfo.comments.push(item)
          })
        } else {
          this.isMoreData = false
        }
        // 恢复刷新提示文本值
        this.pulldownMsg = '下拉刷新'
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })
    },
    checkGoods (status) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchGet('/merchant/good/update/status', {goodId: this.$route.query.id, operate: status}).then((res) => {
        this.$vux.loading.hide()
          if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          if(status == 1) {
              this.$router.go(-1)
          }
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    getEdit () {
      this.$router.push({
        name: 'goodsAdd',
        query: {
          id: this.$route.query.id
        }
      })
    },
    initScroll () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { // 初始化better-scroll
          probeType: 1, // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true // 是否派发click事件
        })
        // 滑动过程中事件
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 30) {
            this.pulldownMsg = '释放立即刷新'
          }
        })
        // 滑动结束松开事件
        this.scroll.on('touchEnd', (pos) => { // 上拉刷新
          if (pos.y > 30) {
            this.refreshData()
          } else if (pos.y < (this.scroll.maxScrollY - 30)) { // 下拉加载
            this.loadMoreData()
          }
        })
      })
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
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
  /* 下拉、上拉提示信息 */
.top-tip {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #555;
  }

  .bottom-tip {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    /*background: #f2f2f2;*/
    position: absolute;
    bottom: -35px;
    left: 0;
  }

  /* 全局提示信息 */
  .alert-hook {
    display: none;
    position: fixed;
    top: 62px;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background: rgba(7, 17, 27, 0.5);
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
