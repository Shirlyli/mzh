<template>
  <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
             :visible.sync="showDialogVisible"
             top="30px"
             width="80%"
             @close="handleCloseDialog">
    <el-form ref="dataForm"
             :rules="rules"
             :model="defaultEquipmentInfoData"
             label-position="left"
             label-width="140px">
      <el-tabs v-model="activeName"
               style="margin-top:15px"
               type="border-card">
        <el-tab-pane v-for="item in tabMapOptions"
                     :key="item.key"
                     :label="item.label"
                     :name="item.key">
          <keep-alive>
            <div>
              <el-row :gutter="20">
                <div v-for="(formItem,index) in allFormList[item.key]"
                     :key="index">
                  <el-col :span="8">
                    <el-form-item :label="formItem.label"
                                  prop="type">
                      <el-select v-model="defaultEquipmentInfoData[item.key][formItem.key]"
                                 placeholder="请选择"
                                 v-if="formItem.type === 'select'">
                        <el-option :label="options.label"
                                   :value="options.value"
                                   v-for="options in formItem.options"
                                   :key="options.label"></el-option>
                      </el-select>
                      <el-date-picker v-model="defaultEquipmentInfoData[item.key][formItem.key]"
                                      placeholder="请选择时间"
                                      value-format="yyyy-MM-dd"
                                      v-else-if="formItem.type === 'date'"></el-date-picker>
                      <el-input v-model="defaultEquipmentInfoData[item.key][formItem.key]"
                                v-else="!formItem.type" />
                    </el-form-item>
                  </el-col>
                </div>
              </el-row>
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleCloseDialog">
        {{ $t('table.cancel') }}
      </el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('table.confirm') }}
      </el-button>
    </div>
  </el-dialog>

</template>

<script lang="ts" src="./index.ts" >

</script>

<style lang="scss" scoped>
.el-select{
  width:100%
}
</style>
