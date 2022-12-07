import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { Route } from 'vue-router'
import store from '@/store'

export interface BusinessState {
  departmentData: any
}

@Module({ dynamic: true, store, name: 'businessView' })
class BusinessView extends VuexModule implements BusinessState {
  public departmentData:any = []

  @Mutation
  private ADD_DEPARTMENT_DATA(view: any) {
    console.log("🚀 ~ view", view)
  }

  @Action
  public async addVisitedView(view: any) {
    this.ADD_DEPARTMENT_DATA(view)
  }
}

export const BusinessViewModule = getModule(BusinessView)
