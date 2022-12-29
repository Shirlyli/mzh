import { Component, Vue, Watch } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  delHospitalProcessBusiness,
  queryProcessRecordList,
  handleSaveCheckApply
} from "@/api/basic";
import { BusinessViewModule } from "@/store/modules/business";
import { Message } from "element-ui";
import { getEquipmentInfoByDepartmentId } from "@/api/equipment";
import ProcessApproval from "@/components/processApproval/index.vue";
import RequestDrawer from "@/components/requestDrawer/index.vue";
import {
  Basic_Form_List,
  Equipment_Detail_Form_List,
  Approval_Form_list
} from "./formColumns";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "InlineEditTable",
  components: {
    VexTable,
    RequestDrawer,
    ProcessApproval
  }
})
export default class extends Vue {
  async created() {
    await BusinessViewModule.GET_DEPARTMENT_DATA();
    Basic_Form_List.forEach((item: any) => {
      if (item.slot === "department") {
        item.data = BusinessViewModule.departmentData.map((dept: any) => {
          return { label: dept.title, value: dept.id };
        });
      }
    });
    console.log("🚀 ~ 基本信息模块", Basic_Form_List);
  }

  private basicFormList = Basic_Form_List;
  mounted() {}
  /**********************************
   * 列表相关
   *********************************/
  // 列表查询项-表单
  private formConfig = {
    data: {
      approveStatus: "",
      rollOutDepartment: "",
      cteaterTime: ""
    },
    items: [
      {
        field: "approveStatus",
        title: "任务名称",
        itemRender: { name: "$input", props: { placeholder: "请输入审批状态" } }
      },
      {
        field: "rollOutDepartment",
        title: "制单科室",
        itemRender: { name: "$input", props: { placeholder: "请输入申请科室" } }
      },
      {
        field: "rollOutDepartment",
        title: "盘点状态",
        itemRender: { name: "$input", props: { placeholder: "请输入申请科室" } }
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
    { field: "billCode", title: "盘点单号", width: 150 },
    { field: "checkDepartment", title: "任务名称" },
    { field: "userId", title: "申请人" },
    { field: "createTime", title: "申请日期" },
    { field: "departmentId", title: "制单科室 " },
    { field: "equipmentCategory", title: "盘点范围" },
    { field: "approveStatus", title: "盘点状态 " },
    {
      width: 250,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true
    }
  ];

  // 列表传参
  private paramsConfig: any = {
    url: "/checkApply/getCheckApplyInfo", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "20",
      entity: {}
    }
  };

  //  点击查看按钮事件
  private handleSearch(row: any) {
    console.log("🚀 ~ row", row);
    this.approvalDialogVisible = true;
    this.clickProcessData = row;
    this.clickProcessData.billEquipmentList = this.clickProcessData.billEquipmentList.map(
      (item: any) => {
        return { ...item, ...item.equipment };
      }
    );
    console.log("🚀 ~ this.clickProcessData", this.clickProcessData);
  }

  // 删除事件
  private async handleRemove(data: any) {
    const res: any = await delHospitalProcessBusiness({
      ids: data.id
    });
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      Message.info("删除流程成功");
    }
  }

  /****************
   * 流程申请相关
   *****************/
  private requestDialogVisible = false; //模态框
  // 申请form表单配置文件
  private requestForm = {
    billMain: Basic_Form_List,
    billEquipmentList: Equipment_Detail_Form_List,
    billApproveList: Approval_Form_list
  };
  // 申请接口传惨params
  private requestParams = {
    id: "",
    status: "0",
    billCode: "",
    billMain: {
      id: "",
      userId: UserModule.userData?.userId,
      userName: UserModule.userData?.userName,
      createTime: "",
      rollOutDepartment: "",
      rollInDepartment: "",
      equipmentLocation: "",
      rollOutTime: "",
      cause: "",
      status: "",
      billCode: ""
    },
    billEquipmentList: {
      id: "",
      billId: "",
      equipmentId: ""
    },
    billApproveList: {
      id: "",
      approveUser: UserModule.userData?.userId,
      approveUserName: UserModule.userData?.userName,
      approveTime: "",
      approveOpinion: "",
      approveStatus: "",
      billId: ""
    }
  };
  private processModal = {
    id: "",
    status: "0",
    billCode: "",
    billMain: {
      id: "",
      userId: "",
      createTime: "",
      rollOutDepartment: "",
      rollInDepartment: "",
      equipmentLocation: "",
      rollOutTime: "",
      cause: "",
      status: "0",
      billCode: ""
    },
    billEquipmentList: [
      {
        id: "",
        billId: "",
        equipmentId: ""
      }
    ],
    billApproveList: [
      {
        id: "",
        approveUser: "",
        approveTime: "",
        approveOpinion: "",
        approveStatus: "",
        chrckId: ""
      }
    ]
  };

  private rules = {
    nextNodeExecutor: [{ require: true, trigger: "change", message: "请选择" }],
    approveStatus: [{ require: true, trigger: "change", message: "请选择" }]
  };

  /*******************************
   * 新增流程配置
   ******************************/
  private handleInsert(row: any) {
    this.requestDialogVisible = true;
  }

  private handleClose() {
    this.requestDialogVisible = false;
  }

  private async handleCreateRequest(params: any) {
    const billEquipmentList: any = [];
    billEquipmentList.push(params.billEquipmentList);
    const billApproveList: any = [];
    billApproveList.push(params.billApproveList);
    const sendParams = [];
    sendParams.push({
      ...params,
      billEquipmentList,
      billApproveList
    });
    const res: any = await handleSaveCheckApply(sendParams);
    if (res.code == 200) {
      this.$message.success("发起申请成功");
      this.requestDialogVisible = false;
      (this.$refs.vexTable as any).findList(this.paramsConfig);
    }
  }

  /*****************************
   * 操作记录
   ***************************/
  private processRecordListData = []; //操作记录
  private processRecordDialogVisible = false; //操作记录显隐

  private handleRecord(data: any) {
    this.processRecordDialogVisible = true;
    this.queryProcessRecordListData(data);
  }

  // 获取流程操作记录 queryProcessRecordList
  private async queryProcessRecordListData(data: any) {
    const res: any = await queryProcessRecordList({
      businessId: data.id
    });
    if (res.result) {
      this.processRecordListData = res.data;
    }
  }

  /************************************
   * 流程审批相关
   *************************************/
  private applyDeptData = []; //科室
  private nextNodeExecutorData = []; //下一节点执行人
  private applyDetailData = []; //设备列表
  private approvalDialogVisible = false; //审批节点抽屉显隐
  private clickProcessData: any = {}; //当前操作流程节点信息
  private emitHandleSubmit(value: boolean) {
    this.approvalDialogVisible = false;
    if (value) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
    }
  }

  /**************************************************
   * 获取科室数据 queryDepartmentInfoTree
   * 获取节点信息 queryProcessCodeAndBhResData
   * 获取人员权限列表 getUserListProcessCode
   * 获取设备明细数据 queryEquipmentData
   *************************************************/
  private async queryProcessCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (nextCodeData.code == "200") {
      const { nodeName, nodeNameCode, roleTypeId } = nextCodeData.data;
      // this.equipmentProcessData = {
      //   ...this.equipmentProcessData,
      //   nextNodeName: nodeName,
      //   nextNodeCode: nodeNameCode
      // };
    }
  }

  // 获取科室数据
  private async queryDeptData() {
    const res: any = await queryDepartmentInfoTree({});
    if (res.code == "200" && res.data) {
      this.applyDeptData = res.data[0].children;
    }
  }

  // 获取节点人员权限列表
  private async queryUserListProcessCode(nodeSort: number) {
    const nextNodeExecutorData: any = await getUserListProcessCode({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (nextNodeExecutorData.code == "200") {
      this.nextNodeExecutorData = nextNodeExecutorData.data;
    }
  }

  // 根据科室类别获取设备
  @Watch("equipmentProcessData.applyDept", { immediate: true })
  private async queryEquipmentData() {
    const res: any = await getEquipmentInfoByDepartmentId({
      page: "1",
      limit: "10",
      entity: {}
    });
    if (res.code == 200) {
      this.applyDetailData = res.data;
    }
  }
}
