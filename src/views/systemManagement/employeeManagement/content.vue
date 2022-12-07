<template>
  <div v-loading="loading">
    <div class="handleBox">
      <el-row :gutter="20">
        <el-col :span="4">
          <vxe-button @click="searchPersonalDetail"
                      status="primary"
                      icon="vxe-icon-user">绑定账号</vxe-button>
        </el-col>
        <el-col :span="4">
          <vxe-button @click="deletePersonalBind"
                      status="danger"
                      icon="vxe-icon-user">解除账号绑定</vxe-button>
        </el-col>
        <el-col :span="4">
          <vxe-button @click="resetPassword"
                      icon="vxe-icon-user">密码重置</vxe-button>
        </el-col>
        <el-col :span="4">
          <vxe-button @click="insertEmployee"
                      status="primary"
                      icon="vxe-icon-user">新增员工信息</vxe-button>
        </el-col>
        <el-col :span="4">
          <vxe-button @click="updateEmployee"
                      status="warning"
                      icon="vxe-icon-user">修改员工信息</vxe-button>
        </el-col>
        <el-col :span="4">
          <vxe-button @click="dealEmployeeInfo"
                      status="danger"
                      icon="vxe-icon-user">删除员工信息</vxe-button>
        </el-col>
        <!-- <vxe-button @click="$refs.xGrid.exportData()"
                    icon="vxe-icon-user">导入</vxe-button>
        <vxe-button @click="$refs.xGrid.exportData()"
                    icon="vxe-icon-user">导出</vxe-button>-->
      </el-row>
      <el-row>
        <el-col :span="6">
          <vxe-button @click="associateRole"
                      icon="vxe-icon-user">查看并关联角色</vxe-button>
        </el-col>
      </el-row>
    </div>
    <!-- 员工主体区域 -->
    <el-row :gutter="20">
      <el-col :span="5"
              v-for="(item,index) in employeeData"
              :key="index">
        <div :class="[item.isClick?'clickContentItem':'notClickContentItem',item.userId?'hasLoginUser':'hasNotLoginUser','contentItem']"
             @click="showPersonalLoginDialog(item)">
          <span class="eName">
            {{item.eName}}
          </span>
          <span class="citizenNo">
            {{item.citizenNo}}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" src="./content.ts"></script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 12px;
}
.vxe-button {
  width: 100%;
}
.handleBox {
  margin-bottom: 12px;
}

.contentItem {
  height: 120px;
  // min-width: 250px;
  margin-bottom: 12px;
  margin-right: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  .eName {
    font-size: 24px;
    margin-bottom: 8px;
    color: #333;
  }
  .citizenNo {
    color: #999;
  }
}
.notClickContentItem {
  // background-color: rgba(227, 222, 222, 0.567);
}

.hasLoginUser {
  background-color: rgba(227, 222, 222, 0.567);
}

.hasNotLoginUser {
  background-color: rgba(245, 239, 239, 0.567);
}
.clickContentItem {
  background-color: #1890ff;
  .eName,
  .citizenNo {
    color: #fff;
  }
}
</style>
