<template>
    <div class="houseAdd">
        <div class="iosHeader vux-1px-b">
            <span>第一步：基础信息</span>
            <span @click="getBack" class="right headericon icon iconfont">&#xe61a;</span>
        </div>
        <div class="steps">
            <span></span>
        </div>
        <div class="houseAdd_con">
            <div class="houseAddressTitle">
                <span>房屋位置</span>
                <span>请放心，为了保护您的隐私，在客人预定之前，我们不会展示您的门牌号码。</span>
            </div>
            <div class="address">
                <div class="tit">详细地址</div>
                <div @click="chooseAddress" class="addrIcon vux-1px-b">
                    <span v-text="baseInfo.detailAddress"></span>
                    <span class="icon iconfont">&#xe62e;</span>
                </div>
                <div class="tit">楼、单元、门牌号</div>
                <div class="addrIcon houseAddAttrArea vux-1px-b">
                    <group>
                        <x-textarea placeholder="请填写您的门牌号，此信息只对预定的客人展示" :show-counter="true" :max="20" v-model="baseInfo.houseNumber"></x-textarea>
                    </group>
                </div>
            </div>
            <div class="defaultTitle">房型信息</div>
            <div class="defaultLine">
                <div @click="isShow1=true" class="deraultLine_con vux-1px-b">
                    <span>驿站类型</span>
                    <div class="info">
                        <span v-text="baseInfo.roomTypeInfo[0].isSelected ? baseInfo.roomTypeInfo[0].name : '请选择'"></span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="defaultLine">
                <div class="deraultLine_con vux-1px-b">
                    <span>整套户型</span>
                    <div class="info">
                        <!--<span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>-->
                    </div>
                </div>
            </div>
          <div class="addLine">
            <div class="childLine">
              <div class="nums">
                <x-icon @click="reduce(1)" type="ios-minus" size="60"></x-icon>
                <span v-text="baseInfo.apartmentInfo[0].room_quantity" class="persons"></span>
                <x-icon @click="adder(1)" type="ios-plus" size="60"></x-icon>
              </div>
              <div class="types">室</div>
            </div>
            <div class="childLine">
              <div class="nums">
                <x-icon @click="reduce(2)" type="ios-minus" size="60"></x-icon>
                <span v-text="baseInfo.apartmentInfo[0].office_quantity" class="persons"></span>
                <x-icon @click="adder(2)" type="ios-plus" size="60"></x-icon>
              </div>
              <div class="types">厅</div>
            </div>
            <div class="childLine">
              <div class="nums">
                <x-icon @click="reduce(3)" type="ios-minus" size="60"></x-icon>
                <span v-text="baseInfo.apartmentInfo[0].kitchen_quantity" class="persons"></span>
                <x-icon @click="adder(3)" type="ios-plus" size="60"></x-icon>
              </div>
              <div class="types">厨</div>
            </div>
            <div class="childLine">
              <div class="nums">
                <x-icon @click="reduce(4)" type="ios-minus" size="60"></x-icon>
                <span v-text="baseInfo.apartmentInfo[0].toilet_quantity" class="persons"></span>
                <x-icon @click="adder(4)" type="ios-plus" size="60"></x-icon>
              </div>
              <div class="types">卫</div>
            </div>
          </div>
            <div class="defaultTitle">整套面积（平米）</div>
            <div class="defaultLine vux-1px-b">
                <div @click="getEquipment" class="deraultLine_con">
                    <span>房间设施</span>
                    <div class="info">
                        <span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="defaultLine vux-1px-b">
                <div @click="isShow2=true" class="deraultLine_con">
                    <span>床型</span>
                    <div class="info">
                        <span v-text="baseInfo.bedModelInfo[0].isSelected ? baseInfo.bedModelInfo[0].name : '请选择'">请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="selectLine vux-1px-b">
                <div class="selectLineCon">
                    <span>卫生间</span>
                    <div class="info">
                        <span @click="chooseToilet(1)" :class="{'active':baseInfo.toiletStatus == 1}">独卫</span>
                        <span @click="chooseToilet(2)" :class="{'active':baseInfo.toiletStatus == 2}">公共</span>
                        <span @click="chooseToilet(3)" :class="{'active':baseInfo.toiletStatus == 3}">独卫+公共</span>
                    </div>
                </div>
            </div>
            <div class="selectLine">
                <div class="selectLineCon">
                    <span>厨房</span>
                    <div class="info">
                        <span @click="chooseKitchen(1)" :class="{'active':baseInfo.kitchenStatus == 1}">燃气灶</span>
                        <span @click="chooseKitchen(2)" :class="{'active':baseInfo.kitchenStatus == 2}">电磁炉</span>
                      <span @click="chooseKitchen(3)" :class="{'active':baseInfo.kitchenStatus == 3}">燃气灶+电磁炉</span>
                    </div>
                </div>
            </div>
            <div class="houseAddressTitle" style="background:#fff;">
                <span>定制项目</span>
                <span>可添加一些付费定制项目（如枕头、鲜花等），供客人下单时自助选择。定制的价格最终会加到房间的房费中。</span>
            </div>
            <div class="special" v-for="(item,index) in baseInfo.customProjectInfo">
                <div class="special_con">
                    <div class="image">
                        <img :src="item.image_path" alt="">
                    </div>
                    <div class="info">
                        <span v-text="item.title"></span>
                        <span v-text="'¥'+item.price"></span>
                    </div>
                  <span @click="deleteSpecial(index)" class="deleteBtn icon iconfont">&#xe61e;</span>
                </div>
            </div>
            <div @click="addSpecial" class="special_add">
                <span class="icon iconfont">&#xe600;</span>
                <span>添加</span>
            </div>
        </div>
        <div @click="goNextStep" class="bottom">下一步</div>
        <actionsheet class="myActionsheet"
                     v-model="isShow1"
                     :menus="menuList1"
                     :close-on-clicking-mask="false"
                     show-cancel
                     @on-click-menu="confirm1"
                     @on-click-mask="isShow1 = false">
        </actionsheet>
      <actionsheet class="myActionsheet"
                   v-model="isShow2"
                   :menus="menuList2"
                   :close-on-clicking-mask="false"
                   show-cancel
                   @on-click-menu="confirm2"
                   @on-click-mask="isShow2 = false">
      </actionsheet>
    </div>
</template>

<script>
import { XTextarea, Group, Actionsheet } from 'vux'
export default {
  name: 'houseAdd',
  components: {
    XTextarea,
    Group,
    Actionsheet
  },
  data () {
    return {
      value: '',
      baseInfo: {},
      isShow1: false,
      menuList1: [],
      isShow2: false,
      menuList2: []
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.getBaseInfo()
  },
  methods: {
      deleteSpecial(index){
          this.baseInfo.customProjectInfo.splice(index,1)
      },
    getEquipment() {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'houseEquipment',
          query: {
            params: {
              id: res.data.data.id
            }
          }
        })
      })
    },
    reduce (type) {
        if(type == 1) {
            if(this.baseInfo.apartmentInfo[0].room_quantity == 0) {
                return
            }
            this.baseInfo.apartmentInfo[0].room_quantity--
        }
      if(type == 2) {
        if(this.baseInfo.apartmentInfo[0].office_quantity == 0) {
          return
        }
        this.baseInfo.apartmentInfo[0].office_quantity--
      }
      if(type == 3) {
        if(this.baseInfo.apartmentInfo[0].kitchen_quantity == 0) {
          return
        }
        this.baseInfo.apartmentInfo[0].kitchen_quantity--
      }
      if(type == 4) {
        if(this.baseInfo.apartmentInfo[0].toilet_quantity == 0) {
          return
        }
        this.baseInfo.apartmentInfo[0].toilet_quantity--
      }
    },
    adder (type) {
      if(type == 1) {
        this.baseInfo.apartmentInfo[0].room_quantity++
      }
      if(type == 2) {
        this.baseInfo.apartmentInfo[0].office_quantity++
      }
      if(type == 3) {
        this.baseInfo.apartmentInfo[0].kitchen_quantity++
      }
      if(type == 4) {
        this.baseInfo.apartmentInfo[0].toilet_quantity++
      }
    },
    chooseToilet(status) {
        if(status == this.baseInfo.toiletStatus) {
          this.baseInfo.toiletStatus = 0
          return
        }
        this.baseInfo.toiletStatus = status
    },
    chooseKitchen(status) {
      if(status == this.baseInfo.kitchenStatus) {
        this.baseInfo.kitchenStatus = 0
        return
      }
      this.baseInfo.kitchenStatus = status
    },
    confirm1(menuKey,menuItem) {
        menuItem.isSelected = true
      this.baseInfo.roomTypeInfo = [menuItem]
      this.baseInfo.roomTypeId = menuItem.id
      this.isShow1 = false
    },
    confirm2(menuKey,menuItem) {
      menuItem.isSelected = true
      this.baseInfo.bedModelInfo = [menuItem]
      this.baseInfo.bedModelId = menuItem.id
      this.isShow1 = false
    },
    addSpecial () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'addSpecial',
          query: {
            params: {
              postLongitude: this.baseInfo.longitude,
              postLatitude: this.baseInfo.latitude,
              id: res.data.data.id
            }
          }
        })
      })
    },
    goNextStep () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'secondStep',
          query: {
            params: {
              postLongitude: this.baseInfo.longitude,
              postLatitude: this.baseInfo.latitude,
              id: res.data.data.id
            }
          }
        })
      })
    },
    getBack () {
      this.$router.go(-1)
    },
    chooseAddress () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
          name: 'houseMap',
          query: {
            params: {
              postLongitude: this.baseInfo.longitude,
              postLatitude: this.baseInfo.latitude,
              id: res.data.data.id
            }
          }
        })
      })
    },
    getBaseInfo () {
        let id = ''
        if(this.$route.query.params) {
            id = this.$route.query.params.id || ''
        }
        this.$http.fetchGet('/merchant/room/get/baseInfo',{roomId: id}).then((res)=>{
          setTimeout(() => {
            this.$vux.loading.hide()
          }, 500)
          this.baseInfo = res.data.data
          this.baseInfo.merchantId = this.$store.state.merchantId
          if(this.$route.query.params && this.$route.query.params.postLocation) {
              this.baseInfo.detailAddress = this.$route.query.params.postLocation
            this.baseInfo.latitude = this.$route.query.params.postLatitude
            this.baseInfo.longitude = this.$route.query.params.postLongitude
          }
          this.menuList1 = res.data.data.roomTypeInfo
          this.menuList1.map((item)=>{
              item.label = item.name
            if(item.isSelected){
              this.baseInfo.roomTypeInfo = [item]
              this.baseInfo.roomTypeId = item.id
            }
          })
          this.menuList2 = res.data.data.bedModelInfo
          this.menuList2.map((item)=>{
            item.label = item.name
            if(item.isSelected){
              this.baseInfo.bedModelInfo = [item]
              this.baseInfo.bedModelId = item.id
            }
          })

          let facilitiesInfo = []
          this.baseInfo.facilitiesInfo.map((item)=>{
              let flag = false
            let childList = []
              item.facilities.map((child)=>{
                    if(child.isSelected == 1){
                      flag = true
                      childList.push(child)
                    }
              })
            if(flag) {
                  item.facilities = childList
              facilitiesInfo.push(item)
            }
          })
          this.baseInfo.facilitiesInfo = facilitiesInfo


        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .houseAdd {
        width: 100%;
        height: 100%;
        background: rgb(247, 247, 247);
        display: flex;
        flex-direction: column;
        .houseAdd_con {
            flex: 1;
            overflow: auto;
        }
        .bottom {
            height: 0.96rem;
            line-height: 0.96rem;
            background: #19ad19;
            font-size: 0.3rem;
            color: white;
        }
    }



    .steps {
        height: 0.08rem;
        background: #efefef;
        display: flex;
        justify-content: flex-start;
        span {
            width: 25%;
            background: #19ad19;
        }
    }

    .houseAddressTitle {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 0.2rem;
        span {
            text-align: left;
            &:first-child {
                padding-top: 0.32rem;
                font-size: 0.28rem;
                font-weight: bold;
            }
            &:last-child {
                font-size: 0.24rem;
                color: #9b9b9b;
            }
        }
    }

    .address {
        background: #fff;
        text-align: left;
        padding: 0 0.2rem;
        .tit {
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.28rem;
        }
        .addrIcon {
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span:first-child {
                flex: 1;
                font-size: 0.28rem;
                padding-right: 0.1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            span:last-child {
                font-size: 0.3rem;
                color: #9b9a9b;
            }
        }
        .houseAddAttrArea {
            height: 0.6rem;
        }
    }

    .defaultTitle {
        padding: 0.36rem 0.2rem 0.2rem 0.2rem;
        font-size: 0.28rem;
        font-weight: bold;
        text-align: left;
    }
    .addLine {
      height: 0.72rem;
      background: #fff;
      padding: 0 0.2rem;
      display: flex;
      justify-content: space-around;
      .childLine {
        display: flex;
        align-items: center;
        .nums {
          display: flex;
          align-items: center;
          svg:first-child {
            margin-right: 0.1rem;
          }
          svg:last-child {
            margin-left: 0.1rem;
            margin-right: 0.1rem;
          }
        }
      }
    }

    .defaultLine {
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

    .selectLine {
        height: 0.9rem;
        background: #fff;
        padding: 0 0.2rem;
        .selectLineCon {
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
                span {
                    /*width: 1.08rem;*/
                    padding: 0 0.1rem;
                    height: 0.46rem;
                    text-align: center;
                    line-height: 0.46rem;
                    border: 1px solid #d7d7d7;
                    border-radius: 0.1rem;
                    font-size: 0.28rem;
                }
                span:first-child,span:nth-child(2) {
                    margin-right: 0.2rem;
                }
                .active {
                    color: white;
                    background: #19ad19;
                }
            }
        }
    }

    .special {
        height: 1.76rem;
        background: #fff;
        padding: 0.1rem 0.2rem;
        .special_con {
            height: 1.36rem;
            border: 1px solid #d7d7d7;
          border-radius: 0.1rem;
            display: flex;
            align-items: center;
          position: relative;
          .deleteBtn {
            position: absolute;
            right: 0;
            top: -0.17rem;
            font-size: 0.34rem;
            color: #d7d7d7;
          }
            .image {
              margin-left: 0.1rem;
                width: 1.8rem;
                height: 1.2rem;
                margin-right: 0.2rem;
                img {
                    width: 1.8rem;
                    height: 1.2rem;
                    border-radius: 0.1rem;
                }
            }
            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 1.2rem;
                justify-content: space-between;
                align-items: flex-start;
                span {
                    font-size: 0.28rem;
                }
                span:last-child {
                    color: #f24b45;
                }
            }
        }
    }
    .special_add {
        height: 1.16rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        span:first-child {
            font-size: 0.3rem;
            color: #19ad19;
            margin-right: 0.1rem;
        }
        span:last-child {
            font-size: 0.28rem;
        }
    }
</style>
<style>
    .houseAddAttrArea > div {
        width: 100%;
        height: 100%;
    }

    .houseAddAttrArea > div .weui-cells {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .houseAddAttrArea > div .weui-cells .weui-cell {
        padding: 0;
        width: 100%;
        height: 100%;
    }

    .houseAddAttrArea .weui-cell .weui-cell__bd {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 0.24rem;

    }

    .houseAddAttrArea .weui-cell .weui-cell__bd .weui-textarea {
        width: 100%;
        height: 100%;
        font-size: 0.24rem;
      line-height: 0.6rem;
    }
    .houseAdd .vux-x-icon {
      fill: #19ad19;
    }
</style>
