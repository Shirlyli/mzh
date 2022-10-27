import { Component, Emit, Vue } from "vue-property-decorator";
import { IArticleData } from "@/api/types";
import Pagination from "@/components/Pagination/index.vue";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";
import ProTable from "@/components/Table/index.vue";
import Tree from "@/components/Tree/index.vue";
import {
  getPageviews,
  createArticle,
  updateArticle,
  defaultArticleData
} from "@/api/articles";
import { Form } from "element-ui";
import { cloneDeep } from "lodash";
import router from "@/router";

const calendarTypeOptions = [
  { key: "CN", displayName: "China" },
  { key: "US", displayName: "USA" },
  { key: "JP", displayName: "Japan" },
  { key: "EU", displayName: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce(
  (
    acc: {
      [key: string]: string;
    },
    cur
  ) => {
    acc[cur.key] = cur.displayName;
    return acc;
  },
  {}
) as {
  [key: string]: string;
};

@Component({
  name: "EquipmentCategory",
  components: {
    Pagination,
    MainSubLayout,
    ProTable,
    Tree
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type];
    }
  }
})
export default class extends Vue {
  public columns = [
    {
      width: 120,
      dataIndex: "timestamp",
      title: "产品批号"
    },
    {
      width: 120,
      dataIndex: "timestamp",
      title: "设备名称"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "科室"
    },
    {
      width: 120,
      dataIndex: "reviewer",
      title: "设备型号"
    },
    {
      width: 120,
      dataIndex: "reviewer",
      title: "品牌"
    },
    {
      width: 120,
      dataIndex: "reviewer",
      title: "产地"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "设备类别"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "状态"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "设备价格"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "启用时间"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "生产日期"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "保质期(年)"
    },
    {
      width: 120,
      dataIndex: "author",
      title: "添加时间"
    },
    {
      width: 200,
      dataIndex: "type",
      title: "操作"
    }
  ]; //表格列设置
  public formList = [
    {
      label: "产品批号",
      value: "user"
    },
    {
      label: "设备名称",
      value: "region"
    },
    {
      label: "科室",
      value: "user"
    },
    {
      label: "状态",
      value: "user"
    },
    {
      label: "设备型号",
      value: "user"
    },
    {
      label: "设备类别",
      value: "user"
    }
  ]; //表格表单查询项
  private dialogStatus = "";
  public dialogFormVisible = false; //新增模态框显隐
  private tempArticleData = defaultArticleData; //默认新增模态框数据
  private showReviewer = false;
  // 新增设备类别
  public addNewEquipmentClass = () => {};
  private textMap = {
    update: "编辑",
    create: "添加"
  };
  private statusOptions = ["published", "draft", "deleted"];
  private list: any = [];
  private rules = {
    type: [{ required: true, message: "type is required", trigger: "change" }],
    timestamp: [
      { required: true, message: "timestamp is required", trigger: "change" }
    ],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  };
  private dialogPageviewsVisible = false;
  private pageviewsData = [];
  mounted() {
    console.log(this.dialogFormVisible);
  }
  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const articleData = this.tempArticleData;
        articleData.id = Math.round(Math.random() * 100) + 1024; // mock a id
        articleData.author = "vue-typescript-admin";
        const { data } = await createArticle({ article: articleData });
        data.article.timestamp = Date.parse(data.article.timestamp);
        this.list.unshift(data.article);
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "创建成功",
          type: "success",
          duration: 2000
        });
      }
    });
  }

  private handleUpdate(row: any) {
    this.tempArticleData = Object.assign({}, row);
    this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp);
    this.dialogStatus = "update";
    this.dialogFormVisible = true;
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate();
    });
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const tempData = Object.assign({}, this.tempArticleData);
        tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateArticle(tempData.id, {
          article: tempData
        });
        const index = this.list.findIndex((v: any) => v.id === data.article.id);
        this.list.splice(index, 1, data.article);
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      }
    });
  }

  private resetTempArticleData() {
    this.tempArticleData = cloneDeep(defaultArticleData);
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews });
    this.pageviewsData = data.pageviews;
    this.dialogPageviewsVisible = true;
  }
  @Emit()
  emitHandleCreate() {
    // this.resetTempArticleData();
    // this.dialogStatus = "create";
    // console.log("🚀 ~ dialogStatus", this.dialogStatus);
    // this.dialogFormVisible = true;
    // this.$nextTick(() => {
    //   (this.$refs.dataForm as Form).clearValidate();
    // });
    this.$router.push({ path: "/equipmentArchives/addNewEquipment" });
  }
}
