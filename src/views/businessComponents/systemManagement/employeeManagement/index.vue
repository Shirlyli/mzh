<template>
  <div class="personalCard">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>科室分类</span>
          </div>
          <Tree ref="vxeTree"
                :url="url"
                :params="treeParams"
                @emit-handle-click="handleNodeClick" />
        </el-card>
      </template>
      <template #right>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>员工查询</span>
          </div>
          <Content ref="vexTable"
                   :paramsConfig="paramsConfig"
                   @emit-handle-insert="handleInsert"
                   @emit-handle-update="handleUpdate"
                   @emit-handle-remove="handleRemove"
                   @emit-handle-search="handleSearchForDetail"
                   @emit-login-dialog="handleLoginDialog"
                   @emit-associate-role="handleAssociateRole" />
          <!-- <VexTable ref="vexTable"
                    :formConfig="formConfig"
                    :columns="columns"
                    editColumns="['edit','del']"
                    @emit-handle-insert="handleInsert"
                    @emit-handle-update="handleUpdate"
                    @emit-handle-remove="handleRemove"
                    @emit-handle-search="handleSearchForDetail"
                    :paramsConfig="paramsConfig" /> -->
        </el-card>
      </template>
    </main-sub-layout>
    <!-- 模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="dialogVisible = false"
               width="80%">
      <el-form ref="dataForm"
               :rules="rules"
               :model="employeeData"
               label-position="left"
               label-width="80px"
               style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'用户名称'"
                          prop="eName">
              <el-input v-model="employeeData.eName"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'身份证'"
                          prop="citizenNo">
              <el-input v-model="employeeData.citizenNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'出生日期'"
                          prop="birth">
              <el-input v-model="employeeData.birth"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'国籍'"
                          prop="nation">
              <el-input v-model="employeeData.nation"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'手机号码'"
                          prop="phoneNo">
              <el-input v-model="employeeData.phoneNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'办公号码'"
                          prop="officeNo">
              <el-input v-model="employeeData.officeNo"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'邮箱'"
                          prop="email">
              <el-input v-model="employeeData.email"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'学历'"
                          prop="education">
              <el-input v-model="employeeData.education"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'学位'"
                          prop="degree">
              <el-input v-model="employeeData.degree"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'科室'"
                          prop="deptId">
              <el-input v-model="employeeData.deptId"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'图片来源'"
                          prop="photoUri">
              <el-input v-model="employeeData.photoUri"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'大学'"
                          prop="collage">
              <el-input v-model="employeeData.collage"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'职业类型'"
                          prop="eType">
              <el-input v-model="employeeData.eType"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'专业'"
                          prop="eProf">
              <el-input v-model="employeeData.eProf"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'职位'"
                          prop="ePost">
              <el-input v-model="employeeData.ePost"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'在职状态'"
                          prop="ePostState">
              <el-input v-model="employeeData.ePostState"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'性别'"
                          prop="sex">
              <el-input v-model="employeeData.sex"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'备注'"
                          prop="note">
              <el-input v-model="employeeData.note"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 底部操作 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
        <!-- <el-button @click="handleReset">重置</el-button> -->

      </div>
    </el-dialog>

    <!-- 用户设置 -->
    <el-dialog :title="'用户设置'"
               :visible="personalDialogVisible"
               @close="personalDialogVisible = false"
               width="80%">
      <el-form ref="dataForm"
               :rules="personalRules"
               :model="personalData"
               label-position="left"
               label-width="100px"
               style="width: 100%">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="'登录名'"
                          prop="phoneNo">
              <el-input v-model="personalData.userName"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户名'"
                          prop="officeNo">
              <el-input v-model="personalData.employeeName"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户密码'"
                          prop="email">
              <el-input v-model="personalData.userPwd"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'确认密码'"
                          prop="education">
              <el-input v-model="personalData.userSecondPwd"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户状态'"
                          prop="degree">
              <el-input v-model="personalData.userStatus"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item :label="'登录起始时间'"
                          prop="deptId">
              <el-input v-model="personalData.deptId"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'登录终止时间'"
                          prop="photoUri">
              <el-input v-model="personalData.photoUri"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item :label="'用户创建时间'"
                          prop="collage">
              <el-input v-model="personalData.userCtime"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户修改时间'"
                          prop="eType">
              <el-input v-model="personalData.userLtime"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'密码修改时间'"
                          prop="eProf">
              <el-input v-model="personalData.userPmtime"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户解锁时间'"
                          prop="ePost">
              <el-input v-model="personalData.userUnlocktime"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item :label="'上次登录时间'"
                          prop="ePostState">
              <el-input v-model="personalData.ePostState"
                        placeholder="请选择"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>

      <!-- 底部操作 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="personalDialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary"
                   @click="savePersonalData">
          {{ '保存'}}
        </el-button>
        <!-- <el-button @click="handleReset">重置</el-button> -->

      </div>
    </el-dialog>

    <!-- 角色绑定 -->
    <el-dialog title="关联角色"
               :visible="roleDialogVisible"
               @close="roleDialogVisible = false"
               width="80%" height="80%">
      <div class="roleBox">
        <main-sub-layout class="main-wrapper rule-config-page">
          <template #left>
            <el-card>
              <div slot="header"
                   class="clearfix">
                <span>授权角色</span>
              </div>
              <el-tree :data="roleData"
                       class="filter-tree"
                       default-expand-all
                       :expand-on-click-node="false"
                       node-key="id"
                       ref="roleTree"
                       :props="defaultProps"
                       @node-click="handleRoleNodeClick"></el-tree>
            </el-card>
          </template>
          <template #right>
            <el-card>
              <div slot="header"
                   class="clearfix">
                <span>已授角色</span>
              </div>
              <vxe-table border
                         resizable
                         show-overflow
                         ref="xTable"
                         height="500"
                         editColumns="['edit','del']"
                         :loading="loading"
                         :row-config="{isHover: true}"
                         :data="bindRoleData"
                         @cell-dblclick="cellDBLClickEvent">
                <vxe-column type="seq"
                            width="60"></vxe-column>
                <vxe-column field="rName"
                            title="角色名称"></vxe-column>
                <vxe-column field="rDesc"
                            title="角色路径"></vxe-column>
                <vxe-column title="操作"
                            width="100"
                            show-overflow>
                  <template #default="{ row }">
                    <vxe-button type="text"
                                status="danger"
                                icon="vxe-icon-delete"
                                @click="handleDelete(row)">删除</vxe-button>
                  </template>
                </vxe-column>
              </vxe-table>
            </el-card>
          </template>
        </main-sub-layout>
      </div>
      <!-- 底部操作 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="roleDialogVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <!-- <el-button type="primary"
                   @click="saveRelationRoleData">
          {{ '保存'}}
        </el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}
.roleBox {
  .el-tree {
    width: 200px;
  }

  .el-table {
    flex: 1;
  }
}

.el-dialog{
  .wrapper{
    padding:0;
    .el-card{
      height: calc(100vh - 382px);
    }
  }
}
</style>
