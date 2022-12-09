<template>
  <div>
    <el-drawer title="发起申请"
               :visible.sync="visible"
               size="60%"
               @close="handleClose">
      <el-form ref="dataForm"
               :rules="{}"
               :model="{}"
               label-position="left"
               label-width="120px"
               style="margin-left:20px;">

        <!-- 基本信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </div>
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'项目名称'"
                          prop="projectName">
              <el-input v-model="equipmentProcessData.projectName"
                        placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'购置类别'"
                          prop="purchaseType">
              <el-select v-model="equipmentProcessData.purchaseType"
                         placeholder="请选择">
                <el-option key="新增"
                           label="新增"
                           value="新增">
                </el-option>
                <el-option key="复购"
                           label="复购"
                           value="复购">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请科室'"
                          prop="applyDept">
              <el-select v-model="equipmentProcessData.applyDept"
                         placeholder="请选择"
                         @change="changeApplyDept">
                <el-option v-for="item in applyDeptData"
                           :key="item.id"
                           :label="item.title"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'申请方式'"
                          prop="applyModle">
              <el-select v-model="equipmentProcessData.applyModle"
                         placeholder="请选择">
                <el-option key="zcsq"
                           label="正常申请"
                           value="zcsq">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请理由'"
                          prop="applyReson">
              <el-input v-model="equipmentProcessData.applyReson"
                        placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'流程民称'"
                          prop="processCode">
              <el-input v-model="equipmentProcessData.processName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'当前节点名称'"
                          prop="currentNodeName">
              <el-input v-model="equipmentProcessData.currentNodeName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row> -->

        <!-- 设备明细 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>设备明细</span>
        </div>
        <!-- <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'申请设备明细'"
                          prop="applyDetailId">
              <el-select v-model="equipmentProcessData.applyDetailId"
                         placeholder="请选择">
                <el-option v-for="item in applyDetailData"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'附件'"
                          prop="enclosureId">
              <el-upload class="upload-demo"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemoveField"
                         :before-remove="beforeRemove"
                         multiple
                         :limit="3"
                         :on-exceed="handleExceed"
                         :file-list="fileList">
                <el-button size="small"
                           type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'下一节点名称'"
                          prop="nextNodeName">
              <el-input v-model="equipmentProcessData.nextNodeName"
                        placeholder="请输入"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'下一节点执行人 '"
                          prop="nextNodeExecutor">
              <el-select v-model="equipmentProcessData.nextNodeExecutor"
                         placeholder="请选择">
                <el-option :label="item.user_name"
                           :value="item.user_id"
                           v-for="(item) in nextNodeExecutorData"
                           :key="item.user_id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="handleClose"
                   size="large">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   size="large"
                   @click="createData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>

    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'RequestDrawer',
  components: {},
})
export default class extends Vue {
  @Prop() dialogVisible!: boolean
  private visible = false
  @Watch('dialogVisible')
  private onChangeVisible(value: boolean) {
    console.log('🚀 ~ value', value)
    this.visible = value
  }
  @Prop({default:{}}) requestForm!: any
  @Watch('requestForm')

  @Prop({default:{}}) processModal!: any
  @Watch('processModal')
  // 新增流程申请
  private createData() {
    // console.log("🚀 ~ this.equipmentProcessData", this.equipmentProcessData);
    // (this.$refs.dataForm as Form).validate(async valid => {
    //   if (valid) {
    //     const res: any = await queryHospitalProcessBusinessSave({
    //       ...this.equipmentProcessData
    //     });
    //     if (res.result) {
    //       (this.$refs.vexTable as any).findList(this.paramsConfig);
    //     }
    //     this.dialogVisible = false;
    //     (this.$refs.dataForm as Form).resetFields();
    //     Message.success("创建成功");
    //   }
    // });
  }

  @Emit()
  emitClose() {
    return true
  }
  private handleClose() {
    console.log(this.requestForm,this.processModal)
    this.emitClose()
  }
}
</script>