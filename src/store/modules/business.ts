import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import { Route } from "vue-router";
import store from "@/store";
import { queryDepartmentInfoTree } from "@/api/basic";
export interface BusinessState {
  departmentData: any;
}

@Module({ dynamic: true, store, name: "businessView" })
class BusinessView extends VuexModule implements BusinessState {
  public departmentData: any = [];//科室数据

  @Mutation
  private SET_DEPARTMENT_DATA(view: any) {
    this.departmentData = view
  }

  @Action
  public async GET_DEPARTMENT_DATA() {
    const res: any = await queryDepartmentInfoTree({});
    res.code == 200 && this.SET_DEPARTMENT_DATA(res.data[0].children);
  }
}

export const BusinessViewModule = getModule(BusinessView);
