 /* eslint-disable */
<template>
  <div class="goodsManage">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>商品管理</span>
      <x-icon @click="addGoods" type="ios-plus-empty" size="70"></x-icon>
    </div>
    <div class="tabBar">
      <div @click="changeTab(1)" class="bar" :class="{'active': params.status === 1}">
        <div class="barInfo">
          已上架(<span v-text="baseInfo.goodsOnNum"></span>)
        </div>
      </div>
      <div @click="changeTab(2)" class="bar" :class="{'active': params.status === 2}">
        <div class="barInfo">
          未上架(<span v-text="baseInfo.goodsDownNum"></span>)
        </div>
      </div>
    </div>
    <div class="list_con" ref="list_con">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" ref="content">
            <li @click="goDetail(item.id)" v-for="item in data" class="item vux-1px-b">
              <div class="pics">
                <img :src="item.imagePath" alt="">
                <span v-text="item.commentPoint+'分'" class="grade"></span>
              </div>
              <div class="info">
                <div>
                  <span v-text="item.title"></span>
                  <!--<span>销量18</span>-->
                  <span v-text="'最后编辑于 '+item.updateTime"></span>
                </div>
                <span v-text="'￥'+item.memberPrice" class="price"></span>
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

      <!-- alert提示刷新成功 -->
      <div class="alert-hook" :style="{display: alertHook}">刷新成功</div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {LoadMore} from 'vux'
export default {
  name: 'goodsManage',
  components: {
    LoadMore
  },
  data () {
    return {
      params: {
        merchantId: '',
        status: 1, // 商品状态【1-已上架 2-未上架】
        page: 1,
        pageSize: 10
      },
      isMoreData: true,
      data: [],
      baseInfo: {
        goodsDownNum: 0,
        goodsOnNum: 0
      },
      pulldownMsg: '下拉刷新',
      pullupMsg: '加载更多',
      alertHook: 'none'
    }
  },
  methods: {
    addGoods () {
      this.$router.push({
        name: 'goodsAdd'
      })
    },
    goDetail (id) {
      this.$router.push({
        name: 'goodsDetail',
        query: {
          tabIndex: this.params.status,
          id: id
        }
      })
    },
    getBack () {
      this.$router.go(-1)
    },
    getData () {
      this.$http.fetchGet('/merchant/good/get/list', this.params).then((res) => {
        this.baseInfo.goodsDownNum = res.data.data.goodsDownNum
        this.baseInfo.goodsOnNum = res.data.data.goodsOnNum
        this.data = res.data.data.goodsList
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
      this.$http.fetchGet('/merchant/good/get/list', this.params).then((res) => {
        this.baseInfo.goodsDownNum = res.data.data.goodsDownNum
        this.baseInfo.goodsOnNum = res.data.data.goodsOnNum
        this.data = res.data.data.goodsList
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
      if (this.data.length < this.params.pageSize) {
        return
      }
      this.params.page++
      this.$http.fetchGet('/merchant/good/get/list', this.params).then((res) => {
        this.baseInfo.goodsDownNum = res.data.data.goodsDownNum
        this.baseInfo.goodsOnNum = res.data.data.goodsOnNum
        if (this.data.length === this.params.pageSize) {
          this.isMoreData = true
        } else {
          this.isMoreData = false
        }
        if (res.data.data.goodsList.length > 0) {
          res.data.data.goodsList.map((item) => {
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
    changeTab (tabIndex) {
      this.$refs.content.style.height = 'auto'
      this.params.page = 1
      this.params.status = tabIndex
      this.refreshData()
    },
    refreshalert () { // 刷新成功提示
      this.alertHook = 'block'
      setTimeout(() => {
        this.alertHook = 'none'
      }, 1000)
    }
  },
  created () {
    this.params.merchantId = this.$store.state.merchantId
    this.getData()
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .goodsManage {
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
    svg:last-child {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .tabBar {
    height: 0.92rem;
    display: flex;
    align-items: center;
    background: #fff;
    margin-bottom: 0.12rem;
    .bar {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c6c6c;
      .barInfo {
        border-right: 1px solid #efefef;
        font-size: 0.28rem;
        display: inline-block;
        width: 100%;
      }
      &:last-child .barInfo {
        border-right: none;
      }
    }
    .active {
      border-bottom: 2px solid #19ad19;
      color: #1aad19;
    }
  }

  .list_con {
    flex: 1;
    overflow: hidden;
    .content {
      display: flex;
      flex-direction: column;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .shortCon {
    height: 100vh;
  }

  .item {
    height: 2.32rem;
    background: #fff;
    position: relative;
    padding-left: 0.2rem;
    padding-right: 0.7rem;
    display: flex;
    align-items: center;
    .pics {
      width: 2.8rem;
      height: 2rem;
      position: relative;
      img {
        width: 2.8rem;
        height: 2rem;
        border-radius: 0.1rem;
      }
      span {
        width: 0.92rem;
        height: 0.36rem;
        position: absolute;
        background: #19ad19;
        left: 0;
        bottom: 0;
        color: #ffffff;
        font-size: 0.24rem;
      }
    }
    .info {
      flex: 1;
      height: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      padding-left: 0.12rem;
      overflow: hidden;
      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        overflow: hidden;
        span:first-child {
          text-align: left;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.28rem;
          font-weight: bold;
        }
        span:nth-child(2), span:nth-child(3) {
          font-size: 0.24rem;
          color: #9b9b9b;
          line-height: 0.5rem;
        }
      }
      .price {
        font-size: 0.36rem;
        color: #f24b45;
        font-weight: bold;
      }
    }
    .edit {
      position: absolute;
      width: 1.48rem;
      height: 0.48rem;
      text-align: center;
      line-height: 0.48rem;
      font-size: 0.28rem;
      color: #353535;
      right: 0.2rem;
      bottom: 0.16rem;
      border: 1px solid #bdbdbd;
      border-radius: 0.3rem;
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
  .vux-x-icon {
    fill: rgb(74, 74, 74);
  }
</style>
