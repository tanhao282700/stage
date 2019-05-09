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
      path: '/hotelManage',
      name: 'hotelManage',
      component: resolve => { import('@/components/hotelManage/HotelManage').then(module => resolve(module)) }
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
    }
  ]
})
