<template>
  <div>
    <!-- 角色绑定 菜单点击关联角色 -->
    <el-dialog title="关联角色"
               :visible="roleDialogVisible"
               @close="closeDialogVisible"
               width="60%"
               height="80%">
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
                    <el-popconfirm title="您确定要解绑该角色"
                                   @confirm="handleDelete(row)">
                      <vxe-button type="text"
                                  status="danger"
                                  slot="reference"
                                  icon="vxe-icon-delete">删除
                      </vxe-button>
                    </el-popconfirm>
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
        <el-button @click="closeDialogVisible">
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

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'

import {
  getRoleTreeData,
  onMenuIdBindRole,
  onMenuIdUnBindRole,
  queryRolesByMenuId
} from '@/api/basic'
import { Message } from 'element-ui'

@Component({
  name: 'AssociateRole',
  components: {
    MainSubLayout
  }
})
export default class extends Vue {
  @Prop({ default: false }) roleDialogVisible!: boolean
  @Prop() checkedMenuList!: any

  @Watch('checkedMenuList', { immediate: true, deep: true })
  public onParamsConfigChange(newdata: any) {
    if (newdata.length) {
      this.getBindRoleTreeData(newdata)
    }
  }

  public roleData = [] // 角色数据
  public defaultProps = {
    children: 'children',
    label: 'title'
  } // 角色树配置

  public loading = false // 角色绑定列表loading
  public bindRoleData = [] // 用户已绑定角色

  created() {
    this.getRoleTreeData()
  }

  // 获取角色树数据
  public async getRoleTreeData() {
    const res: any = await getRoleTreeData()
    if (res.code === 200) {
      const newRoleData = res.data[0].children.map((item: any) => {
        return {
          ...item,
          disabled: true
        }
      })
      this.roleData = newRoleData
    }
  }

  // 获取已绑定角色树数据
  public async getBindRoleTreeData(data: any) {
    const res: any = await queryRolesByMenuId({ menuId: data[0].id })
    if (res.code === 200) {
      this.bindRoleData = res.data
    }
  }

  // 角色树点击事件
  public async handleRoleNodeClick(data: any) {
    const res: any = await onMenuIdBindRole({
      menuId: this.checkedMenuList[0].id,
      roleId: data.id
    })
    if (res.result) {
      Message.success('关联成功')
      this.getBindRoleTreeData(this.checkedMenuList)
    }
  }

  // 角色删除事件
  public async handleDelete(row: any) {
    const res: any = await onMenuIdUnBindRole({
      menuId: this.checkedMenuList[0].id,
      roleId: row.id
    })
    if (res.result) {
      this.$message.success('解绑成功')
      this.getBindRoleTreeData(this.checkedMenuList)
    }
  }

  @Emit()
  emitCloseAssociateDialog(rowData: any) {
    return rowData
  }

  public closeDialogVisible() {
    this.emitCloseAssociateDialog(false)
  }

  public cellDBLClickEvent() {
    console.log('cellDBLClickEvent')
  }
}
</script>
<style lang="scss" scoped>
.el-dialog .wrapper {
  padding: 0;
}

.el-dialog .el-card {
  height: 100%;
}
</style>
