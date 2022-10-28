import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const purchaseManagementRouter: RouteConfig[] = [
  {
    path: '/purchaseManagement',
    component: Layout,
    redirect: '/purchaseManagement/procurementProcess',
    meta: {
      title: 'purchaseManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'procurementProcess',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/procurementProcess/index.vue'
          ),
        name: 'procurementProcess',
        meta: {
          title: 'procurementProcess'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'purchasingRecords',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/purchasingRecords/index.vue'
          ),
        name: 'procurementProcess',
        meta: {
          title: 'purchasingRecords'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'inventoryRecords',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/inventoryRecords/index.vue'
          ),
        name: 'inventoryRecords',
        meta: {
          title: 'inventoryRecords'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'outboundRecords',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/outboundRecords/index.vue'
          ),
        name: 'outboundRecords',
        meta: {
          title: 'outboundRecords'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'biddingDocuments',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/purchaseManagement/biddingDocuments/index.vue'
          ),
        name: 'biddingDocuments',
        meta: {
          title: 'biddingDocuments'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

export default purchaseManagementRouter
