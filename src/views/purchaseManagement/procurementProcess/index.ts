import { Component, Vue } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import { delProcessData, updateProcessData } from "@/api/basic";
import { Form } from "element-ui";
import { formatMIsAvailable } from "@/shared/utils";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
@Component({
  name: "InlineEditTable",
  components: {
    VexTable,
    MainSubLayout,
    Tree
  }
})
export default class extends Vue {
  // 左侧字典url
  private url = "/hospitalProcess/queryAllProcessList";
  // 列表查询项-表单
  private formConfig = {
    data: {},
    items: [] // 表单项
  };

  private rules = {};
  // 树形图传参
  private treeParams = {
    page: "1",
    limit: "10",
    entity: {}
  };

  private getformatMIsAvailable = (data: any) => {
    return data.cellValue == "1"
      ? "禁用"
      : data.cellValue == "0"
      ? "不禁用"
      : "-";
  };

  private formatMIsRoleType(data: any) {
    return data.cellValue === "role"
      ? "角色"
      : data.cellValue === "user"
      ? "用户"
      : "-";
  }

  private nodeClickData: any = {};
  // 流程配置列表项
  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "processName", title: "流程名称", width: 150 },
    { field: "processCode", title: "流程代码" },
    { field: "nodeName", title: "节点名称" },
    { field: "nodeNameCode", title: "节点名称编码" },
    { field: "nodeSort", title: " 节点顺序 " },
    {
      field: "isDisable",
      title: " 是否禁用 ",
      formatter: this.getformatMIsAvailable
    },
    {
      field: "roleType",
      title: " 角色类型 ",
      formatter: this.formatMIsRoleType
    },
    // { field: "roleTypeId", title: " 角色类型id " },
    { field: "cteator", title: "创建人" },
    { field: "cteaterTime", title: "创建时间" },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true
    }
  ];

  private paramsConfig: any = {
    url: "/hospitalProcess/queryProcessNodeListByProcessNode", // 根据表单查询项查询数据
    params: {
      processCode: "pro_kssq"
    }
  };

  private processData = {
    processName: "",
    processCode: "",
    nodeName: "",
    nodeNameCode: "",
    nodeSort: "",
    isDisable: "",
    roleType: "",
    roleTypeId: ""
  };

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    console.log("🚀 ~ data ~ 接收树形组件点击节点数据", data);
    this.nodeClickData = data;
    // 查询菜单及下级菜单 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: "/hospitalProcess/queryProcessNodeListByProcessNode", // 根据表单查询项查询数据
      params: {
        processCode: data.processCode
      }
    };
  }

  private dialogVisible = false; //模态框
  private dialogStatus = "create";
  created() {}

  private clearForm() {
    this.processData = {
      processName: "",
      processCode: "",
      nodeName: "",
      nodeNameCode: "",
      nodeSort: "",
      isDisable: "",
      roleType: "",
      roleTypeId: ""
    };
  }
  // 新增流程配置
  private handleInsert(row: any) {
    this.clearForm();
    if (!this.nodeClickData.id) {
      this.$message.error("请选择流程名称后新增");
      return;
    }
    const { processName, processCode } = this.nodeClickData;
    this.dialogVisible = true;
    this.processData = {
      ...this.processData,
      processName,
      processCode
    };
  }

  // 新增流程配置
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await updateProcessData(this.processData);
        console.log("🚀 ~ this.processData", this.processData);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
        }
        this.dialogVisible = false;
        (this.$refs.dataForm as Form).resetFields();
        this.$message.success("新增流程配置成功");
        this.clearForm();
      }
    });
  }

  // 修改流程配置
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await updateProcessData(this.processData);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
        }
        this.dialogVisible = false;
        (this.$refs.dataForm as Form).resetFields();
        this.$message.success("修改流程配置成功");
        this.clearForm();
      }
    });
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { name, id, pid } = row;
    this.processData = { ...this.processData, ...row };
    this.dialogStatus = "update";
    this.dialogVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate();
    });
  }

  // 删除流程配置
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
    const res: any = await delProcessData(params);
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
    }
    (this.$refs.dataForm as Form).resetFields();
    this.$message.success("删除流程配置成功");
  }

  /**
   * 新增流程配置
   */
  private addProcess(){

  }
}
