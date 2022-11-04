<template>
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
</template>

<script lang="ts" src="./index.ts">
</script>
