<template>
  <div class="goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>添加商品</span>
    </div>
    <div class="goodsAdd_con">
      <div class="upload">
        <p>
          商品图片<span></span>
        </p>
        <div class="imgs">
          <div class="pics" v-for="(item,index) in images">
            <img @click="show(index)" v-if="item.type == 0" class="previewer-demo-img uploadPics" :src="item.url" alt="">
            <img @click="show(index)" v-if="item.type == 1" class="previewer-demo-img uploadPics" :src="item.videoCoverImage" alt="">
            <span @click="deletePic(index)" class="deleteBtn icon iconfont">&#xe61e;</span>
          </div>
          <div class="pics upload_button">
            <!--<vue-core-image-upload
              :class="['btn', 'btn-primary']"
              :crop="false"
              @imageuploaded="imageuploaded"
              @imagechanged="imagechanged"
              :isXhr="false"
              :inputAccept="'image/*'"
              :max-file-size="3145728"
              :url="uploadUrl">-->
              <!--<img width="150" src="../../assets/images/test.png" />-->
              <div @click="imagechanged" class="pic_btn">
                <span></span>
                <span>上传照片</span>
              </div>
            </vue-core-image-upload>
          </div>
        </div>
      </div>
      <div class="defaultLine" style="margin-top: 0.2rem;">
        <group>
          <x-input :show-clear=false title="商品标题" placeholder="请输入商品标题" v-model="params.title"></x-input>
        </group>
      </div>
      <!--<div class="defaultLine">
        <group>
          <x-input type="number" title="商品成本价(元)" placeholder="请输入商品成本价" v-model="params.price"></x-input>
        </group>
      </div>-->
      <!--<div class="defaultLine">
        <group>
          <x-input type="number" title="商品库存" placeholder="请输入商品库存" v-model="params.stock"></x-input>
        </group>
      </div>-->
      <div class="defaultLine">
        <group>
          <selector :value-map="['id','name']" ref="defaultValueRef" placeholder="请选择商品类型" title="商品类型" direction="rtl" :options="goodsTypeList" v-model="goodsType"></selector>
        </group>
      </div>
      <div class="defaultTitle">
        <span>商品规格</span>
        <!--<span class="addIcon" v-if="specsDataList.length < specsList.length" @click="addSpecial"></span>-->
      </div>
      <div class="specialLine" v-for="(item,index) in specsDataList">
        <div class="selectLine">
            <!--<selector @on-change="specsChange" ref="defaultValueRef" placeholder="请选择" title="规格名" direction="rtl" :value-map="['attrId','attrName']" :options="item.specsList" v-model="item.name"></selector>-->
          <span class="tit">规格名</span>
          <select @change="specsChange" v-model="item.specsValue" name="" id="">
              <option :disabled="item.isReadonly" v-for="item in specsList" v-text="item.attrName" :value="item.attrId"></option>
            </select>
          <div class="icon">
            <x-icon type="ios-arrow-right" size="30"></x-icon>
          </div>
        </div>
        <div class="defaultLine ggz" v-for="(child,childIndex) in item.value">
          <group>
            <x-input :show-clear=false title="规格值" placeholder="请输入规格值" v-model="child.attrValue"></x-input>
          </group>
          <span @click="deleteChildValue(index,childIndex)" v-if="item.value.length > 1" class="myIcon icon iconfont">&#xe61e;</span>
        </div>
        <div class="addLine">
          <div @click="addChildValue(index)">
            <span class="icon iconfont">&#xe600;</span>
            <span>添加规格</span>
          </div>
          <div @click="deleteSpecs(index)" v-if="specsDataList.length > 1" style="margin-left: 0.4rem;">
            <span class="icon iconfont">&#xe62a;</span>
            <span>删除</span>
          </div>
        </div>
      </div>
      <div style="height: 0.2rem;background: #fff;"></div>
      <div class="addLine" v-if="specsDataList.length < specsList.length" @click="addSpecial">
        <div>
          <span class="icon iconfont">&#xe600;</span>
          <span>添加规格项目</span>
        </div>
      </div>
      <div class="switchLine">
        <group>
          <x-switch title="支持退款" v-model="params.refundFlagValue"></x-switch>
        </group>
      </div>
      <div @click="getNextStep" class="bottom">下一步</div>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewList" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { Previewer, TransferDom, XInput, Group, Selector, XSwitch } from 'vux'
export default {
  name: 'goodsAdd',
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    VueCoreImageUpload,
    XInput,
    Group,
    Selector,
    XSwitch
  },
  data () {
    return {
      params: {
        imageList: [],
        goodsAttrItemDto: [],
        goodsAttrInfo: [], // 商品规格
        goodsClassInfo: [], // 商品类型
        id: '', // 记录id
        merchantId: '', // 商户id
        title: '', // 标题
        typeId: '', // 类型id
        refundFlagValue: true, // 是否支持退款
      },
      goodsType: '', // 商品类型
      specsList: [],
      specsDataList: [], // 商品规格操作数据
      goodsTypeList: [],
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      defaultValue: '',
      value: '',
      images: [],
      previewList: [],
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
      }
    }
  },
  methods: {
    getNextStep () {
      if (!this.params.title) {
        this.$vux.toast.show({
          text: '请输入商品标题',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if (this.params.title.length > 50) {
        this.$vux.toast.show({
          text: '商品标题不能超过50字',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      /*if (!this.params.price) {
        this.$vux.toast.show({
          text: '请输入商品成本价',
          position: 'middle',
          type: 'warn'
        })
        return
      }*/
      /*if (!this.params.stock) {
        this.$vux.toast.show({
          text: '请输入商品库存',
          position: 'middle',
          type: 'warn'
        })
        return
      }*/
      if (!this.goodsType) {
        this.$vux.toast.show({
          text: '请选择商品类型',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      let flag = true
      let flag2 = true
      this.specsDataList.map((item) => {
        if (!item.specsValue) {
          flag = false
          return
        }
        item.value.map((child) => {
          if (!child.attrValue) {
            flag = false
          }
          if (child.attrValue.length > 20) {
              flag2 = false
          }
        })
      })
      if (!flag) {
        this.$vux.toast.show({
          text: '请完善商品规格信息',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      if (!flag2) {
        this.$vux.toast.show({
          text: '商品规格值超出长度',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      // 图片
      this.images.map((item) => {
        this.params.imageList.push(item)
      })
      // 是否支持退款
      this.params.refundFlag = this.params.refundFlagValue ? 0 : 1
      // 商品类型数据
      this.goodsTypeList.map((item) => {
        if (item.id === this.goodsType) {
          item.isSelected = 1
          this.params.goodsClassInfo.push(item)
          this.params.typeId = item.id
        }
      })
      // 商品规格
      this.specsDataList.map((item) => {
        this.specsList.findIndex((obj, objIndex, child) => {
          if (item.specsValue === obj.attrId) {
            this.params.goodsAttrInfo.push({
              attrId: obj.attrId,
              attrName: obj.attrName,
              attrValueInfo: item.value
            })
          }
        })
      })
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$http.fetchPost('/merchant/good/add/goods/baseInfo', this.params).then((res) => {
        this.$vux.loading.hide()
        if (res.data.code === 200) {
          this.$router.push({
            path: 'goodSecondStep',
            query: {
              id: res.data.data.id
            }
          })
        } else {
          this.$vux.toast.show({
            text: req.data.message,
            position: 'middle',
            type: 'warn'
          })
        }
        /*this.$http.fetchGet('/merchant/good/get/goods/sku', {goodsId: res.data.data.id}).then((request) => {
          this.$vux.loading.hide()
            let param = request.data.data
          param.goodsSkuInfo[0].memberPrice = this.params.price
          param.goodsSkuInfo[0].stock = this.params.stock
          this.$http.fetchPost('/merchant/good/add/goods/sku', param).then((req) => {

          })
        })*/
      })
    },
    getPriceInfo (id) {
      this.$http.fetchGet('/merchant/good/get/goods/sku', {goodsId: this.$route.query.id}).then((res) => {
        this.params.stock = res.data.data.goodsSkuInfo[0].stock || ''
        this.params.price = res.data.data.goodsSkuInfo[0].memberPrice || ''
      })
    },
    addChildValue (index) {
      this.specsDataList[index].value.push({val: ''})
    },
    deleteChildValue (parentIndex, childIndex) {
      this.specsDataList[parentIndex].value.splice(childIndex, 1)
    },
    addSpecial () {
      if (this.specsDataList.length < this.specsList.length) {
        this.specsDataList.push({
          specsName: '',
          specsValue: '',
          value: [{
            val: ''
          }]
        })
      }
    },
    deleteSpecs (index) {
      this.specsDataList.splice(index, 1)
      this.specsChange()
    },
    specsChange () {
      this.specsList.map((item) => {
        let flag = false
        this.specsDataList.map((child) => {
          if (item.attrId === child.specsValue) {
            flag = true
          }
        })
        item.isReadonly = flag
      })
    },
    getBaseInfo () {
      this.$http.fetchGet('/merchant/good/get/goods/baseInfo', {goodsId: this.$route.query.id}).then((res) => {
        setTimeout(() => {
          this.$vux.loading.hide()
        }, 500)
          this.specsList = res.data.data.goodsAttrItemDto
        this.specsList.map((item, index) => {
          item.isReadonly = false
        })
        this.goodsTypeList = res.data.data.goodsClassInfo
        this.params.goodsAttrItemDto = res.data.data.goodsAttrItemDto

        this.params.title = res.data.data.title
        res.data.data.refundFlag === 0 ? this.params.refundFlagValue = true : this.params.refundFlagValue = false
        res.data.data.imageList.map((item) => {
          this.images.push(item)
        })
        res.data.data.goodsClassInfo.map((item) => {
          if (item.isSelected === 1) {
            this.goodsType = item.id
            this.params.goodsClassInfo.push(item)
          }
        })
        if (res.data.data.goodsAttrInfo.length > 0) {
          res.data.data.goodsAttrInfo.map((item) => {
            let childList = []
            item.attrValueInfo.map((child) => {
              childList.push(child)
            })
            console.log(item.attrId)
            this.specsDataList.push({
              specsName: item.attrName,
              specsValue: item.attrId,
              value: childList
            })
          })
          this.specsChange()
        } else {
          this.specsDataList.push({
            specsName: '',
            specsValue: '',
            value: [{
              attrValue: ''
            }]
          })
        }
      })
    },
    deletePic (index) {
      this.images.splice(index, 1)
      this.previewList.splice(index, 1)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    imageuploaded (res) {
      console.log(res)
    },
    imagechanged (data) {
      //            1、1：成功 0：失败 successType
//            2、提示信息 info
//            3、图片地址 imagePath
//            4、1：视频 0：图片 selectType
      let that = this
      window.optionPictures = function(data){
        if (data.selectType == 1) {
          if(data.successType == 1) {
            that.images.push({
                url: data.imagePath,
              //          资源类型【0-图片 1-视频】
              type: 1,
              videoCoverImage: data.videoCoverImage})
            that.previewList.push({
              src: data.imagePath,
              msrc: data.imagePath
            })
          } else {
            that.$vux.toast.show({
              text: data.info,
              position: 'middle',
              type: 'warn'
            })
          }
        } else {
          if(data.successType == 1) {
            that.images.push({url: data.imagePath, type: 0})
            that.previewList.push({
              src: data.imagePath,
              msrc: data.imagePath
            })
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
    getBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.params.id = this.$route.query.id
    this.params.merchantId = this.$store.state.merchantId
    this.getBaseInfo()
    /*if (this.$route.query.id) {
      this.getPriceInfo()
    }*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .goodsAdd {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .goodsAdd_con {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .bottom {
    height: 0.96rem;
    background: #19ad19;
    font-size: 0.32rem;
    color: white;
    text-align: center;
    line-height: 0.96rem;
  }
  .upload {
    padding: 0.1rem 0.2rem;
    background: #fff;
    p {
      text-align: left;
      font-size: 0.28rem;
      span {
        color: rgb(137,137,137);
      }
    }
    .imgs {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      padding: 0.1rem 0;
      text-align: left;
      /*display: flex;
      flex-wrap: wrap;*/
      .upload_button {
        display: inline-block;
        margin-left: 0.16rem;
      }
      .pics {
        position: relative;
        display: inline-block;
        width: 1.62rem;
        margin-left: 0.18rem;
        .uploadPics {
          width: 1.6rem;
          border-radius: 0.1rem;
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
  .defaultLine {
    height: 1rem;
  }
  .defaultTitle {
    height: 1rem;
    background: rgb(247,247,247);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    font-size: 0.28rem;
    .addIcon {
      border: 1px solid #e8e8e8;
      padding: 0.08rem 0.16rem;
    }
  }
  .ggz {
    position: relative;
    .myIcon {
      font-size: 0.4rem;
      position: absolute;
      right: 0;
      top: 0.16rem;
      color: #C8C8CD;
    }
  }
  .selectLine {
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 0.2rem;
    font-size: 0.28rem;
    position: relative;
    .tit {
      padding-right: 0.4rem;
    }
    select {
      direction: rtl;
      color: rgb(169, 169, 169);
      font-size: 0.28rem;
      padding-left: 0;
      -webkit-appearance: none;
      padding-right: 30px;
      border: 0;
      outline: 0;
      background-color: transparent;
      flex: 1;
      height: 44px;
      line-height: 44px;
      position: relative;
      z-index: 1;
    }
    .icon {
      position: absolute;
      right: -0.05rem;
      margin-top: 0.05rem;
      svg {
        width: 0.56rem;
        height: 0.56rem;
      }
      .vux-x-icon {
        fill: #C8C8CD;
      }
    }
  }
  .addLine {
    height: 0.76rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span:first-child,span:nth-child(3) {
      font-size: 0.3rem;
    }
    span:last-child {
      font-size: 0.24rem;
    }
  }
</style>
<style>
  .goodsAdd .weui-cell {
    padding: 0 0.2rem!important;
  }
  .goodsAdd .weui-label {
    width: auto!important;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.28rem;
    padding-right: 0.4rem;
  }
  .goodsAdd .weui-input {
    height: 1rem!important;
    line-height: 1rem!important;
    text-align: right;
    font-size: 0.28rem;
  }
  .goodsAdd .weui-cell_select-after .weui-select {
    font-size: 0.28rem;
  }
  .goodsAdd .weui-cell_select .weui-cell__bd:after {
    height: 0.24rem!important;
    width: 0.24rem!important;
    top: 40%!important;
  }
  .goodsAdd .weui-cells {
    margin-top: 0!important;
  }
  .goodsAdd .switchLine .weui-cell__bd {
    flex: none!important;
  }
  .goodsAdd .switchLine .weui-cell__ft {
    flex: 1;
  }
  .goodsAdd .switchLine .weui-switch {
    transform:scale(1.5,1.5);
  }
  .goodsAdd .ggz .weui-cell__bd {
    padding-right: 0.3rem;
  }
</style>
