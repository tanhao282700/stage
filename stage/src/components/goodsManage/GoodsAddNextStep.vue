<template>
  <div class="nextStep">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>添加商品</span>
    </div>
    <div class="con">
      <div class="title">商品详情</div>
      <div class="items" v-for="(item,index) in dataList">
        <div v-if="item.type === 0" class="txtArea child">
          <textarea v-model="item.text" placeholder="请输入文字"></textarea>
          <span @click="deleteInfo(index)" class="myIcon icon iconfont">&#xe61e;</span>
        </div>
        <div v-if="item.type === 1" class="picArea child">
          <span @click="deleteInfo(index)" class="myIcon icon iconfont">&#xe61e;</span>
          <div class="pic_con">
            <div @click="imagechanged(index)" class="pic_btn">
              <span v-if="!item.url"></span>
              <span v-if="!item.url">上传照片</span>
              <img v-if="item.url" class="realPic" :src="item.url" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="addBtn">
        <span @click="addLines(1)" class="icon iconfont">&#xe600;</span>
        <span @click="addLines(1)" style="margin-right: 0.3rem;">添加图片</span>
        <span @click="addLines(2)" class="icon iconfont">&#xe600;</span>
        <span @click="addLines(2)">添加文字</span>
      </div>
    </div>
    <div class="bottom">
      <span @click="sendData(0)">保存但不发布</span>
      <span @click="sendData(1)">立即发布</span>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  name: 'goodsAddNextStep',
  components: {
    VueCoreImageUpload
  },
  data () {
    return {
      uploadUrl: 'http://zayzsh.zbtdvip.com/api/merchant/good/add/goods/baseInfo',
      images: '',
      dataList: [{
        text: '',
        type: 0
      }, {
        url: '',
        type: 1
      }]
    }
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    imagechanged (index) {
      //            1、1：成功 0：失败 successType
//            2、提示信息 info
//            3、图片地址 imagePath
//            4、1：视频 0：图片 selectType
      let that = this
      window.optionPictures = function(data){
        if (data.selectType == 1) {
          this.$vux.toast.show({
            text: '请上传图片',
            position: 'middle',
            type: 'warn'
          })
        } else {
          if(data.successType == 1) {
            that.images = data.imagePath
            that.dataList[index].url = data.imagePath
          } else {
            that.$vux.toast.show({
              text: data.info,
              position: 'middle',
              type: 'warn'
            })
          }
        }
        let ua = navigator.userAgent.toLowerCase();
        //Android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //Ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          window.webkit.messageHandlers.onHideDialog.postMessage(null)
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          window.AndroidListener.onHideDialog()
        }
      }
      let ua = navigator.userAgent.toLowerCase();
      //Android终端
      let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
      //Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        window.webkit.messageHandlers.selectPicture.postMessage(null)
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //Android终端
        window.AndroidListener.selectPicture()
      }
    },
    addLines (type) {
        if(type == 1) {
          this.dataList.push({
            url: '',
            type: 1
          })
        } else {
          this.dataList.push({
            text: '',
            type: 0
          })
        }
    },
    deleteInfo (index) {
      this.dataList.splice(index, 1)
    },
    sendData (type) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/good/add/goods/detailInfo', {id: this.$route.query.id, operate: type, detailsList: this.dataList}).then((res) => {
        this.$vux.loading.hide()
          if (res.data.code === 200) {
          let txt = ''
          if (type === 0) {
            txt = '商品保存成功'
          } else {
            txt = '商品发布成功'
          }
          this.$vux.toast.show({
            text: txt,
            position: 'middle'
          })
          this.$router.go(-3)
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    getData () {
      this.$http.fetchGet('/merchant/good/get/detail', {goodId: this.$route.query.id}).then((res) => {
        this.dataList = res.data.data.detailsList
      })
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .nextStep {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .con {
    flex: 1;
    overflow: auto;
    font-size: 0.28rem;
    .title {
      height: 0.84rem;
      line-height: 0.84rem;
      background: #fff;
      padding: 0 0.2rem;
      text-align: left;
    }
    .myIcon {
      color: #19ad19;
      font-size: 0.4rem;
      position: absolute;
      right: 0;
      top: -0.2rem;
      z-index: 9;
    }
    .items {
      padding: 0 0.2rem;
      background: #fff;
      .txtArea {
        height: 3rem;
        width: 100%;
        border: 1px solid #d7d7d7;
        border-radius: 0.1rem;
        position: relative;
        padding: 0.2rem;
        textarea {
          width: 100%;
          height: 100%;
          border: none;
          font-size: 0.28rem;
        }
      }
      .picArea {
        height: 3rem;
        width: 100%;
        border: 1px solid #d7d7d7;
        border-radius: 0.1rem;
        position: relative;
        padding: 0.2rem;
        .pic_con {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          .btn-primary {
            width: 100%;
            height: 100%;
          }
          .pic_btn {
            width: 100%;
            height: 100%;
            border: none;
            span:first-child {
              background: url(../../../static/camera.png) no-repeat center center/100% 100%!important;
            }
            .realPic {
              width: 100%;
              height: 100%;
              border-radius: 0.1rem;
            }
          }
        }
      }
      padding-bottom: 0.4rem;
    }
    .addBtn {
      background: #fff;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #19ad19;
        font-size: 0.4rem;
        margin-right: 0.1rem;
      }
      span:last-child {
        font-size: 0.28rem;
      }
    }
  }
  .bottom {
    height: 0.96rem;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    span:first-child {
      background: #fff;
      color: #1aad19;
      flex: 1;
      height: 0.96rem;
      line-height: 0.96rem;
    }
    span:last-child {
      background: #19ad19;
      color: white;
      flex: 1;
      height: 100%;
      line-height: 0.96rem;
    }
  }
</style>
