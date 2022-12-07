import { Component, Vue, Watch } from "vue-property-decorator";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
import VexTable from "@/components/VexTable/index.vue";
import AddDialog from "./addDialog.vue";
import { Form, Message } from "element-ui";
import {
  delRoleInfo,
  queryMenuTreeAndChoose,
  saveRoleInfo,
  saveRoleWithMenu
} from "@/api/basic";
import _ from "lodash";
@Component({
  name: "Tab",
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private nodeClickData: any = {};
  private url = "/auth/role/queryTree"; // 左侧字典
  private treeParams = {
    page: "1",
    limit: "10",
    entity: {
      id: ""
    }
  }; // 树形图传参

  /**
   * 右侧菜单
   */
  private menuData: any = []; //菜单数据
  private defaultProps = {
    children: "children",
    label: "title"
  };
  private hasChecked = false;

  // 接收树形组件点击节点数据
  private async handleNodeClick(data: any) {
    console.log("🚀 ~ data ~ 接收树形组件点击节点数据", data);
    this.hasChecked = false;
    this.nodeClickData = data;
    const res: any = await queryMenuTreeAndChoose({ roleId: data.id });
    if (res.code === 200) {
      this.menuData = res.data;
      if (res.checkLst.length) {
        (this.$refs.menuTree as any).setCheckedKeys(res.checkLst);
      } else {
        (this.$refs.menuTree as any).setCheckedKeys([]);
      }
    }
  }

  public filterNode(value: any, data: any) {
    if (!value) return true;
    return data.title.indexOf(value) !== -1;
  }

  private handleChecked(data: any, value: any) {
    if (value.checkedKeys.length) {
      this.hasChecked = true;
    } else {
      this.hasChecked = false;
    }
  }

  // 保存
  private async handleSave() {
    const checkedNodes = (this.$refs.menuTree as any).getCheckedNodes();
    const checkedKeys = (this.$refs.menuTree as any).getCheckedKeys();
    if (checkedKeys.length) {
      const res: any = await saveRoleWithMenu({
        roleId: this.nodeClickData.id,
        menuId: checkedKeys.join(",")
      });
      if (res.code === 200) {
        Message.success("绑定成功");
        this.hasChecked = false;
      }
    }
    // (this.$refs.menuTree as any).setCheckedNodes([]);
  }

  //
  private handleDel() {
    (this.$refs.menuTree as any).setCheckedKeys([]);
  }
}
