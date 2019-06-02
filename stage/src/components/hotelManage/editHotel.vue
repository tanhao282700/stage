<template>
<div class="editHotel">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>编辑驿栈信息</span>
    </div>
    <div class="clearfix modal_main">
      <div class="setting_item avater">
        <span>驿栈头像</span>
        <div class="info">
          <span><img :src="params.postHeadImage" alt=""></span>
          <x-icon type="ios-arrow-right" size="40"></x-icon>
        </div>
        <div v-if="params.dataStatus == 1" class="shadow"></div>
        <vue-core-image-upload
          :class="['btn', 'btn-primary']"
          :crop="false"
          @imageuploaded="imageuploaded"
          @imagechanged="imagechanged_avater"
          :isXhr="false"
          :inputAccept="'image/*'"
          :max-file-size="3145728"
          :url="uploadUrl">
        </vue-core-image-upload>
      </div>

      <div class="setting_item">
        <group class="w_100">
          <x-input title="驿栈名称" :disabled="params.dataStatus == 1" placeholder="请输入驿站名称" v-model="params.postName"></x-input>
        </group>
      </div>

      <!--<div class="coupon vux-1px-b">
        <span>审核状态</span>
        <div>
          <span v-if="params.dataStatus == 0">初始状态</span>
          <span v-if="params.dataStatus == 1">待审核</span>
          <span v-if="params.dataStatus == 2">审核通过</span>
          <span v-if="params.dataStatus == 3">审核拒绝</span>
        </div>
      </div>-->

      <div class="setting_item setting_item_big">
        <div class="w_100"><span>驿栈地址</span></div>
        <div class="address" @click="goMap">
          <group class="w_100 address_group">
            <x-input disabled placeholder="请输入驿站地址" v-model="params.postLocation"></x-input>
          </group>
            <i class="iconfont icon-dingweiweizhi"></i>
        </div>
      </div>

      <div class="setting_item setting_item_big" style="height:3.6rem;">
        <div class="w_100"><span>驿栈简介</span></div>
        <div class="address">
          <group class="w_100">
            <x-textarea :disabled="params.dataStatus == 1" :max="200" name="description" v-model="params.postDescription" placeholder="请输入驿站简介"></x-textarea>
          </group>
        </div>
      </div>

      <div class="setting_item setting_item_big" style="position: relative;height:2.6rem;">
        <div v-if="params.dataStatus == 1" class="shadow"></div>
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
                  :inputAccept="'image/*'"
                  :max-file-size="3145728"
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
      if(this.params.dataStatus == 1) {
        this.$vux.toast.show({
          text: '正在审核中，请审核后再尝试修改',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      let params = this.params
      console.log(params)
      this.$http.fetchPost('/merchant/post/update/merchantInfo', params).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 200) {
          this.$vux.toast.show({
            text: '保存成功',
            position: 'middle'
          })
          this.$router.go(-1)
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
        if(this.params.dataStatus == 1) {
          this.$vux.toast.show({
            text: '正在审核中，请审核后再尝试修改',
            position: 'middle',
            type: 'warn'
          })
          return
        }
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
<style lang="less" scoped>
  @import "../../assets/css/main.less";
  .coupon {
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    height: 0.92rem;
    align-items: center;
    font-size: 0.28rem;
    color: #353535;
  svg {
    width: 0.48rem;
    height: 0.48rem;
  }
  div {
    display: flex;
    align-items: center;
  }
  }
</style>
<style>

.avater{
    position: relative;
  }
.shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
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
