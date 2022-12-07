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
