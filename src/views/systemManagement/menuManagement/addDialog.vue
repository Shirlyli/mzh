<template>
  <div>
    <el-dialog :title="'新建'"
               :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"
               :rules="rules"
               :model="tempArticleData"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item :label="'类型'"
                      prop="type">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'目录名称'"
                      prop="timestamp">
          <el-date-picker v-model="tempArticleData.timestamp"
                          type="datetime"
                          placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item :label="'目录位置'"
                      prop="title">
          <el-input v-model="tempArticleData.title" />
        </el-form-item>

        <el-form-item :label="'菜单名称'">
          <el-rate v-model="tempArticleData.importance"
                   :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                   :max="3"
                   style="margin-top:8px;" />
        </el-form-item>
        <el-form-item :label="'菜单路由'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'菜单位置'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'功能名称'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'功能位置'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'前端权限标识'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'是否启用'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
        <el-form-item :label="'备注'">
          <el-input v-model="tempArticleData.abstractContent"
                    :autosize="{minRows: 2, maxRows: 4}"
                    type="textarea"
                    placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./addDialog.ts"></script>
