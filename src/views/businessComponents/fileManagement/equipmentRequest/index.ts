import { Component, Vue } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import {
  delProcessData,
  queryDepartmentInfoTree,
  updateProcessData
} from "@/api/basic";
import { Form } from "element-ui";
import { CREATE_FORM_LIST } from "./formColumns";
import Treeselect from '@riophae/vue-treeselect'
@Component({
  name: "InlineEditTable",
  components: {
    VexTable,
    Treeselect
  }
})
export default class extends Vue {
  created() {
    this.findDeptData();
  }
  private activeName = "toDoTask";
  private createFormList = CREATE_FORM_LIST;

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
        slots: { default: "name_item" }
      },
      {
        field: "nodeName",
        title: "节点名称",
        slots: { default: "sex_item" }
      },
      {
        field: "cteaterTime",
        title: "创建时间",
        slots: { default: "create_time" }
      },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  // 流程配置列表项
  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "processName", title: "流程名称", width: 150 },
    { field: "processCode", title: "流程代码" },
    { field: "nodeName", title: "节点名称" },
    { field: "nodeNameCode", title: "节点名称编码" },
    { field: "nodeSort", title: " 节点顺序 " },
    { field: "isDisable", title: " 是否禁用 " },
    { field: "roleType", title: " 角色类型 " },
    { field: "roleTypeId", title: " 角色类型id " },
    { field: "cteator", title: "创建人" },
    { field: "cteaterTime", title: "创建时间" },
    {
      width: 160,
      title: "操作",
      slots: { default: "operate" },
      showOverflow: true
    }
  ];

  private paramsConfig: any = {
    url: "/hospitalProcessBusiness/queryProcessList", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "20",
      // nextNodeExecutor: "user001",//执行人
      processCode: "pro_kssp",
      nextNodeState: "待审核"
    }
  };

  private equipmentProcessData = {
    projectName: "",
    purchaseType: "",
    applyDept: "",
    applyPerson: "",
    applyModle: "",
    applyReson: "",
    applyDetailId: "",
    enclosureId: "",
    applyTime: "",
    processCode: "",
    currentNodeName: "",
    currentNodeCode: "",
    nextNodeName: "",
    nextNodeCode: "",
    nextNodeExecutor: "",
    operator: ""
  };

  private formItems = [
    {
      title: "左侧",
      span: 24,
      children: CREATE_FORM_LIST
    },
    {
      align: "center",
      span: 24,
      itemRender: {
        name: "$buttons",
        children: [
          {
            props: { type: "submit", content: "确认", status: "primary" }
          },
          { props: { type: "reset", content: "重置" } },
          { props: { type: "reset", content: "取消" } }
        ]
      }
    }
  ];

  private applyDeptData = []; //科室

  private async findDeptData() {
    const res: any = await queryDepartmentInfoTree({});
    if (res.code === 200 && res.data) {
      this.applyDeptData = res.data;
    }
  }

  private dialogVisible = false; //模态框
  private dialogStatus = "create";

  // 新增流程配置
  private handleInsert(row: any) {
    console.log("🚀 ~ row", row);
    const { processName, processCode } = row[0];
    // this.dialogVisible = true;
    this.equipmentProcessData = {
      ...this.equipmentProcessData,
      processCode
    };
  }

  // 新增流程配置
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await updateProcessData(this.equipmentProcessData);
        console.log(
          "🚀 ~ this.equipmentProcessData",
          this.equipmentProcessData
        );
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
        const res: any = await updateProcessData(this.equipmentProcessData);
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
    this.equipmentProcessData = { ...this.equipmentProcessData, ...row };
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

  // 新增科室申请
  private addEquipmentRequest() {
    this.dialogVisible = true;
  }
}
