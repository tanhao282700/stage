<template>
  <div class="houseEquipment">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>房间设施</span>
    </div>
    <div class="con">
      <div class="items" v-for="(item,index) in baseInfo.facilitiesInfo">
        <div class="title" v-text="item.className"></div>
        <div class="child">
          <div class="equips" @click="choose(index,childIndex)" :class="{'active':child.isSelected == 1}" v-for="(child,childIndex) in item.facilities">
            <span v-text="child.name"></span>
            <span v-if="child.isSelected == 1" class="icon iconfont">&#xe672;</span>
          </div>
        </div>
      </div>
    </div>
    <div @click="saveData" class="bottom">保存</div>
  </div>
</template>

<script>
  export default {
    name: 'houseEquipment',
    components: {

    },
    data () {
      return {
        baseInfo: {}
      }
    },
    created () {
      this.getInfo()
    },
    methods: {
      choose(parentIndex,index) {
        if(this.baseInfo.facilitiesInfo[parentIndex].facilities[index].isSelected == 1){
          this.baseInfo.facilitiesInfo[parentIndex].facilities[index].isSelected = 0
          return
        }
        if(this.baseInfo.facilitiesInfo[parentIndex].facilities[index].isSelected == 0){
          this.baseInfo.facilitiesInfo[parentIndex].facilities[index].isSelected = 1
          return
        }
      },
      getBack() {
        this.$router.replace({
            name: 'houseAdd',
          query: this.$route.query
        })
      },
      getInfo() {
        this.$http.fetchGet('/merchant/room/get/baseInfo',{roomId: this.$route.query.params.id}).then((res)=>{
          this.baseInfo = res.data.data
        })
      },
      saveData() {
        this.$vux.loading.show({
          text: '加载中...'
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
        let room = []
        this.baseInfo.roomTypeInfo.map((item)=>{
            if(item.isSelected == 1) {
              this.baseInfo.roomTypeId = item.id
              room = [item]
              return
            }
        })
        this.baseInfo.roomTypeInfo = room
        this.baseInfo.facilitiesInfo = facilitiesInfo
        this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
          this.$vux.loading.hide()
          this.$router.replace({
            name: 'houseAdd',
            query: {
              params: {
                postLongitude: this.baseInfo.longitude,
                postLatitude: this.baseInfo.latitude,
                id: res.data.data.id
              }
            }
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

  .houseEquipment {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .con {
    flex: 1;
    overflow: auto;
    text-align: left;
    .items {
      padding: 0.2rem;
      background: #fff;
      .title {
        font-size: 0.28rem;
        padding-bottom: 0.1rem;
      }
      .child {
        display: flex;
        flex-wrap: wrap;
      }
      .equips {
        position: relative;
        padding: 0.2rem 0.2rem;
        border: 1px solid #d7d7d7;
        border-radius: 0.1rem;
        /*height: 0.74rem;*/
        width: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          position: absolute;
          font-size: 0.3rem;
          color: #19ad19;
          right: 0.02rem;
          bottom: -0.06rem;
        }
        margin-left: 0.2rem;
        margin-top: 0.2rem;
        &:nth-child(4n+1) {
          margin-left: 0;
        }
      }
      .active {
        border: 1px solid #19ad19;
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
