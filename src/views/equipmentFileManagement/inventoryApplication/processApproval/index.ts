import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryProcessData,
  saveProcessApply
} from '@/api/basic'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import { Form, Message } from 'element-ui'
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import moment from 'moment'
import { APPLY_URL } from '../../../../shared/options'
import ProcessOperationRecord from '@/components/processOperationRecord/index.vue'
import { BusinessViewModule } from '../../../../store/modules/business'

@Component({
  name: 'processApproval',
  components: {
    ProcessOperationRecord
  }
})
export default class extends Vue {
  public moment = moment;
  public lodash = _;
  private isPSJD = this.$route.path.indexOf('PSJD') > -1;
  // TODO:换成从store获取
  public processData = BusinessViewModule.processClickProcessData.purchase; // 流程数据

  public watchRequestForm = BusinessViewModule.processRequestForm.purchase; // 流程表单配置数据columns

  public submitVisible = false; // 同意
  @Watch('submitVisible')
  private onSubmitVisible(value: any) {
    if (value) {
      this.handleSubmit()
    }
  }

  public backVisible = false; // 退回
  @Watch('backVisible')
  private onBackVisible(value: any) {
    if (value) {
      this.handleBack()
    }
  }

  public endVisible = false; // 终止
  @Watch('endVisible')
  private onEndVisible(value: any) {
    if (value) {
      this.handleEnd()
    }
  }

  private type = 'submit'; // 审批类型-通过，终止
  private title = '流程审批';

  /**********************
   * 保存接口params
   *********************/
  public requestParams: any = BusinessViewModule.processRequestParams.purchase;

  public rules = {};
  public nextNodeNameData: any = {}; // 下一节点名称
  public nextNodeExecutorData: any = {}; // 下一节点处理人
  public nodeExecutorData: any = []; // 当前节点处理人
  public allProcessList: any = []; // 所有流程节点
  public equipmentProcessData = {
    nextNodeName: '',
    nextNodeCode: '',
    currentNodeCode: '',
    currentNodeName: '',
    nextNodeExecutor: '',
    auditReason: ''
  };

  /**************************************************
   * 获取当前节点信息，并根据当前节点信息获取下一节点信息数据
   * @param nodeNameCode
   * @param type
   **************************************************/
  private async queryCurrentCodeAndBhResData(nodeNameCode: any, type: string) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeNameCode
    })
    if (nextCodeData.code === 200 && type === 'submit') {
      this.equipmentProcessData.currentNodeCode =
        nextCodeData.data.nodeNameCode
      this.equipmentProcessData.currentNodeName = nextCodeData.data.nodeName
      this.queryUserListProcessCode(nextCodeData.data.nodeSort)
      this.queryNextCodeAndBhResData(nextCodeData.data.nodeSort)
      this.title = '审批同意'
      this.type = 'submit'
    } else if (nextCodeData.code === 200 && type === 'end') {
      this.equipmentProcessData.currentNodeCode =
        nextCodeData.data.nodeNameCode
      this.equipmentProcessData.currentNodeName = nextCodeData.data.nodeName
      this.type = 'end'
      this.title = '终止流程'
    } else {
      Message.error('获取节点信息失败，请重试')
    }
  }

  /****************************************************
   * 获取下一节点
   ***************************************************/
  private async queryNextCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (nextCodeData.code === 200) {
      this.nextNodeNameData = nextCodeData.data
      this.equipmentProcessData.nextNodeName = nextCodeData.data.nodeName
      this.equipmentProcessData.nextNodeCode = nextCodeData.data.nodeNameCode
    }
  }

  /****************************************************
   * 获取权限处理人
   ***************************************************/
  private async queryUserListProcessCode(nodeSort: number, type?: string) {
    const executorData: any = await getUserListProcessCode({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1
    })
    if (executorData.code === 200) {
      if (type) {
        this.nodeExecutorData = executorData.data
      } else {
        this.nextNodeExecutorData = executorData.data
      }
    }
  }

  // 审核同意点击事件
  private handleSubmit() {
    const { nextNodeCode } = this.$route.query
    this.queryCurrentCodeAndBhResData(nextNodeCode, 'submit')
  }

  /****************************************************
   * 确认流程处理 /api/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
   ***************************************************/
  public async handleSubmitProcess() {
    const { processCode } = this.$route.query
    const applyUrl: any = this.$route.query.applyUrl
    const params = this.requestParams
    console.log('🚀 ~ params', params)
    if (this.type === 'submit') {
      (this.$refs.equipmentProcessData as any).validate(async(valid: any) => {
        if (valid) {
          const sendParams: any = []
          const billApproveList = [
            {
              ...this.equipmentProcessData,
              processCode,
              optType: 'update',
              id: params.billApproveList[0]?.id,
              auditStatus: '审核通过' // 审核状态(审核通过,审核不通过，回退,作废)
            }
          ]
          if (this.equipmentProcessData.nextNodeCode === 'end') {
            sendParams.push({
              ...params,
              status: '2',
              billMain: {
                ...params.billMain,
                status: '2',
                departmentId:
                  params.billMain.departmentName || params.billMain.applyDept
              },
              billEquipmentList: params.billEquipmentList,
              billApproveList
            })
          } else {
            sendParams.push({
              ...params,
              billMain: {
                ...params.billMain,
                departmentId:
                  params.billMain.departmentName || params.billMain.applyDept
              },
              billEquipmentList: params.billEquipmentList,
              billApproveList
            })
          }
          console.log('🚀 ~ 保存 sendParams', sendParams)
          const res: any = await saveProcessApply(
            (APPLY_URL as any)[applyUrl],
            sendParams
          )
          if (res.data) {
            this.closeSelectedTag({
              path: `/processApproval/index/${applyUrl}`
            })
          }
          (this.$refs.equipmentProcessData as any).resetFields()
          Message.success('审批成功')
        } else {
          return false
        }
      })
    } else if (this.type === 'end') {
      (this.$refs.equipmentProcessData as any).validate(async(valid: any) => {
        if (valid) {
          const sendParams: any = []
          const billApproveList = [
            {
              ...this.equipmentProcessData,
              processCode,
              optType: 'update',
              // operator: '操作人',
              auditStatus: '作废' // 审核状态(审核通过,审核不通过，回退,作废)
            }
          ]
          sendParams.push({
            ...params,
            billMain: {
              ...params.billMain,
              departmentId:
                params.billMain.departmentName || params.billMain.applyDept
            },
            billEquipmentList: params.billEquipmentList,
            billApproveList
          })
          console.log('🚀 ~ 保存 sendParams', sendParams)
          const res: any = await saveProcessApply(
            (APPLY_URL as any)[applyUrl],
            sendParams
          )
          if (res.data) {
            this.closeSelectedTag({
              path: `/processApproval/index/${applyUrl}`
            })
          }

          (this.$refs.equipmentProcessData as any).resetFields()
          Message.success('终止成功')
        } else {
          return false
        }
      })
    } else if (this.type === 'back') {
      (this.$refs.equipmentProcessData as any).validate(async(valid: any) => {
        console.log('🚀 ~ valid', valid, this.equipmentProcessData)
        if (valid) {
          const billApproveList = [
            {
              ...this.equipmentProcessData,
              processCode,
              optType: 'update',
              // operator: '操作人',
              auditStatus: '回退' // 审核状态(审核通过,审核不通过，回退,作废)
            }
          ]
          const sendParams: any = []
          sendParams.push({
            ...params,
            billMain: {
              ...params.billMain,
              departmentId:
                params.billMain.departmentName || params.billMain.applyDept
            },
            billEquipmentList: params.billEquipmentList,
            billApproveList
          })
          console.log('🚀 ~ 保存 sendParams', sendParams)
          const res: any = await saveProcessApply(
            (APPLY_URL as any)[applyUrl],
            sendParams
          )
          if (res.data) {
            this.closeSelectedTag({
              path: `/processApproval/index/${applyUrl}`
            })
          }
          (this.$refs.equipmentProcessData as any).resetFields()
          Message.success('退回成功')
        } else {
          return false
        }
      })
    }
    this.submitVisible = false
  }

  /*********************************
   * 删除当前选中项
   * @param view
   ********************************/
  private closeSelectedTag(view: any) {
    TagsViewModule.delView(view)
    this.toLastView(TagsViewModule.visitedViews, view)
  }

  private toLastView(visitedViews: any[], view: any) {
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

  /****************************************************
   * 流程审批退回
   ***************************************************/
  private handleBack() {
    this.queryAllProcess()
  }

  /****************************************************
   * 获取所有流程节点,并过滤出回退节点数据
   ***************************************************/
  private async queryAllProcess() {
    const res: any = await queryProcessData({
      processCode: 'pro_kssq'
    })
    const { nextNodeCode } = this.$route.query
    if (res.code === 200) {
      this.allProcessList = res.data
      const dept = _.find(res.data, ['nodeNameCode', nextNodeCode])
      this.nextNodeExecutorData = res.data.slice(0, dept.nodeSort - 1)
      if (!this.nextNodeExecutorData.length) {
        Message.error('流程处于初始节点，无法回退')
      }
      this.equipmentProcessData.nextNodeCode =
        this.nextNodeExecutorData?.[0].nodeNameCode ?? ''
      this.equipmentProcessData.nextNodeName = this.nextNodeExecutorData?.[0].nodeName
      this.queryUserListProcessCode(
        this.nextNodeExecutorData?.[0].nodeSort,
        'back'
      )
      this.type = 'back'
      this.title = '回退流程'
    }
  }

  /****************************************************
   * 退回时选中退回节点，获取节点对应处理人
   ***************************************************/
  public handleNodeChange(value: number) {
    const nodeSort = _.find(this.allProcessList, ['nodeNameCode', value])
      .nodeSort
    this.queryUserListProcessCode(nodeSort - 1, 'back')
  }

  /****************************************************
   * 终止流程
   ***************************************************/
  private handleEnd() {
    this.type = 'end'
    const { nextNodeCode } = this.$route.query
    this.queryCurrentCodeAndBhResData(nextNodeCode, 'end')
  }

  /**************************
   * 附件上传
   *************************/
  public handleRemoveField(file: any, fileList: any) {
    console.log(file, fileList)
  }

  public handlePreview(file: any) {
    console.log(file)
  }

  public handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }

  public beforeRemove(file: any, fileList: any) {
    console.log('🚀 ~ fileList', fileList)
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
