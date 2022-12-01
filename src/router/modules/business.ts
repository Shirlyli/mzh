import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

const businessRouter: RouteConfig[] = [
  // 控制台
  // {
  //   path: '/controlPanel',
  //   component: Layout,
  //   // redirect: '/controlPanel',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "dashboard" */ '@/views/businessComponents/controlPanel/index.vue'
  //         ),
  //       name: 'controlPanel',
  //       meta: {
  //         title: 'controlPanel',
  //         icon: 'dashboard'
  //         // affix: true
  //       }
  //     }
  //   ]
  // },
  // 工作台
  {
    path: "/workBench",
    component: Layout,
    redirect: "/workBench/index",
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/workBench/index.vue"
          ),
        name: "workBench",
        meta: {
          title: "workBench",
          icon: "dashboard"
          // affix: true
        }
      }
    ]
  },
  // 数据决策
  // {
  //   path: '/dataDecision',
  //   component: Layout,
  //   // redirect: '/controlPanel',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "dashboard" */ '@/views/businessComponents/dataDecision/index.vue'
  //         ),
  //       name: 'dataDecision',
  //       meta: {
  //         title: 'dataDecision',
  //         icon: 'dashboard'
  //         // affix: true
  //       }
  //     }
  //   ]
  // },

  // 基础数据
  {
    path: "/infrastructure",
    component: Layout,
    redirect: "/infrastructure/dictionaryManagement",
    meta: {
      title: "infrastructure",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
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
        path: "dictionaryManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/infrastructure/dictionaryManagement/index.vue"
          ),
        name: "dictionaryManagement",
        meta: {
          title: "dictionaryManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "supplierManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/infrastructure/supplierManagement/index.vue"
          ),
        name: "supplierManagement",
        meta: {
          title: "supplierManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path:'venderContactorManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/infrastructure/venderContactorManagement/index.vue"
          ),
        name: "venderContactorManagement",
        meta: {
          title: "venderContactorManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path:'contractManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/infrastructure/contractManagement/index.vue"
          ),
        name: "contractManagement",
        meta: {
          title: "contractManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 采购管理
  // {
  //   path: "/purchaseManagement",
  //   component: Layout,
  //   redirect: "/purchaseManagement/procurementProcess",
  //   meta: {
  //     title: "purchaseManagement",
  //     icon: "lock",
  //     roles: ["admin", "editor"], // you can set roles in root nav
  //     alwaysShow: true // will always show the root menu
  //   },
  //   children: [
  //     {
  //       path: "purchasingRecords",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/purchasingRecords/index.vue"
  //         ),
  //       name: "procurementProcess",
  //       meta: {
  //         title: "purchasingRecords"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: "inventoryRecords",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/inventoryRecords/index.vue"
  //         ),
  //       name: "inventoryRecords",
  //       meta: {
  //         title: "inventoryRecords"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: "outboundRecords",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/outboundRecords/index.vue"
  //         ),
  //       name: "outboundRecords",
  //       meta: {
  //         title: "outboundRecords"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: "biddingDocuments",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/purchaseManagement/biddingDocuments/index.vue"
  //         ),
  //       name: "biddingDocuments",
  //       meta: {
  //         title: "biddingDocuments"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // },
  // 组织机构管理
  {
    path: "/OrganizationStructureManagement",
    component: Layout,
    redirect:
      "/OrganizationStructureManagement/basicManagementDepartment/addNewEquipment",
    meta: {
      title: "OrganizationStructureManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      // 医院管理
      {
        path: "hospitalManagement",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/OrganizationStructureManagement/hospitalManagement/index.vue"
          ),
        name: "hospitalManagement",
        meta: {
          title: "hospitalManagement"
          // icon: 'dashboard',
          // affix: true
        }
      },
      // 科室管理 basicManagementDepartment
      {
        path: "basicManagementDepartment",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/basicManagementDepartment/index.vue"
          ),
        redirect:
          "/OrganizationStructureManagement/basicManagementDepartment/addNewEquipment",
        meta: {
          title: "basicManagementDepartment",
          // icon: "lock",
          roles: ["admin", "editor"], // you can set roles in root nav
          alwaysShow: true // will always show the root menu
        },
        children: [
          {
            path: "addNewEquipment",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "@/views/businessComponents/basicManagementDepartment/addNewEquipment/index.vue"
              ),
            name: "addNewEquipment",
            meta: {
              title: "addNewEquipment"
              // icon: 'dashboard',
              // affix: true
            }
          }
        ]
      }
    ]
  },
  // 设备档案管理
  {
    path: "/fileManagement",
    component: Layout,
    redirect: "/fileManagement/equipmentClass",
    meta: {
      title: "fileManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      // 设备树-设备类别分类
      {
        path: "equipmentClass",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/fileManagement/equipmentClass/index.vue"
          ),
        name: "equipmentClass",
        meta: {
          title: "equipmentClass"
          // icon: 'dashboard',
          // affix: true
        }
      },
      // 科室申请 equipmentRequest
      {
        path: "equipmentRequest",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/businessComponents/fileManagement/equipmentRequest/index.vue"
          ),
        name: "equipmentRequest",
        meta: {
          title: "equipmentRequest"
          // icon: 'dashboard',
          // affix: true
        }
      }
      // {
      //   path: "departmentClass",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "dashboard" */ "@/views/businessComponents/fileManagement/departmentClass/index.vue"
      //     ),
      //   name: "departmentClass",
      //   meta: {
      //     title: "departmentClass"
      //     // icon: 'dashboard',
      //     // affix: true
      //   }
      // }
    ]
  },
  // 设备检维修管理
  {
    path: "/serviceManagement",
    component: Layout,
    redirect: "/serviceManagement/equipmentCategory",
    meta: {
      title: "serviceManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
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
  // 权限管理
  // {
  //   path: "/rightsManagement",
  //   component: Layout,
  //   redirect: "/rightsManagement/administratorManagement",
  //   meta: {
  //     title: "rightsManagement",
  //     icon: "lock",
  //     roles: ["admin", "editor"], // you can set roles in root nav
  //     alwaysShow: true // will always show the root menu
  //   },
  //   children: [
  //     {
  //       path: "administratorManagement",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/administratorManagement/index.vue"
  //         ),
  //       name: "administratorManagement",
  //       meta: {
  //         title: "administratorManagement"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: "administratorLogs",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/administratorLogs/index.vue"
  //         ),
  //       name: "administratorLogs",
  //       meta: {
  //         title: "administratorLogs"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: "characterGroup",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "permission-page" */ "@/views/businessComponents/rightsManagement/characterGroup/index.vue"
  //         ),
  //       name: "characterGroup",
  //       meta: {
  //         title: "characterGroup"
  //         // roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     }
  //   ]
  // },
  // 系统管理
  {
    path: "/systemManagement",
    component: Layout,
    redirect: "/systemManagement/menuManagement",
    meta: {
      title: "systemManagement",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "menuManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/systemManagement/menuManagement/index.vue"
          ),
        name: "menuManagement",
        meta: {
          title: "menuManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: "roleManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/systemManagement/roleManagement/index.vue"
          ),
        name: "roleManagement",
        meta: {
          title: "roleManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 用户管理
      {
        path: "personManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/systemManagement/personManagement/index.vue"
          ),
        name: "personManagement",
        meta: {
          title: "personManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // 员工管理
      {
        path: "employeeManagement",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/businessComponents/systemManagement/employeeManagement/index.vue"
          ),
        name: "employeeManagement",
        meta: {
          title: "employeeManagement"
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
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
      }
    ]
  }
];

export default businessRouter;
