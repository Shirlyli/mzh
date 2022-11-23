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

  private formConfig = {
    data: {
      name: "",
      createtime: ""
    },
    items: [
      {
        field: "name",
        title: "医院名称",
        itemRender: { name: "$input", props: { placeholder: "请输入医院名称" } }
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
    { type: "seq", width: 60 },
    { type: "checkbox", width: 60 },
    { field: "hName", title: " 医院名称" },
    { field: "hAddress", title: " 医院地址" },
    { field: "hLevel", title: " 医院等级" },
    { field: "hType", title: " 医院类型" },
    { field: "hPhone", title: " 电话" },
    { field: "note", title: " 备注" },
    { field: "createtime", title: "创建时间" },
    { field: "createrId", title: "创建人" },
    {
      width: 180,
      title: "操作",
      slots: { default: "operate" },
      showOverflow: true
    }
  ];

  private treeParams = {
    page: "1",
    limit: "10",
    entity: {
      id: "F7BFB16412328A-3554-4755-BB10-057BA8A8A47E"
    }
  };

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
  private url = "THospitalDepartmentInfo/queryTree"; // 左侧科室分类树形数据
  private paramsConfig = {
    url: "hospitalInfo/query",
    params: {
      page: 1,
      limit: 10,
      entity: {}
    }
  };

  private nodeClickData: any = {}; // 点击科室数据

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

  // 新增科室
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
  // 接收树形组件点击节点数据
  // private handleNodeClick(data: any) {
  //   this.nodeClickData = data
  //   // 查询科室及下级科室
  //   this.paramsConfig = {
  //     url: 'THospitalDepartmentInfo/querySelfAndPar',
  //     params: {
  //       page: 1,
  //       limit: 10,
  //       entity: {
  //         id: data.id
  //       }
  //     }
  //   }
  // }

  // 新增科室
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

  // 修改科室
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

  // 删除科室
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
