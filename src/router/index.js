import Vue from 'vue'
import Router from 'vue-router'
import loadFail from "@/components/common/loadFail"
import ImageFullScreen from "@/components/common/imageFullScreen"
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component:_import('index'),
    title:'导航列表',
    meta: {
        keepAlive: false, //此组件不需要被缓存
    }
  },
  {
    path: '/author',
    name: 'Author',
    component:_import('template/author'),
    title:'微信授权',
    meta: {
        keepAlive: false, //此组件不需要被缓存
    }
  },
  {
    path: '/common/loadFail',
    name: 'LoadFail',
    component:loadFail,
    title:'404',
    meta: {
        keepAlive: false, //此组件不需要被缓存          
    }
  },
  {
    path: '/common/imageFullScreen',
    name: 'ImageFullScreen',
    component:ImageFullScreen,
    title:'图片全屏',
    meta: {
        keepAlive: false, //此组件不需要被缓存          
    }
  }
]
export const asyncRouterMap = [
    {
      path: '/store/storeList',
      name: 'StoreList',
      component: _import('store/storeList'),
      title:'店铺列表',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/store/takeNumber',
      name: 'TakeNumber',
      component: _import('store/takeNumber'),
      title:'排队取号',
      meta: {
          keepAlive: false, //此组件需要被缓存          
      }
    },
    {
      path: '/store/appraise',
      name: 'Appraise',
      component: _import('store/appraise'),
      title:'我要评价',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/memberCenter',
      name: 'MemberCenter',
      component: _import('member/memberCenter'),
      title:'会员中心',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/integral',
      name: 'Integral',
      component: _import('member/integral'),
      title:'我的积分',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/member/integral/detail',
      name: 'Detail',
      component: _import('member/integral/detail'),
      title:'积分明细',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/coupon',
      name: 'Coupon',
      component: _import('member/coupon'),
      title:'我的优惠卷',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/member/haveDinner',
      name: 'HaveDinner',
      component: _import('member/haveDinner'),
      title:'用餐记录',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/personalData',
      name: 'PersonalData',
      component: _import('member/personalData'),
      title:'个人资料',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/expense',
      name: 'Expense',
      component: _import('member/expense'),
      title:'储值消费记录',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/orderForm',
      name: 'OrderForm',
      component: _import('member/orderForm'),
      title:'兑换订单',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/member/orderFormDetail',
      name: 'OrderFormDetail',
      component: _import('member/orderFormDetail'),
      title:'兑换订单详情',
      meta: {
          keepAlive: false, //此组件需要被缓存          
      }
    },
    {
      path: '/goods/goodsList',
      name: 'GoodsList',
      component: _import('goods/goodsList'),
      title:'卡卷商城',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
     {
      path: '/goods/goodsDetail',
      name: 'GoodsDetail',
      component: _import('goods/goodsDetail'),
      title:'卡卷商品详情',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/member/myAppraise',
      name: 'MyAppraise',
      component: _import('member/myAppraise'),
      title:'我的评价',
      meta: {
          keepAlive: false, //此组件需要被缓存          
      }
    },
    {
      path: '/member/collect',
      name: 'Collect',
      component: _import('member/collect'),
      title:'我的收藏',
      meta: {
          keepAlive: false, //此组件需要被缓存          
      }
    },
    {
      path: '/store/selectStore',
      name: 'SelectStore',
      component: _import('store/selectStore'),
      title:'适用门店',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/store/storeNav',
      name: 'StoreNav',
      component: _import('store/storeNav'),
      title:'店铺导航',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/scanCode/qrCode',
      name: 'QrCode',
      component: _import('scanCode/qrCode'),
      title:'扫码点餐',
      meta: {
          keepAlive: true, //此组件需要被缓存          
      }
    },
    {
      path: '/scanCode/takingOrder',
      name: 'TakingOrder',
      component: _import('scanCode/takingOrder'),
      title:'点餐列表',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/scanCode/takingOrderDetails',
      name: 'TakingOrderDetails',
      component: _import('scanCode/takingOrderDetails'),
      title:'点餐详情',
      meta: {
          keepAlive: false, //此组件需要被缓存          
      }
    },
    {
      path: '/scanCode/myMenu',
      name: 'MyMenu',
      component: _import('scanCode/myMenu'),
      title:'我的菜单',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/template/myOrderMenu',
      name: 'MyOrderMenu',
      component: _import('template/myOrderMenu'),
      title:'下单菜单-我的菜单订单',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/template/createOrder',
      name: 'CreateOrder',
      component: _import('template/createOrder'),
      title:'号单详情',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    },
    {
      path: '/template/appraisal',
      name: 'Appraisal',
      component: _import('template/appraisal'),
      title:'评价',
      meta: {
          keepAlive: false, //此组件不需要被缓存          
      }
    }
]

export default new Router({
  routes: constantRouterMap.concat(asyncRouterMap)
})
