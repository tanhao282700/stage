<template>
  <div class="news">
    <div class="iosHeader vux-1px-b">
      <span>消息中心</span>
    </div>
    <div class="list_con" ref="list_con">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" ref="content" >
            <!--<li v-for="item in data">{{item}}</li>-->
            <li @click="getDetails(item)" v-for="item in data" class="item vux-1px-b">
              <img src="../../assets/images/orderpage.png" alt="">
              <div class="infos">
                <span :class="{'alireadyRead':item.readStatus==1}" v-text="item.title+'('+(+item.readStatus==0?'未读':'已读')+')'"></span>
                <span v-text="item.info"></span>
              </div>
              <div class="times">
                <span v-text="item.messageDate"></span>
                <!--<badge text="123"></badge>-->
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
            <span class="loading-hook">{{ pullupMsg }}</span>
          </div>
        </div>
      </div>

      <!-- alert提示刷新成功 -->
      <div class="alert-hook" :style="{display: alertHook}">刷新成功</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Badge, LoadMore } from 'vux'
let count = 1
export default {
  name: 'News',
  components: {
    Badge,
    LoadMore
  },
  data () {
    return {
      isMoreData: true,
      data: [],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none',
      params: {
        merchantId: '',
        page: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getDetails (item) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchGet('/merchant/center/update/message/status', {messageId: item.id}).then((res) => {
        this.$vux.loading.hide()
        if (item.type == 7) {
          this.$router.push({
            name: 'goodsDetail',
            query: {
              tabIndex: 0,
              id: item.bizId
            }
          })
        } else if (item.type == 8 || item.type == 13) {
          this.$router.push({
            name: 'hotelManage'
          })
        } else if (item.type == 10 || item.type == 12) {
          this.$router.push({
            name: 'myMoney'
          })
        } else if (item.type == 14) {
          this.$router.push({
            name: 'goodsDetail',
            query: {
              tabIndex: 0,
              id: item.bizId
            }
          })
        } else if (item.type == 15) {
          this.$router.push({
            name: 'houseDetail',
            query: {
              tabIndex: 0,
              id: item.bizId
            }
          })
        } else if (item.type == 16) {
          this.$router.push({
            name: 'houseDetail',
            query: {
              tabIndex: 0,
              id: item.bizId
            }
          })
        } else {
          this.$router.push({
            name: 'newsDetail',
            query: {
              title: item.title,
              info: item.info,
              messageDate: item.messageDate
            }
          })
        }
      })
    },
    getData () {
      this.$http.fetchGet('/merchant/center/get/message/list', this.params).then((res) => {
        if(res.data.code === 200) {
        this.data = res.data.data.messageList
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
        setTimeout(() => {
          this.$vux.loading.hide()
      }, 500)
        this.initScroll()
      } else {
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: res.data.message,
          position: 'middle',
          type: 'warn'
        })
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
    },
    refreshData () {
      this.$refs.content.style.height = 'auto'
      this.pullupMsg = '加载中。。。'
      this.params.page = 1
      this.$http.fetchGet('/merchant/center/get/message/list', this.params).then((res) => {
        this.data = res.data.data.messageList
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
      this.$http.fetchGet('/merchant/center/get/message/list', this.params).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
        if (this.data.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
        }
        if (res.data.data.messageList.length > 0) {
          res.data.data.messageList.map((item) => {
            this.data.push(item)
          })
        } else {
          this.isMoreData = false
        }
        console.log(this.data)
        // 恢复刷新提示文本值
        this.pulldownMsg = '下拉刷新'
        // 刷新列表后，重新计算滚动区域高度
        this.scroll.refresh()
      })
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.params.merchantId = this.$store.state.merchantId
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .news {
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
    justify-content: center;
    font-size: 0.32rem;
    padding-bottom: 0.24rem;
  }
  .list_con {
    flex: 1;
    overflow-y: hidden;
  }
  .wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .shortCon {
    height: 100vh;
  }
  .item{
    background: #fff;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.8rem;
    }
    .infos {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      overflow: hidden;
      padding-left: 0.36rem;
      span:first-child {
        font-size: 0.28rem;
        font-weight: bold;
      }
      span:last-child {
        display: inline-block;
        width: 100%;
        font-size: 0.28rem;
        text-align: left;
        color: #9b9b9b;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .times {
      height: 0.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      span:first-child {
        font-size: 0.24rem;
        color: #9b9b9b;
      }
    }
  }

  /* 下拉、上拉提示信息 */
  .top-tip{
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1;
    width: 100%;
    height:40px;
    line-height:40px;
    text-align:center;
    color: #555;
  }

  .bottom-tip{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
    position: absolute;
    bottom: -35px;
    left: 0;
  }

  /* 全局提示信息 */
  .alert-hook{
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
  .alireadyRead {
    color: #2bbb59;
  }
</style>
<style>
  .news .vux-badge{
    font-size: 0.2rem;
    height: auto;
    width: auto;
    padding: 0.06rem 0.08rem;
    border-radius: 0.16rem;
  }
  .weui-loadmore_line .weui-loadmore__tips {
    font-size: 0.24rem!important;
    color: #777!important;
  }
</style>
