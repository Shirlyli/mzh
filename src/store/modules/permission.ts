import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'
import Layout from '@/layout/index.vue'
import { UserModule } from '@/store/modules/user'
import { queryLeftMenuData } from '@/api/basic'
const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]) => {
  const res: RouteConfig[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

export function generaMenu(routes: any, data: any) {
  // data挨个遍历
  data.forEach((item: any) => {
    // path不为空的话，就新建一个对象，装数据
    if (item.path !== '') {
      let menu: any = {}
      // 这个就仿照目录的机构，搭建
      menu = {
        path: `/${item.path}`,
        component: Layout, // 这个不用写data里面的内容，引用就行了
        // redirect: item.redirect,
        children: item.children.length
          ? []
          : [
              {
                path: `/${item.path}`,
                component: (resolve: any) =>
                  require([`@/views${item.component}/index.vue`], resolve),
                name: item.name,
                meta: { ...item.meta, roles: ['admin'] }
              }
            ],
        name: item.name,
        meta: { ...item.meta, roles: ['admin'] }
      }
      // 遍历子标签，并加入到主目录的children中去
      item.children.forEach((i: any) => {
        const menu2 = {
          path: `/${i.path}`,
          component: (resolve: any) =>
            require([`@/views${i.component}/index.vue`], resolve),
          name: i.name,
          meta: { ...i.meta, roles: ['admin'] },
          children: i.children.length
            ? []
            : [
                {
                  path: `${i.path}`,
                  component: (resolve: any) =>
                    require([`@/views${i.component}/index.vue`], resolve),
                  name: i.name,
                  meta: { ...i.meta, roles: ['admin'] }
                }
              ]
        }
        // 遍历二级子标签，并加入到二级目录的children中
        i.children.forEach((o: any) => {
          const menu3 = {
            path: `${o.path}`,
            component: (resolve: any) =>
              require([`@/views${o.component}/index.vue`], resolve),
            name: o.name,
            meta: { ...o.meta, roles: ['admin'] },
            children: o.children.length
              ? []
              : [
                  {
                    path: `${o.path}`,
                    component: (resolve: any) =>
                      require([`@/views${o.component}/index.vue`], resolve),
                    name: o.name,
                    meta: { ...o.meta, roles: ['admin'] }
                  }
                ]
          }
          o.children.forEach((u: any) => {
            const menu4 = {
              path: `${u.path}`,
              component: (resolve: any) =>
                require([`@/views${u.component}/index.vue`], resolve),
              name: u.name,
              meta: { ...u.meta, roles: ['admin'] },
              children: u.children.length
                ? []
                : [
                    {
                      path: `${u.path}`,
                      component: (resolve: any) =>
                        require([`@/views${u.component}/index.vue`], resolve),
                      name: u.name,
                      meta: { ...u.meta, roles: ['admin'] }
                    }
                  ]
            }
            menu3.children.push(menu4)
          })
          menu2.children.push(menu3)
        })
        // 加入到主目录的children中去
        menu.children.push(menu2)
      })
      // 追加
      routes.push(menu)
    }
  })
  // 把404加到最后，因为作者说  // 404 page must be placed at the end !!!
  const menu3 = {
    path: '*',
    redirect: '/404',
    hidden: true
  }
  // 追加
  routes.push(menu3)
}
@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.dynamicRoutes = routes
  }

  @Action
  public async GenerateRoutes(roles: string[]) {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    // 【新加入】开始
    const loadMenuData: any = []
    const data = UserModule.menu
    // 把data的数据拷贝到loadMenuData里面
    Object.assign(loadMenuData, data)
    // 把asyncRoutes的数据拷贝到tempAsyncRoutes里面
    const tempAsyncRoutes = Object.assign([], accessedRoutes)
    // 最最重要的，把loadMenuData追加到tempAsyncRoutes后面
    generaMenu(tempAsyncRoutes, loadMenuData)
    // 定义accessedRoutes
    let newaccessedRoutes
    // 把 tempAsyncRoutes 的值给 accessedRoutes ，并输出
    // eslint-disable-next-line prefer-const
    newaccessedRoutes = tempAsyncRoutes || []
    // 下面这些就是加载目录了
    this.SET_ROUTES(newaccessedRoutes)
    return newaccessedRoutes
    // return new Promise(resolve => {

    //   resolve(newaccessedRoutes)
    // }).catch(error => {
    //   console.log('🚀 ~ error', error)
    // })
  }
}

export const PermissionModule = getModule(Permission)
