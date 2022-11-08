<template>
  <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
             :visible.sync="dialogVisible"
             width="80%">
    <el-form ref="dataForm"
             :rules="rules"
             :model="defaultEquipmentInfoData"
             label-position="left"
             label-width="100px">
      <el-tabs v-model="activeName"
               style="margin-top:15px"
               type="border-card">
        <el-tab-pane v-for="item in tabMapOptions"
                     :key="item.key"
                     :label="item.label"
                     :name="item.key">
          <keep-alive>
            <div>
              <div v-for="(item,index) in formList"
                   :key="index">
                <p style="font-size: 18px;">{{Object.keys(item)[0]}}</p>
                <el-row :gutter="20">
                  <el-col :span="8"
                          v-for="(formitems,i) in Object.values(item)[0]"
                          :key="i">
                    <el-form-item :label="formitems.label"
                                  prop="type">
                      <el-input v-model="defaultEquipmentInfoData[formitems.key]" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>

    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogVisible = false">
        {{ $t('table.cancel') }}
      </el-button>
      <el-button type="primary"
                 @click="dialogStatus==='create'?createData():updateData()">
        {{ $t('table.confirm') }}
      </el-button>
    </div>
  </el-dialog>

</template>

<script lang="ts" src="./index.ts">
</script>
