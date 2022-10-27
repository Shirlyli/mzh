import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

const businessRouter: RouteConfig[] = [
  {
    path: "/controlPanel",
    component: Layout,
    // redirect: '/controlPanel',
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/controlPanel/index.vue"
          ),
        name: "controlPanel",
        meta: {
          title: "controlPanel",
          icon: "dashboard"
          // affix: true
        }
      }
    ]
  },
  {
    path: "/dataDecision",
    component: Layout,
    // redirect: '/controlPanel',
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/dataDecision/index.vue"
          ),
        name: "dataDecision",
        meta: {
          title: "dataDecision",
          icon: "dashboard"
          // affix: true
        }
      }
    ]
  },
  {
    path: "/purchaseManagement",
    component: Layout,
    redirect: "/purchaseManagement/procurementProcess",
    meta: {
      title: "purchaseManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "procurementProcess",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/procurementProcess/index.vue"
          ),
        name: "procurementProcess",
        meta: {
          title: "procurementProcess"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "purchasingRecords",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/purchasingRecords/index.vue"
          ),
        name: "procurementProcess",
        meta: {
          title: "purchasingRecords"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "inventoryRecords",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/inventoryRecords/index.vue"
          ),
        name: "inventoryRecords",
        meta: {
          title: "inventoryRecords"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "outboundRecords",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/outboundRecords/index.vue"
          ),
        name: "outboundRecords",
        meta: {
          title: "outboundRecords"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "biddingDocuments",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/biddingDocuments/index.vue"
          ),
        name: "biddingDocuments",
        meta: {
          title: "biddingDocuments"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 设备管理

  {
    path: "/equipmentArchives",
    component: Layout,
    redirect: "/equipmentArchives/equipmentCategory",
    meta: {
      title: "equipmentArchives",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      // 设备录入 -设备新增
      {
        path: "addNewEquipment",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/addNewEquipment/index.vue"
          ),
        name: "addNewEquipment",
        meta: {
          title: "addNewEquipment"
          // icon: 'dashboard',
          // affix: true
        }
      },
      {
        path: "equipmentCategory",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/equipmentCategory/index.vue"
          ),
        name: "equipmentCategory",
        meta: {
          title: "equipmentCategory"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "fileManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/fileManagement/index.vue"
          ),
        name: "fileManagement",
        meta: {
          title: "fileManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "inspectionRecords",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/inspectionRecords/index.vue"
          ),
        name: "inspectionRecords",
        meta: {
          title: "inspectionRecords"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "lostRecord",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/lostRecord/index.vue"
          ),
        name: "lostRecord",
        meta: {
          title: "lostRecord"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "scrapRecord",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/scrapRecord/index.vue"
          ),
        name: "scrapRecord",
        meta: {
          title: "scrapRecord"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "diversionManage",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/equipmentArchives/diversionManage/index.vue"
          ),
        name: "diversionManage",
        meta: {
          title: "diversionManage"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: "/rightsManagement",
    component: Layout,
    redirect: "/rightsManagement/administratorManagement",
    meta: {
      title: "rightsManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "administratorManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/administratorManagement/index.vue"
          ),
        name: "administratorManagement",
        meta: {
          title: "administratorManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "administratorLogs",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/administratorLogs/index.vue"
          ),
        name: "administratorLogs",
        meta: {
          title: "administratorLogs"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "characterGroup",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/characterGroup/index.vue"
          ),
        name: "characterGroup",
        meta: {
          title: "characterGroup"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
];

export default businessRouter;
