import {
  delHospitalProcessBusiness,
  getProcessNodeInfoByProcessCodeAndBh,
  getUserListProcessCode,
  queryHospitalProcessBusinessUpdate,
  queryProcessData,
  queryProcessRecordList
} from "@/api/basic";
import { ITagView, TagsViewModule } from "@/store/modules/tags-view";
import { UserModule } from "@/store/modules/user";
import { Form, Message } from "element-ui";
import _ from "lodash";
import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "ProcessApproval",
  components: {}
})
export default class extends Vue {
  private processData = JSON.parse(
    sessionStorage.getItem("ClickProcessData") ?? "0"
  ); //流程数据
  private basicFormList = JSON.parse(
    sessionStorage.getItem("BasicFormList") ?? "0"
  ); //流程表单配置数据columns
  created() {}
  private submitVisible = false; // 同意
  private backVisible = false; //退回
  @Watch("backVisible")
  private onBackVisible(value: any) {
    console.log("🚀 ~ value", value);
    if (value) {
      this.handleBack();
    }
  }
  private endVisible = false; //终止
  @Watch("endVisible")
  private onEndVisible(value: any) {
    console.log("🚀 ~ value", value);
    if (value) {
      this.handleEnd();
    }
  }
  private type = "submit"; // 审批类型-通过，终止
  private title = "流程审批";
  private equipmentProcessData = {
    currentNodeName: "", //当前节点name
    currentNodeCode: "", //当前节点code
    nextNodeName: "", //下一节点名称
    nextNodeCode: "", //下一节点code
    nextNodeExecutor: "", //下一节点执行人
    auditStatus: "", //审核状态(审核通过,审核不通过，回退,作废)
    auditReason: "", //审核结论
    delState: "" //是否删除(是|否)
    /* ksspPerson: "", //科室审批人
    ksspTime: "", //科室审批时间
    ksspReason: "", //科室审批结论
    yzspPerson: "", //院长审批人
    yzspTime: "", //院长审批时间
    yzspReason: "" //院长审批结论*/
  };
  private rules = {};
  private nextNodeNameData: any = {}; //下一节点名称
  private nextNodeExecutorData: any = {}; //下一节点处理人
  private nodeExecutorData: any = []; //当前节点处理人
  private allProcessList: any = []; //所有流程节点

  /**************************************************
   * 获取当前节点信息，并根据当前节点信息获取下一节点信息数据
   * @param nodeNameCode
   * @param type
   **************************************************/
  private async queryCurrentCodeAndBhResData(nodeNameCode: any, type: string) {
    const nextCodeData: any = await getProcessNodeInfoByProcessCodeAndBh({
      processCode: "pro_kssq",
      nodeNameCode
    });
    if (nextCodeData.code == "200" && type === "submit") {
      this.equipmentProcessData.currentNodeCode =
        nextCodeData.data.nodeNameCode;
      this.equipmentProcessData.currentNodeName = nextCodeData.data.nodeName;
      this.queryUserListProcessCode(nextCodeData.data.nodeSort);
      this.queryNextCodeAndBhResData(nextCodeData.data.nodeSort);
      this.title = "审批同意";
      this.type = "submit";
    } else if (nextCodeData.code == "200" && type === "end") {
      this.equipmentProcessData.currentNodeCode =
        nextCodeData.data.nodeNameCode;
      this.equipmentProcessData.currentNodeName = nextCodeData.data.nodeName;
      this.type = "end";
      this.title = "终止流程";
    } else {
      Message.error("获取节点信息失败，请重试");
    }
  }
  /****************************************************
   * 获取下一节点
   ***************************************************/
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

  /****************************************************
   * 获取权限处理人
   ***************************************************/
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

  // 审核同意点击事件
  private handleSubmit() {
    const { nextNodeCode } = this.$route.query;
    this.queryCurrentCodeAndBhResData(nextNodeCode, "submit");
  }

  mounted() {
    this.handleSubmit();
  }

  /****************************************************
   * 确认流程处理 /api/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
   ***************************************************/
  private async handleSubmitProcess() {
    const { nextNodeCode, id } = this.$route.query;
    if (this.type === "submit") {
      (this.$refs.dataForm as Form).validate(async valid => {
        if (valid) {
          const params = {
            ...this.equipmentProcessData,
            id,
            operator: "操作人",
            auditStatus: "审核通过" //审核状态(审核通过,审核不通过，回退,作废)
          };
          const res: any = await queryHospitalProcessBusinessUpdate(params);
          if (res.result) {
          }
          (this.$refs.dataForm as Form).resetFields();
          Message.success("审批成功");
        }
      });
    } else if (this.type === "end") {
      (this.$refs.dataForm as Form).validate(async valid => {
        if (valid) {
          const params = {
            ...this.equipmentProcessData,
            id,
            auditStatus: "作废" //审核状态(审核通过,审核不通过，回退,作废)
          };
          const res: any = await queryHospitalProcessBusinessUpdate(params);
          if (res.result) {
          }

          (this.$refs.dataForm as Form).resetFields();
          Message.success("终止成功");
        }
      });
    } else if (this.type === "back") {
      (this.$refs.dataForm as Form).validate(async valid => {
        if (valid) {
          const params = {
            ...this.equipmentProcessData,
            id,
            auditStatus: "回退" //审核状态(审核通过,审核不通过，回退,作废)
          };
          const res: any = await queryHospitalProcessBusinessUpdate(params);
          if (res.result) {
          }
          (this.$refs.dataForm as Form).resetFields();
          Message.success("退回成功");
        }
      });
    }
    this.closeSelectedTag({
      path: "/processApproval/index"
    });
  }

  /**
   * 删除当前选中项
   * @param view
   */
  private closeSelectedTag(view: ITagView) {
    console.log("🚀 ~ view", view);
    TagsViewModule.delView(view);
    this.toLastView(TagsViewModule.visitedViews, view);
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch(err => {
        console.warn(err);
      });
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === "Dashboard") {
        // to reload home page
        this.$router
          .replace({ path: "/redirect" + view.fullPath })
          .catch(err => {
            console.warn(err);
          });
      } else {
        this.$router.push((UserModule.menu as any)[0]?.path).catch(err => {
          console.warn(err);
        });
      }
    }
  }

  /****************************************************
   * 流程审批退回
   ***************************************************/
  private handleBack() {
    this.queryAllProcess();
  }

  /****************************************************
   * 获取所有流程节点,并过滤出回退节点数据
   ***************************************************/
  private async queryAllProcess() {
    const res: any = await queryProcessData({
      processCode: "pro_kssq"
    });
    const { nextNodeCode, id } = this.$route.query;
    if (res.code === 200) {
      this.allProcessList = res.data;
      const dept = _.find(res.data[0].processInfo, [
        "nodeNameCode",
        nextNodeCode
      ]);
      this.nextNodeExecutorData = res.data[0].processInfo.slice(
        0,
        dept.nodeSort - 1
      );
      if (!this.nextNodeExecutorData.length) {
        Message.error("次流程处于初始节点，无法回退");
        return false;
      }
      this.equipmentProcessData.nextNodeCode = this.nextNodeExecutorData?.[0].nodeNameCode;
      this.equipmentProcessData.nextNodeName = this.nextNodeExecutorData?.[0].nodeName;
      this.queryUserListProcessCode(
        this.nextNodeExecutorData?.[0].nodeSort,
        "back"
      );
      this.type = "back";
      this.title = "回退流程";
    }
  }

  /****************************************************
   * 退回时选中退回节点，获取节点对应处理人
   ***************************************************/
  private handleNodeChange(value: number) {
    const nodeSort = _.find(this.allProcessList, ["nodeNameCode", value])
      .nodeSort;
    this.queryUserListProcessCode(nodeSort - 1, "back");
  }

  /****************************************************
   * 终止流程
   ***************************************************/
  private handleEnd() {
    this.type = "end";
    const { nextNodeCode, id } = this.$route.query;
    this.queryCurrentCodeAndBhResData(nextNodeCode, "end");
  }
}
