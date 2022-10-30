import { Component, Vue } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
import { getTreeData } from '@/api/equipment'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'name', title: '字典值' },
    { field: 'name', title: '字典排序' },
    { field: 'nickname', title: '字典备注' },
    { field: 'age', title: '状态' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
      showOverflow: true
    }
  ]; // 列表配置项

  private treeParams = {
    page: '1',
    limit: '10',
    entity: {
      id: 'F7BFB16412328A-3554-4755-BB10-057BA8A8A47E'
    }
  }; // 树形图传参

  private tableData = []; // 列表数据
  private loading = false; // loading是否
  private url = '/common/dicInfo/queryTree'; // 接口url

  created() {
    // Init the default selected tab
    const tab = this.$route.query.tab as string
    this.getTreeListData()
  }

  // 获取科室树形图数据
  private async getTreeListData() {
    this.loading = true
    const res: any = await getTreeData(this.url, this.treeParams)
    if (res?.code === 200) {
      console.log('🚀 ~ res111', res.data)
      this.$nextTick(() => {
        this.tableData = res.data
        this.loading = false
      })
    }
  }
}
