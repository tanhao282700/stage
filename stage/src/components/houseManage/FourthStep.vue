<template>
  <div class="fourthStep">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>第四步：上传照片</span>
      <span @click="getBack" class="right headericon icon iconfont">&#xe61a;</span>
    </div>
    <div class="steps">
      <span></span>
    </div>
    <div class="con">
      <div class="title">
        <span>终于！还差最后一步</span>
        <span>请上传至少5张房源美照，它们将成为您房源最动人的宣传。建议您使用原图，效果更好哦</span>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(0)" class="lineTitle avater">
            <span>封面</span>
            <span>+</span>
          </div>
          <!--<div class="tips">封面有且只能上传1张照片，建议使用或卧室横图</div>-->
          <div class="imgs" v-if="baseInfo.imagesInfo[0].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[0].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(0,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(1)" class="lineTitle avater">
            <span>卧室</span>
            <span>+</span>
          </div>
          <div class="imgs" v-if="baseInfo.imagesInfo[1].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[1].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(1,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(2)" class="lineTitle avater">
            <span>客厅</span>
            <span>+</span>
          </div>
          <div class="imgs" v-if="baseInfo.imagesInfo[2].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[2].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(2,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(3)" class="lineTitle avater">
            <span>厨房</span>
            <span>+</span>
          </div>
          <div class="imgs" v-if="baseInfo.imagesInfo[3].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[3].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(3,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(4)" class="lineTitle avater">
            <span>卫浴</span>
            <span>+</span>
          </div>
          <div class="imgs" v-if="baseInfo.imagesInfo[4].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[4].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(4,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titlePic">
        <div class="titlePic_con vux-1px-b">
          <div @click="imagechanged(5)" class="lineTitle avater">
            <span>其他</span>
            <span>+</span>
          </div>
          <div class="imgs" v-if="baseInfo.imagesInfo[5].imageItems.length>0">
            <div class="pics" v-for="(item,index) in baseInfo.imagesInfo[5].imageItems">
              <img v-if="item.type==0" class="previewer-demo-img" :src="item.url" alt="">
              <img v-if="item.type==1" class="previewer-demo-img" :src="item.videoCoverImage" alt="">
              <span @click="deletePic(5,index)" class="deleteBtn icon iconfont">&#xe61e;</span>
            </div>
          </div>
        </div>
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
    name: 'fourthStep',
    components: {
      VueCoreImageUpload
    },
    data () {
      return {
        uploadUrl: 'http://zayzsh.zbtdvip.com/api/merchant/good/add/goods/baseInfo',
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        baseInfo: {
          imagesInfo: [{imageItems: []},{imageItems: []},{imageItems: []},{imageItems: []},{imageItems: []},{imageItems: []}]
        }
      }
    },
    created () {
      this.getBaseData()
    },
    methods: {
      sendData(status){
        this.$vux.loading.show({
          text: '加载中...'
        })
        let tips = ''
        if(status == 0) {
          tips = '房源信息保存成功'
        } else {
          tips = '房源发布成功'
        }
        this.baseInfo.operate = status
        this.$http.fetchPost("/merchant/room/add/imageInfo",this.baseInfo).then((res)=>{
          this.$vux.loading.hide()
          if(res.data.code == 200) {
            this.$vux.toast.show({
              text: tips,
              position: 'middle'
            })
            if(status == 0) {
              this.$store.state.tabIndex = 3
            } else {
              this.$store.state.tabIndex = 2
            }
            this.$router.go(-1)
          } else{
            this.$vux.toast.show({
              text: res.data.message,
              position: 'middle',
              type: 'warn'
            })
          }
        })
      },
      deletePic(parentIndex,index){
        this.baseInfo.imagesInfo[parentIndex].imageItems.splice(index,1)
      },
      getBaseData() {
        this.$http.fetchGet('/merchant/room/get/imageInfo', {roomId: this.$route.query.params.id}).then((res)=> {
          this.baseInfo = res.data.data
        })
      },
      getBack () {
        this.$router.replace({
          name: 'thirdStep',
          query: {
            params: this.$route.query.params
          }
        })
      },
      imagechanged (index) {
        //            1、1：成功 0：失败 successType
//            2、提示信息 info
//            3、图片地址 imagePath
//            4、1：视频 0：图片 selectType

        let that = this
        window.optionPictures = function(data){
          if(data.successType == 1) {
            let params = {}
            if(data.selectType == 0) {
              params = {
                type: data.selectType,
                url: data.imagePath
              }
            } else {
              params = {
                type: data.selectType,
                url: data.imagePath,
                videoCoverImage: data.videoCoverImage
              }
            }
            that.baseInfo.imagesInfo[index].imageItems.push(params)
          } else {
            that.$vux.toast.show({
              text: data.info,
              position: 'middle',
              type: 'warn'
            })
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .fourthStep {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
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
      width: 100%;
      background: #19ad19;
    }
  }
  .bottom {
    height: 0.96rem;
    display: flex;
    align-items: center;
    text-align: center;
    span:first-child {
      flex: 1;
      height: 100%;
      color: #1aad19;
      font-size: 0.32rem;
      line-height: 0.96rem;
    }
    span:last-child {
      flex: 1;
      height: 100%;
      color: #fff;
      background: #1aad19;
      font-size: 0.32rem;
      line-height: 0.96rem;
    }
  }
  .con {
    flex: 1;
    overflow: auto;
    .title {
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
    .titlePic {
      padding: 0 0.2rem;
      background: #fff;
      .titlePic_con {
        /*padding-bottom: 0.1rem;*/
        .lineTitle {
          height: 0.76rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:first-child {
            font-size: 0.28rem;
          }
          span:nth-child(2) {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 0.1rem;
            background: #bdbdbd;
            color: white;
            font-size: 0.5rem;
            line-height: 0.6rem;
            text-align: center;
          }
        }
        .tips {
          font-size: 0.24rem;
          color: #bdbdbd;
          padding-bottom: 0.1rem;
        }
        .imgs {
          padding: 0.1rem 0;
          .pics {
            position: relative;
            display: inline-block;
            width: 1.62rem;
            margin-left: 0.18rem;
            img {
              width: 1.6rem;
              border-radius: 0.1rem;
            }
            video {
              width: 1.6rem;
              height: 2.3rem;
            }
            &:nth-child(1),&:nth-child(5) {
              margin-left: 0;
            }
            &:nth-child(5),&:nth-child(6),&:nth-child(7) {
              margin-top: 0.16rem;
            }
            .deleteBtn {
              position: absolute;
              right: 0;
              top: -0.17rem;
              font-size: 0.34rem;
              color: #d7d7d7;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .avater{
    position: relative;
  }
  .avater .g-core-image-upload-btn{
    position: absolute;
    top: 0px;
    left:0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
