<template>
  <div class="news">
    <div class="iosHeader vux-1px-b">
      <span>消息中心</span>
    </div>
    <div class="news_con">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" :class="isMoreData ? 'longCon' : 'shortCon'" >
            <!--<li v-for="item in data">{{item}}</li>-->
            <li class="item vux-1px-b">
              <img src="../../assets/images/money.png" alt="">
              <div class="infos">
                <span>退款申请</span>
                <span>我是退款申请带娃带娃阿伟大阿伟大阿伟大阿伟大wa</span>
              </div>
              <div class="times">
                <span>今天 14:00</span>
                <badge text="123"></badge>
              </div>
            </li>
            <li class="item vux-1px-b">
              <img src="../../assets/images/orderpage.png" alt="">
              <div class="infos">
                <span>退款申请</span>
                <span>我是退款申请带娃带娃阿伟大阿伟大阿伟大阿伟大wa</span>
              </div>
              <div class="times">
                <span>今天 14:00</span>
                <badge text="123"></badge>
              </div>
            </li>
            <li class="item vux-1px-b">
              <img src="../../assets/images/money.png" alt="">
              <div class="infos">
                <span>退款申请</span>
                <span>我是退款申请带娃带娃阿伟大阿伟大阿伟大阿伟大wa</span>
              </div>
              <div class="times">
                <span>今天 14:00</span>
                <badge text="123"></badge>
              </div>
            </li>
          </ul>
          <!-- 底部提示信息 -->
          <div class="bottom-tip">
            <span class="loading-hook">{{pullupMsg}}</span>
            <load-more :show-loading="false" tip="我是有底线的" background-color="#777"></load-more>
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
      isMoreData: false,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none'
    }
  },
  methods: {
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
    refreshalert () { // 刷新成功提示
      this.alertHook = 'block'
      setTimeout(() => {
        this.alertHook = 'none'
      }, 1000)
    }
  },
  created () {
    const that = this
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
        console.log(pos)
        if (pos.y > 30) {
          console.log(222)
          setTimeout(() => {
            that.getData().then((res) => {
              // 刷新数据
              that.data = res
              // 恢复刷新提示文本值
              that.pulldownMsg = '下拉刷新'
              // 刷新成功后提示
              that.refreshalert()
              // 刷新列表后，重新计算滚动区域高度
              that.scroll.refresh()
            })
          }, 2000)
        } else if (pos.y < (this.scroll.maxScrollY - 30)) { // 下拉加载
          console.log(333)
          this.pullupMsg = '加载中。。。'
          setTimeout(() => {
            that.getData().then((res) => {
              // 恢复文本值
              that.pullupMsg = '加载更多'
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
  .news_con {
    flex: 1;
    overflow-y: auto;
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
