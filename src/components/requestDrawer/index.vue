<template>
  <div>
    <el-drawer title="发起申请"
               :visible.sync="visible"
               size="60%"
               @close="handleClose">
      <el-form ref="dataForm"
               :rules="{}"
               :model="requestParams"
               label-position="left"
               label-width="100px"
               style="margin-left:0;">

        <!-- 基本信息 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>基本信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12"
                  v-for="(item,index) in watchRequestForm.billMain"
                  :key="index">
            <el-form-item :label="item.title"
                          prop="applyDetailId">
              <el-input v-model="requestParams.billMain[item.field]"
                        placeholder="请输入"
                        v-if="item.type === 'input'" />
              <el-select v-model="requestParams.billMain[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <el-date-picker v-model="requestParams.billMain[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 设备明细 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>设备明细</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12"
                  v-for="(item,index) in watchRequestForm.billEquipmentList"
                  :key="index">
            <el-form-item :label="item.title"
                          prop="applyDetailId">
              <el-input v-model="requestParams.billEquipmentList[item.field]"
                        placeholder="请输入"
                        v-if="item.type === 'input'" />
              <el-select v-model="requestParams.billEquipmentList[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <el-date-picker v-model="requestParams.billEquipmentList[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 设备明细 -->
        <div class="dividerBox">
          <el-divider direction="vertical"></el-divider>
          <span>审批清单</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12"
                  v-for="(item,index) in watchRequestForm.billApproveList"
                  :key="index">
            <el-form-item :label="item.title"
                          prop="applyDetailId">
              <el-input v-model="requestParams.billApproveList[item.field]"
                        placeholder="请输入"
                        v-if="item.type === 'input'" />
              <el-select v-model="requestParams.billApproveList[item.field]"
                         v-if="item.type === 'select'"
                         placeholder="请选择">
                <el-option :label="optionValue.label"
                           :value="optionValue.value"
                           v-for="optionValue in item.data"
                           :key="optionValue.label"></el-option>
              </el-select>
              <el-date-picker v-model="requestParams.billApproveList[item.field]"
                              v-if="item.type === 'date'"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
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
import { getEquipmentInfoByDepartmentId } from '@/api/equipment'
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
    this.visible = value
  }
  /**********************
   * form表单
   *********************/
  @Prop({ default: {} }) requestForm!: any
  private watchRequestForm: any = {}
  @Watch('requestForm', { immediate: true })
  private onChangeRequestForm(formValue: any) {
    this.watchRequestForm = formValue
  }
  /**********************
   * 保存接口传惨
   *********************/
  @Prop({ default: {} }) requestParams!: any
  /**************
   * 监听科室变化
   *************/
  @Watch('requestParams.billMain.rollOutDepartment', { immediate: true })
  private async onChangeRequestParams(formValue: any) {
    const res: any = await getEquipmentInfoByDepartmentId({
      page: '1',
      limit: '10',
      entity: {
        departmentId: formValue,
      },
    })
    if (res.code == 200) {
      this.watchRequestForm.billEquipmentList.forEach((item: any) => {
        if (item.slot === 'equipment') {
          item.data = res.data.map((equip: any) => {
            return {
              equipmentVO: equip.equipmentVO,
              label: equip.equipmentVO.name,
              value: equip.equipmentVO.id,
            }
          })
        }
      })
      this.$forceUpdate()
    }
  }
  /****************************
   * 监听设备名称变化
   ***************************/
  @Watch('requestParams.billEquipmentList.equipmentId', { immediate: true })
  private onChangeEquipmentId(equipmentId: any) {
    const filterData = this.watchRequestForm.billEquipmentList.filter(
      (item: any) => item.field === 'equipmentId'
    )
    const equipmentData = filterData[0]?.data?.filter((item: any) => {
      return item.value == equipmentId
    })
    Object.assign(
      this.requestParams.billEquipmentList,
      equipmentData[0].equipmentVO
    )
  }
  @Prop({ default: {} })
  processModal!: any
  @Watch('processModal')
  /***************
   * 新增流程申请
   **************/
  @Emit()
  emitSubmitCreateRequest(params: any) {
    return params
  }
  private createData() {
    this.emitSubmitCreateRequest(this.requestParams)
  }

  @Emit()
  emitClose() {
    return true
  }
  private handleClose() {
    this.emitClose()
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.dividerBox {
  margin: 12px 0 24px 0;
  font-size: 18px;
  .el-divider--vertical {
    background-color: blue;
    width: 6px;
  }
}
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.demo-drawer__footer {
  display: flex;
  position: absolute;
  bottom: 10px;
  right: 10px;
  .el-button {
  }
}
</style>
