<template>
  <div class="secondStep">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>第二步：房源介绍</span>
      <span @click="getBack" class="headericon icon iconfont">&#xe61a;</span>
    </div>
    <div class="steps">
      <span></span>
    </div>
    <div class="con">
      <div class="defaultTitle">房源介绍</div>
    </div>
    <div class="bottom">下一步</div>
  </div>
</template>

<script>
  export default {
    name: 'secondStep',
    components: {

    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      getBack () {
          this.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .secondStep {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    text-align: left;
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
    .headericon {
      font-size: 0.3rem;
      color: #000000;
    }
  }
  .steps {
    height: 0.08rem;
    background: #efefef;
    display: flex;
    justify-content: flex-start;
    span {
      width: 50%;
      background: #19ad19;
    }
  }
  .con {
    flex: 1;
    overflow: auto;
    .defaultTitle {
      height: 1rem;
      line-height: 1.2rem;
      font-size: 0.28rem;
      font-weight: bold;
      padding: 0 0.2rem;
    }
  }
  .bottom {
    height: 0.96rem;
    line-height: 0.96rem;
    background: #19ad19;
    font-size: 0.32rem;
    color: white;
    text-align: center;
  }
</style>
