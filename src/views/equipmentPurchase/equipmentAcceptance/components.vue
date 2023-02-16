<template>
  <div class="equipmentAddOrUpdate">

    <!-- 设备信息 -->
    <el-card>
      <div slot="header"
           class="clearfix">
        <span>设备{{ $route.query.type}}</span>
        <div class="btnBox">
          <el-button @click="handleCloseDialog"
                     size="mini">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="createData()">
            {{ '保存' }}
          </el-button>
        </div>
      </div>
      <!-- 流程信息 -->
      <div class="contentBox">
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8"
                  v-for="(item,index) in watchRequestForm.billMain"
                  :key="index">
            <div class="basicBox">
              <span class="title">{{item.title}}:</span>
              <span class="value">{{processData[item.field]?processData[item.field]:'-'}}</span>
            </div>
          </el-col>
        </el-row>
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
                <el-row :gutter="20"
                        type="flex"
                        justify="start"
                        style="flex-wrap:wrap; flex-direction: row">
                  <!-- <div v-for="(formItem,index) in allFormList[item.key]"
                       :key="index"> -->
                  <el-col :span="8"
                          v-for="(formItem,index) in allFormList[item.key]"
                          :key="index">
                    <el-form-item :label="formItem.label"
                                  :prop="'['+item.key+']'+'['+formItem.key+']'"
                                  :rules="formItem.required ?[{required: true,message: '不能为空',trigger: 'change'}]:[{required: false}]"
                                  :label-width="item.key === 'equipmentMaintain'||item.key==='equipmentResources'?'150px':'120px'">
                      <!-- 树形下拉框 -->
                      <treeselect :options="formItem.options"
                          v-model="equipmentCategoryData[item.key][formItem.key]"
                          clearable
                          :disable-branch-nodes="true"
                          search-nested
                          placeholder="请选择"
                          :normalizer="normalizer"
                          v-if="formItem.type === 'treeSelect'" />

                      <!-- 下拉选择 -->
                      <el-select v-model="equipmentCategoryData[item.key][formItem.key]"
                                 placeholder="请选择"
                                 v-if="formItem.type === 'select'">
                        <el-option :label="options.label"
                                   :value="options.value"
                                   v-for="options in formItem.options"
                                   :key="options.value"></el-option>
                      </el-select>

                      <!-- 日期 -->
                      <el-date-picker v-model="equipmentCategoryData[item.key][formItem.key]"
                                      placeholder="请选择时间"
                                      value-format="yyyy-MM-dd"
                                      v-else-if="formItem.type === 'date'"></el-date-picker>

                      <!-- 输入框 -->
                      <el-input v-model="equipmentCategoryData[item.key][formItem.key]"
                                v-if="!formItem.type"
                                :placeholder="`请输入${formItem.label}`" />
                      <!-- <el-button v-model="equipmentCategoryData[item.key][formItem.key]"
                                 v-if="formItem.type=== 'button'"
                                 type="primary">生成</el-button> -->

                      <!-- 上传附件 -->
                      <el-upload class="upload-demo"
                                 v-if="formItem.type==='upload'"
                                 action="/fileupload/addFileSubmitAndResult"
                                 :limit="3"
                                 :on-change="onFileChange"
                                 :on-progress="onFileChange"
                                 :on-success="onFileProgress"
                                 :on-remove="onFileRemove"
                                 accept="'.xlsx','.xls'"
                                 :on-exceed="handleExceed"
                                 :file-list="fileList">
                        <el-button size="small"
                                   type="primary">点击上传</el-button>
                        <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <!-- </div> -->
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

<script lang="ts" src="./components.ts" >
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

.contentBox {
  font-size: 14px;
  margin: 10px 0 20px 0;

  .el-col{
    height: 40px;
  }
}

.basicBox{
  .title {
    width: 120px;
    padding: 8px 8px;
    background-color: rgba(159, 174, 248, 0.08);
  }
  .value {
    color: rgba(37, 45, 62, 0.85);
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 20px;
  }

}
</style>
