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
    this.getCommonTreeData();
  }

  private formConfig: { data: SupplierFormTypes; items: FormItemTypes[] } = {
    data: {
      domicile: "",
      id: "",
      name: "",
      nameAbbreviation: "",
      runningState: "",
      taxId: ""
    },
    items: [
      {
        field: "domicile",
        title: "注册地",
        itemRender: { name: "$input", props: { placeholder: "请输入注册地" } }
      },
      {
        field: "id",
        title: "主键",
        itemRender: { name: "$input", props: { placeholder: "请输入主键" } }
      },
      {
        field: "name",
        title: "供应商名称",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入供应商名称" }
        }
      },
      {
        field: "nameAbbreviation",
        title: "简称",
        itemRender: { name: "$input", props: { placeholder: "请输入简称" } }
      },
      {
        field: "runningState",
        title: "运营状态",
        itemRender: {
          name: "$select",
          options: [
            { label: "正常", value: 1 },
            { label: "注销", value: 2 }
          ]
        }
      },
      {
        field: "taxId",
        title: "纳税识别号",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入纳税识别号" }
        }
      },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "name", title: "供应商名称" },
    { field: "assetsPro", title: " 资产性质" },
    { field: "ctime", title: " 创建时间" },
    { field: "dispindex", title: " 排序" },
    { field: "domicile", title: " 注册地" },
    { field: "email", title: " 电子邮件" },
    { field: "foxNo", title: " 传真" },
    { field: "legalPerson", title: "法人" },
    { field: "phoneNo", title: "联系电话" },
    { field: "postcode", title: "邮政编码" },
    {
      field: "runningState",
      title: "运营状态",
      cellRender: {
        name: "runningState"
      }
    },
    { field: "taxId", title: "纳税识别号" },
    {
      width: 180,
      title: "操作",
      slots: { default: "operate" },
      showOverflow: true
    }
  ];

  private hospitalData = {
    hName: "",
    hAddress: "",
    hLevel: "",
    hType: "",
    hPhone: "",
    note: "",
    id: ""
  }; // 新增或编辑表单

  private rules = {
    hName: [{ required: true, message: "请输入医院名称", trigger: "change" }]
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
      console.log("🚀 ~ res", res.data);
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
    this.hospitalData = {
      hName: "",
      hAddress: "",
      hLevel: "",
      hType: "",
      hPhone: "",
      note: "",
      id: ""
    };
  }

  // 新增供应商
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const {
          hName,
          hAddress,
          hLevel,
          hType,
          hPhone,
          note
        } = this.hospitalData;
        const params = {
          id: "",
          hName,
          hAddress,
          hLevel,
          hType,
          hPhone,
          note,
          createtime: "",
          createrId: "00000001-测试用户id"
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
          hName,
          hAddress,
          hLevel,
          hType,
          hPhone,
          note
        } = this.hospitalData;
        const params = {
          id,
          hName,
          hAddress,
          hLevel,
          hType,
          hPhone,
          note,
          createtime: "",
          createrId: "00000001-测试用户id"
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
    const { id, hName, hAddress, hLevel, hType, hPhone, note } = row;
    this.hospitalData = {
      id,
      hName,
      hAddress,
      hLevel,
      hType,
      hPhone,
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
