import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const equipmentArchivesRouter: RouteConfig[] = [
  // 设备管理
  {
    path: '/equipmentArchives',
    component: Layout,
    redirect: '/equipmentArchives/equipmentCategory',
    meta: {
      title: 'equipmentArchives',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'inspectionRecords',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/equipmentArchives/inspectionRecords/index.vue'
          ),
        name: 'inspectionRecords',
        meta: {
          title: 'inspectionRecords'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'lostRecord',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/equipmentArchives/lostRecord/index.vue'
          ),
        name: 'lostRecord',
        meta: {
          title: 'lostRecord'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'scrapRecord',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/equipmentArchives/scrapRecord/index.vue'
          ),
        name: 'scrapRecord',
        meta: {
          title: 'scrapRecord'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'diversionManage',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/equipmentArchives/diversionManage/index.vue'
          ),
        name: 'diversionManage',
        meta: {
          title: 'diversionManage'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

export default equipmentArchivesRouter
