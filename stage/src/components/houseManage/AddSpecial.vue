<template>
    <div class="addSpecial">
        <div class="iosHeader vux-1px-b">
            <span>添加定制项目</span>
            <span class="headericon icon iconfont">&#xe61a;</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'addSpecial',
  components: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .addSpecial {
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
        position: relative;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 0.32rem;
        padding-bottom: 0.24rem;
        .headericon {
            position: absolute;
            right: 0.2rem;
            bottom: 0.14rem;
            font-size: 0.42rem;
            color: #000000;
        }
    }
</style>
