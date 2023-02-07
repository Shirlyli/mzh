<template>
  <div class="commonContainerBox hasLeftMainContent">
    <main-sub-layout class="main-wrapper rule-config-page">
      <template #left>
        <el-card>
          <div slot="header"
               class="clearfix">
            <span>组织机构</span>
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
            <span>账户管理、绑定账号和关联角色</span>
          </div>
          <Content ref="vexTable"
                   :paramsConfig="paramsConfig"
                   @emit-handle-insert="handleInsert"
                   @emit-handle-update="handleUpdate"
                   @emit-handle-remove="handleRemove"
                   @emit-handle-search="handleSearchForDetail"
                   @emit-login-dialog="handleLoginDialog"
                   @emit-associate-role="handleAssociateRole" />
        </el-card>
      </template>
    </main-sub-layout>

    <!-- 员工模态框区域 -->
    <el-dialog :title="dialogStatus==='create'?'新增':'修改'"
               :visible="dialogVisible"
               @close="dialogVisible = false"
               top="30px"
               class="commonDialog"
               width="80%">
      <el-form ref="empolyeeForm"
               :rules="empolyeeRules"
               :model="employeeData"
               label-position="left"
               label-width="80px"
               style="width: 100%">
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8">
            <el-form-item :label="'用户名称'"
                          prop="eName"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-input v-model="employeeData.eName"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'性别'"
                          prop="sex"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-select v-model="employeeData.sex"
                         placeholder="请选择">
                <el-option label="男"
                           value="1"></el-option>
                <el-option label="女"
                           value="2"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'身份证'"
                          prop="citizenNo"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-input v-model="employeeData.citizenNo"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">

          <el-col :span="8">
            <el-form-item :label="'出生日期'"
                          prop="birth"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-date-picker v-model="employeeData.birth"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd">
              </el-date-picker>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'国籍'"
                          prop="nation">
              <el-input v-model="employeeData.nation"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'手机号码'"
                          prop="phoneNo"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-input v-model="employeeData.phoneNo"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">

          <el-col :span="8">
            <el-form-item :label="'办公号码'"
                          prop="officeNo">
              <el-input v-model="employeeData.officeNo"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'邮箱'"
                          prop="email">
              <el-input v-model="employeeData.email"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'学历'"
                          prop="education">
              <el-input v-model="employeeData.education"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">

          <el-col :span="8">
            <el-form-item :label="'学位'"
                          prop="degree">
              <el-input v-model="employeeData.degree"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'科室'"
                          prop="deptName"
                          :rules="[{required: true, message: '不能为空', trigger: 'change'}]">
              <el-input v-model="employeeData.deptName"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'图片来源'"
                          prop="photoUri">
              <el-input v-model="employeeData.photoUri"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">

          <el-col :span="8">
            <el-form-item :label="'大学'"
                          prop="collage">
              <el-input v-model="employeeData.collage"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'职业类型'"
                          prop="eType">
              <el-input v-model="employeeData.eType"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'专业'"
                          prop="eProf">
              <el-input v-model="employeeData.eProf"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8">
            <el-form-item :label="'职位'"
                          prop="ePost">
              <el-input v-model="employeeData.ePost"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'在职状态'"
                          prop="ePostState">
              <el-input v-model="employeeData.ePostState"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="'备注'"
                          prop="note">
              <el-input v-model="employeeData.note"
                        placeholder="请输入"></el-input>
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
    <el-dialog :title="personalEditTitle"
               :visible="personalDialogVisible"
               @close="personalDialogVisible = false"
               top="30px"
               class="commonDialog"
               width="80%">
      <el-form ref="personalForm"
               :rules="personalRules"
               label-position="left"
               label-width="100px"
               style="width: 100%">
        <el-row type="flex"
                justify="start"
                style="flex-wrap:wrap; flex-direction: row">
          <el-col :span="8">
            <el-form-item :label="'登录名'"
                          prop="userName">
              <el-input v-model="personalData.userName"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户名'"
                          prop="employeeName">
              <el-input v-model="personalData.employeeName"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户密码'"
                          prop="userPwd">
              <el-input v-model="personalData.userPwd"
                        placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'用户状态'"
                          prop="userStatus">
              <el-select v-model="personalData.userStatus"
                         placeholder="请选择">
                <el-option label="启用"
                           value="1"></el-option>
                <el-option label="未启用"
                           value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="personalDialogType=== 'edit'">
            <el-form-item :label="'用户创建时间'"
                          prop="userCtime">
              <el-date-picker v-model="personalData.userCtime"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="personalDialogType=== 'edit'">
            <el-form-item :label="'用户修改时间'"
                          prop="userLtime">
              <el-date-picker v-model="personalData.userLtime"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="personalDialogType=== 'edit'">
            <el-form-item :label="'密码修改时间'"
                          prop="userPmtime">
              <el-date-picker v-model="personalData.userPmtime"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="personalDialogType=== 'edit'">
            <el-form-item :label="'用户解锁时间'"
                          prop="userUnlocktime">
              <el-date-picker v-model="personalData.userUnlocktime"
                              placeholder="请选择"></el-date-picker>
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
               top="30px"
               class="commonDialog"
               width="80%"
               height="80%">
      <el-dialog width="30%"
                 title="删除角色"
                 :visible.sync="innerVisible"
                 append-to-body>
        <div>
          您确定要删除该数据?
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="innerVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary"
                   @click="submitCancelRoleData">
          {{ '确定'}}
        </el-button>
        </div>
      </el-dialog>
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
                  <template #default="{row}">
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
.el-date-editor {
  width: 100%;
}
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

.el-dialog {
  .wrapper {
    padding: 0;
    .el-card {
      height: calc(100vh - 382px);
    }
  }
}
</style>
