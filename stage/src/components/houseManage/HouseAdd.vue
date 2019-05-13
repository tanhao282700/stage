<template>
    <div class="houseAdd">
        <div class="iosHeader vux-1px-b">
            <span>第一步：基础信息</span>
            <span @click="getBack" class="headericon_right headericon icon iconfont">&#xe61a;</span>
        </div>
        <div class="steps">
            <span></span>
        </div>
        <div class="houseAdd_con">
            <div class="houseAddressTitle">
                <span>房屋位置</span>
                <span>请放心，为了保护您的隐私，在客人预定之前，我们不会展示您的门牌号码。</span>
            </div>
            <div class="address">
                <div class="tit">详细地址</div>
                <div @click="chooseAddress" class="addrIcon vux-1px-b">
                    <span>四川省创都市高新西区四川省创都市高新西区四川省创都市高新西区</span>
                    <span class="icon iconfont">&#xe62e;</span>
                </div>
                <div class="tit">楼、单元、门牌号</div>
                <div class="addrIcon houseAddAttrArea vux-1px-b">
                    <group>
                        <x-textarea placeholder="请填写您的门牌号，此信息只对预定的客人展示" :show-counter="true" :max="20" v-model="value"></x-textarea>
                    </group>
                </div>
            </div>
            <div class="defaultTitle">房型信息</div>
            <div class="defaultLine">
                <div class="deraultLine_con vux-1px-b">
                    <span>驿站类型</span>
                    <div class="info">
                        <span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="defaultLine">
                <div class="deraultLine_con">
                    <span>整套户型</span>
                    <div class="info">
                        <span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="defaultTitle">整套面积（平米）</div>
            <div class="defaultLine vux-1px-b">
                <div class="deraultLine_con">
                    <span>房间设施</span>
                    <div class="info">
                        <span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="defaultLine vux-1px-b">
                <div class="deraultLine_con">
                    <span>床型</span>
                    <div class="info">
                        <span>请选择</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="selectLine vux-1px-b">
                <div class="selectLineCon">
                    <span>卫生间</span>
                    <div class="info">
                        <span>独卫</span>
                        <span>公共</span>
                    </div>
                </div>
            </div>
            <div class="selectLine">
                <div class="selectLineCon">
                    <span>厨房</span>
                    <div class="info">
                        <span class="active">燃气灶</span>
                        <span>电磁炉</span>
                    </div>
                </div>
            </div>
            <div class="houseAddressTitle" style="background:#fff;">
                <span>定制项目</span>
                <span>可添加一些付费定制项目（如枕头、鲜花等），供客人下单时自助选择。定制的价格最终会加到房间的房费中。</span>
            </div>
            <div class="special">
                <div class="special_con">
                    <div class="image">
                        <img src="../../assets/images/test.png" alt="">
                    </div>
                    <div class="info">
                        <span>这里显示标题</span>
                        <span>¥29.00</span>
                    </div>
                </div>
            </div>
            <div class="special">
                <div class="special_con">
                    <div class="image">
                        <img src="../../assets/images/test.png" alt="">
                    </div>
                    <div class="info">
                        <span>这里显示标题</span>
                        <span>¥29.00</span>
                    </div>
                </div>
            </div>
            <div @click="addSpecial" class="special_add">
                <span class="icon iconfont">&#xe600;</span>
                <span>添加</span>
            </div>
        </div>
        <div @click="goNextStep" class="bottom">下一步</div>
    </div>
</template>

<script>
import { XTextarea, Group } from 'vux'
export default {
  name: 'houseAdd',
  components: {
    XTextarea,
    Group
  },
  data () {
    return {
      value: ''
    }
  },
  created () {

  },
  methods: {
    addSpecial () {
      this.$router.push({
        name: 'addSpecial'
      })
    },
    goNextStep () {
      this.$router.push({
        name: 'secondStep'
      })
    },
    getBack () {
      this.$router.go(-1)
    },
    chooseAddress () {
      this.$router.push({
        name: 'houseMap'
      })
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
        .houseAdd_con {
            flex: 1;
            overflow: auto;
        }
        .bottom {
            height: 0.96rem;
            line-height: 0.96rem;
            background: #19ad19;
            font-size: 0.3rem;
            color: white;
        }
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
  .headericon {
    position: absolute;
    bottom: 0.4rem;
    font-size: 0.42rem;
    color: #000000;
    width: 0.48rem;
    height: 0.48rem;
    &.headericon_right{
      right: 0.2rem;
    }
    &.headericon_left{
      left: 0.2rem;
    }
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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

    .defaultLine {
        height: 0.72rem;
        background: #fff;
        padding: 0 0.2rem;
        .deraultLine_con {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 0.28rem;
                color: #353535;
            }
            .info {
                align-items: center;
                display: flex;
            }
        }
    }

    .selectLine {
        height: 0.9rem;
        background: #fff;
        padding: 0 0.2rem;
        .selectLineCon {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                font-size: 0.28rem;
                color: #353535;
            }
            .info {
                align-items: center;
                display: flex;
                span {
                    width: 1.08rem;
                    height: 0.46rem;
                    text-align: center;
                    line-height: 0.46rem;
                    border: 1px solid #d7d7d7;
                    border-radius: 0.1rem;
                    font-size: 0.28rem;
                }
                span:first-child {
                    margin-right: 0.2rem;
                }
                .active {
                    color: white;
                    background: #19ad19;
                }
            }
        }
    }

    .special {
        height: 1.76rem;
        background: #fff;
        padding: 0.1rem 0.2rem;
        .special_con {
            height: 1.36rem;
            border: 1px solid #d7d7d7;
          border-radius: 0.1rem;
            display: flex;
            align-items: center;
            .image {
              margin-left: 0.1rem;
                width: 1.8rem;
                height: 1.2rem;
                margin-right: 0.2rem;
                img {
                    width: 1.8rem;
                    height: 1.2rem;
                    border-radius: 0.1rem;
                }
            }
            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 1.2rem;
                justify-content: space-between;
                align-items: flex-start;
                span {
                    font-size: 0.28rem;
                }
                span:last-child {
                    color: #f24b45;
                }
            }
        }
    }
    .special_add {
        height: 1.16rem;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        span:first-child {
            font-size: 0.3rem;
            color: #19ad19;
            margin-right: 0.1rem;
        }
        span:last-child {
            font-size: 0.28rem;
        }
    }
</style>
<style>
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
</style>
