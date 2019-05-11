<template>
  <div class="background_gray">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>驿站地址</span>
    </div>
    <div class="amap-page-container my_amap_container">
      <div class="serch">
        <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      </div>
      <el-amap
        vid="amapDemo"
        :center="center"
        :zoom="zoom"
        class="amap-demo"
        :events="events">
        <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <div  class="iconfont">
          <i class="iconfont icon-dingweiweizhi"></i>
        </div>
        <div class="address_text">
          <div class="text-ellipsis" style="color: #000; font-size: 0.28rem;">{{address}}</div>
          <div class="text-ellipsis">{{address}}</div>
        </div>
      </div>
    </div>

    <div class="my_bottom">
      <div @click="addAddress" class="addAddress">
        添加该地址
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function () {
    let self = this
    return {
      zoom: 20,
      center: [116.397477, 39.908692],
      searchOption: {
        city: '全国',
        citylimit: true
      },
      marker: {
        position: [116.397477, 39.908692]
      },
      address: '',
      events: {
        click (e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.marker.position = [lng, lat]
          // 这里通过高德 SDK 完成。
          self.getAddress(lng, lat)
        }
      },
      lng: 0,
      lat: 0,
      oldParams: null
    }
  },
  mounted () {
    let query = this.$route.query
    this.oldParams = query.params
    console.log(this.$route.query)
    if (query.params) {
      if (query.params.postLongitude && query.params.postLatitude) {
        this.getAddress(query.params.postLongitude, query.params.postLatitude)
      }
      this.address = query.params.postLocation
    }
  },
  methods: {
    getBack () {
      this.$router.replace({
        name: 'editHotel',
        query: {
          params: this.oldParams
        }
      })
    },
    addAddress () {
      this.oldParams.postLongitude = this.lng
      this.oldParams.postLatitude = this.lat
      this.oldParams.postLocation = this.address
      this.$router.replace({
        name: 'editHotel',
        query: {
          params: this.oldParams
        }
      })
    },

    getAddress (lng, lat) {
      this.lng = lng
      this.lat = lat
      this.center = [lng, lat]
      this.marker.position = [lng, lat]
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      let that = this
      geocoder.getAddress([lng, lat], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
            that.address = result.regeocode.formattedAddress
            console.log(lng, lat)
            that.$nextTick()
          }
        }
      })
    },
    onSearchResult (pois) {
      var lng = pois[0].lng
      var lat = pois[0].lat
      this.getAddress(lng, lat)
    }
  }
}
</script>

<style lang="less">
  @import "../../assets/css/main.less";
  .my_amap_container{
    flex:1;
  .serch{
    background: #fff;
    width:100%;
    height:auto;
    position: relative;
    display: flex;
    padding :0.24rem 0.4rem;
  }
  .el-vue-search-box-container{
    position: relative;
    height: 0.6rem;
    flex:1;
    top:0;
    left:0;
    font-size:0.28rem;
  .search-box-wrapper {
    background: rgb(239, 239, 239);
  input {
    height: 100%;
    background: rgb(239, 239, 239);
    font-size: 0.28rem;
  }
  .search-btn {
    width: 1rem;
  }
  }
  .search-tips {
    width: 100%;
  li {
    height: 0.6rem;
    font-size: 0.28rem;
    color: #666;
    line-height: 0.6rem;
  }
  }
  }

  }
  .el-vue-amap-container.amap-demo{
    width: 100%;
    height: calc(100% - 1.08rem);
    position: relative;
    font-size:0.28rem;
  }
  .toolbar{
    position: absolute;
    bottom: 0;
    left:0;
    height: 1.2rem;
    background: #fff;
    width:100%;
    font-size:0.28rem;
    text-align: center;
    display: flex;
  .iconfont{
    flex:1;
    height: 100%;
    text-align: right;
  i{
    font-size:0.4rem;
    line-height:1rem;
    color: rgb(229,84,76);;
  }
  padding-right: 0.1rem;
  }
  .address_text{
    flex: 2;
    height:100%;
    text-align: left;
    font-size: 0.28rem;
    padding-top: 0.15rem;
  .text-ellipsis{
    width: 5.4rem;
    color:rgb(155,155,155);
    font-size: 0.24rem;
  }
  }
  }
  .search-box {
    position: absolute;
    top: 25px;
    left: 20px;
  }
  .amap-page-container {
    position: relative;
  }
  .my_bottom{
  .addAddress{
    background: rgb(229,84,76);
    height: 1rem;
    width:100%;
    color: #fff;
    line-height:1rem;
    font-size:  0.28rem;
  }
  }

</style>
