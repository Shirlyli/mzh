<template>
  <div>
    <el-drawer title="流程审批"
               :visible.sync="dialogVisible"
               size="50%"
               @close="handleCancelApproval">

      <!-- 基本信息 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>基本信息</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12"
                  v-for="(item,index) in basicInfo"
                  :key="index">
            <div class="basicBox">
              <span class="title">{{item.title}}:</span>
              <span class="value">{{processData[item.field]}}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 设备明细 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>设备明细</span>
      </div>
      <div>

      </div>

      <!-- 附件信息 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>附件信息</span>
      </div>

      <!-- 操作记录 -->
      <div class="dividerBox">
        <el-divider direction="vertical"></el-divider>
        <span>操作记录</span>
      </div>

      <!-- 操作按钮 -->
      <div>
        <el-row>
          <el-col :span="12"
                  :offset="12">
            <el-button @click="handleSubmit"
                       type="primary">
              {{'审核通过' }}
            </el-button>
            <el-button type="error"
                       @click="handleCancel">
              {{ '审核不通过' }}
            </el-button>
            <el-button type="error"
                       @click="handleEnd">
              {{ '终止' }}
            </el-button>
          </el-col>
        </el-row>
      </div>

    </el-drawer>

    <!--  -->
    <el-dialog :title="title"
               :visible.sync="nextDialogVisible"
               width="30%">
      <div v-if="type=='submit'">
        <el-form ref="dataForm"
                 :rules="rules"
                 :model="equipmentProcessData"
                 label-position="left"
                 label-width="120px"
                 style="margin-left:20px;">
          <!-- <el-row :gutter="20"> -->
          <!-- <el-col :span="12"> -->
          <el-form-item :label="'下一节点名称'"
                        prop="nextNodeName">
            <span>{{nextNodeNameData.nodeName}}</span>
          </el-form-item>
          <el-form-item :label="'下一节点执行人 '"
                        prop="nextNodeExecutor">
            <span>{{nextNodeExecutorData.user_name}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="type=='end'">
        是否终止该流程？
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleCancelProcess">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubmitProcess">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import {
  delHospitalProcessBusiness,
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryHospitalProcessBusinessUpdate,
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
  private type = 'submit'
  @Prop({ default: false }) dialogVisible!: boolean
  @Watch('dialogVisible')
  private onChangeDialogVisible(value: any) {}
  @Prop() processData!: any
  @Watch('processData')
  private onChangeProcessData(data: any) {
    console.log('🚀 ~ data', data)
  }
  private nextDialogVisible = false
  private title = '流程审批'
  private basicInfo = CREATE_FORM_LIST
  private equipmentProcessData = {
    nextNodeName: '',
    nextNodeExecutor: '',
  }
  private rules = {}
  private nextNodeNameData: any = {} //下一节点名称
  private nextNodeExecutorData: any = {} //下一节点处理人
  created() {}
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

  private handleSubmit() {
    this.queryCurrentCodeAndBhResData(this.processData.nextNodeCode)
    console.log('🚀 ~ this.processData', this.processData)
    this.nextDialogVisible = true
  }

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
}
</script>

<style lang="scss" scoped>
.dividerBox {
  margin: 12px 0;
  .el-divider--vertical {
    background-color: blue;
    width: 2px;
  }
}
.basicBox {
  display: flex;
  margin-bottom: 12px;
  .title {
    width: 100px;
  }
  .value {
    color: #999;
  }
}
.el-drawer__body {
  padding: 0 24px;
}
</style>