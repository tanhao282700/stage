<template>
  <div class="changePrice">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>修改价格</span>
    </div>
    <div class="con">
      <div class="inputLine">
        <div class="inputLine_con">
          <div class="line_title">
            <span>工作日价格</span>
            <span>元/晚</span>
          </div>
          <group class="line_input vux-1px-b">
            <x-input placeholder="周一~周四及因串休导致需要正常上班的日期" v-model="workPrice"></x-input>
          </group>
        </div>
      </div>
      <div class="inputLine">
        <div class="inputLine_con">
          <div class="line_title">
            <span>节假日价格</span>
            <span>元/晚</span>
          </div>
          <group class="line_input vux-1px-b">
            <x-input placeholder="周五、周六及法定节假日、情人节圣诞节等" v-model="holidayPrice"></x-input>
          </group>
        </div>
      </div>
      <div class="td">
        <div class="tit">
          <span>单独设置某日价格</span>
          <span>元/晚</span>
        </div>
        <div class="tips">点击日历中的日期进行设置</div>
      </div>
      <inline-calendar
        ref="calendar"
        show.sync="false"
        class="inline-calendar-demo"
        v-model="value"
        :show-last-month="false"
        :show-next-month="false"
        @on-view-change="changeMonth"
        @on-select-single-date="selectDate"
        :render-function="buildSlotFn">
      </inline-calendar>
    </div>
    <div @click="saveData" class="bottom">保存</div>
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="priceTit">
          <span>修改价格</span>
          <span @click="show=false" class="icon iconfont">&#xe61a;</span>
        </div>
        <div class="priceArea">
          <span v-text="chooseData.day"></span>
          <x-input placeholder="输入价格" v-model="chooseData.price"></x-input>
        </div>
        <div class="priceBottom">
          <span @click="show=false">取消</span>
          <span @click="changePrice">确定</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XDialog, InlineCalendar, TransferDomDirective as TransferDom } from 'vux'
  export default {
    name: 'changePrice',
    directives: {
      TransferDom
    },
    components: {
      XInput,
      Group,
      InlineCalendar,
      XDialog
    },
    data () {
      return {
        value: '',
        timePrice: [],
        chooseDataList: [],
        workPrice: '',
        holidayPrice: '',
        show: false,
        chooseData: {
          day: '',
          price: ''
        }
      }
    },
    created () {
      this.getData()
    },
    methods: {
      saveData(){
          if(!this.workPrice) {
            this.$vux.toast.show({
              text: '请输入工作日价格',
              position: 'middle',
              type: 'warn'
            })
            return
          }
        if(!this.holidayPrice) {
          this.$vux.toast.show({
            text: '请输入节假日价格',
            position: 'middle',
            type: 'warn'
          })
          return
        }
        /*this.$route.query.id*/
        this.$http.fetchPost('/merchant/room/update/price',{
          "holidayPrice": this.holidayPrice,
          "id": 1557500120029003,
          "specialDaysPrice": this.chooseDataList,
          "workPrice": this.workPrice
        }).then((res)=>{
          if(res.data.code == 200) {
            this.$vux.toast.show({
              text: '价格修改成功',
              position: 'middle'
            })
            this.$router.go(-1)
          }else{
            this.$vux.toast.show({
              text: res.data.message,
              position: 'middle',
              type: 'warn'
            })
          }
        })
      },
      selectDate(currentValue) {
        this.show = true;
        this.timePrice.map((item)=>{
          if(item.day === currentValue){
            this.chooseData.day = item.day
            this.chooseData.price = ''
            return
          }
        })
      },
      changePrice() {
        let flag = true
        this.chooseDataList.map((item)=>{
          if(item.day === this.chooseData.day){
            flag = false
            item.price = chooseData.price
          }
        })
        if(flag){
          this.chooseDataList.push({
            day: this.chooseData.day,
            price: this.chooseData.price
          })
        }
        this.timePrice.map((item)=>{
          if(item.day === this.chooseData.day) {
            item.price = this.chooseData.price
          }
        })
        this.show = false
      },
      buildSlotFn(pa1,pa2,pa3){
        for(let i = 0;i<this.timePrice.length;i++){
          if(this.timePrice[i].day===pa3.formatedDate) {
            return '¥'+this.timePrice[i].price
          }
        }
      },
      changeMonth(data, index){
        if(data.month<10){
          data.month = '0'+data.month
        }
        /*this.$route.query.id*/
        this.$http.fetchGet('/merchant/room/get/dayprice',{roomId: 1557500120029003,month: data.year+'-'+data.month}).then((res)=>{
          this.timePrice = res.data.data
          this.timePrice.map((item)=>{
            this.chooseDataList.map((child)=>{
              if(item.day === child.day) {
                item.price = child.price
              }
            })
          })
        })
      },
      getData(){
        let timer = new Date()
        let year = timer.getFullYear()
        let month = timer.getMonth()+1
        if(month < 10){
          month = '0'+month
        }
        /*this.$route.query.id*/
        this.$http.fetchGet('/merchant/room/get/dayprice',{roomId: 1557500120029003,month:year+'-'+month}).then((res)=>{
          this.timePrice = res.data.data
        })
      },
      getBack(){
          this.$router.go(-1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .changePrice {
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
    .inputLine {
      padding: 0 0.2rem;
      background: #fff;
      .inputLine_con {
        .line_title {
          display: flex;
          justify-content: space-between;
          padding: 0.2rem 0;
          span {
            font-size: 0.28rem;
          }
        }
        .line_input {
          height: 0.62rem;
          padding-bottom: 0.1rem;
        }
      }
    }
    .td {
      padding: 0.1rem 0.2rem 0.2rem 0.2rem;
      background: #fff;
      text-align: left;
      .tit {
        display: flex;
        justify-content: space-between;
        padding: 0.1rem 0;
        span {
          font-size: 0.28rem;
        }
      }
      .tips {
        font-size: 0.24rem;
        color: #9b9b9b;
        padding-bottom: 0.1rem;
      }
    }
  }
</style>
<style>
  .changePrice .inline-calendar th {
    font-size: 0.28rem;
  }
  .changePrice .inline-calendar td.is-disabled {
    font-size: 0.24rem;
    color: #353535!important;
  }
  .changePrice .inline-calendar td > span.vux-calendar-each-date {
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
  .changePrice .inline-calendar td.is-today {
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
  .changePrice .inline-calendar td.current > span.vux-calendar-each-date {
    background-color: white!important;
    color: black!important;
  }
  .changePrice .inline-calendar td div {
    display: block;
    font-size: 0.24rem;
    color: #9b9b9b;
  }
  .changePrice .current div{
    display: block!important;
  }
  .changePrice .vux-prev-icon {
    width: 0.12rem;
    height: 0.12rem;
  }
  .changePrice .vux-next-icon {
    width: 0.12rem;
    height: 0.12rem;
  }

  .changePrice .weui-cells:before {
    border-top: none;
    height: 0;
  }

  .changePrice .weui-cells:after {
    border-bottom: none;
  }

  .changePrice .weui-cell {
    padding: 0;
  }

  .changePrice .inputLine .weui-input {
    height: 0.52rem;
    font-size: 0.24rem;
  }

  .changePrice .weui-cells {
    margin-top: 0;
  }


</style>
