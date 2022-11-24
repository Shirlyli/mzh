import { Component, Vue, Watch } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import {
  delProcessData,
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  updateProcessData,
  queryHospitalProcessBusinessSave
} from "@/api/basic";
import { Form } from "element-ui";
import { CREATE_FORM_LIST } from "./formColumns";
import { getEquipmentInfoByDepartmentId } from "@/api/equipment";
import moment from "moment";
import ProcessApproval from "./processApproval.vue";
@Component({
  name: "InlineEditTable",
  components: {
    VexTable,
    ProcessApproval
  }
})
export default class extends Vue {
  created() {}

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

  // 流程配置列表项
  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "applyDept", title: "申请科室", width: 150 },
    { field: "applyTime", title: "申请日期" },
    { field: "projectName", title: "项目名称" },
    { field: "purchaseType", title: "购置类别" },
    { field: "purchaseType", title: " 采购类型 " },
    { field: "nextNodeName", title: " 当前节点信息 " },
    { field: "count", title: " 数量 " },
    { field: "money", title: " 总金额 " },
    { field: "nextNodeState", title: " 状态 " },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch", },
      showOverflow: true
    }
  ];

  private paramsConfig: any = {
    url: "/hospitalProcessBusiness/queryProcessList", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "20",
      nextNodeExecutor: "0D0228B583E85D-949F-47CF-B9DA-BC532A206EF4",
      // nextNodeExecutor: "5644995402AD41-1CC3-40ED-B375-7A3B831B4AA1",
      processCode: "pro_kssq",
      nextNodeState: "待审核"
    }
  };

  private doneFormConfig = {
    url: "/hospitalProcessBusiness/queryProcessList", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "20",
      // nextNodeExecutor: "0D0228B583E85D-949F-47CF-B9DA-BC532A206EF4",
      // nextNodeExecutor: "5644995402AD41-1CC3-40ED-B375-7A3B831B4AA1",
      processCode: "pro_kssq",
      nextNodeState: "审核不通过"
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
    applyTime: null,
    processCode: "pro_kssp",
    currentNodeName: "",
    currentNodeCode: "",
    nextNodeName: "",
    processName: "",
    nextNodeCode: "",
    nextNodeExecutor: "0D0228B583E85D-949F-47CF-B9DA-BC532A206EF4",
    auditStatus: "",
    auditReason: "",
    delState: "",
    ksspPerson: "",
    ksspTime: null,
    ksspReason: "",
    yzspPerson: "",
    yzspTime: null,
    yzspReason: ""
  }; //新增申请表单数据

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
  private nextNodeExecutorData = []; //下一节点执行人
  private applyDetailData = []; //设备列表
  private activeName = "toDoTask"; //当前tab页
  private createFormList = CREATE_FORM_LIST;
  private fileList = []; //附件信息
  private approvalDialogVisible = false; //审批节点抽屉显隐
  private clickProcessData = {}; //当前操作流程节点信息
  private rules = {};
  /**
   * 获取科室数据 queryDepartmentInfoTree
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取设备明细数据 queryEquipmentData
   */
  private async queryProcessCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (nextCodeData.code == "200") {
      const { nodeName, nodeNameCode } = nextCodeData.data;
      this.equipmentProcessData = {
        ...this.equipmentProcessData,
        nextNodeName: nodeName,
        nextNodeCode: nodeNameCode
      };
    }
  }

  private async queryDeptData() {
    const res: any = await queryDepartmentInfoTree({});
    if (res.code == "200" && res.data) {
      this.applyDeptData = res.data[0].children;
    }
  }

  private async queryUserListProcessCode(nodeSort: number) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (nextNodeExecutorData.code == "200") {
      this.nextNodeExecutorData = nextNodeExecutorData.data;
    }
  }

  @Watch("equipmentProcessData.applyDept", { immediate: true })
  private async queryEquipmentData() {
    const res: any = await getEquipmentInfoByDepartmentId({
      page: "1",
      limit: "10",
      entity: {
        departmentId: this.equipmentProcessData.applyDept
      }
    });
    if (res.code == 200) {
      this.applyDetailData = res.data;
    }
  }

  private async queryCodeDataFirst() {
    this.queryDeptData();
    const currentCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeSort: 1
    });
    if (currentCodeData.code == "200") {
      const {
        processName,
        processCode,
        nodeName,
        nodeNameCode,
        nodeSort
      } = currentCodeData.data;
      this.equipmentProcessData = {
        ...this.equipmentProcessData,
        processCode,
        processName,
        currentNodeName: nodeName,
        currentNodeCode: nodeNameCode
      };
      this.queryProcessCodeAndBhResData(nodeSort);
      this.queryUserListProcessCode(nodeSort);
    }
  }

  private dialogVisible = false; //模态框
  private dialogStatus = "create";

  // 新增流程配置
  private handleInsert(row: any) {
    console.log("🚀 ~ row", row);
    const { processName, processCode } = row[0];
    // this.dialogVisible = true;
  }

  // 新增流程申请
  private createData() {
    console.log("🚀 ~ this.equipmentProcessData", this.equipmentProcessData);
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const res: any = await queryHospitalProcessBusinessSave({
          ...this.equipmentProcessData
        });
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

  // 新增科室申请
  private addEquipmentRequest() {
    this.queryCodeDataFirst();
    this.dialogVisible = true;
  }

  private handleClick() {}

  /**
   * 附件上传
   */
  private handleRemoveField(file, fileList) {
    console.log(file, fileList);
  }
  private handlePreview(file) {
    console.log(file);
  }
  private handleExceed(files, fileList) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    );
  }
  private beforeRemove(file, fileList) {
    return this.$confirm(`确定移除 ${file.name}？`);
  }

  //  点击查看按钮事件
  private handleSearch(row: any) {
    this.approvalDialogVisible = true;
    this.clickProcessData = row;
  }

  private emitHandleSubmit(value: boolean) {
    this.approvalDialogVisible = false;
    if (value) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
    }
  }

  private changeApplyDept() {}
}
