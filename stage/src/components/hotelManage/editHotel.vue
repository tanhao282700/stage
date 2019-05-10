<template>
<div class="editHotel">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="headericon headericon_left" type="ios-arrow-left" size="60"></x-icon>
      <span>编辑驿站信息</span>
    </div>
    <div class="clearfix">
      <div class="setting_item">
        <span>驿站头像</span>
        <div class="info">
          <span><img src="../../assets/images/test.png" alt=""></span>
          <x-icon type="ios-arrow-right" size="40"></x-icon>
        </div>
      </div>

      <div class="setting_item">
        <group class="w_100">
          <x-input title="驿站名称" placeholder="请输入驿站名称" v-model="params.title"></x-input>
        </group>
      </div>

      <div class="setting_item setting_item_big">
        <div class="w_100"><span>驿站地址</span></div>
        <div class="address">
          <group class="w_100 address_group">
            <x-input title="" placeholder="请输入驿站地址" v-model="params.address"></x-input>
          </group>
            <i class="iconfont icon-dingweiweizhi"></i>
        </div>
      </div>

      <div class="setting_item setting_item_big" style="height:3.6rem;">
        <div class="w_100"><span>驿站简介</span></div>
        <div class="address">
          <group class="w_100">
            <x-textarea :max="200" name="description" v-model="params.description" placeholder="请输入驿站简介"></x-textarea>
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
              <div class="pics" v-for="(item,index) in images">
                <img @click="show(index)" class="previewer-demo-img uploadPics" :src="item" alt="">
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
import { XSwitch, Group, XButton, XInput, XTextarea, Previewer, TransferDom} from 'vux'
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
        title: '',
        address: '',
        description: ''
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
  methods: {
    getBack () {
      this.$router.go(-1)
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
        this.images.push(res.data.data.path)
        this.previewList.push({
          src: res.data.data.path,
          msrc: res.data.data.path
        })
      })
    },
    deletePic (index) {
      this.images.splice(index, 1)
      this.previewList.splice(index, 1)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
  }
}
</script>
<style>
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
