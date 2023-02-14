import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { getEquipmentData, getUserDataByDeptId, queryDepartmentInfoTree } from '@/api/basic'
export interface BusinessState {
  departmentData: any
  equipmentData: any
}

@Module({ dynamic: true, store, name: 'businessView' })
class BusinessView extends VuexModule implements BusinessState {
  public departmentData: any = []; // 科室数据
  public equipmentData: any = []; // 设备数据
  public processClickProcessData: any = {}; // 各个流程的点击数据
  public processRequestForm: any = {}; // 各个流程的流程form表单渲染数据
  public processRequestParams: any = {}; // 各个流程的params数据
  public processEquipmentCategoryData: any = {};// 新增设备的params数据
  public employeeData = [];// 员工数据
  @Mutation
  private SET_DEPARTMENT_DATA(view: any) {
    this.departmentData = view
  }

  @Mutation
  private SET_EQUIPMENT_DATA(view: any) {
    this.equipmentData = view
  }

  @Mutation
  private SET_PROCESS_CLICKDATA(views:any) {
    this.processClickProcessData[views.type] = views.data
  }

  @Mutation
  private SET_PROCESS_REQUESTFORM(views:any) {
    this.processRequestForm[views.type] = views.data
  }

  @Mutation
  private SET_PROCESS_REQUESTPARAMS(views:any) {
    this.processRequestParams[views.type] = views.data
  }

  @Mutation
  private SET_PROCESS_EQUIPMENT_CATEGORY_DATA(views:any) {
    this.processEquipmentCategoryData[views.type] = views.data
  }

  @Mutation
  private SET_EMPLOYEE_DATA(views:any) {
    this.employeeData = views
  }

  @Action
  public async GET_DEPARTMENT_DATA() {
    const res: any = await queryDepartmentInfoTree({})
    const newRes = res.data?.[0]?.children?.map((dept: any) => {
      return { ...dept, label: dept.title, value: dept.id }
    })
    res.code === 200 && this.SET_DEPARTMENT_DATA(newRes)
  }

  @Action
  public async GET_EQUIPMENT_DATA(
    departmentId: any,
    page: number,
    limit: number
  ) {
    const res: any = await getEquipmentData({
      page,
      limit,
      entity: { departmentId }
    })
    const newRes = res.data.map((dept: any) => {
      return { ...dept, label: dept.name, value: dept.id, ...dept.equipmentVO }
    })
    res.code === 200 && this.SET_EQUIPMENT_DATA(newRes)
  }

  @Action
  public GET_PROCESS_CLICKDATA(views) {
    this.SET_PROCESS_CLICKDATA(views)
  }

  @Action
  public GET_PROCESS_REQUESTFORM(views) {
    this.SET_PROCESS_REQUESTFORM(views)
  }

  @Action
  public GET_PROCESS_REQUESTPARAMS(views) {
    this.SET_PROCESS_REQUESTPARAMS(views)
  }

  @Action
  public GET_PROCESS_EQUIPMENT_CATEGORY_DATA(views) {
    this.SET_PROCESS_EQUIPMENT_CATEGORY_DATA(views)
  }

  @Action
  public async GET_EMPLOYEE_DATA() {
    const resUserData: any = await getUserDataByDeptId({
      page: 1,
      limit: 10,
      entity: {
        deptId: '001'
      }
    })
    const newRes = resUserData.data.map((dept: any) => {
      return { ...dept, label: dept.eName, value: dept.id }
    })
    resUserData.code === 200 ? this.SET_EMPLOYEE_DATA(newRes) : this.SET_EMPLOYEE_DATA([])
  }
}

export const BusinessViewModule = getModule(BusinessView)
