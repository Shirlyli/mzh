import { Component, Vue } from "vue-property-decorator";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
import { Form } from "element-ui";
import VexTable from "@/components/VexTable/index.vue";
import {
  dealEquipmentCategoryInfoData,
  searchEquipmentCategoryInfoDetailsData,
  updateEquipmentCategoryInfoData
} from "@/api/equipment";
import EquipmentFormDialog from "./components/index.vue";
import _ from "lodash";
import { RESULT_DATA_TYPE } from "@/utils/index.type";
import { AxiosResponse } from "axios";
@Component({
  name: "EquipmentCategory",
  components: {
    MainSubLayout,
    Tree,
    VexTable,
    EquipmentFormDialog
  }
})
export default class extends Vue {
  private formConfig = {
    data: {
      name: "",
      createtime: ""
    },
    items: [
      {
        field: "name",
        title: "设备名称",
        itemRender: { name: "$input", props: { placeholder: "请输入设备名称" } }
      },
      {
        field: "createtime",
        title: "创建时间",
        slots: { default: "create_time" }
      },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  private columns = [
    { type: "seq", width: 60, fixed: "left" },
    { type: "checkbox", width: 60, fixed: "left" },
    { field: "name", title: "设备名称", treeNode: true, width: 140 },
    { field: "id", title: "设备ID", width: 100 },
    { field: "marking", title: "设备型号", width: 100 },
    { field: "brand", title: "设备品牌", width: 100 },
    { field: "num", title: "设备数量", width: 100 },
    { field: "equipmentCategoryId", title: "设备类别", width: 100 },
    { field: "departmentId", title: "科室名称", width: 100 },
    { field: "departmentName", title: "科室", width: 100 },
    { field: "reason", title: "用途说明", width: 100 },
    { field: "userId", title: "申请人", width: 100 },
    { field: "companyInfoId", title: "所属医院", width: 100 },
    { field: "purchaseId", title: "采购ID", width: 100 },
    { field: "createtime", title: "创建时间", width: 100 },
    { field: "note", title: "备注", width: 100 },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true,
      fixed: "right"
    }
  ]; // 列表配置项

  private treeParams = {
    page: "1",
    limit: "10",
    entity: {
      id: "F7BFB16412328A-3554-4755-BB10-057BA8A8A47E"
    }
  }; // 树形图传参

  private equipmentCategoryData = {
    id: "",
    name: "",
    createtime: "",
    departmentId: "",
    marking: "",
    brand: "",
    origin: "",
    equipmentCategoryId: "",
    activationTime: "",
    guarantee: "",
    state: "",
    hospitalId: "",
    manufactorId: "",
    equipmentStates: "",
    idCode: "",
    price: "",
    batchNumber: "",
    registrationCertificat: "",
    productionName: "",
    productionTime: "",
    validity: "",
    region: "",
    purchaseTime: "",
    isExordium: "",
    meterings: "",
    source: "",
    isMetering: "",
    meteringTime: "",
    meteringType: "",
    isEmergency: "",
    isFixedassets: "",
    isSpecial: "",
    fixedassetsType: "",
    intakeDate: "",
    financialNo: "",
    equipmentLocation: "",
    fixedAssetsNo: "",
    recordNo: "",
    unit: "",
    equipmentPrincipal: "",
    barCodeNo: "",
    img: "",
    scoringGuideUrl: "",
    qrcode: "",
    barCode: ""
  }; // 新增或编辑表单

  private dialogVisible = false; // 新增模态框
  private dialogStatus = "create"; // 模态框新增或修改
  private paramsConfig: any = {
    url: "equipment/getEquipmentInfo", // 根据表单查询项查询数据
    searchByDepartmentIdUrl: "equipment/getEquipmentInfoByDepartMentId", // 通过科室id查询数据
    params: {
      page: 1,
      limit: 10,
      entity: { ...this.equipmentCategoryData }
    }
  };

  private nodeClickData: any = {}; // 点击科室数据
  private url = "THospitalDepartmentInfo/queryTree"; // 左侧字典

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true;
    const { title, id } = this.nodeClickData;
    // (this.$refs.dataForm as Form).setFiledsValue
    this.equipmentCategoryData = {
      ...this.equipmentCategoryData,
      departmentId: id ?? "1001"

    };
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data;
    // 查询科室及下级科室 /api/common/dicInfo/querySelfAndPar
    this.paramsConfig = {
      url: "equipment/getEquipmentInfo",
      params: {
        page: 1,
        limit: 10,
        entity: {
          departmentId: data.id
        }
      }
    };
  }

  // 触发编辑事件
  private handleUpdate(row: any) {
    const { cName, id, pid, note } = row;
    this.equipmentCategoryData = { ...this.equipmentCategoryData };
    this.dialogStatus = "update";
    this.dialogVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate();
    });
  }

  // 删除设备
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
    const res: RESULT_DATA_TYPE | any = await dealEquipmentCategoryInfoData(
      params
    );
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
      (this.$refs.vxeTree as any).getTreeListData(this.url, this.treeParams);
    }
    this.$notify({
      title: "成功",
      message: "删除成功",
      type: "success",
      duration: 2000
    });
  }

  // 点击查看按钮接收数据事件
  private async handleSearchForDetail(row: any) {
    this.dialogVisible = true;
    this.dialogStatus = "update";
    console.log("🚀 ~ row11", row);
    const res:
      | RESULT_DATA_TYPE
      | any = await searchEquipmentCategoryInfoDetailsData({
      page: "1",
      limit: "10",
      entity: {
        id: row.id
      }
    });
    if (res.result) {
      console.log("🚀 ~ handleSearchForDetail ~ res", res.data);
    }
  }
}

// /api/equipment/getEquipmentInfoByDepartMentId 通过组织id获取设备信息

// /api/equipment/getEquipmentInfoByLike 设备名称模糊查询

// /api/equipment/getEquipmentInfo 设备查询
