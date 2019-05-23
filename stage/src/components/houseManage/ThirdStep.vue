<template>
    <div class="thirdStep">
        <div class="iosHeader vux-1px-b">
            <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
            <span>第三步：预定信息</span>
            <span @click="getBack" class="right headericon icon iconfont">&#xe61a;</span>
        </div>
        <div class="steps">
            <span></span>
        </div>
        <div class="con">
            <div class="defaultTitle">确定合适价格</div>
            <div class="inputLine">
                <div class="inputLine_con">
                    <div class="line_title">
                        <span>工作日价格</span>
                        <span>元/晚</span>
                    </div>
                    <group class="line_input vux-1px-b">
                        <x-input placeholder="周一~周四及因串休导致需要正常上班的日期" v-model="baseInfo.workPrice"></x-input>
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
                        <x-input placeholder="周五、周六及法定节假日、情人节圣诞节等" v-model="baseInfo.holidayPrice"></x-input>
                    </group>
                </div>
            </div>
            <div class="selectLine">
                <div class="deraultLine_con vux-1px-b">
                    <span>单独设置某日价格</span>
                    <div @click="setPrice" class="info">
                        <span>去设置</span>
                        <x-icon type="ios-arrow-right" size="60"></x-icon>
                    </div>
                </div>
            </div>
            <div class="menberPersons">
                <div class="menberPersons_con vux-1px-b">
                    <span>可住几人</span>
                    <div class="menbers">
                        <x-icon @click="reducePerson" type="ios-minus" size="60"></x-icon>
                        <span class="persons" v-text="baseInfo.housePersonNumber+'人'"></span>
                        <x-icon @click="addPerson" type="ios-plus" size="60"></x-icon>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="tit">
                    <span>退订政策</span>
                    <span @click="isShow1=true">修改</span>
                </div>
                <div class="tips">客人取消入住可以获得多少退款</div>
                <div class="tdzc" v-for="item in baseInfo.ubscribeComments" v-text="item.text" v-if="item.isSelected == 1"></div>
            </div>
            <div class="defaultTitle">更多预定选项</div>
            <div class="menberPersons">
                    <div class="menberPersons_con vux-1px-b">
                        <span>最少预定天数</span>
                        <div class="menbers">
                            <x-icon @click="reduceMin" type="ios-minus" size="60"></x-icon>
                            <span class="persons" v-text="baseInfo.minReserveDay+'天'"></span>
                            <x-icon @click="addMin" type="ios-plus" size="60"></x-icon>
                        </div>
                    </div>
            </div>
            <div class="menberPersons">
                    <div class="menberPersons_con vux-1px-b">
                        <span>最大预定天数</span>
                        <div class="menbers">
                            <x-icon @click="reduceMax" type="ios-minus" size="60"></x-icon>
                            <span class="persons" v-text="baseInfo.maxReserveDay+'天'"></span>
                            <x-icon @click="addMax" type="ios-plus" size="60"></x-icon>
                        </div>
                    </div>
            </div>
            <div class="td">
                    <div class="tit">
                        <span>当天预定时间</span>
                        <span @click="isShow2 = true">修改</span>
                    </div>
                    <div class="tips">周五、周六及法定节假日客人可在几点前预定房源？</div>
                    <div class="tdzc vux-1px-b" v-text="baseInfo.nowReserveTime"></div>
            </div>
            <div class="td">
                    <div class="tit">
                        <span>入住时间</span>
                        <span @click="isShow3 = true">修改</span>
                    </div>
                    <div class="tips">客人最早几点可以入住？</div>
                    <div class="tdzc vux-1px-b" v-text="baseInfo.checkInTimeFront+'后'"></div>
            </div>
            <div class="td" style="margin-bottom: 0.8rem;padding-bottom: 0.4rem;">
                    <div class="tit">
                        <span>退房时间</span>
                        <span @click="isShow4=true">修改</span>
                    </div>
                    <div class="tips">客人最晚几点可以退房？</div>
                    <div class="tdzc" v-text="baseInfo.checkOutTime+'前'"></div>
            </div>
        </div>
        <div @click="getNextStep" class="bottom">下一步</div>
      <actionsheet class="myActionsheet"
                   v-model="isShow1"
                   :menus="baseInfo.ubscribeComments"
                   :close-on-clicking-mask="false"
                   show-cancel
                   @on-click-menu="confirm1"
                   @on-click-mask="isShow1 = false">
      </actionsheet>
      <actionsheet class="myActionsheet"
                   v-model="isShow2"
                   :menus="timer"
                   :close-on-clicking-mask="false"
                   show-cancel
                   @on-click-menu="confirm2"
                   @on-click-mask="isShow2 = false">
      </actionsheet>
      <actionsheet class="myActionsheet"
                   v-model="isShow3"
                   :menus="time1"
                   :close-on-clicking-mask="false"
                   show-cancel
                   @on-click-menu="confirm3"
                   @on-click-mask="isShow3 = false">
      </actionsheet>
      <actionsheet class="myActionsheet"
                   v-model="isShow4"
                   :menus="time1"
                   :close-on-clicking-mask="false"
                   show-cancel
                   @on-click-menu="confirm4"
                   @on-click-mask="isShow4 = false">
      </actionsheet>
    </div>
</template>

<script>
import { XInput, Group, InlineXNumber, Actionsheet } from 'vux'
export default {
  name: 'thirdStep',
  components: {
    XInput,
    Group,
    InlineXNumber,
    Actionsheet
  },
  data () {
    return {
      value: '',
      baseInfo: {
        workPrice: '',
        holidayPrice: '',
        housePersonNumber: '',
        minReserveDay: '',
        maxReserveDay: ''
      },
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      timer: {
          menu1: '提前一天预订',
        menu2: '22:00前',
        menu3: '23:00前',
        menu4: '24:00前',
        menu5: '不限时间'
      },
      time1: {
        menu1: '1:00',
        menu2: '2:00',
        menu3: '3:00',
        menu4: '4:00',
        menu5: '5:00',
        menu6: '6:00',
        menu7: '7:00',
        menu8: '8:00',
        menu9: '9:00',
        menu10: '10:00',
        menu11: '11:00',
        menu12: '21:00',
        menu13: '13:00',
        menu14: '14:00',
        menu15: '15:00',
        menu16: '16:00',
        menu17: '17:00',
        menu18: '18:00',
        menu19: '19:00',
        menu20: '20:00',
        menu21: '21:00',
        menu22: '22:00',
        menu23: '23:00',
        menu24: '24:00'
      }
    }
  },
  created () {
    this.getBaseData()
  },
  methods: {
    setPrice(){
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/reserveInfo',this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'setPrice',
          query: {
            params: this.$route.query.params
          }
        })
      })
    },
      reduceMax() {
        if(this.baseInfo.maxReserveDay < 2 || this.baseInfo.maxReserveDay === this.baseInfo.minReserveDay){
          return
        }
        this.baseInfo.maxReserveDay--
      },
    addMax() {
      this.baseInfo.maxReserveDay++
    },
    reduceMin() {
        if(this.baseInfo.minReserveDay < 2){
            return
        }
        this.baseInfo.minReserveDay--
    },
    addMin() {
          if(this.baseInfo.maxReserveDay === this.baseInfo.minReserveDay) {
              return
          }
      this.baseInfo.minReserveDay++
    },
    reducePerson() {
        if(this.baseInfo.housePersonNumber < 2) {
            return
        }
        this.baseInfo.housePersonNumber--
    },
    addPerson() {
      this.baseInfo.housePersonNumber++
    },
    confirm4(menuKey,menuItem) {
          this.baseInfo.checkOutTime = menuItem
    },
    confirm3(menuKey,menuItem){
      this.baseInfo.checkInTimeFront = menuItem
    },
    confirm2(menuKey,menuItem){
      this.baseInfo.nowReserveTime = menuItem
    },
    confirm1(menuKey,menuItem) {
      this.baseInfo.ubscribeCommentsId = menuItem.id
      this.baseInfo.ubscribeComments.map((item)=>{
          if(item.id === menuItem.id) {
              item.isSelected = 1
          } else {
            item.isSelected = 0
          }
      })
    },
      getBaseData() {
          this.$http.fetchGet('/merchant/room/get/reserveInfo',{roomId: this.$route.query.params.id}).then((res)=>{
            this.baseInfo = res.data.data
            this.baseInfo.id = this.$route.query.params.id
            this.baseInfo.ubscribeComments.map((item)=>{
                item.label = item.text
            })
            this.baseInfo.workPrice == 0 ? this.baseInfo.workPrice = '' : this.baseInfo.workPrice
            this.baseInfo.holidayPrice == 0 ? this.baseInfo.holidayPrice = '' : this.baseInfo.holidayPrice
          })
      },
    getBack () {
      this.$router.replace({
        name: 'secondStep',
        query: {
          params: this.$route.query.params
        }
      })
    },
    getNextStep () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/reserveInfo',this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'fourthStep',
          query: {
            params: this.$route.query.params
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .thirdStep {
        width: 100%;
        height: 100%;
        background: rgb(247, 247, 247);
        display: flex;
        flex-direction: column;
        text-align: left;
    }


    .steps {
        height: 0.08rem;
        background: #efefef;
        display: flex;
        justify-content: flex-start;
        span {
            width: 75%;
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
        .selectLine {
            height: 0.72rem;
            background: #fff;
            padding: 0 0.2rem;
            .deraultLine_con {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 0.28rem;
                    color: #353535;
                }
                .info {
                    align-items: center;
                    display: flex;
                }
            }
        }
        .menberPersons {
            padding: 0 0.2rem;
            background: #fff;
            height: 0.72rem;
            .menberPersons_con {
                display: flex;
                justify-content: space-between;
                height: 0.72rem;
                align-items: center;
                span {
                    font-size: 0.28rem;
                }
                .menbers {
                    display: flex;
                    align-items: center;
                    svg:first-child {
                        margin-right: 0.1rem;
                    }
                    .persons {
                        width: 0.6rem;
                        text-align: center;
                        margin-right: 0.1rem;
                    }
                }
            }
        }
        .td {
            padding: 0.1rem 0.2rem 0 0.2rem;
            background: #fff;
            .tit {
                display: flex;
                justify-content: space-between;
                padding: 0.1rem 0;
                span:first-child {
                    font-size: 0.28rem;
                }
                span:last-child {
                    font-size: 0.28rem;
                    color: #1aad19;
                }
            }
            .tips {
                font-size: 0.24rem;
                color: #9b9b9b;
                padding-bottom: 0.1rem;
            }
            .tdzc {
                font-size: 0.24rem;
                padding-bottom: 0.2rem;
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
</style>
<style>
    .thirdStep .weui-cells:before {
        border-top: none;
        height: 0;
    }

    .thirdStep .weui-cells:after {
        border-bottom: none;
    }

    .thirdStep .weui-cell {
        padding: 0;
    }

    .thirdStep .inputLine .weui-input {
        height: 0.52rem;
        font-size: 0.24rem;
    }

    .thirdStep .weui-cells {
        margin-top: 0;
    }

    .menberPersons .vux-x-icon {
        fill: #19ad19;
    }
</style>
