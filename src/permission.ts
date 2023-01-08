import router, { constantRoutes } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import i18n from '@/lang' // Internationalization
import settings from './settings'
import { getToken } from './utils/cookies'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${settings.title}`
  }
  return `${settings.title}`
}

router.beforeEach(async(to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()
  const hasToken = getToken()
  console.log('to', to)
  console.log('🚀 ~ hasToken', hasToken)
  console.log('🚀 ~ UserModule', UserModule.token)
  // Determine whether the user has logged in
  if (hasToken) {
    console.log('🚀 ~ UserModule', UserModule)
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('🚀 ~ UserModule', UserModule.roles)
      // Check whether the user has obtained his permission roles
      if (UserModule.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await UserModule.GetUserInfo()
          const roles = UserModule.roles
          console.log('🚀 ~ roles', roles)
          // Generate accessible routes map based on role
          PermissionModule.GenerateRoutes(roles)
          console.log('🚀 ~ PermissionModule.dynamicRoutes', PermissionModule.dynamicRoutes)
          // Dynamically add accessible routes
          PermissionModule.dynamicRoutes.forEach(route => {
            router.addRoute(route)
          })
          console.log('🚀 ~ router', router)

          // constantRoutes.forEach(route => {
          //   router.addRoute(route)
          // })
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken();
          (Message as any)({ type: 'error', message: err || 'Has Error' })
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)
})
