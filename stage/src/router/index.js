import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: resolve => { import('@/components/main/Main').then(module => resolve(module)) },
      children: [
        {
          path: 'happen',
          name: 'Happen',
          component: resolve => { import('@/components/main/Happen').then(module => resolve(module)) }
        },
        {
          path: 'news',
          name: 'News',
          component: resolve => { import('@/components/main/News').then(module => resolve(module)) }
        },
        {
          path: 'mine',
          name: 'Mine',
          component: resolve => { import('@/components/main/Mine').then(module => resolve(module)) }
        }
      ],
      redirect: to => {
        return '/happen'
      }
    },
    {
      path: '/houseList',
      name: 'houseList',
      component: resolve => { import('@/components/houseManage/List').then(module => resolve(module)) }
    },
    {
      path: '/houseDetail',
      name: 'houseDetail',
      component: resolve => { import('@/components/houseManage/HouseDetail').then(module => resolve(module)) }
    },
    {
      path: '/houseAdd',
      name: 'houseAdd',
      component: resolve => { import('@/components/houseManage/HouseAdd').then(module => resolve(module)) }
    },
    {
      path: '/secondStep',
      name: 'secondStep',
      component: resolve => { import('@/components/houseManage/SecondStep').then(module => resolve(module)) }
    },
    {
      path: '/thirdStep',
      name: 'thirdStep',
      component: resolve => { import('@/components/houseManage/ThirdStep').then(module => resolve(module)) }
    },
    {
      path: '/fourthStep',
      name: 'fourthStep',
      component: resolve => { import('@/components/houseManage/FourthStep').then(module => resolve(module)) }
    },
    {
      path: '/houseMap',
      name: 'houseMap',
      component: resolve => { import('@/components/houseManage/HouseMap').then(module => resolve(module)) }
    },
    {
      path: '/houseEquipment',
      name: 'houseEquipment',
      component: resolve => { import('@/components/houseManage/HouseEquipment').then(module => resolve(module)) }
    },
    {
      path: '/setPrice',
      name: 'setPrice',
      component: resolve => { import('@/components/houseManage/SetPrice').then(module => resolve(module)) }
    },
    {
      path: '/addSpecial',
      name: 'addSpecial',
      component: resolve => { import('@/components/houseManage/AddSpecial').then(module => resolve(module)) }
    },
    {
      path: '/hotelManage',
      name: 'hotelManage',
      component: resolve => { import('@/components/hotelManage/HotelManage').then(module => resolve(module)) }
    },
    {
      path: '/editHotel',
      name: 'editHotel',
      component: resolve => { import('@/components/hotelManage/editHotel').then(module => resolve(module)) }
    },
    {
      path: '/amap',
      name: 'amap',
      component: resolve => { import('@/components/hotelManage/amap').then(module => resolve(module)) }
    },
    {
      path: '/goodsManage',
      name: 'goodsManage',
      component: resolve => { import('@/components/goodsManage/List').then(module => resolve(module)) }
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: resolve => { import('@/components/goodsManage/GoodsDetail').then(module => resolve(module)) }
    },
    {
      path: '/goodsAdd',
      name: 'goodsAdd',
      component: resolve => { import('@/components/goodsManage/GoodsAdd').then(module => resolve(module)) }
    },
    {
      path: '/goodsAddNextStep',
      name: 'goodsAddNextStep',
      component: resolve => { import('@/components/goodsManage/GoodsAddNextStep').then(module => resolve(module)) }
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: resolve => { import('@/components/orderManage/List').then(module => resolve(module)) }
    },
    {
      path: '/orderedGoods',
      name: 'orderedGoods',
      component: resolve => { import('@/components/orderManage/OrderedGoods').then(module => resolve(module)) }
    },
    {
      path: '/orderHotel',
      name: 'orderHotel',
      component: resolve => { import('@/components/orderManage/orderHotel').then(module => resolve(module)) }
    },
    {
      path: '/orderSend',
      name: 'orderSend',
      component: resolve => { import('@/components/orderManage/orderSend').then(module => resolve(module)) }
    },
    {
      path: '/changePrice',
      name: 'changePrice',
      component: resolve => { import('@/components/orderManage/changePrice').then(module => resolve(module)) }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: resolve => { import('@/components/main/Setting').then(module => resolve(module)) }
    },
    {
      path: '/myMoney',
      name: 'myMoney',
      component: resolve => { import('@/components/main/myMoney').then(module => resolve(module)) }
    },
    {
      path: '/certification',
      name: 'certification',
      component: resolve => { import('@/components/main/certification').then(module => resolve(module)) }
    },
    {
      path: '/accountBind',
      name: 'accountBind',
      component: resolve => { import('@/components/main/accountBind').then(module => resolve(module)) }
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: resolve => { import('@/components/main/setPassword').then(module => resolve(module)) }
    },
    {
      path: '/setPayPassword',
      name: 'setPayPassword',
      component: resolve => { import('@/components/main/setPayPassword').then(module => resolve(module)) }
    },
    {
      path: '/addCoupons',
      name: 'addCoupons',
      component: resolve => { import('@/components/hotelManage/addCoupons').then(module => resolve(module)) }
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: resolve => { import('@/components/hotelManage/coupons').then(module => resolve(module)) }
    }
  ]
})
