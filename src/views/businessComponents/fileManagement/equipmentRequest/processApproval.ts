import {
  delHospitalProcessBusiness,
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryHospitalProcessBusinessUpdate,
  queryProcessData,
  queryProcessRecordList
} from "@/api/basic";
import { Form, Message } from "element-ui";
import _ from "lodash";
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import { CREATE_FORM_LIST } from "./formColumns";
@Component({
  name: "ProcessApproval",
  components: {}
})
export default class extends Vue {
  private type = "submit"; // 审批类型-通过，终止
  @Prop({ default: false }) dialogVisible!: boolean;
  @Watch("dialogVisible")
  @Prop()
  processData!: any; //流程数据
  @Watch("processData")
  private onChangeProcessData(data: any) {
    console.log("🚀 ~ data", data);
  }
  private nextDialogVisible = false;
  private title = "流程审批";
  private basicInfo = CREATE_FORM_LIST; //基本信息
  private equipmentProcessData = {
    currentNodeName: "", //当前节点name
    currentNodeCode: "", //当前节点code
    nextNodeName: "", //下一节点名称
    nextNodeCode: "", //下一节点code
    nextNodeExecutor: "", //下一节点执行人
    auditStatus: "", //审核状态(审核通过,审核不通过，回退,作废)
    auditReason: "", //审核结论
    delState: "", //是否删除(是|否)
    ksspPerson: "", //科室审批人
    ksspTime: "", //科室审批时间
    ksspReason: "", //科室审批结论
    yzspPerson: "", //院长审批人
    yzspTime: "", //院长审批时间
    yzspReason: "" //院长审批结论
  };
  private rules = {};
  private nextNodeNameData: any = {}; //下一节点名称
  private nextNodeExecutorData: any = {}; //下一节点处理人
  private nodeExecutorData: any = []; //当前节点处理人
  private allProcessList: any = []; //所有流程节点
  created() {}
  mounted() {}

  // 获取当前节点信息，并根据当前节点信息获取下一节点信息数据
  private async queryCurrentCodeAndBhResData(nodeNameCode: any) {
    console.log("🚀 ~ nodeNameCode", nodeNameCode);
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeNameCode
    });
    console.log("🚀 ~ nextCodeData", nextCodeData);
    if (nextCodeData.code == "200") {
      this.equipmentProcessData.currentNodeCode = nextCodeData.nodeNameCode;
      this.equipmentProcessData.currentNodeName = nextCodeData.nodeName;
      this.queryUserListProcessCode(nextCodeData.data.nodeSort);
      this.queryNextCodeAndBhResData(nextCodeData.data.nodeSort);
    }
  }
  /**
   * 获取下一节点
   */
  private async queryNextCodeAndBhResData(nodeSort: any) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (nextCodeData.code == "200") {
      this.nextNodeNameData = nextCodeData.data;
      this.equipmentProcessData.nextNodeName = nextCodeData.data.nodeName;
      this.equipmentProcessData.nextNodeCode = nextCodeData.data.nodeNameCode;
    }
  }

  /**
   * 获取权限处理人
   */
  private async queryUserListProcessCode(nodeSort: number, type?: string) {
    const executorData: any = await getUserListProcessCode({
      processCode: "pro_kssq",
      nodeSort: nodeSort + 1
    });
    if (executorData.code == "200") {
      if (type) {
        this.nodeExecutorData = executorData.data;
      } else {
        this.nextNodeExecutorData = executorData.data;
      }
    }
  }

  // 审核通过点击事件
  private handleSubmit() {
    this.queryCurrentCodeAndBhResData(this.processData.nextNodeCode);
    this.nextDialogVisible = true;
    this.type = "submit";
  }

  //
  @Emit()
  emitHandleSubmit(value: boolean) {
    return value;
  }

  /**
   * 确认流程处理 /api/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
   */
  private async handleSubmitProcess() {
    const { id } = this.processData;
    console.log("🚀 ~ this.equipmentProcessData", this.equipmentProcessData);
    if (this.type === "submit") {
      (this.$refs.dataForm as Form).validate(async valid => {
        this.nextDialogVisible = false;
        if (valid) {
          const params = {
            ...this.equipmentProcessData,
            id,
            operator: "操作人",
            auditStatus: "审核通过", //审核状态(审核通过,审核不通过，回退,作废)
          };
          console.log("🚀 ~ params", params)
          // const res: any = await queryHospitalProcessBusinessUpdate(params);
          // if (res.result) {
          //   this.nextDialogVisible = false;
          //   this.emitHandleSubmit(true);
          // }
          // this.dialogVisible = false;
          // (this.$refs.dataForm as Form).resetFields();
          // Message.success("审批成功");
        }
      });
    } else if (this.type === "end") {
      console.log("🚀 ~ this.type", this.type);
    } else if (this.type === "back") {
      (this.$refs.dataForm as Form).validate(async valid => {
        this.nextDialogVisible = false;
        if (valid) {
          const params = {
            id,
            currentNodeName: nextNodeName,
            currentNodeCode: nextNodeCode,
            nextNodeName: _.find(this.nextNodeExecutorData, [
              "nodeNameCode",
              this.equipmentProcessData.nextNodeCode
            ]).nodeName,
            nextNodeCode: this.equipmentProcessData.nextNodeCode,
            nextNodeExecutor: this.equipmentProcessData.nextNodeExecutor
          };
          console.log("🚀 ~ params", params);
          const res: any = await queryHospitalProcessBusinessUpdate(params);
          if (res.result) {
            this.nextDialogVisible = false;
            this.emitHandleSubmit(true);
          }
          this.dialogVisible = false;
          (this.$refs.dataForm as Form).resetFields();
          Message.success("退回成功");
        }
      });
    }
  }

  // 审批通过框
  private handleCancelProcess() {
    this.nextDialogVisible = false;
  }

  // 关闭审批流程抽屉事件
  private handleCancelApproval() {
    this.emitHandleSubmit(false);
  }

  /**
   * 流程审批退回
   */
  private handleBack() {
    this.queryAllProcess();
    this.type = "back";
    this.nextDialogVisible = true;
  }

  /**
   * 获取所有流程节点,并过滤出回退节点数据
   */
  private async queryAllProcess() {
    const res: any = await queryProcessData({
      page: "1",
      limit: "10",
      entity: {
        process_code: "pro_kssq"
      }
    });
    const nextNodeCode = this.processData.nextNodeCode;
    console.log("🚀 ~ this.processData", this.processData);
    if (res.code === 200) {
      this.allProcessList = res.data[0].processInfo;
      const dept = _.find(res.data[0].processInfo, [
        "nodeNameCode",
        nextNodeCode
      ]);
      console.log("🚀 ~ dept", dept);
      this.nextNodeExecutorData = res.data[0].processInfo.slice(
        0,
        dept.nodeSort - 1
      );
      this.equipmentProcessData.nextNodeCode = this.nextNodeExecutorData[0].nodeNameCode;
      console.log("🚀 ~ this.nextNodeExecutorData ", this.nextNodeExecutorData);
    }
  }

  /**
   * 退回时选中退回节点，获取节点对应处理人
   */
  private handleNodeChange(value: number) {
    console.log("🚀 ~ value", value);
    const nodeSort = _.find(this.allProcessList, ["nodeNameCode", value])
      .nodeSort;
    console.log("🚀 ~ nodeSort", nodeSort);
    this.queryUserListProcessCode(nodeSort - 1, "back");
  }

  /**
   * 终止流程
   */
  private handleEnd() {
    this.nextDialogVisible = true;
    this.type = "end";
  }
}
