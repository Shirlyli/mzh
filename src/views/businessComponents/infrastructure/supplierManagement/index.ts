import { Component, Vue } from "vue-property-decorator";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
import VexTable from "@/components/VexTable/index.vue";
import { Form } from "element-ui";
import {
  dealHospitalData,
  getTableDataList,
  updateHospitalData
} from "@/api/equipment";
import { FormItemTypes, SupplierFormTypes } from "./type";
import _ from "lodash";
// import { TreeData } from "@/mock/tree";
@Component({
  name: "Tab",
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  created() {

  }

  private formConfig: { data: SupplierFormTypes; items: FormItemTypes[] } = {
    data: {
      domicile: "",
      id: "",
      name: "",
      nameAbbreviation: "",
      runningState: "",
      taxId: "",
      suppliesType: ""
    },
    items: [
      {
        field: "name",
        title: "厂商名称",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入厂商名称" }
        }
      },
      {
        field: "nameAbbreviation",
        title: "简称",
        itemRender: { name: "$input", props: { placeholder: "请输入简称" } }
      },
      {
        field: "taxId",
        title: "纳税识别号",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入纳税识别号" }
        }
      },
      {
        field: "suppliesType",
        title: "厂商类型",
        itemRender: {
          name: "$select",
          props: { placeholder: '请选择' },
          options: [
            { label: "生产商", value: "生产商" },
            { label: "供应商", value: "供应商" },
            { label: "维修商", value: "维修商" }
          ]
        }
      },
      {
        field: "runningState",
        title: "运营状态",
        itemRender: {
          name: "$select",
          props: { placeholder: '请选择' },
          options: [
            { label: "正常", value: 1 },
            { label: "注销", value: 2 }
          ]
        }
      },
      {
        field: "domicile",
        title: "注册地",
        itemRender: { name: "$input", props: { placeholder: "请输入注册地" } }
      },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "name", title: "厂商名称" },
    { field: "nameAbbreviation", title: "简称" },
    { field: "taxId", title: "纳税识别号" },
    { field: "suppliesType", title: "厂商类型" },
    {
      field: "runningState",
      title: "运营状态",
      cellRender: {
        name: " "
      }
    },
    { field: "assetsPro", title: " 资产性质" },
    { field: "domicile", title: " 注册地" },
    { field: "legalPerson", title: "法人" },
    { field: "phoneNo", title: "座机" },
    { field: "dispindex", title: " 排序" },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch" },
      showOverflow: true
    }
  ];

  // 菜单类型
  private suppliesTypeOptions = [
    {
      value: "1",
      label: "目录"
    },
    {
      value: "2",
      label: "菜单"
    },
    {
      value: "3",
      label: "按钮"
    }
  ];

  private supplierData = {
    name: "",
    nameAbbreviation: "",
    suppliesType: "",
    assetsPro: "",
    phoneNo: "",
    note: "",
    id: ""
  }; // 新增或编辑表单

  private rules = {
    name: [{ required: true, message: "请输入厂站名称", trigger: "change" }]
  }; // 表单校验

  private dialogVisible = false; // 新增过模态框
  private dialogStatus = "create";
  private paramsConfig = {
    url: "/supplier/queryByCondition",
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  };

  private nodeClickData: any = {}; // 点击供应商数据

  private hLevelList = []; // 字典表

  // 获取医院等级
  private async getCommonTreeData() {
    const params = {
      page: 1,
      limit: 10,
      entity: { id: "58CC52594FA7C8-1A54-4DC6-9854-FD8BB128B194" }
    };
    const res: any = await getTableDataList(
      "common/dicInfo/querySelfAndPar",
      params
    );
    if (res.result) {
      console.log("🚀 ~ getCommonTreeData ~ res", res.data);
      this.hLevelList = res.data;
    }
  }

  // 新增供应商
  private handleInsert() {
    this.dialogStatus = "create";
    this.dialogVisible = true;
    (this.$refs.dataForm as Form).resetFields();
  }

  private handleReset() {
    (this.$refs.dataForm as Form).resetFields();
  }

  // 模态框关闭事件
  private handleDialogClose() {
    this.dialogVisible = false;
    this.supplierData = {
      name: "",
      nameAbbreviation: "",
      suppliesType: "",
      assetsPro: "",
      phoneNo: "",
      note: "",
      id: ""
    };
  }

  // 新增供应商
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const {
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note,
        } = this.supplierData;
        const params = {
          id: "",
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note,
        };
        const res: any = await updateHospitalData(params);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
        }
        this.dialogVisible = false;
        this.$notify({
          title: "成功",
          message: "创建成功",
          type: "success",
          duration: 2000
        });
      }
    });
  }

  // 修改供应商
  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const {
          id,
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note,
        } = this.supplierData;
        const params = {
          id,
          name,
          nameAbbreviation,
          suppliesType,
          assetsPro,
          phoneNo,
          note,
        };
        const res: any = await updateHospitalData(params);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
        }
        this.dialogVisible = false;
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
    const { id, name, nameAbbreviation, suppliesType, assetsPro, phoneNo, note } = row;
    this.supplierData = {
      id,
      name,
      nameAbbreviation,
      suppliesType,
      assetsPro,
      phoneNo,
      note
    };
    this.dialogStatus = "update";
    this.dialogVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate();
    });
  }

  // 删除供应商
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
    const res: any = await dealHospitalData(params);
    if (res.result) {
      (this.$refs.vexTable as any).findList(this.paramsConfig);
    }
    this.$notify({
      title: "成功",
      message: "删除成功",
      type: "success",
      duration: 2000
    });
  }
}
