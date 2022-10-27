import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import {
  getArticles,
} from "@/api/articles";
import { IArticleData } from "@/api/types";
import { exportJson2Excel } from "@/utils/excel";
import { formatJson } from "@/utils";
import Pagination from "@/components/Pagination/index.vue";
import MainSubLayout from "@/components/CollpaseFlex/index.vue";

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
  components: {
    Pagination,
    MainSubLayout
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type];
    }
  }
})
export default class ProTable extends Vue {
  @Prop({ type: [], default: [] })
  public columns!: any;
  @Prop({ type: [], default: [] })
  public formList!: any;
  private isAllExpand = false; //是否展开查询表单
  private tableKey = 0;
  private list: IArticleData[] = []; //列表数据
  private total = 0;
  private listLoading = true;
  private listQuery = {
    page: 1,
    limit: 20,
    importance: undefined,
    title: undefined,
    type: undefined,
    sort: "+id",
    user: "",
    region: ""
  };
  public formInline = {
    user: "",
    region: ""
  }; //表单配置

  private importanceOptions = [1, 2, 3];
  private calendarTypeOptions = calendarTypeOptions;
  private sortOptions = [
    { label: "ID Ascending", key: "+id" },
    { label: "ID Descending", key: "-id" }
  ];

  private statusOptions = ["published", "draft", "deleted"];

  private rules = {
    type: [{ required: true, message: "type is required", trigger: "change" }],
    timestamp: [
      { required: true, message: "timestamp is required", trigger: "change" }
    ],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  };

  private downloadLoading = false;

  created() {
    this.getList();
  }

  mounted() {
    this.$on("emit-handle-create", () => {
      console.log("🚀 ~ emit-handle-create");
    });
  }
  // 获取列表数据
  private async getList() {
    this.listLoading = true;
    const { data } = await getArticles(this.listQuery);
    this.list = data.items;
    this.total = data.total;
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false;
    }, 0.5 * 1000);
  }

  // 查询-搜索
  private handleFilter() {
    this.listQuery.page = 1;
    this.getList();
  }

  // 重置
  private handleReset = async (formName: string) => {
    await (this.$refs[formName] as any).resetFields();
    console.log("🚀 ~ this.$refs", this.$refs);
  };

  private handleModifyStatus(row: any, status: string) {
    this.$message({
      message: "操作成功",
      type: "success"
    });
    row.status = status;
  }

  private sortChange(data: any) {
    const { prop, order } = data;
    if (prop === "id") {
      this.sortByID(order);
    }
  }

  private sortByID(order: string) {
    if (order === "ascending") {
      this.listQuery.sort = "+id";
    } else {
      this.listQuery.sort = "-id";
    }
    this.handleFilter();
  }

  private getSortClass(key: string) {
    const sort = this.listQuery.sort;
    return sort === `+${key}` ? "ascending" : "descending";
  }

  //  添加事件抛出
  @Emit()
  emitHandleCreate() {
    console.log("🚀 ~@emit ~ emitHandleCreate");
  }

  public handleCreate() {
    this.emitHandleCreate();
  }

  private handleDelete(row: any, index: number) {
    this.$notify({
      title: "Success",
      message: "Delete Successfully",
      type: "success",
      duration: 2000
    });
    this.list.splice(index, 1);
  }

  private handleDownload() {
    this.downloadLoading = true;
    const tHeader = ["timestamp", "title", "type", "importance", "status"];
    const filterVal = ["timestamp", "title", "type", "importance", "status"];
    const data = formatJson(filterVal, this.list);
    exportJson2Excel(tHeader, data, "table-list");
    this.downloadLoading = false;
  }
}
