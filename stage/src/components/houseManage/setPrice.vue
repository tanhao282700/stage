<template>
  <div class="setPrice">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置某日价格</span>
    </div>
    <div class="con">
      <inline-calendar
        ref="calendar"
        show.sync="false"
        class="inline-calendar-demo"
        v-model="value"
        @on-view-change="changeMonth"
        :render-function="buildSlotFn">
      </inline-calendar>
    </div>
    <div class="bottom">保存</div>
  </div>
</template>

<script>
  import { InlineCalendar } from 'vux'
  export default {
    name: 'setPrice',
    components: {
      InlineCalendar
    },
    data () {
      return {
        value: [],
        timePrice: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData(){
        let timer = new Date()
        let year = timer.getFullYear()
        let month = timer.getMonth()+1
        if(month < 10){
          month = '0'+month
        }
          this.$http.fetchGet('/merchant/room/get/dayprice',{roomId: this.$route.query.params.id,month:year+'-'+month}).then((res)=>{
              this.timePrice = res.data.data
          })
      },
      changeMonth(data, index){
        if(data.month<10){
          data.month = '0'+data.month
        }
        this.$http.fetchGet('/merchant/room/get/dayprice',{roomId: this.$route.query.params.id,month: data.year+'-'+data.month}).then((res)=>{
          this.timePrice = res.data.data
        })
      },
      buildSlotFn(pa1,pa2,pa3){
        for(let i = 0;i<this.timePrice.length;i++){
          if(this.timePrice[i].day===pa3.formatedDate) {
            return '¥'+this.timePrice[i].price
          }
        }
      },
      getBack(){
        this.$router.replace({
          name: 'thirdStep',
          query: {
            params: this.$route.query.params
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .setPrice {
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
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.32rem;
    padding-bottom: 0.24rem;
    .headericon {
      position: absolute;
      bottom: 0.14rem;
      font-size: 0.42rem;
      color: #000000;
      width: 0.48rem;
      height: 0.48rem;
      &.headericon_right{
        right: 0.2rem;
      }
      &.headericon_left{
        left: 0.2rem;
      }
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
  .con {
    flex: 1;
    overflow: auto;
  }
</style>
<style>
  .setPrice .inline-calendar th {
    font-size: 0.28rem;
  }
  .setPrice .inline-calendar td.is-disabled {
    font-size: 0.24rem;
    color: #353535!important;
  }
  .setPrice .inline-calendar td > span.vux-calendar-each-date {
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
  .setPrice .inline-calendar td.is-today {
    color: #353535!important;
  }
/*  .setPrice .current {
    background: #04BE02!important;
    border-radius: 0.1rem;
    color: white;
  }*/
  /*.setPrice .inline-calendar td div {
    display: none;
  }*/
  .setPrice .inline-calendar td.current > span.vux-calendar-each-date {
    background-color: white!important;
    color: black!important;
  }
  .setPrice .inline-calendar td div {
    display: block;
    font-size: 0.24rem;
    color: #9b9b9b;
  }
  .setPrice .current div{
    display: block!important;
  }
  .setPrice .vux-prev-icon {
    width: 0.12rem;
    height: 0.12rem;
  }
  .setPrice .vux-next-icon {
    width: 0.12rem;
    height: 0.12rem;
  }
</style>
