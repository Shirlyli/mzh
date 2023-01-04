<template>
  <div class="equipmentAddOrUpdate">
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>设备{{ dialogStatus==='create'?'新增':'修改' }}</span>
        <div class="btnBox">
          <el-button @click="handleCloseDialog"
                     size="mini">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="dialogStatus==='create'?createData():updateData()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </div>
      <el-form ref="equipmentCategoryData"
               :rules="rules"
               :model="equipmentCategoryData"
               label-position="left">
        <el-tabs v-model="activeName"
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
                                    :prop="'['+item.key+']'+'['+formItem.key+']'"
                                    :rules="formItem.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]"
                                    :label-width="item.key === 'equipmentMaintain'||item.key==='equipmentResources'?'150px':'120px'">
                        <el-select v-model="equipmentCategoryData[item.key][formItem.key]"
                                   placeholder="请选择"
                                   v-if="formItem.type === 'treeSelect'">
                          <el-tree node-key="id"
                                   :data="formItem.options"
                                   :props="{
                                  children: 'children',
                                  label: 'title'
                                 }"
                                   class="add_tree"
                                   :expand-on-click-node="false"
                                   :check-on-click-node="true">
                            <span class="custom-tree-node"
                                  slot-scope="{node, data}">
                              <el-option style="padding: 0"
                                         :label="data.title"
                                         :value="data.id"></el-option>
                            </span>
                          </el-tree>
                        </el-select>
                        <el-select v-model="equipmentCategoryData[item.key][formItem.key]"
                                   placeholder="请选择"
                                   v-if="formItem.type === 'select'">
                          <el-option :label="options.label"
                                     :value="options.value"
                                     v-for="options in formItem.options"
                                     :key="options.label"></el-option>
                        </el-select>

                        <el-date-picker v-model="equipmentCategoryData[item.key][formItem.key]"
                                        placeholder="请选择时间"
                                        value-format="yyyy-MM-dd"
                                        v-else-if="formItem.type === 'date'"></el-date-picker>
                        <el-input v-model="equipmentCategoryData[item.key][formItem.key]"
                                  v-if="!formItem.type"
                                  :placeholder="`请输入${formItem.label}`" />
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

      </div>
    </el-card>
  </div>
</template>

<script lang="ts" src="./index.ts" >
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}

.btnBox {
  float: right;
}

.equipmentAddOrUpdate .el-card ::v-deep .el-card__body {
  padding: 10px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px;
}
</style>
