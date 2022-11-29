import { Component, Vue, Watch } from "vue-property-decorator";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
import VexTable from "@/components/VexTable/index.vue";
import AddDialog from "./addDialog.vue";
import { Form } from "element-ui";
import { delRoleInfo, saveRoleInfo } from "@/api/basic";
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
  // 菜单列表查询项-表单
  private formConfig = {
    data: {
      name: "",
      sex: "",
      time: ""
    },
    items: [
      {
        field: "name",
        title: "名称",
        itemRender: { name: "$input", props: { placeholder: "请输入名称" } }
      },
      {
        field: "sex",
        title: "菜单路由",
        itemRender: { name: "$input", props: { placeholder: "请输入菜单路由" } }
      },
      {
        field: "time",
        title: "权限标识",
        itemRender: { name: "$input", props: { placeholder: "请输入权限标识" } }
      },
      { field: "time", title: "创建时间", slots: { default: "create_time" } },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  // 菜单列表项
  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "rName", title: "名称", treeNode: true },
    { field: "rDesc", title: "角色路径" },
    { field: "note", title: "备注" },
    { field: "rCtime", title: "创建时间" },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true
    }
  ];
  private nodeClickData: any = {};
  private dialogVisible = false; // 新增模态框
  private dialogStatus = "create"; // 模态框新增或修改
  private paramsConfig: any = {
    // /api/auth/role/queryByContitions
    url: "/auth/role/queryByContitions", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "10",
      entity: {
        pid: "001"
      }
    }
  };
  private url = "/auth/role/queryTree"; // 左侧字典
  private treeParams = {
    page: "1",
    limit: "10",
    entity: {
      id: "F7BFB16412328A-3554-4755-BB10-057BA8A8A47E"
    }
  }; // 树形图传参
  private rules = {
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "change" }
    ]
  }; // 表单校验
  private roleData = {
    id: "",
    rName: "",
    pid: "",
    pName: "",
    isLeaf: ""
  };

  created() {}

  // 菜单数据
  private tableData = [];

  // 新增表单显隐
  private dialogFormVisible = false;

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true;
    const { id } = this.nodeClickData;
    // (this.$refs.dataForm as Form).setFiledsValue
    this.roleData = {
      ...this.roleData,
      pid: id
    };
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    console.log("🚀 ~ data ~ 接收树形组件点击节点数据", data);
    this.nodeClickData = data;
    // 查询菜单及下级菜单 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: "/auth/role/queryByContitions",
      params: {
        page: 1,
        limit: 10,
        entity: {
          pid: data.id
        }
      }
    };
  }

  // 新增菜单
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveRoleInfo(this.roleData);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          );
        }
        this.dialogVisible = false;
        this.$notify({
          title: "成功",
          message: "创建成功",
          type: "success",
          duration: 2000
        });
      }
    });
  }

  // 修改菜单
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await saveRoleInfo(this.roleData);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          );
        }
        this.dialogVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      }
    });
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { name, id, pid } = row;
    this.roleData = { ...this.roleData, ...row };
    this.dialogStatus = "update";
    this.dialogVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate();
    });
  }

  // 删除菜单
  private async handleRemove(row: any) {
    let params = {};
    if (Array.isArray(row)) {
      const res = _.map(row, "id");
      params = {
        ids: res.join(",")
      };
    } else {
      params = {
        ids: row.id
      };
    }
    const res: any = await delRoleInfo(params);
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams);
    }
    this.$notify({
      title: "成功",
      message: "删除成功",
      type: "success",
      duration: 2000
    });
  }
}
