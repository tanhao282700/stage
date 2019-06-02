<template>
  <div class="background_gray">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>驿栈地址</span>
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
      } else {
          /*this.getCurrentPosition()*/
      }
      this.address = query.params.postLocation
    }
  },
  methods: {
    getCurrentPosition () {
      var mapObj = new AMap.Map('iCenter');
      mapObj.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
      })
      geolocation.getCurrentPosition(function(status,result){
          console.log(result)
      });
    },
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
