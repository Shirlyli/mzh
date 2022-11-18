import {
  delHospitalProcessBusiness,
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryHospitalProcessBusinessUpdate,
  queryProcessRecordList,
} from '@/api/basic'
import { Form } from 'element-ui'
import { truncate } from 'lodash'
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
import { CREATE_FORM_LIST } from './formColumns'
@Component({
  name: 'ProcessApproval',
  components: {},
})
export default class extends Vue {
  private type = 'submit' //
  @Prop({ default: false }) dialogVisible!: boolean
  @Watch('dialogVisible')
  private onChangeDialogVisible(value: any) {}
  @Prop() processData!: any
  @Watch('processData')
  private onChangeProcessData(data: any) {
    console.log('🚀 ~ data', data)
    this.queryProcessRecordListData(data)
  }
  private nextDialogVisible = false
  private title = '流程审批'
  private basicInfo = CREATE_FORM_LIST //基本信息
  private equipmentProcessData = {
    nextNodeName: '',
    nextNodeExecutor: '',
  }
  private processRecordListData = [] //操作记录数据
  private rules = {}
  private nextNodeNameData: any = {} //下一节点名称
  private nextNodeExecutorData: any = {} //下一节点处理人
  created() {}
  mounted() {}

  // 获取当前节点信息，并根据当前节点信息获取下一节点信息数据
  private async queryCurrentCodeAndBhResData(nodeNameCode: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeNameCode,
    })
    if (nextCodeData.code == '200') {
      console.log('🚀 ~ nextCodeData', nextCodeData)
      this.queryUserListProcessCode(nextCodeData.data.nodeSort)
      this.queryNextCodeAndBhResData(nextCodeData.data.nodeSort)
    }
  }
  /**
   * 获取下一节点
   */
  private async queryNextCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1,
    })
    if (nextCodeData.code == '200') {
      this.nextNodeNameData = nextCodeData.data
    }
  }

  /**
   * 获取权限处理人
   */
  private async queryUserListProcessCode(nodeSort: any) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: 'pro_kssq',
      nodeSort: nodeSort + 1,
    })
    if (nextNodeExecutorData.code == '200') {
      this.nextNodeExecutorData = nextNodeExecutorData.data[0]
    }
  }

  // 审核通过点击事件
  private handleSubmit() {
    this.queryCurrentCodeAndBhResData(this.processData.nextNodeCode)
    console.log('🚀 ~ this.processData', this.processData)
    this.nextDialogVisible = true
  }

  // 
  @Emit()
  emitHandleSubmit(value: boolean) {
    console.log('🚀 ~ emitHandleSubmit')
    return value
  }
  
  /**
   * 确认流程处理 /api/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
   */
  private async handleSubmitProcess() {
    const { nextNodeName, nextNodeCode, id } = this.processData

    if (this.type === 'submit') {
      ;(this.$refs.dataForm as Form).validate(async (valid) => {
        this.nextDialogVisible = false
        if (valid) {
          const params = {
            id,
            currentNodeName: nextNodeName,
            currentNodeCode: nextNodeCode,
            nextNodeName: this.nextNodeNameData.nodeName,
            nextNodeCode: this.nextNodeNameData.nodeNameCode,
            nextNodeExecutor:
              this.nextNodeExecutorData.user_id ||
              '0D0228B583E85D-949F-47CF-B9DA-BC532A206EF4',
            operator: '操作人',
          }
          const res: any = await queryHospitalProcessBusinessUpdate(params)
          if (res.result) {
            this.nextDialogVisible = false
            this.emitHandleSubmit(true)
          }
          this.dialogVisible = false
          ;(this.$refs.dataForm as Form).resetFields()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000,
          })
        }
      })
    } else if (this.type === 'end') {
      const res: any = await delHospitalProcessBusiness({ ids: id })
      if (res.result) {
        this.nextDialogVisible = false
        this.emitHandleSubmit(true)
        this.$notify({
          title: '成功',
          message: '删除流程成功',
          type: 'success',
          duration: 2000,
        })
      }
    }
  }

  // 审批通过框
  private handleCancelProcess() {
    this.nextDialogVisible = false
  }

  // 关闭审批流程抽屉事件
  private handleCancelApproval() {
    this.emitHandleSubmit(false)
  }

  /**
   * 流程审批不同意
   */
  private handleCancel() {}

  /**
   * 终止流程
   */
  private handleEnd() {
    this.nextDialogVisible = true
    this.type = 'end'
  }

  // 获取流程操作记录 queryProcessRecordList
  private async queryProcessRecordListData(data: any) {
    const res: any = await queryProcessRecordList({
      businessId: data.id,
    })
    if (res.result) {
      this.processRecordListData = res.data
    }
  }
}