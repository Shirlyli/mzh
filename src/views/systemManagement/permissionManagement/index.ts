import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { Message } from 'element-ui'
import {
  queryMenuTreeAndChoose,
  saveRoleWithMenu
} from '@/api/basic'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  public nodeClickData: any = {};
  public url = '/auth/role/queryTree'; // 左侧字典
  public treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: ''
    }
  }; // 树形图传参

  /**************
   * 右侧菜单
   *************/
  public menuData: any = []; // 菜单数据
  public defaultProps = {
    children: 'children',
    label: 'title'
  };

  public hasChecked = false;

  /*****************************************
   * 接收树形组件点击节点数据
   * @param data
   ****************************************/
  public async handleNodeClick(data: any) {
    this.hasChecked = false
    this.nodeClickData = data
    const res: any = await queryMenuTreeAndChoose({ roleId: data.id })
    if (res.code === 200) {
      this.menuData = res.data
      if (res.checkLst.length) {
        (this.$refs.menuTree as any).setCheckedKeys(res.checkLst)
      } else {
        (this.$refs.menuTree as any).setCheckedKeys([])
      }
    }
  }

  public filterNode(value: any, data: any) {
    if (!value) return true
    return data.title.indexOf(value) !== -1
  }

  /****************************************
   * 全县列表数据修改
   * @param data
   * @param value
   ***************************************/
  public handleChecked(data: any, value: any) {
    if (value.checkedKeys.length) {
      this.hasChecked = true
    } else {
      this.hasChecked = false
    }
  }

  /*******************************
   * 保存
   ******************************/
  public async handleSave() {
    // (this.$refs.menuTree as any).setCheckedNodes([]);
    // const checkedNodes = (this.$refs.menuTree as any).getCheckedNodes()
    const checkedKeys = (this.$refs.menuTree as any).getCheckedKeys()
    if (checkedKeys.length) {
      const res: any = await saveRoleWithMenu({
        roleId: this.nodeClickData.id,
        menuId: checkedKeys.join(',')
      })
      if (res.code === 200) {
        Message.success('绑定成功')
        this.hasChecked = false
      }
    }
  }

  /*******************************
   * 取消
   ******************************/
  public handleDel() {
    this.hasChecked = false
    this.handleNodeClick(this.nodeClickData)
  }
}
