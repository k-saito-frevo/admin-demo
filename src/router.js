import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/Login'),
    },
    {
      path: '/dashboard',
      component: () => import('@/views/dashboard/Index'),
      children: [
        /*運行管理*/
        //温度管理
        {
          name: '温度管理',
          path: '/operation/temperature',
          component: () => import('@/views/dashboard/pages/operation/Temperature'),
        },
        //動態管理
        {
          name: '動態管理',
          path: '/operation/dynamics',
          component: () => import('@/views/dashboard/pages/operation/Dynamics'),
        },
        /*工事管理*/
        {
          name: '工事情報',
          path: '/construction/constructioninfo',
          component: () => import('@/views/dashboard/pages/construction/ConstructionInfo'),
        },
        {
          name: '運搬車両情報',
          path: '/construction/vehicleinfo',
          component: () => import('@/views/dashboard/pages/construction/VehicleInfo'),
        }, 
        {
          name: '経路作成',
          path: '/construction/routeinfo',
          component: () => import('@/views/dashboard/pages/construction/RouteInfo'),
        },
        /*マスタ管理*/
        {
          name: 'ユーザ管理',
          path: '/master/usermaster',
          component: () => import('@/views/dashboard/pages/master/UserMaster'),
        },
        {
          name: '支店管理',
          path: '/master/branchmaster',
          component: () => import('@/views/dashboard/pages/master/BranchMaster'),
        },
        {
          name: '車載端末管理',
          path: '/master/devicemaster',
          component: () => import('@/views/dashboard/pages/master/DeviceMaster'),
        },
        {
          name: '設定管理',
          path: '/master/settingmaster',
          component: () => import('@/views/dashboard/pages/master/SettingMaster'),
        },
               
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'UserProfile',
          path: '/pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: '/components/notifications',
          component: () => import('@/views/dashboard/pages/Notifications'),
        },
        {
          name: 'Icons',
          path: '/components/icons',
          component: () => import('@/views/dashboard/pages/Icons'),
        },
        {
          name: 'Typography',
          path: '/components/typography',
          component: () => import('@/views/dashboard/pages/Typography'),
        },
        // Tables
        {
          name: 'RegularTables',
          path: '/tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'GoogleMaps',
          path: '/maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },     
      ],
    },    
  ],
})
