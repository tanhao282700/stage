<template>
<div class="editHotel">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>编辑驿站信息</span>
    </div>
    <div class="clearfix modal_main">
      <div class="setting_item avater">
        <span>驿站头像</span>
        <div class="info">
          <span><img :src="params.postHeadImage" alt=""></span>
          <x-icon type="ios-arrow-right" size="40"></x-icon>
        </div>

        <vue-core-image-upload
          :class="['btn', 'btn-primary']"
          :crop="false"
          @imageuploaded="imageuploaded"
          @imagechanged="imagechanged_avater"
          :isXhr="false"
          input-of-file="file"
          :max-file-size="5242880"
          :url="uploadUrl">
        </vue-core-image-upload>
      </div>

      <div class="setting_item">
        <group class="w_100">
          <x-input title="驿站名称" placeholder="请输入驿站名称" v-model="params.postName"></x-input>
        </group>
      </div>

      <div class="setting_item setting_item_big">
        <div class="w_100"><span>驿站地址</span></div>
        <div class="address">
          <group class="w_100 address_group">
            <x-input title="" placeholder="请输入驿站地址" v-model="params.postLocation"></x-input>
          </group>
            <i class="iconfont icon-dingweiweizhi" @click="goMap"></i>
        </div>
      </div>

      <div class="setting_item setting_item_big" style="height:3.6rem;">
        <div class="w_100"><span>驿站简介</span></div>
        <div class="address">
          <group class="w_100">
            <x-textarea :max="200" name="description" v-model="params.postDescription" placeholder="请输入驿站简介"></x-textarea>
          </group>
        </div>
      </div>

      <div class="setting_item setting_item_big" style="height:2.6rem;">
        <div class="w_100"><span>视频/图片</span></div>
        <div class="address">
          <div class="upload">
            <!-- <p>
              商品图片<span>(最多上传六张，建议使用横图)</span>
            </p> -->
            <div class="imgs">
              <div class="pics" v-for="(item,index) in params.imagesInfo">
                <img @click="show(index)" class="previewer-demo-img uploadPics" :src="item.url" alt="">
                <span @click="deletePic(index)" class="deleteBtn icon iconfont">&#xe61e;</span>
              </div>
              <div class="pics upload_button">
                <vue-core-image-upload
                  :class="['btn', 'btn-primary']"
                  :crop="false"
                  @imageuploaded="imageuploaded"
                  @imagechanged="imagechanged"
                  :isXhr="false"
                  input-of-file="file"
                  :max-file-size="5242880"
                  :url="uploadUrl">
                  <!--<img width="150" src="../../assets/images/test.png" />-->
                  <div class="pic_btn">
                    <span></span>
                    <span>上传照片</span>
                  </div>
                </vue-core-image-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="postData" class="bottom">保存</div>
    <div v-transfer-dom>
      <previewer :list="previewList" ref="previewer" :options="options"></previewer>
    </div>
</div>
</template>
<style lang="less" scoped>
@import "../../assets/css/main.less";
</style>
<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { XSwitch, Group, XButton, XInput, XTextarea, Previewer, TransferDom } from 'vux'
export default {
  name: 'Mine',
  directives: {
    TransferDom
  },
  components: {
    VueCoreImageUpload,
    Previewer,
    XTextarea,
    XSwitch,
    XInput,
    Group,
    XButton
  },
  data () {
    return {
      newMessage: true,
      params: {
        postName: '',
        postLocation: '',
        postLatitude: null,
        postLongitude: null,
        postDescription: '',
        postHeadImage: '',
        imagesInfo: []
      },
      images: [],
      previewList: [],
      uploadUrl: 'http://zayzsh.zbtdvip.com/api/merchant/good/add/goods/baseInfo',
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
  },
  mounted () {
    let query = this.$route.query
    console.log(query)
    if (query.params) {
      this.$vux.loading.hide()
      this.params = query.params
    } else {
      this.getDate()
    }
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },

    getDate () {
      let params = {
        merchantId: this.$store.state.merchantId,
        page: 1,
        pageSize: 10
      }
      this.$http.fetchGet('/merchant/post/get/main', params).then((res) => {
        setTimeout(() => {
        this.$vux.loading.hide()
      }, 500)
        this.params = res.data.data.postDetail
      })
    },

    postData () {
      this.$vux.loading.show({
        text: '加载中...'
      })
      let params = this.params
      console.log(params)
      this.$http.fetchPost('/merchant/post/update/merchantInfo', params).then((res) => {
          debugger
        this.$vux.loading.hide()
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '操作成功',
            position: 'middle'
          })
        } else {
          this.$vux.toast.show({
            text: res.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
      })
    },
    //    头像
    imagechanged_avater (data) {
      let param = new FormData() // 创建form对象
      param.append('files', data)// 通过append向form对象添加数据
      this.$http.fetchPost('/merchant/common/image/upload', param, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJBcoeGdBCguPERbU'
        }
      }).then((res) => {
        this.params.postHeadImage = res.data.data.path
      })
    },

    imageuploaded (res) {
      console.log(res)
    },
    imagechanged (data) {
      let param = new FormData() // 创建form对象
      param.append('files', data)// 通过append向form对象添加数据
      this.$http.fetchPost('/merchant/common/image/upload', param, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJBcoeGdBCguPERbU'
        }
      }).then((res) => {
        this.params.imagesInfo.push({
          url: res.data.data.path,
          //          资源类型【0-图片 1-视频】
          type: 0,
          videoCoverImage: ''
        })
        this.previewList.push({
          src: res.data.data.path,
          msrc: res.data.data.path
        })
      })
    },
    deletePic (index) {
      this.params.imagesInfo.splice(index, 1)
      this.previewList.splice(index, 1)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    goMap () {
      this.$router.replace({
        name: 'amap',
        query: {
          params: this.params
        }
      })
    }
  }
}
</script>
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
  .setting_item .weui-cell {
    padding: 0 0rem!important;
    width: 100%;
    box-sizing: border-box;
  }
  .setting_item  .weui-label {
    width: auto!important;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding-right: 0.4rem;
  }
  .setting_item  .weui-input {
    height: 1rem!important;
    line-height: 1rem!important;
    text-align: right;
    font-size: 0.28rem;
  }

  .setting_item_big .weui-cells textarea{
    text-align: left;
    height: 2.6rem!important;
    line-height: 0.5rem!important;
    font-size: 0.28rem;
  }
  .weui-textarea-counter{
    font-size: 0.24rem;
  }
  .setting_item  .weui-cell_select-after .weui-select {
    font-size: 0.28rem;
  }
  .setting_item_big .weui-cells input{
    text-align: left;
  }
  .setting_item_big .weui-cells::before{
    border: none;
  }
  .setting_item_big  .weui-cell__bd::before{
    border: none;
  }
  .setting_item_big  .weui-cells:after{
    border: none!important;
  }

  .setting_item  .weui_icon_clear{
    font-size: 0.28rem;
  }
  .setting_item .weui-cell_select .weui-cell__bd:after {
    height: 0.24rem!important;
    width: 0.24rem!important;
    top: 40%!important;
  }
  .setting_item  .weui-cells {
    margin-top: 0!important;
  }
</style>
