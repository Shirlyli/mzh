import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import {
  equipmentBasicInfo,
  equipmentProperty,
  capitalStructure,
  purchaseInfo,
  biddingInfo,
  contractInfo,
  acceptanceInfo
} from "@/store/formlist/index";
import { Form } from "element-ui";
import { updateEquipmentInfoData } from "@/api/equipment";
@Component({
  name: "EquipmentFormDialog"
})
export default class extends Vue {
  @Prop({ default: "create" }) dialogStatus!: string;
  @Prop({ default: false }) dialogVisible!: boolean;
  private tabMapOptions = [
    { label: "设备信息", key: "equipmentInfo" },
    { label: "设备资料", key: "equipmentData" },
    { label: "采购信息", key: "purchaseInfo" },
    { label: "折旧信息", key: "depreciateInfo" }
  ]; // tab栏

  private formList: any = []; // 表单项
  private rules = {
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "change" }
    ]
  }; // 表单校验

  private activeName = "equipmentInfo"; // 当前tab页
  @Watch("activeName") // 监听tab页
  private onActiveNameChange(value: string) {
    console.log("🚀 ~ value", value);
    switch (this.activeName) {
      case "equipmentInfo":
        this.formList = [
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
      case "equipmentData":
        this.formList = [
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
      case "purchaseInfo":
        this.formList = [
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
      case "depreciateInfo":
        this.formList = [
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
  private defaultEquipmentInfoData = this.equipmentCategoryData; // 默认新增模态框数据

  created() {
    this.formList = [
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

  // 新增科室
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { id } = this.defaultEquipmentInfoData;
        console.log(
          "🚀 ~ this.defaultEquipmentInfoData",
          this.defaultEquipmentInfoData
        );
        const res: any = await updateEquipmentInfoData(
          this.defaultEquipmentInfoData
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
        //   message: "创建成功",
        //   type: "success",
        //   duration: 2000
        // });
      }
    });
  }

  // 修改科室
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        console.log("🚀 ~ this.equipmentCategoryData", this.defaultEquipmentInfoData)
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
}
