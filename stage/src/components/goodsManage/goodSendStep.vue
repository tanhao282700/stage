<template>
  <div class="goodSendStep goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" class="left" type="ios-arrow-left" size="60"></x-icon>
      <span>商品价格</span>
    </div>
    <div class="con">
      <div class="setTitle">
        <span>批量设置</span>
        <span @click="set">设置</span>
      </div>
      <div class="defaultLine">
        <group>
          <x-input @on-blur="check(price,'price')" :show-clear=false type="number" title="批量设置会员价" placeholder="请输入会员价" v-model="price"></x-input>
        </group>
      </div>
      <div class="defaultLine">
        <group>
          <x-input @on-blur="check(stock,'stock')" :show-clear=false type="number" title="批量设置库存" placeholder="请输入库存" v-model="stock"></x-input>
        </group>
      </div>
      <div class="items" v-for="(item,index) in baseInfo.goodsSkuInfo">
        <div class="title">
          <span v-for="child in item.attrDetailInfo" v-text="child.attrName+'：'+child.attrValue"></span>
        </div>
        <!--<div class="defaultLine vux-1px-b">
          <span>成本价</span>

        </div>-->
        <div class="defaultLine">
          <group>
            <x-input @on-blur="check2(item.memberPrice,'memberPrice',index)" :show-clear=false type="number" title="商品成本价" placeholder="请输入商品成本价" v-model="item.memberPrice"></x-input>
          </group>
        </div>
        <div class="myLine">
          <span>会员价</span>
          <span v-text="'¥'+(item.memberPrice*baseInfo.memberPriceScale+parseInt(item.memberPrice))"></span>
        </div>
        <div class="myLine">
          <span>非会员价</span>
          <span v-text="'¥'+(item.memberPrice*baseInfo.unMemberPriceScale+parseInt(item.memberPrice))"></span>
        </div>
        <div class="defaultLine">
          <group>
            <x-input @on-blur="check2(item.stock,'stock',index)" :show-clear=false type="number" title="库存" placeholder="请输入商品库存" v-model="item.stock"></x-input>
          </group>
        </div>
      </div>
      <div @click="getNextStep" class="bottom">下一步</div>
    </div>
  </div>
</template>

<script>
  import { XInput, Group } from 'vux'
  export default {
    name: 'goodSendStep',
    components: {
      XInput,
      Group
    },
    data () {
      return {
        price: '',
        stock: '',
        baseInfo: {
          goodsSkuInfo: []
        }
      }
    },
    created () {
      this.getBaseInfo()
    },
    methods: {
      check (val,type) {
        if(!val || val < 0) {
          this[type] = 0
        }
      },
      check2 (val,type,index) {
        if(!val || val < 0) {
          this.baseInfo.goodsSkuInfo[index][type] = 0
        }
      },
      set () {
        this.baseInfo.goodsSkuInfo.map((item)=>{
            if(this.price) {
              item.memberPrice = this.price
            }
          if(this.stock) {
            item.stock = this.stock
          }
        })
      },
      getNextStep () {
          this.$http.fetchPost('/merchant/good/add/goods/sku',this.baseInfo).then((res)=>{
              console.log(res)
            if(res.data.code == 200) {
                this.$router.push({
                    path: 'goodsAddNextStep',
                  query: {
                        id: res.data.data.id
                  }
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
      getBack () {
          this.$router.go(-1)
      },
      getBaseInfo() {
          this.$http.fetchGet('/merchant/good/get/goods/sku',{goodsId: this.$route.query.id}).then((res)=>{
            if(res.data.code == 200) {
              this.baseInfo = res.data.data
              this.baseInfo.goodsSkuInfo.map((item)=>{
                  if(!item.memberPrice){
                    item.memberPrice = 0
                  }
                if(!item.stock){
                  item.stock = 0
                }
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .goodSendStep {
    width: 100%;
    height: 100%;
    background: rgb(247,247,247);
    display: flex;
    flex-direction: column;
  }
  .con {
    flex: 1;
    overflow: auto;
  }
  .title {
    padding: 0.2rem 0.2rem;
    display: flex;
    flex-wrap: wrap;
    span{
      font-size: 0.24rem;
      margin-left: 0.2rem;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .setTitle {
    padding: 0 0.2rem;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      font-size: 0.24rem;
      &:last-child {
        background: #55c97a;
        color: white;
        padding: 0.05rem 0.2rem;
        border-radius: 0.1rem;
      }
    }
  }
  .myLine {
    height: 1rem;
    background: #fff;
    padding: 0 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottom {
    height: 0.96rem;
    background: #19ad19;
    font-size: 0.32rem;
    color: white;
    text-align: center;
    line-height: 0.96rem;
  }
</style>
<style>
  .goodSendStep .weui-label {
    font-size: 0.24rem!important;
  }
  .goodSendStep .weui-input {
    font-size: 0.24rem!important;
  }
</style>
