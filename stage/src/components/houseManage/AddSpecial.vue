<template>
    <div class="addSpecial">
        <div class="iosHeader vux-1px-b">
            <span>添加定制项目</span>
            <span @click="getBack" class="right headericon icon iconfont">&#xe61a;</span>
        </div>
      <div class="con">
        <div class="picbox">
          <div class="upload">
            <div class="imgs">
              <div class="pics upload_button">
                <vue-core-image-upload
                  :class="['btn', 'btn-primary']"
                  :crop="false"
                  @imagechanged="imagechanged"
                  :isXhr="false"
                  input-of-file="file"
                  :max-file-size="5242880"
                  :url="uploadUrl">
                  <img v-if="params.image_path" class="aa" :src="params.image_path" />
                  <div v-if="!params.image_path" class="pic_btn">
                    <span></span>
                    <span>上传照片</span>
                  </div>
                </vue-core-image-upload>
              </div>
            </div>
          </div>
        </div>
        <div class="textarea1">
          <div class="addrIcon houseAddAttrArea vux-1px-b">
            <group>
              <x-textarea placeholder="请填写标题" :show-counter="true" :max="10" v-model="params.title"></x-textarea>
            </group>
          </div>
        </div>
        <div class="textarea1">
          <div class="addrIcon houseAddAttrArea">
            <group>
              <x-textarea placeholder="请填写价格" v-model="params.price"></x-textarea>
            </group>
          </div>
        </div>
      </div>
      <div @click="saveData" class="bottom">保存</div>
    </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { XTextarea, Group } from 'vux'
export default {
  name: 'addSpecial',
  components: {
    VueCoreImageUpload,
    XTextarea,
    Group
  },
  data () {
    return {
      uploadUrl: 'http://zayzsh.zbtdvip.com/api/merchant/good/add/goods/baseInfo',
      params: {
        image_path: '',
        price: '',
        title: ''
      },
      baseInfo: {}
    }
  },
  created () {
    this.getBaseInfo()
  },
  methods: {
    saveData(){
        if(!this.params.title){
          this.$vux.toast.show({
            text: '请填写标题',
            position: 'middle',
            type: 'warn'
          })
            return
        }
      if(!this.params.price){
        this.$vux.toast.show({
          text: '请填写价格',
          position: 'middle',
          type: 'warn'
        })
        return
      }
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.baseInfo.customProjectInfo.push(this.params)
      this.$http.fetchPost('/merchant/room/add/baseInfo', this.baseInfo).then((res)=>{
        this.$vux.loading.hide()
        this.$router.replace({
        name: 'houseAdd',
        query: {
          params: this.$route.query.params
        }
      })
    })
    },
    imagechanged(data){
      let param = new FormData() // 创建form对象
      param.append('files', data)// 通过append向form对象添加数据
      this.$http.fetchPost('/merchant/common/image/upload', param, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryJBcoeGdBCguPERbU'
        }
      }).then((res) => {
        this.params.image_path = res.data.data.path
    })
    },
    getBaseInfo(){
      this.$http.fetchGet('/merchant/room/get/baseInfo',{roomId: this.$route.query.params.id}).then((res)=>{
        this.baseInfo = res.data.data
      this.baseInfo.roomTypeInfo.map((item)=>{
            if(item.isSelected){
                this.baseInfo.roomTypeId = item.id
        this.baseInfo.roomTypeInfo = [item]
        return
            }
      })
      this.baseInfo.bedModelInfo.map((item)=>{
        if(item.isSelected){
        this.baseInfo.bedModelId = item.id
        this.baseInfo.bedModelInfo = [item]
        return
      }
    })
      })
    },
    getBack(){
      this.$router.replace({
        name: 'houseAdd',
        query: {
          params: this.$route.query.params
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .addSpecial {
        width: 100%;
        height: 100%;
        background: rgb(247, 247, 247);
        display: flex;
        flex-direction: column;
    }

    .bottom {
      height: 0.96rem;
      background: #19ad19;
      font-size: 0.32rem;
      color: white;
      text-align: center;
      line-height: 0.96rem;
    }
  .con {
    flex: 1;
    overflow: auto;
    .picbox {
      padding: 0.2rem 0.2rem;
      background: #fff;
      height: 3rem;
      .upload {
        height: 2.6rem;
        border: 1px dashed #bdbdbd;
        border-radius: 0.1rem;
        .imgs {
          height: 100%;
          .pics {
            height: 100%;
            .aa {
              width: 100%;
              height: 100%;
              border-radius: 0.1rem;
            }
            .g-core-image-upload-btn {
              width: 100%;
              height: 100%;
            }
            .pic_btn {
              margin-left: 2.7rem;
              margin-top: 0.6rem;
            }
          }
        }
      }
    }
    .textarea1 {
      padding: 0 0.2rem;
      background: #fff;
    }
    .addrIcon {
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        flex: 1;
        font-size: 0.28rem;
        padding-right: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span:last-child {
        font-size: 0.3rem;
        color: #9b9a9b;
      }
    }
  }
</style>
<style lang="less" rel="stylesheet/less">
  .houseAddAttrArea > div {
    width: 100%;
    height: 100%;
  }

  .houseAddAttrArea > div .weui-cells {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .houseAddAttrArea > div .weui-cells .weui-cell {
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .houseAddAttrArea .weui-cell .weui-cell__bd {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.24rem;

  }

  .houseAddAttrArea .weui-cell .weui-cell__bd .weui-textarea {
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    line-height: 0.6rem;
  }
  .houseAdd .vux-x-icon {
    fill: #19ad19;
  }

  .addSpecial .upload {
    height: 2.6rem;
    border: 1px dashed #bdbdbd;
    border-radius: 0.1rem;
    .imgs {
      height: 100%;
      .pics {
        height: 100%;
        width: 100%;
        .aa {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
        }
        .g-core-image-upload-btn {
          width: 100%;
          height: 100%;
        }
        .pic_btn {
          margin-left: 2.7rem;
          margin-top: 0.6rem;
        }
      }
    }
  }
</style>
