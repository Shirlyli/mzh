import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const fileManagementRouter: RouteConfig[] = [
  // 档案管理
  {
    path: '/fileManagement',
    component: Layout,
    redirect: '/fileManagement/equipmentClass',
    meta: {
      title: 'fileManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      // 设备录入 -科室分类
      {
        path: 'addNewEquipment',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/fileManagement/addNewEquipment/index.vue'
          ),
        name: 'addNewEquipment',
        meta: {
          title: 'addNewEquipment'
          // icon: 'dashboard',
          // affix: true
        }
      },
      // 医院管理
      {
        path: 'hospitalManagement',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/fileManagement/hospitalManagement/index.vue'
          ),
        name: 'hospitalManagement',
        meta: {
          title: 'hospitalManagement'
          // icon: 'dashboard',
          // affix: true
        }
      },
      // 设备树-设备类别分类
      {
        path: 'equipmentClass',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/fileManagement/equipmentClass/index.vue'
          ),
        name: 'equipmentClass',
        meta: {
          title: 'equipmentClass'
          // icon: 'dashboard',
          // affix: true
        }
      }
    ]
  }
]

export default fileManagementRouter
