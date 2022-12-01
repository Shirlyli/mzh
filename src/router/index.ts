import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
/* Layout */
import Layout from "@/layout/index.vue";
/* Router modules */
import businessRouter from "./modules/business";
Vue.use(VueRouter);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ "@/views/redirect/index.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: { hidden: true }
  },
  {
    path: "/auth-redirect",
    component: () =>
      import(
        /* webpackChunkName: "auth-redirect" */ "@/views/login/auth-redirect.vue"
      ),
    meta: { hidden: true }
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
    meta: { hidden: true }
  },
  {
    path: "/401",
    component: () =>
      import(/* webpackChunkName: "401" */ "@/views/error-page/401.vue"),
    meta: { hidden: true }
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    meta: { hidden: true },
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "profile" */ "@/views/profile/index.vue"),
        name: "Profile",
        meta: {
          title: "profile",
          icon: "user",
          noCache: true
        }
      }
    ]
  }
];

export const asyncRoutes = [
  ...businessRouter
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
