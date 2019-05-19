<template>
    <div class="mine">
      <div class="iosHeader vux-1px-b">
        <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
        <span>消息详情</span>
      </div>
      <div class="tit">
          <div class="tit_con" v-text="info.title"></div>
      </div>
      <div class="info" v-text="info.info"></div>
      <div class="time" v-text="info.messageDate"></div>
    </div>
  </template>

<script>
export default {
  name: 'newsDetail',
  components: {

  },
  data () {
    return {
      info: {
        title: '',
        info: '',
        messageDate: ''
      }
    }
  },
  created () {
    this.info.title = this.$route.query.title
    this.info.info = this.$route.query.info
    this.info.messageDate = this.$route.query.messageDate
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
    .newsDetail {
      width: 100%;
      height: 100%;
      background: rgb(247,247,247);
      display: flex;
      flex-direction: column;
    }
    .tit {
        padding: 0 0.2rem;
        height: 0.8rem;
        background: #fff;
        font-size: 0.28rem;
        font-weight: bold;
        line-height: 0.8rem;
    }
    .info {
        padding: 0.2rem 0.2rem;
        background: #fff;
        font-size: 0.24rem;
        text-align: left;
    }
    .time {
        padding: 0.2rem 0.2rem;
        background: #fff;
        font-size: 0.24rem;
        text-align: right;
    }
  </style>
