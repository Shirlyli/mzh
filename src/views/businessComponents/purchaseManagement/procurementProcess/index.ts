import { Component, Vue } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import { delProcessData, updateProcessData } from "@/api/basic";
import { Form } from "element-ui";
import { formatMIsAvailable } from "@/shared/utils";
@Component({
  name: "InlineEditTable",
  components: {
    VexTable
  }
})
export default class extends Vue {
  // 列表查询项-表单
  private formConfig = {
    data: {
      processName: "",
      nodeName: "",
      cteaterTime: ""
    },
    items: [
      {
        field: "processName",
        title: "流程名称",
        itemRender: { name: "$input", props: { placeholder: "请输入流程名称" } }
      },
      {
        field: "nodeName",
        title: "节点名称",
        itemRender: { name: "$input", props: { placeholder: "请输入节点名称" } }
      },
      {
        field: "cteaterTime",
        title: "创建时间",
        slots: { default: "create_time" }
      },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  private getformatMIsAvailable = (data: any) => {
    return data.cellValue == "1"
      ? "禁用"
      : data.cellValue == "0"
      ? "不禁用"
      : "-";
  };

  private formatMIsRoleType(data: any) {
    return data.cellValue === "1"
      ? "角色"
      : data.cellValue === "0"
      ? "用户"
      : "-";
  }

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
    url: "/hospitalProcess/query", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "10",
      entity: {
        process_code: ""
      }
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

  private dialogVisible = false; //模态框
  private dialogStatus = "create";
  created() {}

  // 新增流程配置
  private handleInsert(row: any) {
    console.log("🚀 ~ row", row);
    const { processName, processCode } = row[0];
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
        this.$notify({
          title: "成功",
          message: "创建成功",
          type: "success",
          duration: 2000
        });
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
    this.$notify({
      title: "成功",
      message: "删除成功",
      type: "success",
      duration: 2000
    });
  }
}
