import { Component, Vue, Watch, Prop, Emit } from "vue-property-decorator";
import {
  equipmentBasicInfo,
  equipmentProperty,
  capitalStructure,
  purchaseInfo,
  biddingInfo,
  contractInfo,
  acceptanceInfo,
  EquipmentInfoTypes
} from "../formlist/index";
import { Form, Message } from "element-ui";
import { updateEquipmentInfoData } from "@/api/equipment";
@Component({
  name: "EquipmentFormDialog"
})
export default class extends Vue {
  @Prop({ default: "create" }) dialogStatus!: string;
  @Prop({ default: false }) dialogVisible!: boolean;
  private tabMapOptions = [
    { label: "设备信息", key: "equipmentInfo" },
    { label: "设备资料", key: "thospitalEquipmentResources" },
    { label: "设备采购信息", key: "equipmentBuy" },
    { label: "设备保养", key: "tHospitalEquipmentResourceWithBLOBs" },
    { label: "设备巡检", key: "tmzhEquipmentInspectionWithBLOBs" },
    { label: "仓库记录", key: "tHospitalEquipmentStocks" },
    { label: "出入库记录", key: "tHospitalEquipmentStores" },
    { label: "设备折旧", key: "tHospitalEquipmentDepreciations" }
  ]; // tab栏

  private allFormList: any = []; // 表单项
  private rules = {
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "change" }
    ]
  }; // 表单校验

  private activeName = "equipmentInfo"; // 当前tab页
  @Watch("activeName") // 监听tab页
  private onActiveNameChange(value: string) {
    console.log("🚀 ~ value", value);
    console.log(this.$refs.dataForm)
    switch (this.activeName) {
      case "equipmentInfo":
        this.allFormList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ];
        break;
      case "thospitalEquipmentResources":
        break;
      case "tHospitalEquipmentResourceWithBLOBs":
        this.allFormList = [
          {
            申购信息: purchaseInfo
          },
          {
            招标信息: biddingInfo
          },
          {
            合同信息: contractInfo
          },
          {
            验收信息: acceptanceInfo
          }
        ];
        break;
      case "tMzhEquipmentInspectionWithBLOBs":
        this.allFormList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ];
        break;
      case "tHospitalEquipmentStocks":
        this.allFormList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ];
        break;
      case "tHospitalEquipmentStores":
        this.allFormList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ];
        break;
      case "tHospitalEquipmentDepreciations":
        this.allFormList = [
          {
            基本信息: equipmentBasicInfo
          },
          {
            设备属性: equipmentProperty
          },
          {
            资金结构: capitalStructure
          }
        ];
        break;
      default:
        console.log("error");
    }
  }
  @Prop() equipmentCategoryData!: any;
  private defaultEquipmentInfoData: EquipmentInfoTypes = this
    .equipmentCategoryData; // 默认新增模态框数据

  created() {
    this.allFormList = [
      {
        基本信息: equipmentBasicInfo
      },
      {
        设备属性: equipmentProperty
      },
      {
        资金结构: capitalStructure
      }
    ];
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
        params.push(this.defaultEquipmentInfoData);
        console.log("🚀 ~ this.defaultEquipmentInfoData", params);
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
        console.log(
          "🚀 ~ this.equipmentCategoryData",
          this.defaultEquipmentInfoData
        );
        const res: any = await updateEquipmentInfoData(
          this.equipmentCategoryData
        );
        // if (res.result) {
        //   (this.$refs.vexTable as any).findList(this.paramsConfig);
        //   (this.$refs.vxeTree as any).getTreeListData(
        //     this.url,
        //     this.treeParams
        //   );
        // }
        // this.dialogVisible = false;
        // this.$notify({
        //   title: "成功",
        //   message: "更新成功",
        //   type: "success",
        //   duration: 2000
        // });
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
