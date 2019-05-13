<template>
  <div class="secondStep">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>第二步：房源介绍</span>
      <span @click="getBack" class="headericon icon iconfont">&#xe61a;</span>
    </div>
    <div class="steps">
      <span></span>
    </div>
    <div class="con">
      <div class="defaultTitle">房源介绍</div>
      <div class="areaTitle">房源标题</div>
      <div class="textarea1">
        <div class="textarea1_con vux-1px-b">
            <group>
                <x-textarea placeholder="一个好的标题应该尽可能简洁的介绍房源特点，能帮您带来更多的客人" :max=60 :show-counter=true v-model="value"></x-textarea>
              </group>
        </div>
      </div>
      <div class="areaTitle">房源特点</div>
      <div class="textarea1" style="padding-bottom: 0.2rem;">
          <div class="textarea1_con vux-1px-b">
              <group>
                  <x-textarea placeholder="您的房源有什么特点，如位置（离地铁站近、景点近？）、设施（有大投影？能做饭？）以及其它特点" autosize :max=500 :show-counter=true v-model="value"></x-textarea>
                </group>
          </div>
      </div>
      <div class="defaultTitle">您对客人有什么要求</div>
      <div class="requestLine">
          <span>允许抽烟</span>
          <div class=radios>
              <span class="red headericon icon iconfont">&#xe61e;</span>
              <span class="headericon icon iconfont">&#xe60e;</span>
          </div>
      </div>
      <div class="requestLine">
          <span>允许做饭</span>
          <div class=radios>
              <span class="headericon icon iconfont">&#xe61e;</span>
              <span class="green headericon icon iconfont">&#xe60e;</span>
          </div>
      </div>
      <div class="defaultTitle">其它注意事项</div>
      <div class="textarea1">
        <div class="textarea1_con vux-1px-b">
            <group>
                <x-textarea autosize placeholder="其它需要客人遵守的规则" :max=100 :show-counter=true v-model="value"></x-textarea>
              </group>
        </div>
      </div>
    </div>
    <div @click="getNextStep" class="bottom">下一步</div>
  </div>
</template>

<script>
import { XTextarea, Group } from 'vux'
export default {
  name: 'secondStep',
  components: {
    XTextarea,
    Group
  },
  data () {
    return {
      value: '',
      value2: '',
      radio003: [{
        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
        key: '001',
        value: 'radio001'
      }, {
        icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
        key: '002',
        value: 'radio002'
      }]
    }
  },
  created () {

  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    getNextStep () {
      this.$router.push({
        name: 'thirdStep'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .secondStep {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
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
      width: 50%;
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
    .areaTitle {
      font-size: 0.28rem;
      padding: 0.2rem;
      background: #fff;
    }
    .textarea1 {
      padding: 0 0.2rem;
      background: #fff;
    }
    .requestLine {
      height: 0.8rem;
      background: #fff;
      padding: 0 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 0.28rem;
      }
      .radios span {
        font-size: 0.3rem;
        color: #d7d7d7;
      }
      .radios span:first-child {
        margin-right: 0.36rem;
      }
      .radios .red {
        color: #f14b44;
      }
      .radios .green {
        color: #7ed221;
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
  .textarea1 .weui-cells {
    margin-top: 0!important;
  }
  .textarea1 .weui-cells:before {
    height: 0!important;
    border-top: none;
  }
  .textarea1 .weui-textarea {
    font-size: 0.24rem;
  }
  .textarea1 .weui-textarea-counter {
    font-size: 0.24rem;
  }
</style>
