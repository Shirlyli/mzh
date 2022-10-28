import { Component, Vue, Watch } from 'vue-property-decorator'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
@Component({
  name: 'Tab',
  components: {
    MainSubLayout,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  private tabMapOptions = [
    { label: '设备信息', key: 'CN' },
    { label: '设备资料', key: 'US' },
    { label: '采购信息', key: 'JP' },
    { label: '折旧信息', key: 'EU' }
  ]

  private columns =[
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
  ]

  private activeName = 'CN'
  private createdTimes = 0
  private tableData = []
  @Watch('activeName')
  private onActiveNameChange(value: string) {
    this.$router.push(`${this.$route.path}?tab=${value}`).catch((err) => {
      console.warn(err)
    })
  }

  created() {
    // Init the default selected tab
    const tab = this.$route.query.tab as string
    if (tab) {
      this.activeName = tab
    }
  }

  private showCreatedTimes() {
    this.createdTimes = this.createdTimes + 1
  }
}
