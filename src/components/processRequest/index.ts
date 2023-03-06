import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  saveProcessApply
} from '../../api/basic'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import { APPLY_URL, ALL_OPTIONS } from '@/shared/options'
import Treeselect from '@riophae/vue-treeselect'
import { BusinessViewModule } from '../../store/modules/business'

@Component({
  name: 'processRequest',
  components: {
    Treeselect
  }
})
export default class extends Vue {
  public rules = {};
  mounted() {
    // console.log(
    //   BusinessViewModule.departmentData,
    //   BusinessViewModule.employeeData
    // )
  }

  public path = this.$route.path;
  public query = this.$route.query;
  public filterByDepartEquipmentData = []

  /********************************************
   * 待新增的设备params
   *******************************************/
  public addEquipment = [
    {
      field: 'equipmentId',
      title: '设备名称',
      span: 12,
      type: 'select',
      required: true,
      data: []
    },
    {
      field: 'unit',
      title: '设备单位',
      span: 12,
      type: 'input'
    },
    {
      field: 'equipmentNum',
      title: '设备数量',
      span: 12,
      type: 'input'
    },
    {
      field: 'price',
      title: '设备价格',
      span: 12,
      type: 'input'
    },
    {
      field: 'isImport',
      title: '是否进口',
      span: 12,
      type: 'select',
      data: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  ];

  public addInventoryEquipment = [
    {
      field: 'equipmentId',
      title: '设备名称',
      span: 12,
      type: 'treeSelect',
      required: true,
      data: BusinessViewModule.equipmentData
    },
    {
      field: 'currentStatus',
      title: '当前状态',
      span: 12,
      type: 'select',
      data: ALL_OPTIONS.equipmentStates
    },
    {
      field: 'checkStatus',
      title: '盘点状态',
      span: 12,
      type: 'select',
      data: ALL_OPTIONS.equipmentStates
    }
  ];

  /**********************
   * form表单
   *********************/
  public watchRequestForm: any =
    BusinessViewModule.processRequestForm[this.query.moduleType];

  /**********************
   * 保存接口params
   *********************/
  public requestParams: any =
    BusinessViewModule.processRequestParams[this.query.moduleType];

  /**************
   * 监听科室变化
   *************/
  @Watch('requestParams.billMain.checkDepartment', { immediate: true })
  public async onChangeRequestParams(formValue: any) {
    // console.log('🚀 ~ 监听科室变化formValue', formValue)
    if (formValue) {
      try {
        const res: any = await getEquipmentInfoByDepartmentId({
          page: '1',
          limit: '10',
          entity: {
            departmentId: formValue,
            equipmentCategoryId: this.requestParams.billMain?.equipmentCategory
          }
        })
        if (res.code === 200) {
          this.chooseEquipmentData = res.data.map((item: any) => {
            return { ...item, ...item.equipmentVO }
          })
          this.$forceUpdate()
        }
      } catch (err) {
        console.log('err', err)
      }
    }
  }

  @Watch('requestParams.billMain.rollOutDepartment', { immediate: true })
  @Watch('requestParams.billMain.useDepartmentId', { immediate: true })
  @Watch('requestParams.billMain.transferDepartmentId', { immediate: true })
  @Watch('requestParams.billMain.borrowDepartmentId', { immediate: true })

  public async onChangeDepartment(formValue: any) {
    // console.log('🚀 ~ 监听科室变化', formValue, this.watchRequestForm)
    if (formValue) {
      const res: any = await getEquipmentInfoByDepartmentId({
        page: '1',
        limit: '10',
        entity: {
          departmentId: formValue
        }
      })
      if (res.code === 200) {
        this.filterByDepartEquipmentData = res.data.map((equip: any) => {
          return {
            equipmentVO: equip.equipmentVO,
            label: equip.equipmentVO.name,
            value: equip.equipmentVO.id
          }
        })
        this.watchRequestForm.billEquipmentList.forEach((item) => {
          if (item.length) {
            item.forEach(i => {
              if (i) {
                i.data = this.filterByDepartEquipmentData
              }
            })
          }
        })

        this.$forceUpdate()
      }
    }
  }

  /****************************
   * 监听设备类别变化
   ***************************/
  @Watch('requestParams.billMain.equipmentCategory', {
    immediate: true,
    deep: true
  })
  public async onChangeEquipmentId(equipmentCategoryId: any) {
    if (equipmentCategoryId) {
      console.log(
        '🚀 ~ 监听设备类别变化',
        equipmentCategoryId,
        '🚀 ~ form表单数据',
        this.watchRequestForm
      )
      const res: any = await getEquipmentInfoByDepartmentId({
        page: '1',
        limit: '10',
        entity: {
          departmentId: this.requestParams.billMain?.checkDepartment,
          equipmentCategoryId: equipmentCategoryId
        }
      })
      if (res.code === 200) {
        this.chooseEquipmentData = res.data.map((item: any) => {
          return { ...item, ...item.equipmentVO }
        })
        this.$forceUpdate()
      }
    }
  }

  /*******************************************
   * 新增流程申请
   ******************************************/
  public async createProcess() {
    (this.$refs as any).requestParams.validate(async(valid: any) => {
      const applyUrl: any = this.$route.query.applyUrl
      if (valid && applyUrl) {
        const params = this.requestParams
        const billApproveList: any = []
        billApproveList.push({ ...params.billApproveList, optType: 'add' })
        const sendParams: any = []
        sendParams.push({
          ...params,
          status: '1',
          billMain: {
            ...params.billMain,
            applyDept: this.path.indexOf('PDSQ')
              ? ''
              : params.billMain.applyDeptName,
            departmentId:
              params.billMain.departmentName ||
              params.billMain.applyDept ||
              params.billMain.departmentId
          },
          billEquipmentList: params.billEquipmentList.map((item: any) => {
            return { ...item, price: Number(item.price) }
          }),
          billApproveList
        })
        // console.log('🚀 ~ 提交 sendParams', sendParams)
        const res: any = await saveProcessApply(
          (APPLY_URL as any)[applyUrl],
          sendParams
        )
        if (res.code === 200) {
          this.$message.success('发起流程申请成功')
          this.closeSelectedTag({ path: `/processRequest/index/${applyUrl}` })
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  /*******************************
   * 取消流程
   *****************************/
  public cancelProcess() {
    this.closeSelectedTag({
      path: `/processRequest/index/${this.$route.query.applyUrl}`
    })
  }

  /*******************************
   * 保存流程
   *****************************/
  public saveProcess() {
    (this.$refs as any).requestParams.validate(async(valid: any) => {
      const applyUrl: any = this.$route.query.applyUrl
      if (valid && applyUrl) {
        const params = this.requestParams
        // const billApproveList: any = []
        // billApproveList.push(params.billApproveList)
        const sendParams: any = []
        sendParams.push({
          ...params,
          status: '0',
          billMain: {
            ...params.billMain,
            applyDept: params.billMain.applyDeptName,
            departmentId:
              params.billMain.departmentName || params.billMain.applyDept
          },
          billEquipmentList: params.billEquipmentList.map((item: any) => {
            return { ...item, price: Number(item.price) }
          }),
          billApproveList: []
        })
        // console.log('🚀 ~ 保存 sendParams', sendParams)
        const res: any = await saveProcessApply(
          (APPLY_URL as any)[applyUrl],
          sendParams
        )
        if (res.code === 200) {
          this.$message.success('保存流程申请成功')
          this.closeSelectedTag({ path: `/processRequest/index/${applyUrl}` })
        }
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  /******************************
   * 完成申请后关闭当前tag页
   * @param view
   *****************************/
  public closeSelectedTag(view: any) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  public toLastView(visitedViews: any[], view: any) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch((err: any) => {
        console.warn(err)
      })
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router
          .replace({ path: '/redirect' + view.fullPath })
          .catch((err: any) => {
            console.warn(err)
          })
      } else {
        this.$router
          .push((UserModule.menu as any)[0]?.path)
          .catch((err: any) => {
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
    if (this.path.indexOf('PDSQ') > -1) {
      this.inventoryDialogVisible = true
      return
    }
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

  public pushData() {
    this.$nextTick(() => {
      this.addEquipment[0].data = this.filterByDepartEquipmentData
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

  public inventoryDialogVisible = false; // 盘点设备弹框显隐
  public chooseEquipmentData = []; // 待选中设备列表
  public selectRow: any = []; // 选中设备
  /****************************************
   * 盘点新增设备
   * 弹出设备列表选中
   **************************************/
  public selectChangeEvent({ checked }) {
    const records = this.$refs.xTable1.getCheckboxRecords()
    this.selectRow = records
  }

  public selectAllEvent({ checked }) {
    const records = this.$refs.xTable1.getCheckboxRecords()
    this.selectRow = records
  }

  // 确认新增设备盘点
  public submitChooseEquipment() {
    this.inventoryDialogVisible = false
    const selectParamsData = this.selectRow.map(item => {
      return {
        id: '',
        billId: '',
        name: item.name,
        equipmentId: item.id,
        currentStatus: '',
        checkStatus: ''
      }
    })

    const selectedRequestForm: any = []
    for (let i = 0; i < selectParamsData.length; i++) {
      selectedRequestForm.push(this.addInventoryEquipment)
    }
    this.watchRequestForm.billEquipmentList = selectedRequestForm
    this.requestParams.billEquipmentList = [...selectParamsData]
  }

  /**********************************************
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取节点人员权限列表 queryUserListProcessCode
   ***********************************************/
  public applyDeptData: any = []; // 科室数据
  public nextNodeExecutorData: any = []; // 下一节点执行人
  public applyDetailData: any = []; // 设备列表

  created() {
    const applyUrl: any = this.$route.query.applyUrl
    const processCode: string = this.requestParams.billApproveList.processCode
    if (processCode) { this.queryCodeDataFirst(processCode) }
  }

  /**************************
   * 获取节点信息
   *************************/
  public async queryCodeDataFirst(code: string) {
    try {
      const currentCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
        processCode: code,
        nodeSort: 1
      })
      if (currentCodeData.code === 200) {
        const { nodeName, nodeNameCode, nodeSort } = currentCodeData.data
        this.requestParams.billApproveList = {
          ...this.requestParams.billApproveList,
          currentNodeName: nodeName,
          currentNodeCode: nodeNameCode
        }
        this.queryProcessCodeAndBhResData(nodeSort, code)
        this.queryUserListProcessCode(nodeSort, code)
      }
    } catch (err) {
      console.log('🚀 ~ err', err)
    }
  }

  /**************************
   * 获取下一节点信息
   ************************/
  public async queryProcessCodeAndBhResData(nodeSort: any, code: string) {
    try {
      const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
        processCode: code,
        nodeSort: nodeSort + 1
      })
      if (nextCodeData.code === 200) {
        const { nodeName, nodeNameCode } = nextCodeData.data
        this.requestParams.billApproveList = {
          ...this.requestParams.billApproveList,
          nextNodeName: nodeName,
          nextNodeCode: nodeNameCode
        }
      }
    } catch (err) {
      console.log('🚀 ~ err', err)
    }
  }

  /**************************
   * 获取下一节点操作人
   * @param nodeSort
   * @param code
   *************************/
  public async queryUserListProcessCode(nodeSort: number, code: string) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: code,
      nodeSort: nodeSort + 1
    })
    if (nextNodeExecutorData.code === 200) {
      this.requestParams.billApproveList = {
        ...this.requestParams.billApproveList,
        nextNodeExecutor: nextNodeExecutorData.data[0].user_id
      }
    }
  }

  /***************************
   * 科室查询筛选逻辑
   **************************/

  /********************************************
   * 待新增的设备params
   *******************************************/
  public addFileForm = [
    {
      field: 'fileName',
      title: '文件名',
      span: 8,
      type: 'input',
      required: true
    },
    {
      field: 'applyPerson',
      title: '提交人',
      span: 8,
      type: 'select',
      data: BusinessViewModule.employeeData
    }
  ];

  public addNewFile() {
    const attrLength = this.watchRequestForm.dicAttachmentsList.length
    if (attrLength !== 0) {
      if (
        this.watchRequestForm.dicAttachmentsList[attrLength - 1].attrKey ===
          '' ||
        this.watchRequestForm.dicAttachmentsList[attrLength - 1].attrValue ===
          ''
      ) {
        this.$message.warning('请填写上一属性完整后再新增')
      } else {
        this.pushFileData()
      }
    } else {
      this.pushFileData()
    }
  }

  public pushFileData() {
    this.$nextTick(() => {
      this.watchRequestForm.dicAttachmentsList.push(this.addFileForm)
      this.requestParams.dicAttachmentsList.push({
        id: '',
        fileName: '',
        applyPerson: ''
      })
    })
    this.$forceUpdate() // 强制刷新，解决页面不会重新渲染的问题
  }
}
