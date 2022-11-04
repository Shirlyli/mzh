import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
/*
  Note: sub-menu only appear when children.length>=1
  Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
                                 detail see : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
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
    path: '/infrastructure',
    component: Layout,
    redirect: '/infrastructure/dictionaryManagement',
    meta: {
      title: 'infrastructure',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'equipmentCategory',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/equipmentArchives/equipmentCategory/index.vue'
          ),
        name: 'equipmentCategory',
        meta: {
          title: 'equipmentCategory'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dictionaryManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/infrastructure/dictionaryManagement/index.vue'
          ),
        name: 'dictionaryManagement',
        meta: {
          title: 'dictionaryManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },

  // 组织机构管理 OrganizationStructureManagement
  {
    path: '/OrganizationStructureManagement',
    component: Layout,
    redirect:
      '/OrganizationStructureManagement/basicManagementDepartment/addNewEquipment',
    meta: {
      title: 'OrganizationStructureManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      // 医院管理
      {
        path: 'hospitalManagement',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/OrganizationStructureManagement/hospitalManagement/index.vue'
          ),
        name: 'hospitalManagement',
        meta: {
          title: 'hospitalManagement'
          // icon: 'dashboard',
          // affix: true
        }
      },
      // 科室管理 basicManagementDepartment
      {
        path: 'basicManagementDepartment',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/basicManagementDepartment/index.vue'
          ),
        redirect:
          '/OrganizationStructureManagement/basicManagementDepartment/addNewEquipment',
        meta: {
          title: 'basicManagementDepartment',
          // icon: "lock",
          roles: ['admin', 'editor'], // you can set roles in root nav
          alwaysShow: true // will always show the root menu
        },
        children: [
          {
            path: 'addNewEquipment',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '@/views/businessComponents/basicManagementDepartment/addNewEquipment/index.vue'
              ),
            name: 'addNewEquipment',
            meta: {
              title: 'addNewEquipment'
              // icon: 'dashboard',
              // affix: true
            }
          }
        ]
      },
      // 员工管理
      {
        path: 'employeeManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/OrganizationStructureManagement/employeeManagement/index.vue'
          ),
        name: 'employeeManagement',
        meta: {
          title: 'employeeManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 设备档案管理
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
      },
      {
        path: 'departmentClass',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/businessComponents/fileManagement/departmentClass/index.vue'
          ),
        name: 'departmentClass',
        meta: {
          title: 'departmentClass'
          // icon: 'dashboard',
          // affix: true
        }
      }
    ]
  },
  // 设备检维修管理
  {
    path: '/serviceManagement',
    component: Layout,
    redirect: '/serviceManagement/equipmentCategory',
    meta: {
      title: 'serviceManagement',
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
  },
  // 权限管理
  {
    path: '/rightsManagement',
    component: Layout,
    redirect: '/rightsManagement/administratorManagement',
    meta: {
      title: 'rightsManagement',
      icon: 'lock',
      roles: ['admin', 'editor'], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: 'administratorManagement',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/administratorManagement/index.vue'
          ),
        name: 'administratorManagement',
        meta: {
          title: 'administratorManagement'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'administratorLogs',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/administratorLogs/index.vue'
          ),
        name: 'administratorLogs',
        meta: {
          title: 'administratorLogs'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'characterGroup',
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ '@/views/businessComponents/rightsManagement/characterGroup/index.vue'
          ),
        name: 'characterGroup',
        meta: {
          title: 'characterGroup'
          // roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

export default businessRouter
