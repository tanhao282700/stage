<template>
    <div class="thirdStep">
        <div class="iosHeader vux-1px-b">
            <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
            <span>第三步：预定信息</span>
            <span @click="getBack" class="headericon icon iconfont">&#xe61a;</span>
        </div>
        <div class="steps">
            <span></span>
        </div>
        <div class="con">
            <div class="defaultTitle">确定合适价格</div>
            <div class="inputLine">
                <div class="inputLine_con">
                    <div class="line_title">
                        <span>工作日价格</span>
                        <span>元/晚</span>
                    </div>
                    <group class="line_input vux-1px-b">
                        <x-input placeholder="周一~周四及因串休导致需要正常上班的日期" v-model="value"></x-input>
                    </group>
                </div>
            </div>
            <div class="inputLine">
                <div class="inputLine_con">
                    <div class="line_title">
                        <span>节假日价格</span>
                        <span>元/晚</span>
                    </div>
                    <group class="line_input vux-1px-b">
                        <x-input placeholder="周五、周六及法定节假日、情人节圣诞节等" v-model="value"></x-input>
                    </group>
                </div>
            </div>
            <div class="selectLine">
                <div class="deraultLine_con vux-1px-b">
                    <span>单独设置某日价格</span>
                    <div class="info">
                        <span>去设置</span>
                        <x-icon type="ios-arrow-right" size="40"></x-icon>
                    </div>
                </div>
            </div>
            <div class="menberPersons">
                <div class="menberPersons_con vux-1px-b">
                    <span>可住几人</span>
                    <div class="menbers">
                        <x-icon type="ios-minus" size="50"></x-icon>
                        <span class="persons">2人</span>
                        <x-icon type="ios-plus" size="50"></x-icon>
                    </div>
                </div>
            </div>
            <div class="td">
                <div class="tit">
                    <span>退订政策</span>
                    <span>修改</span>
                </div>
                <div class="tips">客人取消入住可以获得多少退款</div>
                <div class="tdzc">带娃带娃的撒无多爱我的爱我的爱我的爱我的爱我的</div>
            </div>
            <div class="defaultTitle">更多预定选项</div>
            <div class="menberPersons">
                    <div class="menberPersons_con vux-1px-b">
                        <span>最少预定天数</span>
                        <div class="menbers">
                            <x-icon type="ios-minus" size="50"></x-icon>
                            <span class="persons">2</span>
                            <x-icon type="ios-plus" size="50"></x-icon>
                        </div>
                    </div>
            </div>
            <div class="menberPersons">
                    <div class="menberPersons_con vux-1px-b">
                        <span>最大预定天数</span>
                        <div class="menbers">
                            <x-icon type="ios-minus" size="50"></x-icon>
                            <span class="persons">2</span>
                            <x-icon type="ios-plus" size="50"></x-icon>
                        </div>
                    </div>
            </div>
            <div class="td">
                    <div class="tit">
                        <span>当天预定时间</span>
                        <span>修改</span>
                    </div>
                    <div class="tips">周五、周六及法定节假日客人可在几点前预定房源？</div>
                    <div class="tdzc vux-1px-b">带娃带娃的撒无多爱我的爱我的爱我的爱我的爱我的</div>
            </div>
            <div class="td">
                    <div class="tit">
                        <span>入住时间</span>
                        <span>修改</span>
                    </div>
                    <div class="tips">客人最早几点可以入住？</div>
                    <div class="tdzc vux-1px-b">12:00</div>
            </div>
            <div class="td" style="margin-bottom: 0.8rem;padding-bottom: 0.4rem;">
                    <div class="tit">
                        <span>退房时间</span>
                        <span>修改</span>
                    </div>
                    <div class="tips">客人最晚几点可以退房？</div>
                    <div class="tdzc">12:00</div>
            </div>
        </div>
        <div @click="getNextStep" class="bottom">下一步</div>
    </div>
</template>

<script>
import { XInput, Group, InlineXNumber } from 'vux'
export default {
  name: 'thirdStep',
  components: {
    XInput,
    Group,
    InlineXNumber
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
    },
    getNextStep () { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
    .thirdStep {
        width: 100%;
        height: 100%;
        background: rgb(247, 247, 247);
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .iosHeader {
        width: 100%;
        height: 1.28rem;
        background: #fff;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 0.36rem;
        padding: 0 0.2rem 0.24rem 0.2rem;
        svg {
            width: 0.48rem;
            height: 0.48rem;
        }
        .headericon {
            font-size: 0.3rem;
            color: #000000;
        }
    }

    .steps {
        height: 0.08rem;
        background: #efefef;
        display: flex;
        justify-content: flex-start;
        span {
            width: 75%;
            background: #19ad19;
        }
    }

    .con {
        flex: 1;
        overflow: auto;
        .defaultTitle {
            height: 1rem;
            line-height: 1.2rem;
            font-size: 0.28rem;
            font-weight: bold;
            padding: 0 0.2rem;
        }
        .inputLine {
            padding: 0 0.2rem;
            background: #fff;
            .inputLine_con {
                .line_title {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.2rem 0;
                    span {
                        font-size: 0.28rem;
                    }
                }
                .line_input {
                    height: 0.62rem;
                    padding-bottom: 0.1rem;
                }
            }
        }
        .selectLine {
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
        .menberPersons {
            padding: 0 0.2rem;
            background: #fff;
            height: 0.72rem;
            .menberPersons_con {
                display: flex;
                justify-content: space-between;
                height: 0.72rem;
                align-items: center;
                span {
                    font-size: 0.28rem;
                }
                .menbers {
                    display: flex;
                    align-items: center;
                    svg:first-child {
                        margin-right: 0.1rem;
                    }
                    .persons {
                        width: 1rem;
                        text-align: center;
                        margin-right: 0.1rem;
                    }
                }
            }
        }
        .td {
            padding: 0.1rem 0.2rem 0 0.2rem;
            background: #fff;
            .tit {
                display: flex;
                justify-content: space-between;
                padding: 0.1rem 0;
                span:first-child {
                    font-size: 0.28rem;
                }
                span:last-child {
                    font-size: 0.28rem;
                    color: #1aad19;
                }
            }
            .tips {
                font-size: 0.24rem;
                color: #9b9b9b;
                padding-bottom: 0.1rem;
            }
            .tdzc {
                font-size: 0.24rem;
                padding-bottom: 0.2rem;
            }
        }
    }

    .bottom {
        height: 0.96rem;
        line-height: 0.96rem;
        background: #19ad19;
        font-size: 0.32rem;
        color: white;
        text-align: center;
    }
</style>
<style>
    .thirdStep .weui-cells:before {
        border-top: none;
        height: 0;
    }

    .thirdStep .weui-cells:after {
        border-bottom: none;
    }

    .thirdStep .weui-cell {
        padding: 0;
    }

    .thirdStep .inputLine .weui-input {
        height: 0.52rem;
        font-size: 0.24rem;
    }

    .thirdStep .weui-cells {
        margin-top: 0;
    }

    .thirdStep .vux-x-icon {
        fill: #19ad19;
    }
</style>
