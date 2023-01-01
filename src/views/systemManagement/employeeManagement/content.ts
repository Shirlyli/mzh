import { getTableDataList } from '@/api/equipment'
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import _ from 'lodash'
import { Message } from 'element-ui'
@Component({
  name: 'Content',
  components: {}
})
export default class extends Vue {
  @Prop() paramsConfig!: any;
  @Watch('paramsConfig', { immediate: true, deep: true })
  private onParamsConfigChange(newData: any) {
    this.findList(newData)
  }

  private loading = false;
  private employeeData: any = []; // 获取到的员工数据
  private clickPersonalData: any = {}; // 当前点击的员工数据
  created() {
    this.findList(this.paramsConfig)
  }

  // 获取列表数据
  private async findList(config: any) {
    console.log('🚀 ~ config ~ 获取列表数据', config)
    this.loading = true
    try {
      const res: any = await getTableDataList(config.url, config.params)
      if (res.result && res.data) {
        this.employeeData = res.data
      } else {
        this.employeeData = []
      }
    } catch (error) {
      console.log('🚀 ~ error', error)
      this.employeeData = []
    }

    this.loading = false
  }

  // 展示用户设置区域
  @Emit()
  emitLoginDialog(rowData: any) {
    return rowData
  }

  private showPersonalLoginDialog(item: any) {
    console.log('🚀 ~ item ~ 展示用户设置区域', item)
    this.clickPersonalData = item
    const newPersonalData = _.map(this.employeeData, function(o: any) {
      if (o.id === item.id) {
        return { ...o, isClick: true }
      }
      return { ...o, isClick: false }
    })
    this.employeeData = newPersonalData
    this.emitLoginDialog(item)
  }

  // 新增员工
  @Emit()
  emitHandleInsert() {
    console.log('新增员工===')
  }

  private insertEmployee() {
    this.emitHandleInsert()
  }

  // 修改员工
  @Emit()
  emitHandleUpdate(rowData:any) {
    return rowData
  }

  private updateEmployee() {
    this.emitHandleUpdate(this.clickPersonalData)
  }

  // 绑定用户设置
  @Emit()
  emitHandleSearch(rowData: any, type:string) {
    console.log('~ 查看员工信息 ~ emitHandleSearch')
    return { rowData, type }
  }

  private searchPersonalDetail() {
    if (!this.clickPersonalData.id) {
      Message.error('请选择员工后进行用户设置')
      return
    }
    this.emitHandleSearch(this.clickPersonalData, 'bind')
  }

  // 删除员工信息
  @Emit()
  emitHandleRemove(rowData: any) {
    return rowData
  }

  private dealEmployeeInfo() {
    if (!this.clickPersonalData.id) {
      Message.error('请选择员工后删除')
      return
    }
    this.emitHandleRemove(this.clickPersonalData)
    // }
  }

  // 查看角色

  private searchRole() {
    if (!this.clickPersonalData.id) {
      Message.error('请选择员工后查看角色')
    }
  }

  // 密码重置
  // private resetPassword() {}

  // 关联角色
  @Emit()
  emitAssociateRole(rowData: any) {
    return rowData
  }

  private associateRole() {
    if (!this.clickPersonalData.id) {
      Message.error('请选择员工后关联角色')
      return
    }
    this.emitAssociateRole(this.clickPersonalData)
  }

  // 解除账号绑定
  private deletePersonalBind() {
    this.emitHandleSearch(this.clickPersonalData, 'unbind')
  }
}
