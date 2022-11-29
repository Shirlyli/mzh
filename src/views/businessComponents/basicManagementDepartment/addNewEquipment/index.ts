import { Component, Vue } from "vue-property-decorator";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import Tree from "@/components/Tree/index.vue";
import VexTable from "@/components/VexTable/index.vue";
import { Form } from "element-ui";
import { dealEquipmentData, updateEquipmentData } from "@/api/equipment";
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
  private formConfig = {
    data: {
      name: "",
      sex: "",
      time: ""
    },
    items: [
      {
        field: "name",
        title: "科室名称",
        itemRender: { name: "$input", props: { placeholder: "请输入科室名称" } }
      },
      { field: "time", title: "创建时间", slots: { default: "create_time" } },
      { slots: { default: "operate_item" } }
    ] // 表单项
  };

  private columns = [
    { type: "seq", width: 60 },
    { type: "checkbox", width: 80 },
    { field: "name", title: " 科室名称", treeNode: true },
    { field: "basicData", title: "创建时间" },
    {
      width: 160,
      title: "操作",
      slots: { default: "operateHasSearch" },
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

  private departmentData = {
    parentId: "",
    parentName: "",
    departmentName: "",
    departmentId: ""
  }; // 新增或编辑表单

  private rules = {
    departmentName: [
      { required: true, message: "请输入部门名称", trigger: "change" }
    ]
  }; // 表单校验

  private dialogVisible = false; // 新增过模态框
  private dialogStatus = "create";
  private url = "THospitalDepartmentInfo/queryTree"; // 左侧科室分类树形数据
  private paramsConfig = {
    url: "THospitalDepartmentInfo/querySelfAndPar",
    params: {
      page: 1,
      limit: 10,
      entity: {
        id: "001"
      }
    }
  };

  private nodeClickData: any = {}; // 点击科室数据

  // 新增科室
  private handleInsert() {
    this.dialogVisible = true;
    const { title, id } = this.nodeClickData;
    // (this.$refs.dataForm as Form).setFiledsValue
    this.departmentData = {
      parentId: id ?? "001",
      parentName: title ?? "医疗科室",
      departmentName: "",
      departmentId: ""
    };
  }

  // 接收树形组件点击节点数据
  private handleNodeClick(data: any) {
    this.nodeClickData = data;
    // 查询科室及下级科室
    this.paramsConfig = {
      url: "THospitalDepartmentInfo/querySelfAndPar",
      params: {
        page: 1,
        limit: 10,
        entity: {
          id: data.id
        }
      }
    };
  }

  // 新增科室
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const { parentId, departmentName } = this.departmentData;
        const params = {
          id: "",
          pid: parentId,
          name: departmentName,
          dispindex: "",
          dCode: null,
          mobile: null,
          phone: null,
          status: 0,
          companyInfoId: "",
          flag: null,
          ctime: null,
          path: "",
          dicId: "",
          note: null,
          isLeaf: ""
        };
        const res: any = await updateEquipmentData(params);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          );
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
        const { parentId, departmentName, departmentId } = this.departmentData;
        const params = {
          id: departmentId,
          pid: parentId,
          name: departmentName,
          dispindex: "",
          dCode: null,
          mobile: null,
          phone: null,
          status: 0,
          companyInfoId: "",
          flag: null,
          ctime: null,
          path: "",
          dicId: "",
          note: null,
          isLeaf: ""
        };
        const res: any = await updateEquipmentData(params);
        if (res.result) {
          (this.$refs.vexTable as any).findList(this.paramsConfig);
          (this.$refs.vxeTree as any).getTreeListData(
            this.url,
            this.treeParams
          );
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
    const { name, id, pid } = row;
    this.departmentData = {
      parentId: pid,
      parentName: pid,
      departmentName: name,
      departmentId: id
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
    const res: any = await dealEquipmentData(params);
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
}
