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
