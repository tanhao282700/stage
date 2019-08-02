<template>
  <div class="hotelManage">
    <div class="iosHeader">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>驿栈管理</span>
    </div>
    <div class="infoTitle">审核状态</div>
    <div class="coupon">
      <span>审核状态</span>
      <div>
        <span v-if="baseInfo.postDetail.dataStatus == 0">初始状态</span>
        <span v-if="baseInfo.postDetail.dataStatus == 1">待审核</span>
        <span v-if="baseInfo.postDetail.dataStatus == 2">审核通过</span>
        <span v-if="baseInfo.postDetail.dataStatus == 3">审核拒绝</span>
      </div>
    </div>
    <div v-if="baseInfo.postDetail.dataStatus == 3" class="coupon">
      <span style="width: 2rem;text-align: left;">拒绝原因</span>
      <div>
        <span style="color:#ff122f;" v-text="baseInfo.postDetail.postDescription"></span>
      </div>
    </div>
    <div class="infoTitle">驿栈信息</div>
    <div class="hotelInfo" @click="editHotel">
      <img :src="baseInfo.postDetail.postHeadImage" alt="">
      <div class="description" >
        <span v-text="baseInfo.postDetail.postName"></span>
        <span v-text="baseInfo.postDetail.postDescription"></span>
      </div>
      <x-icon class="infoIcon" type="ios-arrow-right" size="50"></x-icon>
    </div>
    <div class="infoTitle secondTitle">优惠券信息</div>
    <div class="coupon" @click="coupons">
      <span>优惠券</span>
      <div>
        <span v-text="baseInfo.couponNum+'张'"></span>
        <x-icon class="infoIcon" type="ios-arrow-right" size="50"></x-icon>
      </div>
    </div>
    <div class="infoTitle thirdTitle">
      <span v-text="'驿栈评价('+baseInfo.commentInfo.commentNumber+'条)'"></span>
      <span v-show="baseInfo.commentInfo.point" v-text="baseInfo.commentInfo.point+'分'"></span>
    </div>
    <div class="assess" ref="list_con">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" ref="content">
            <li class="item vux-1px-b" v-for="(item,parentIndex) in data">
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
                <img class="previewer-demo-img" v-for="(child, index) in item.commentImageInfo" :src="child.src" width="100" @click="show(parentIndex,index)">
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
import { Rater, Previewer, TransferDom, XDialog, XTextarea, Group } from 'vux'
let count = 1
export default {
  name: 'hotelManage',
  directives: {
    TransferDom
  },
  components: {
    Rater,
    Previewer,
    XTextarea,
    Group,
    XDialog
  },
  data () {
    return {
        currentCommentId: '',
      commentsValue: '',
      showToast: false,
      isMoreData: true,
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none',
      baseInfo: {
        postDetail: {
          postName: '',
          postDescription: ''
        },
        commentInfo: {
          commentNumber: 0,
          point: 0,
          comments: 0
        },
        couponNum: ''
      },
      params: {
        merchantId: '',
        page: 1,
        pageSize: 10
      },
      data3: 4.5,
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
      previewList: [],
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
      this.$http.fetchPost('/merchant/post/add/commentreply',{commentId: this.currentCommentId,merchantId:this.$store.state.merchantId,replyText:this.commentsValue}).then((res)=>{
        if(res.data.code == 200) {
          this.$vux.toast.show({
            text: '评论成功',
            position: 'middle',
            type: 'warn'
          })
          this.data.map((item)=>{
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
    editHotel () {
        /*if (this.baseInfo.postDetail.dataStatus == 1) {
          this.$vux.toast.show({
            text: '信息审核中',
            position: 'middle',
            type: 'warn'
          })
            return
        }*/
      this.$router.push({
        name: 'editHotel'
      })
    },
    coupons(){
      this.$router.push({
        name: 'coupons'
      })
    },
    show (parent,index) {
      this.previewList = this.data[parent].commentImageInfo
      this.previewList.map((item)=>{
        item.msrc = item.src = item.url
        item.w = item.h = 0
      })
      this.$nextTick(()=>{
        this.$refs.previewer.show(index)
      })
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
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
        this.baseInfo = res.data.data
        this.data = res.data.data.commentInfo.comments
        if (this.data.length === this.params.pageSize) {
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
      this.$http.fetchGet('/merchant/post/get/main', this.params).then((res) => {
        this.baseInfo = res.data.data
        this.data = res.data.data.commentInfo.comments
        if (this.data.length === this.params.pageSize) {
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
      if (this.data.length < this.params.pageSize || this.data.length < this.params.pageSize * this.params.page) {
        this.isMoreData = false
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.params.page++
      this.$http.fetchGet('/merchant/post/get/main', this.params).then((res) => {
        setTimeout(() => {
        this.$vux.loading.hide()
      }, 500)
        this.baseInfo = res.data.data
        if (this.data.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
        }
        if (res.data.data.commentInfo.comments.length > 0) {
          res.data.data.commentInfo.comments.map((item) => {
            this.data.push(item)
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
    },
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.params.merchantId = this.$store.state.merchantId
    this.getInfo()
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
