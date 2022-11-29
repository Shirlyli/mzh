import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { RouteConfig } from "vue-router";
import { asyncRoutes, constantRoutes } from "@/router";
import store from "@/store";
import { queryLeftMenuData } from "@/api/basic";
import Layout from "@/layout/index.vue";
import { Message } from "element-ui";
const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
};

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = [];
  routes.forEach(route => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

export function generaMenu(routes: any, data: any) {
  //data挨个遍历
  data.forEach((item: any) => {
    //path不为空的话，就新建一个对象，装数据
    if (item.basicData.mUrl !== "") {
      //这个就仿照目录的机构，搭建
      const menu: any = {
        path: item.basicData.mUrl,
        component: Layout, //这个不用写data里面的内容，引用就行了
        redirect: item.basicData.mUrl,
        children: [],
        name: item.name,
        meta: item.meta
      };
      //遍历子标签，并加入到主目录的children中去
      item.children.forEach((item: any) => {
        const menu2 = {
          path: item.basicData.mUrl,
          component: (resolve: any) =>
            require([`@/views${item.component}`], resolve),
          name: item.name,
          meta: item.meta
        };
        //加入到主目录的children中去
        menu.children.push(menu2);
      });
      //追加
      routes.push(menu);
    }
  });
  //把404加到最后，因为作者说  // 404 page must be placed at the end !!!
  const menu3 = {
    path: "*",
    redirect: "/404",
    hidden: true
  };
  //追加
  routes.push(menu3);
}
@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes;
        console.log("🚀 ~ asyncRoutes", asyncRoutes);
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        console.log("🚀 ~ accessedRoutes", accessedRoutes);
      }
      this.SET_ROUTES(accessedRoutes);
      // 【新加入】开始
      const loadMenuData: any = [];
      queryLeftMenuData({}).then((response: any) => {
        console.log("🚀 ~ response", response);
        let data = response;
        //我的code为100200为正常
        if (response.code !== 200) {
          Message({ type: "error", message: "菜单数据加载异常" });
        } else {
          //获取目录的json
          data = response.data[0].children;
          //把data的数据拷贝到loadMenuData里面
          Object.assign(loadMenuData, data);
          //把asyncRoutes的数据拷贝到tempAsyncRoutes里面
          const tempAsyncRoutes = Object.assign([], asyncRoutes);
          // 最最重要的，把loadMenuData追加到tempAsyncRoutes后面
          generaMenu(tempAsyncRoutes, loadMenuData);
          //定义accessedRoutes
          let accessedRoutes;
          // 把 tempAsyncRoutes 的值给 accessedRoutes ，并输出
          // eslint-disable-next-line prefer-const
          accessedRoutes = tempAsyncRoutes || [];
          //下面这些就是加载目录了
          // this.SET_ROUTES(accessedRoutes);
          resolve(accessedRoutes);
        }
      });
    }).catch(error => {
      console.log("🚀 ~ error", error);
    });
  }
}

export const PermissionModule = getModule(Permission);
