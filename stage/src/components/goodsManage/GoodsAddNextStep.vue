<template>
  <div class="nextStep">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headerIcon" type="ios-arrow-left" size="60"></x-icon>
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
            <vue-core-image-upload
              :class="['btn', 'btn-primary']"
              :crop="false"
              @imagechanged="imagechanged(index)"
              :isXhr="false"
              input-of-file="file"
              :max-file-size="5242880"
              :url="uploadUrl">
              <div class="pic_btn">
                <span v-if="!item.url"></span>
                <span v-if="!item.url">上传照片</span>
                <img v-if="item.url" class="realPic" :src="item.url" alt="">
              </div>
            </vue-core-image-upload>
          </div>
        </div>
      </div>
      <div @click="addLines" class="addBtn">
        <span class="icon iconfont">&#xe600;</span>
        <span>继续添加</span>
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
      let data = event.target.files[0]
      let param = new FormData() // 创建form对象
      param.append('files', data)// 通过append向form对象添加数据
      this.$http.fetchPost('/merchant/common/image/upload', param, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJBcoeGdBCguPERbU'
        }
      }).then((res) => {
        this.images = res.data.data.path
        this.dataList[index].url = res.data.data.path
      })
    },
    addLines () {
      this.dataList.push({
        text: '',
        type: 0
      })
      this.dataList.push({
        url: '',
        type: 1
      })
    },
    deleteInfo (index) {
      this.dataList.splice(index, 1)
    },
    sendData (type) {
      this.$http.fetchPost('/merchant/good/add/goods/detailInfo', {id: this.$route.query.id, operate: type, detailsList: this.dataList}).then((res) => {
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
          this.$router.go(-2)
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
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
  .iosHeader {
    width: 100%;
    height: 1.28rem;
    background: #fff;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 0.36rem;
    padding-bottom: 0.24rem;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    .headerIcon {
      position: absolute;
      left: 0.2rem;
      bottom: 0.14rem;
      font-size: 0.42rem;
      color: #000000;
    }
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
          position: relative;
          .btn-primary {
            width: 100%;
            height: 100%;
            .pic_btn {
              width: 100%;
              height: 100%;
              border: none;
              .realPic {
                width: 100%;
                height: 100%;
                border-radius: 0.1rem;
              }
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
