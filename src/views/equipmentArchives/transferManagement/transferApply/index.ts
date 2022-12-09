import { Component, Vue, Watch } from "vue-property-decorator";
import VexTable from "@/components/VexTable/index.vue";
import _ from "lodash";
import {
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryDepartmentInfoTree,
  delHospitalProcessBusiness,
  queryProcessRecordList
} from "@/api/basic";
import { Form, Message } from "element-ui";
import { getEquipmentInfoByDepartmentId } from "@/api/equipment";
// import ProcessApproval from "./processApproval.vue";
import RequestDrawer from "@/components/requestDrawer/index.vue";
import {
  Basic_Form_List,
  Equipment_Detail_Form_List,
  Approval_Form_list
} from "./formColumns";
@Component({
  name: "InlineEditTable",
  components: {
    VexTable,
    RequestDrawer
    // ProcessApproval
  }
})
export default class extends Vue {
  /**********************************
   * 列表相关
   *********************************/
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
        title: "设备名称",
        itemRender: { name: "$input", props: { placeholder: "请输入设备名称" } }
      },
      {
        field: "nodeName",
        title: "所属科室",
        itemRender: { name: "$input", props: { placeholder: "请输入所属科室" } }
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
    { field: "applyDept", title: "设备编号", width: 150 },
    { field: "applyTime", title: "设备名称" },
    { field: "projectName", title: "设备序列号" },
    { field: "purchaseType", title: "规格型号" },
    { field: "purchaseType", title: " 所属科室 " },
    { field: "nextNodeName", title: " 所属分类" },
    { field: "count", title: " 启用日期 " },
    { field: "nextNodeState", title: " 生产厂商 " },
    {
      width: 250,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true
    }
  ];

  // 列表传参
  private paramsConfig: any = {
    url: "/hospitalProcessBusiness/queryProcessList", // 根据表单查询项查询数据
    params: {
      page: "1",
      limit: "20",
      nextNodeExecutor: "3C5775C862C396-346D-46F9-89EC-164A3BF087F2", //TODO: 后续删除
      processCode: "pro_kssq",
      nextNodeState: "待审核" //状态
    }
  };

  //  点击查看按钮事件
  private handleSearch(row: any) {
    this.approvalDialogVisible = true;
    this.clickProcessData = row;
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
  private requestForm = {
    billMain: Basic_Form_List,
    billEquipmentList: Equipment_Detail_Form_List,
    billApproveList: Approval_Form_list
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
    processName: [{ require: true, trigger: "change", message: "请选择" }]
  };

  // 新增流程配置
  private handleInsert(row: any) {
    this.requestDialogVisible = true;
  }

  private handleClose(){
    this.requestDialogVisible = false
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
