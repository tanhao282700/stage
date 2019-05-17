<template>
  <div class="setPrice">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>设置某日价格</span>
    </div>
    <div class="con">
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
  import { InlineCalendar, XDialog, XInput, TransferDomDirective as TransferDom } from 'vux'
  export default {
    name: 'setPrice',
    directives: {
      TransferDom
    },
    components: {
      InlineCalendar,
      XDialog,
      XInput
    },
    data () {
      return {
          value1: '',
        value: '',
        timePrice: [],
        show: false,
        chooseData: {
          day: '',
          price: ''
        },
        chooseDataList: []
      }
    },
    created () {
      this.getData()
    },
    methods: {
      saveData() {
          console.log(this.chooseDataList)
        this.$http.fetchGet('/merchant/room/get/reserveInfo',{roomId: this.$route.query.params.id}).then((res)=>{
          res.data.data.specialDaysPrice = this.chooseDataList
          this.$http.fetchPost('/merchant/room/add/reserveInfo',res.data.data).then((req)=>{
            if(res.data.code == 200){
              this.$vux.toast.show({
                text: '价格保存成功',
                position: 'middle'
              })
              this.getBack()
            }else{
              this.$vux.toast.show({
                text: res.data.message,
                position: 'middle',
                type: 'warn'
              })
            }
          })
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
          this.timePrice.map((item)=>{
              this.chooseDataList.map((child)=>{
                  if(item.day === child.day) {
                      item.price = child.price
                  }
              })
          })
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
