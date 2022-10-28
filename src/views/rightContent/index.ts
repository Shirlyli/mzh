import { Component, Emit, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import ProTable from '@/components/Table/index.vue'
import Tree from '@/components/Tree/index.vue'

@Component({
  name: 'RightContent',
  components: {
    Pagination,
    MainSubLayout,
    ProTable,
    Tree
  }
})
export default class extends Vue {
  public columns = [
    {
      width: 120,
      dataIndex: 'timestamp',
      title: '产品批号'
    },
    {
      width: 120,
      dataIndex: 'timestamp',
      title: '设备名称'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '科室'
    },
    {
      width: 120,
      dataIndex: 'reviewer',
      title: '设备型号'
    },
    {
      width: 120,
      dataIndex: 'reviewer',
      title: '品牌'
    },
    {
      width: 120,
      dataIndex: 'reviewer',
      title: '产地'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '设备类别'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '状态'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '设备价格'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '启用时间'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '生产日期'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '保质期(年)'
    },
    {
      width: 120,
      dataIndex: 'author',
      title: '添加时间'
    },
    {
      width: 200,
      dataIndex: 'type',
      title: '操作'
    }
  ]; // 表格列设置

  public formList = [
    {
      label: '产品批号',
      value: 'user'
    },
    {
      label: '设备名称',
      value: 'region'
    },
    {
      label: '科室',
      value: 'user'
    },
    {
      label: '状态',
      value: 'user'
    },
    {
      label: '设备型号',
      value: 'user'
    },
    {
      label: '设备类别',
      value: 'user'
    }
  ]; // 表格表单查询项

  @Emit()
  emitHandleCreate() {
    // this.resetTempArticleData();
    // this.dialogStatus = "create";
    // console.log("🚀 ~ dialogStatus", this.dialogStatus);
    // this.dialogFormVisible = true;
    // this.$nextTick(() => {
    //   (this.$refs.dataForm as Form).clearValidate();
    // });
    this.$router.push({ path: '/equipmentArchives/addNewEquipment' })
  }
}
