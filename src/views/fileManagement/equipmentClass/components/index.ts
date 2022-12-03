import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import {
  tHospitalEquipment,
  tHospitalEquipmentPurchase,
  thospitalEquipmentDepreciation,
  thospitalEquipmentMaintainWithBLOBs,
  thospitalEquipmentResource,
  thospitalEquipmentStock,
  thospitalEquipmentStore,
  tmzhEquipmentInspectionWithBLOB
} from "../formlist/index";
// import {
//   THospitalEquipment,
//   THospitalEquipmentPurchase,
//   THospitalEquipmentPayment,
//   ThospitalEquipmentDepreciation,
//   ThospitalEquipmentMaintainWithBLOB,
//   ThospitalEquipmentResource,
//   ThospitalEquipmentStock,
//   ThospitalEquipmentStore,
//   TmzhEquipmentInspectionWithBLOB
// } from "../formlist/interface.type";
import { EquipmentInfoTypes } from "../formlist/interface.type";
import { Form, Message } from "element-ui";
import { updateEquipmentInfoData } from "@/api/equipment";
@Component({
  name: "EquipmentFormDialog"
})
export default class extends Vue {
  @Prop({ default: "create" }) dialogStatus!: string;
  @Prop({ default: false }) dialogVisible!: boolean;
  @Watch("dialogVisible")
  private onChange(value: boolean) {
    this.equipmentVisible = value;
  }
  private equipmentVisible = false;
  private tabMapOptions = [
    { label: "设备基础信息", key: "tHospitalEquipment" },
    { label: "设备资料", key: "thospitalEquipmentResource" },
    { label: "设备采购信息", key: "tHospitalEquipmentPurchase" },
    { label: "设备保养", key: "thospitalEquipmentMaintainWithBLOBs" },
    { label: "设备巡检", key: "tmzhEquipmentInspectionWithBLOB" },
    { label: "仓库记录", key: "tHospitalEquipmentStock" },
    { label: "出入库记录", key: "thospitalEquipmentStore" },
    { label: "设备折旧", key: "thospitalEquipmentDepreciation" }
  ]; // tab栏

  private allFormList: any = []; // 表单项
  private rules = {
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "change" }
    ]
  }; // 表单校验
  @Prop() equipmentCategoryData!: any;
  private defaultEquipmentInfoData: EquipmentInfoTypes = this
    .equipmentCategoryData; // 默认新增模态框数据
  private activeName = "tHospitalEquipment"; // 当前tab页
  @Watch("activeName") // 监听tab页
  private onActiveNameChange(value: string) {
    console.log("🚀 ~ value", value);
    console.log(this.defaultEquipmentInfoData);
    switch (this.activeName) {
      case "tHospitalEquipment":
        this.allFormList[this.activeName] = tHospitalEquipment;
        break;
      case "tHospitalEquipmentPurchase":
        this.allFormList[this.activeName] = tHospitalEquipmentPurchase;
        break;
      case "thospitalEquipmentResource":
        this.allFormList[this.activeName] = thospitalEquipmentResource;
        break;
      case "thospitalEquipmentMaintainWithBLOBs":
        this.allFormList[this.activeName] = thospitalEquipmentMaintainWithBLOBs;
        break;
      case "tmzhEquipmentInspectionWithBLOB":
        this.allFormList[this.activeName] = tmzhEquipmentInspectionWithBLOB;
        break;
      case "thospitalEquipmentStock":
        this.allFormList[this.activeName] = thospitalEquipmentStock;
        break;
      case "thospitalEquipmentStore":
        this.allFormList[this.activeName] = thospitalEquipmentStore;
        break;
      case "thospitalEquipmentDepreciation":
        this.allFormList[this.activeName] = thospitalEquipmentDepreciation;
        break;
      default:
        console.log("error");
    }
  }

  created() {
    this.allFormList = [{ tHospitalEquipment: tHospitalEquipment }];
  }

  // 新增设备
  @Emit()
  emitSubmit(value: boolean) {
    return value;
  }
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        let params = [];
        params.push(this.equipmentCategoryData);
        console.log(
          "🚀 ~ this.defaultEquipmentInfoData",
          this.equipmentCategoryData.departmentId,
          params
        );
        const res: any = await updateEquipmentInfoData(params);
        if (res.code == 200) {
          this.emitSubmit(true);
        }
        Message.success("创建成功");
      }
    });
  }

  // 修改科室
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        let params = [];
        params.push(this.defaultEquipmentInfoData);
        console.log("🚀 ~ this.defaultEquipmentInfoData", params);
        const res: any = await updateEquipmentInfoData(params);
        if (res.code == 200) {
          this.emitSubmit(true);
        }
        Message.success("修改成功");
      }
    });
  }

  // 关闭模态框
  @Emit()
  emitCloseDialog() {
    return false;
  }
  private handleCloseDialog() {
    this.emitCloseDialog();
  }
}
