<template>
    <div class="houseAdd">
        <div class="iosHeader vux-1px-b">
            <span>第一步：基础信息</span>
            <span @click="getBack" class="headericon icon iconfont">&#xe61a;</span>
        </div>
        <div class="steps"><span></span></div>
        <div class="houseAddressTitle">
            <span>房屋位置</span>
            <span>请放心，为了保护您的隐私，在客人预定之前，我们不会展示您的门牌号码。</span>
        </div>
        <div class="address">
            <div class="tit">详细地址</div>
            <div class="addrIcon vux-1px-b">
                <span>四川省创都市高新西区四川省创都市高新西区四川省创都市高新西区</span>
                <span class="icon iconfont">&#xe62e;</span>
            </div>
            <div class="tit">楼、单元、门牌号</div>
            <div class="addrIcon houseAddAttrArea vux-1px-b">
                    <group><x-textarea placeholder="请填写您的门牌号，此信息只对预定的客人展示" :show-counter="true" :max="20" v-model="value"></x-textarea></group>
            </div>
        </div>
        <div class="defaultTitle">房型信息</div>
    </div>
</template>

<script>
import { XTextarea } from 'vux'
export default {
  name: 'houseAdd',
  components: {
    XTextarea
  },
  data () {
    return {
      value: ''
    }
  },
  created () {

  },
  methods: {
    getBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .houseAdd {
        width: 100%;
        height: 100%;
        background: rgb(247, 247, 247);
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
        font-size: 0.32rem;
        padding-bottom: 0.24rem;
        .headericon {
            position: absolute;
            right: 0.2rem;
            bottom: 0.14rem;
            font-size: 0.42rem;
            color: #000000;
        }
    }
    .steps {
        height: 0.08rem;
        background: #efefef;
        display: flex;
        justify-content: flex-start;
        span {
            width: 25%;
            background: #19ad19;
        }
    }
    .houseAddressTitle {
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
    .address {
            background: #fff;
            text-align: left;
            padding: 0 0.2rem;
            .tit {
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.28rem;
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
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                span:last-child {
                    font-size: 0.3rem;
                    color: #9b9a9b;
                }
            }
            .houseAddAttrArea {
                height: 0.6rem;
            }
    }
    .defaultTitle {
        padding: 0.36rem 0.2rem 0.2rem 0.2rem;
        font-size: 0.28rem;
        font-weight: bold;
        text-align: left;
    }
</style>
<style>
    .houseAddAttrArea group {
        width: 100%;
        height: 100%;
    }
    .houseAddAttrArea group .weui-cell {
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .houseAddAttrArea group .weui-cell .weui-cell__bd {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 0.24rem;

    }
    .houseAddAttrArea group .weui-cell .weui-cell__bd .weui-textarea {
        width: 100%;
        height: 100%;
        font-size: 0.24rem;
    }
</style>
