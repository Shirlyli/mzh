import { handleSaveCheckApply } from '@/api/basic'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { EquipmentDetailFormList } from '@/views/equipmentArchives/transferManagement/transferApply/formColumns'
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
@Component({
  name: 'processRequest',
  components: {}
})
export default class extends Vue {
  /********************************************
   * 待新增的设备params
   *******************************************/
  private addEquipment = EquipmentDetailFormList;

  /**********************
   * form表单
   *********************/
  public watchRequestForm: any = JSON.parse(
    sessionStorage.getItem('RequestForm') ?? '0'
  );

  /**********************
   * 保存接口params
   *********************/
  public requestParams: any = JSON.parse(
    sessionStorage.getItem('RequestParams') ?? '0'
  );

  /**************
   * 监听科室变化
   *************/
  @Watch('requestParams.billMain.departmentName', { immediate: true })
  @Watch('requestParams.billMain.applyDept', { immediate: true })
  public async onChangeRequestParams(formValue: any) {
    console.log('🚀 ~ 监听科室变化', formValue)
    if (formValue) {
      const res: any = await getEquipmentInfoByDepartmentId({
        page: '1',
        limit: '10',
        entity: {
          departmentId: formValue
        }
      })
      if (res.code === 200) {
        this.watchRequestForm.billEquipmentList.forEach((item: any) => {
          item.forEach((i: any) => {
            if (i.slot === 'equipment') {
              i.data = res.data.map((equip: any) => {
                return {
                  equipmentVO: equip.equipmentVO,
                  label: equip.equipmentVO.name,
                  value: equip.equipmentVO.id
                }
              })
            }
          })
        })
        this.$forceUpdate()
      }
    }
  }

  /****************************
   * 监听设备变化
   ***************************/
  @Watch('requestParams.billEquipmentList', { immediate: true, deep: true })
  public onChangeEquipmentId(equipmentId: any) {
    console.log('🚀 ~ 监听设备名称变化', equipmentId, '🚀 ~ form表单数据', this.watchRequestForm)
    console.log('🚀 ~ params传参数据', this.requestParams)
  }

  /*******************************************
   * 新增流程申请
   ******************************************/
  public async createProcess() {
    const params = this.requestParams
    const billApproveList: any = []
    billApproveList.push(params.billApproveList)
    const sendParams = []
    sendParams.push({
      ...params,
      billMain: {
        ...params.billMain,
        departmentId: params.billMain.departmentName || params.billMain.applyDept
      },
      billEquipmentList: params.billEquipmentList,
      billApproveList
    })
    console.log('🚀 ~ sendParams', sendParams)
    const res: any = await handleSaveCheckApply(sendParams)
    //  const res: any = await queryHospitalProcessBusinessSave({
    //   ...this.equipmentProcessData
    // }) 科室申请
    if (res.code === 200) {
      this.$message.success('发起申请成功')
      this.closeSelectedTag({ path: '/processRequest/index' })
    }
  }

  public cancelProcess() {
    this.closeSelectedTag({ path: '/processRequest/index' })
  }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  private closeSelectedTag(view: ITagView) {
    console.log('🚀 ~ view', view)
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch(err => {
        console.warn(err)
      })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch(err => {
            console.warn(err)
          })
      } else {
        this.$router.push((UserModule.menu as any)[0]?.path).catch(err => {
          console.warn(err)
        })
      }
    }
  }

  @Emit()
  emitClose() {
    return true
  }

  /**************************************
   * 新增设备
   *************************************/
  public addNewEquipment() {
    console.log(
      '====',
      this.watchRequestForm.billEquipmentList,
      ' this.addEquipment',
      this.addEquipment
    )
    const attrLength = this.watchRequestForm.billEquipmentList.length
    if (attrLength !== 0) {
      if (
        this.watchRequestForm.billEquipmentList[attrLength - 1].attrKey ===
          '' ||
        this.watchRequestForm.billEquipmentList[attrLength - 1].attrValue === ''
      ) {
        this.$message.warning('请填写上一属性完整后再新增')
      } else {
        this.pushData()
      }
    } else {
      this.pushData()
    }
  }

  private pushData() {
    this.$nextTick(() => {
      console.log('🚀 ~ EquipmentDetailFormList', this.addEquipment)

      this.watchRequestForm.billEquipmentList.push(this.addEquipment)
      this.requestParams.billEquipmentList.push({
        id: '',
        billId: '',
        equipmentId: ''
      })
    })
    this.$forceUpdate() // 强制刷新，解决页面不会重新渲染的问题
  }

  /***************************************
   * 移除当前设备行
   * @param label
   * @param index
   **************************************/
  public removeKey(label: any, index: number) {
    console.log('🚀 ~ label', label)
    this.$confirm('此操作将永该, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.watchRequestForm.billEquipmentList.splice(index, 1)
        const loading = this.$loading({
          lock: true,
          text: '正在删除,请稍等',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)'
        })
        // 下面写向后台发送删除属性请求，请求后重新向后台查询form数据
        // 此处不写请求，用setTimeout模拟效果
        setTimeout(() => {
          loading.close()
          this.$message.success('删除成功')
        }, 2000)
      })
      .catch(() => {
        // this.$message({
        //   type: "info",
        //   message: "已取消删除"
        // });
      })
  }
}