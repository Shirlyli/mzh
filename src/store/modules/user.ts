import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import { login, logout, getUserInfo } from "@/api/users";
import { getToken, setToken, removeToken } from "@/utils/cookies";
import router, { resetRouter } from "@/router";
import { PermissionModule } from "./permission";
import { TagsViewModule } from "./tags-view";
import store from "@/store";
import { queryLeftMenuData } from "@/api/basic";

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  email: string;
  loginForm: object;
  menu: any;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public token = "";
  public name = "";
  public avatar = "";
  public introduction = "";
  public roles: string[] = [];
  public email = "";
  public loginForm = {};
  public menu = [];
  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Mutation
  private SET_LOGIN_FORM(loginForm: object) {
    this.loginForm = loginForm;
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email;
  }

  @Mutation
  private SET_MENU(menu: []) {
    this.menu = menu;
  }

  @Action
  public async Login(userInfo: any) {
    this.SET_LOGIN_FORM(userInfo);
    let { userName, userPwd } = userInfo;
    userName = userName.trim();
    const { data } = await login({ userName, userPwd });
    console.log("🚀 ~ data", data);
    setToken(data.token);
    this.SET_TOKEN(data.token);
  }

  @Action
  public async GetMenu() {
    const { data } = await queryLeftMenuData({});
    console.log("🚀 ~ data", data);
    this.SET_MENU(data)
  }

  @Action
  public ResetToken() {
    removeToken();
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }

  @Action({ rawError: true })
  public async GetUserInfo() {
    if (this.token === "") {
      throw Error("GetUserInfo: token is undefined!");
    }
    const state = JSON.parse(sessionStorage.getItem("state") || "0");
    const res = await getUserInfo(this.loginForm);
    console.log("🚀 ~ GetUserInfo ~ res", res);
    if (!res.data) {
      throw Error("Verification failed, please Login again.");
    }
    const { roles, userName } = res.data;
    // roles must be a non-empty array
    // if (!roles || roles.length <= 0) {
    //   throw Error('GetUserInfo: roles must be a non-null array!')
    // }
    this.SET_ROLES(["admin"]);
    this.SET_NAME(userName);
    this.SET_AVATAR("");
    this.SET_INTRODUCTION("");
    this.SET_EMAIL("");
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + "-token";
    this.SET_TOKEN(token);
    setToken(token);
    await this.GetUserInfo();
    resetRouter();
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles);
    // Add generated routes
    PermissionModule.dynamicRoutes.forEach(route => {
      router.addRoute(route);
    });
    // Reset visited views and cached views
    TagsViewModule.delAllViews();
  }

  @Action
  public async LogOut() {
    if (this.token === "") {
      throw Error("LogOut: token is undefined!");
    }
    await logout();
    removeToken();
    resetRouter();

    // Reset visited views and cached views
    TagsViewModule.delAllViews();
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }
}

export const UserModule = getModule(User);
