import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import { queryLeftMenuData } from '@/api/basic'
export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
  loginForm: object
  menu: any
  userData: any
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';
  public name = '';
  public avatar = '';
  public introduction = '';
  public roles: string[] = [];
  public email = '';
  public loginForm = {};
  public menu = [];
  public userData = {};
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Mutation
  private SET_LOGIN_FORM(loginForm: object) {
    this.loginForm = loginForm
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Mutation
  private SET_MENU(menu: []) {
    this.menu = menu
  }

  @Mutation
  private SET_USER_DATA(userData: any) {
    this.userData = userData
  }

  @Action
  public async Login(userInfo: any) {
    this.SET_LOGIN_FORM(userInfo)
    let { userName, userPwd } = userInfo
    userName = userName.trim()
    const res: any = await login({ userName, userPwd })
    if (res.code) {
      // localStorage.setItem('userInfo', JSON.stringify(userInfo))
      setToken(res.data.token)
      this.SET_TOKEN(res.data.token)
    }
  }

  @Action
  public async GetMenu() {
    const { data } = await queryLeftMenuData({})
    this.SET_MENU(data)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action({ rawError: true })
  public async GetUserInfo() {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '0')
    console.log('GetUserInfo  === this.token', this.token, JSON.parse(sessionStorage.getItem('store')))
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const res = await getUserInfo(this.loginForm)
    console.log('🚀 ~ res', res, 'this.token', this.token)
    if (!res.data) {
      throw Error('Verification failed, please Login again.')
    }
    this.SET_USER_DATA(res.data)
    this.SET_ROLES([res.data.userName])
    this.SET_NAME(res.data.userName)
    this.SET_AVATAR('')
    this.SET_INTRODUCTION('')
    this.SET_EMAIL('')
    this.SET_TOKEN(res.data.token)
    sessionStorage.setItem('store', JSON.stringify(res.data))
  }

  @Action
  public async ChangeRoles(role: string) {
    console.log('🚀 ~ ChangeRoles')
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    PermissionModule.dynamicRoutes.forEach(route => {
      router.addRoute(route)
    })
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    console.log('this.token', this.token)
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
