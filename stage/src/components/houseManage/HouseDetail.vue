<template>
  <div class="houseDetail">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>房态管理</span>
    </div>
    <div class="content">
      <tab :scroll-threshold=3 :line-width=2 v-model="index">
        <tab-item class="vux-center" v-for="(item, index) in list2" @on-item-click="tabChange(item,index)" :key="index">{{item}}</tab-item>
      </tab>
      <div v-show="index == 0" class="con">
        <div class="con_main">
          <div v-if="baseData.imageInfo.length > 0" class="pic_swiper">
            <swiper dots-position="center" auto>
                  <swiper-item v-if="item.type == 0" v-for="item in baseData.imageInfo">
                    <img :src="item.url" alt="">
                  </swiper-item>
                </swiper>
          </div>
          <div class="baseInfo">
            <span v-text="baseData.title"></span>
            <span v-text="'¥'+baseData.workPrice"></span>
          </div>
          <div v-if="status == 3" class="statusInfo vux-1px-t">
            <span>当前状态</span>
            <span style="color: #ff122f;">审核拒绝</span>
          </div>
          <div v-if="status == 3" class="statusInfo vux-1px-t">
            <span>拒绝理由</span>
            <span style="color: #ff122f;" v-text="dataRemark"></span>
          </div>
          <div class="houseBaseInfo">
            <div class="houseBaseInfo_box">
              <div class="items">
                <span></span>
                <span v-text="'整套'+baseData.apartmentInfo.roomQuantity+'居室'"></span>
              </div>
              <div class="items">
                <span></span>
                <span v-text="'可住'+baseData.housePersonNumber+'人'"></span>
              </div>
            </div>
            <div class="houseBaseInfo_box">
              <div class="items">
                <span></span>
                <span v-text="baseData.apartmentInfo.kitchenQuantity+'厨'+baseData.apartmentInfo.toiletQuantity+'独卫'"></span>
              </div>
              <div class="items">
                <span></span>
                <span v-text="baseData.bedModelName"></span>
              </div>
            </div>
          </div>
          <div class="timer">
              <div class="equipmentTitle">当前预定时间表</div>
            <div class="shad"></div>
            <inline-calendar
              ref="calendar"
              class="inline-calendar-demo"
              show.sync="true"
              v-model="value"
              @on-view-change="changeMonth"
              :render-function="buildSlotFn">
            </inline-calendar>
          </div>
          <div class="description">
            <p>房屋描述</p>
            <p v-text="baseData.text"></p>
          </div>
          <div class="equipmentTitle">服务设施</div>
          <div v-if="index < 3 || (index > 2 && isShowMore)" v-for="(item,index) in baseData.facilitiesInfo" class="equipment">
            <div class="equip_con">
                <span class="equipName" v-text="item.className"></span>
                <div v-for="child in item.facilities" :class="{'icSelected':child.isSelected == 1}" class="equip">
                  <span class="iconfont">&#xe60e;</span>
                  <span v-text="child.name"></span>
                </div>
            </div>
          </div>
          <div @click="showMoreEquip" v-if="baseData.facilitiesInfo.length > 3 && !isShowMore" class="getMore">查看更多</div>
          <div class="equipmentTitle">预定须知</div>
          <div class="tips" v-for="item in baseData.mattersInfo">
            <span></span>
            <span v-text="item.checked_status == 1 ? item.text : '不'+item.text"></span>
          </div>
          <div class="equipmentTitle">退改说明</div>
          <div class="tips">
            <span></span>
            <span v-text="baseData.unsubscribeComment"></span>
          </div>
          <div class="bottom">
            <span @click="checkStatus(2)" v-if="tabIndex == 1 && canSetDown">下架</span>
            <span @click="checkStatus(1)" v-if="tabIndex == 2 && canSetUp">上架</span>
            <span v-if="canSetUp" @click="getEdit">修改</span>
          </div>
        </div>
      </div>
      <div v-show="index == 1" class="con">
          <div class="evaluate">
            <div class="statistics">
              <div class="statistics_con">
                <div class="left">
                  <span class="num" v-text="commentsInfo.point"></span>
                  <div class="raters">
                    <span>超赞</span>
                    <div>
                      <rater disabled v-model="commentsInfo.point"></rater>
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
                  <ul class="content" ref="content">
                    <li class="item vux-1px-b" v-for="(item,parentIndex) in commentsInfo.comments" :key="item.id">
                    <!-- <li class="item vux-1px-b" v-for="i in 10"> -->
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
      </div>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewList" ref="previewer" :options="options"></previewer>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div class="replyComments">
          <div class="tit">
            <span>回复评论</span>
            <span @click="showToast=false" class="icon iconfont">&#xe61a;</span>
          </div>
          <group>
            <x-textarea placeholder="请输入内容" v-model="commentsValue"></x-textarea>
          </group>
          <div class="bottom">
            <span @click="showToast=false">取消</span>
            <span @click="replyComment">确定</span>
          </div>
        </div>
      </x-dialog>
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
  InlineCalendar,
  XDialog, XTextarea, Group
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
    TransferDom,
    XTextarea,
    Group,
    XDialog
  },
  data () {
    return {
      dataRemark: '',
        status: '',
      canSetDown: true,
      canSetUp: true,
      currentCommentId: '',
      commentsValue: '',
      showToast: false,
      previewList: [],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none',
      isMoreData: true,
      tabIndex: 0,
      isShowMore: false,
      value: [],
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
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
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
      },
      baseData: {
        apartmentInfo: {},
        facilitiesInfo: [],
        imageInfo: []
      },
      params: {
        roomId: '',
        page: 1,
        pageSize: 10
      },
      commentsInfo: {}
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
      this.$http.fetchPost('/merchant/room/add/commentreply',{commentId: this.currentCommentId,merchantId:this.$store.state.merchantId,replyText:this.commentsValue}).then((res)=>{
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
    tabChange (item, index) {
      console.log(222)
      if (index == 1) {
        this.refreshData()
      }
    },
    getEdit () {
      this.$router.push({
        name: 'houseAdd',
        query: {
          params: {
            id: this.$route.query.id
          }
        }
      })
    },
    changeMonth (data, index) {
      if (index !== 0) {
        if (data.month < 10) {
          data.month = '0' + data.month
        }
        this.$http.fetchGet('/merchant/room/get/reserveday', {roomId: this.$route.query.id, month: data.year + '-' + data.month}).then((res) => {
          res.data.data.map((item) => {
            this.value.push(item.live_time)
          })
        })
      }
    },
    getOrderMonth () {
      let timer = new Date()
      let year = timer.getFullYear()
      let month = timer.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      this.$http.fetchGet('/merchant/room/get/reserveday', {roomId: this.$route.query.id, month: year + '-' + month}).then((res) => {
        res.data.data.map((item) => {
          this.value.push(item.live_time)
        })
      })
    },
    checkStatus (status) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchGet('/merchant/room/update/status', {roomId: this.$route.query.id, operate: status}).then((res) => {
        this.$vux.loading.hide()
          if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
          if (status == 2) {
            this.$router.go(-1)
          } else {
              this.canSetUp = false
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
    showMoreEquip () {
      this.isShowMore = true
    },
    buildSlotFn () {
      return '已定'
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
    getBaseInfo () {
      this.$http.fetchGet('/merchant/room/get/details', {roomId: this.$route.query.id}).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
          this.baseData = res.data.data
      })
    },
    getComments () {
      this.$http.fetchGet('/merchant/room/get/comments', this.params).then((res) => {
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
      this.$http.fetchGet('/merchant/room/get/comments', this.params).then((res) => {
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
      this.$http.fetchGet('/merchant/room/get/comments', this.params).then((res) => {
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
    this.dataRemark = this.$route.query.dataRemark
    this.status = this.$route.query.status
    this.params.roomId = this.$route.query.id
    this.$route.query.status == 1 ? this.canSetUp = false : this.canSetUp = true
    this.$route.query.status == 2 ? this.canSetDown = true : this.canSetDown = false
    this.tabIndex = this.$route.query.tabIndex
    this.getBaseInfo()
    this.getOrderMonth()
    this.getComments()
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
.statusInfo {
  /*height: 0.76rem;*/
  background: #fff;
  padding: 0.2rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span{
    font-size: 0.24rem;
    text-align: left;
  }
  span:first-child {
    /*margin-right: 0.2rem;*/
    width: 2rem;
  }
  span:last-child {
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
      position:relative;
      .shad {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4.3rem;
        z-index: 9;
      }
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
          /* height: 0.3rem; */
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
      padding: 0 0.2rem 0.2rem 0.2rem;
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
.inline-calendar td div {
  display: none;
}
.inline-calendar td.current div {
  display: inline-block;
  font-size: 0.24rem;
}
.current div{
  display: block!important;
  color:white;
}
  .houseDetail .vux-prev-icon {
    width: 0.12rem;
    height: 0.12rem;
  }
.houseDetail .vux-next-icon {
  width: 0.12rem;
  height: 0.12rem;
}
</style>
