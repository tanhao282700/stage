/* eslint-disable */
<template>
  <div class="Coupons goodsAdd">
    <div class="iosHeader vux-1px-b">
      <x-icon @click="getBack" type="ios-arrow-left" size="60"></x-icon>
      <span>驿站优惠券</span>
      <x-icon @click="addCoupons" type="ios-plus-empty" size="70"></x-icon>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'coupons',
    components: {
    },
    data () {
      return {

      }
    },
    methods: {
      addCoupons () {
        this.$router.push({
          name: 'addCoupons'
        })
      },
      getBack () {
        this.$router.go(-1)
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .Coupons {
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
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 0.36rem;
    padding: 0 0.2rem 0.24rem 0.2rem;
    svg {
      width: 0.48rem;
      height: 0.48rem;
    }
    svg:last-child {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

</style>
<style>

</style>
