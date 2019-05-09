<template>
  <div class="houseList">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>房态管理</span>
      <x-icon type="ios-plus-empty" size="60"></x-icon>
    </div>
    <div class="tabBar">
      <div class="bar active">
        <span class="barInfo">
          在售(<span>5</span>)
        </span>
      </div>
      <div class="bar">
        <div class="barInfo">
          停售(<span>2</span>)
        </div>
      </div>
      <div class="bar">
        <div class="barInfo">
          待完善(<span>10</span>)
        </div>
      </div>
    </div>
    <div class="list_con">
      <div class="wrapper" ref="wrapper">
        <div class="bscroll-container">
          <!-- 刷新提示信息 -->
          <div class="top-tip">
            <span class="refresh-hook">{{pulldownMsg}}</span>
          </div>
          <!-- 内容列表 -->
          <ul class="content" :class="isMoreData ? 'longCon' : 'shortCon'" >
            <li @click="goDetails" class="item vux-1px-b">
              <div class="pics">
                <img src="../../assets/images/test.png" alt="">
                <span class="grade">4.9分</span>
              </div>
              <div class="info">
                <span>宽窄巷子美式公寓，两居室带娃打我的哇</span>
                <span>销量18</span>
                <span>最后编辑于 2018-08-18 15:30</span>
                <span>￥159</span>
              </div>
              <span class="edit">继续编辑</span>
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
  import { LoadMore } from 'vux'
  let count = 1
  export default {
    name: 'houseList',
    components: {
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
      goDetails() {
          this.$router.push({
              name: 'houseDetail',
            params: {

            }
          })
      },
        getBack() {
            this.$router.go(-1)
        },
      getData() {
        let that = this
        return new Promise(resolve => {  //模拟数据请求
          setTimeout(() => {
            that.isMoreData = false
            console.log(that.isMoreData)
            const arr = [];
            for (let i = 0; i < 26; i++) {
              arr.push(count++)
            }
            resolve(arr)
          }, 1000)
        })
      },
      refreshalert() {   //刷新成功提示
        this.alertHook = 'block';
        setTimeout(()=>{
          this.alertHook = 'none'
        },1000)
      }
    },
    created() {
      const that = this;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper,{       //初始化better-scroll
          probeType: 1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true   //是否派发click事件
        })
        // 滑动过程中事件
        this.scroll.on('scroll',(pos)=>{
          if(pos.y > 30){
            this.pulldownMsg = '释放立即刷新'
          }
        });
        //滑动结束松开事件
        this.scroll.on('touchEnd',(pos) =>{  //上拉刷新
          console.log(pos)
          if(pos.y > 30){
            console.log(222)
            setTimeout(()=>{
              that.getData().then((res) =>{
                //刷新数据
                that.data = res;
                //恢复刷新提示文本值
                that.pulldownMsg = '下拉刷新'
                //刷新成功后提示
                that.refreshalert();
                //刷新列表后，重新计算滚动区域高度
                that.scroll.refresh();
              })
            },2000)
          }
          else if(pos.y<(this.scroll.maxScrollY - 30)){   //下拉加载
            console.log(333)
            this.pullupMsg = '加载中。。。';
            setTimeout(()=>{
              that.getData().then((res)=>{
                //恢复文本值
                that.pullupMsg = '加载更多';
                that.data = this.data.concat(res);
                that.scroll.refresh();
              })
            },2000)

          }
        })
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .houseList {
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
      &:last-child .barInfo{
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
      align-items: flex-start;
      padding-left: 0.12rem;
      overflow: hidden;
      span:first-child {
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 0.28rem;
        font-weight: bold;
      }
      span:nth-child(2),span:nth-child(3) {
        font-size: 0.24rem;
        color: #9b9b9b;
        line-height: 0.5rem;
      }
      span:last-child {
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
  .vux-x-icon {
    fill: rgb(74,74,74);
  }
</style>
