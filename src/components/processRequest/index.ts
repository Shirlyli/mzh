import { getProcessNodeInfoByProcessCodeAndBh, getUserListProcessCode, queryDepartmentInfoTree, saveProcessApply } from '@/api/basic'
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { Component, Vue, Watch, Emit } from 'vue-property-decorator'
import { APPLY_URL } from '@/shared/options'
@Component({
  name: 'processRequest',
  components: {}
})
export default class extends Vue {
  public rules = {};

  /********************************************
   * 待新增的设备params
   *******************************************/
  public addEquipment = [
    {
      field: 'equipmentId',
      title: '设备名称',
      span: 12,
      type: 'input',
      required: true
    },
    {
      field: 'unit',
      title: '设备单位',
      span: 12,
      type: 'input'
    },
    {
      field: 'equipment_num',
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
      field: 'is_import',
      title: '是否进口',
      span: 12,
      type: 'input'
    }
  ];

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
  @Watch('requestParams.billMain.departmentId', { immediate: true })
  @Watch('requestParams.billMain.rollOutDepartment', { immediate: true })
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
    console.log(
      '🚀 ~ 监听设备名称变化',
      equipmentId,
      '🚀 ~ form表单数据',
      this.watchRequestForm
    )
    console.log('🚀 ~ params传参数据', this.requestParams.billMain)
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
        const sendParams = []
        sendParams.push({
          ...params,
          status: '1',
          billMain: {
            ...params.billMain,
            departmentId:
              params.billMain.departmentName || params.billMain.applyDept
          },
          billEquipmentList: params.billEquipmentList,
          billApproveList
        })
        console.log('🚀 ~ 提交 sendParams', sendParams)
        const res: any = await saveProcessApply((APPLY_URL as any)[applyUrl], sendParams)
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
    this.closeSelectedTag({ path: `/processRequest/index/${this.$route.query.applyUrl}` })
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
        const sendParams = []
        sendParams.push({
          ...params,
          status: '0',
          billMain: {
            ...params.billMain,
            departmentId:
              params.billMain.departmentName || params.billMain.applyDept
          },
          billEquipmentList: params.billEquipmentList,
          billApproveList: []
        })
        console.log('🚀 ~ 保存 sendParams', sendParams)
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
  public closeSelectedTag(view: ITagView) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  public toLastView(visitedViews: ITagView[], view: ITagView) {
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
    console.log('🚀 ~ applyUrl', applyUrl)
    const processCode :string = this.requestParams.billApproveList.processCode
    console.log('🚀 ~ processCode', processCode)
    this.queryCodeDataFirst(processCode)
  }

  /**************************
   * 获取节点信息
   *************************/
  public async queryCodeDataFirst(code:string) {
    const currentCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: code,
      nodeSort: 1
    })
    console.log('🚀 ~ currentCodeData', currentCodeData)
    if (currentCodeData.code === 200) {
      const {
        nodeName,
        nodeNameCode,
        nodeSort
      } = currentCodeData.data
      this.requestParams.billApproveList = { ...this.requestParams.billApproveList, currentNodeName: nodeName, currentNodeCode: nodeNameCode }
      this.queryProcessCodeAndBhResData(nodeSort, code)
      this.queryUserListProcessCode(nodeSort, code)
    }
  }

  /**************************
   * 获取下一节点信息
   ************************/
  public async queryProcessCodeAndBhResData(nodeSort: any, code:string) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: code,
      nodeSort: nodeSort + 1
    })
    console.log('🚀 ~ nextCodeData', nextCodeData)
    if (nextCodeData.code === 200) {
      const { nodeName, nodeNameCode } = nextCodeData.data
      this.requestParams.billApproveList = { ...this.requestParams.billApproveList, nextNodeName: nodeName, nextNodeCode: nodeNameCode }
    }
  }

  /**************************
   * 获取下一节点操作人
   * @param nodeSort
   * @param code
   *************************/
  public async queryUserListProcessCode(nodeSort: number, code:string) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: code,
      nodeSort: nodeSort + 1
    })
    console.log('🚀 ~ nextNodeExecutorData', nextNodeExecutorData)
    if (nextNodeExecutorData.code === 200) {
      this.requestParams.billApproveList = { ...this.requestParams.billApproveList, nextNodeExecutor: nextNodeExecutorData.data[0].user_id }
    }
  }
}
