import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
const beforeAsyncRoutes: RouteConfig[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/directive",
    meta: {
      title: "permission",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "page",
        component: () =>
          import(
            /* webpackChunkName: "permission-page" */ "@/views/permission/page.vue"
          ),
        name: "PagePermission",
        meta: {
          title: "pagePermission",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "directive",
        component: () =>
          import(
            /* webpackChunkName: "permission-directive" */ "@/views/permission/directive.vue"
          ),
        name: "DirectivePermission",
        meta: {
          title: "directivePermission"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "role",
        component: () =>
          import(
            /* webpackChunkName: "permission-role" */ "@/views/permission/role.vue"
          ),
        name: "RolePermission",
        meta: {
          title: "rolePermission",
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "icons" */ "@/views/icons/index.vue"),
        name: "Icons",
        meta: {
          title: "icons",
          icon: "icon",
          noCache: true
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    meta: {
      title: "example",
      icon: "example"
    },
    children: [
      {
        path: "create",
        component: () =>
          import(
            /* webpackChunkName: "example-create" */ "@/views/example/create.vue"
          ),
        name: "CreateArticle",
        meta: {
          title: "createArticle",
          icon: "edit"
        }
      },
      {
        path: "edit/:id(\\d+)",
        component: () =>
          import(
            /* webpackChunkName: "example-edit" */ "@/views/example/edit.vue"
          ),
        name: "EditArticle",
        meta: {
          title: "editArticle",
          noCache: true,
          activeMenu: "/example/list",
          hidden: true
        }
      },
      {
        path: "list",
        component: () =>
          import(
            /* webpackChunkName: "example-list" */ "@/views/example/list.vue"
          ),
        name: "ArticleList",
        meta: {
          title: "articleList",
          icon: "list"
        }
      }
    ]
  },
  {
    path: "/tab",
    component: Layout,
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "tab" */ "@/views/tab/index.vue"),
        name: "Tab",
        meta: {
          title: "tab",
          icon: "tab"
        }
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    redirect: "noredirect",
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () =>
          import(
            /* webpackChunkName: "error-page-401" */ "@/views/error-page/401.vue"
          ),
        name: "Page401",
        meta: {
          title: "page401",
          noCache: true
        }
      },
      {
        path: "404",
        component: () =>
          import(
            /* webpackChunkName: "error-page-404" */ "@/views/error-page/404.vue"
          ),
        name: "Page404",
        meta: {
          title: "page404",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/error-log",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "log",
        component: () =>
          import(
            /* webpackChunkName: "error-log" */ "@/views/error-log/index.vue"
          ),
        name: "ErrorLog",
        meta: {
          title: "errorLog",
          icon: "bug"
        }
      }
    ]
  },
  {
    path: "/excel",
    component: Layout,
    redirect: "/excel/export-excel",
    meta: {
      title: "excel",
      icon: "excel"
    },
    children: [
      {
        path: "export-excel",
        component: () =>
          import(
            /* webpackChunkName: "export-excel" */ "@/views/excel/export-excel.vue"
          ),
        name: "ExportExcel",
        meta: { title: "exportExcel" }
      },
      {
        path: "export-selected-excel",
        component: () =>
          import(
            /* webpackChunkName: "select-excel" */ "@/views/excel/select-excel.vue"
          ),
        name: "SelectExcel",
        meta: { title: "selectExcel" }
      },
      {
        path: "export-merge-header",
        component: () =>
          import(
            /* webpackChunkName: "merge-header" */ "@/views/excel/merge-header.vue"
          ),
        name: "MergeHeader",
        meta: { title: "mergeHeader" }
      },
      {
        path: "upload-excel",
        component: () =>
          import(
            /* webpackChunkName: "upload-excel" */ "@/views/excel/upload-excel.vue"
          ),
        name: "UploadExcel",
        meta: { title: "uploadExcel" }
      }
    ]
  },
  {
    path: "/zip",
    component: Layout,
    redirect: "/zip/download",
    meta: {
      title: "zip",
      icon: "zip",
      alwaysShow: true // will always show the root menu
    },
    children: [
      {
        path: "download",
        component: () =>
          import(/* webpackChunkName: "zip" */ "@/views/zip/index.vue"),
        name: "ExportZip",
        meta: { title: "exportZip" }
      }
    ]
  },
  {
    path: "/pdf",
    component: Layout,
    redirect: "/pdf/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "pdf" */ "@/views/pdf/index.vue"),
        name: "PDF",
        meta: {
          title: "pdf",
          icon: "pdf"
        }
      }
    ]
  },
  {
    path: "/pdf-download-example",
    component: () =>
      import(
        /* webpackChunkName: "pdf-download-example" */ "@/views/pdf/download.vue"
      ),
    meta: { hidden: true }
  },
  {
    path: "/theme",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "theme" */ "@/views/theme/index.vue"),
        name: "Theme",
        meta: {
          title: "theme",
          icon: "theme"
        }
      }
    ]
  },
  {
    path: "/clipboard",
    component: Layout,
    redirect: "noredirect",
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "clipboard" */ "@/views/clipboard/index.vue"
          ),
        name: "Clipboard",
        meta: {
          title: "clipboard",
          icon: "clipboard"
        }
      }
    ]
  },
  {
    path: "/i18n",
    component: Layout,
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "i18n-demo" */ "@/views/i18n-demo/index.vue"
          ),
        name: "I18n",
        meta: {
          title: "i18n",
          icon: "international"
        }
      }
    ]
  },
  {
    path: "https://github.com/Armour/vue-typescript-admin-template",
    meta: {
      title: "externalLink",
      icon: "link"
    }
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        name: "Documentation",
        meta: { title: "documentation", icon: "documentation", affix: true }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        name: "Guide",
        meta: {
          title: "guide",
          icon: "guide",
          noCache: true
        }
      }
    ]
  }
];

export default beforeAsyncRoutes;

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
