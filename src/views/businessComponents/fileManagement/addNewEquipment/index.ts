import { Component, Vue, Watch } from 'vue-property-decorator'
import TabPane from './components/TabPane.vue'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import Tree from '@/components/Tree/index.vue'
import RightContent from '@/views/rightContent/index.vue'
@Component({
  name: 'Tab',
  components: {
    TabPane,
    MainSubLayout,
    Tree,
    RightContent
  }
})
export default class extends Vue {
  private tabMapOptions = [
    { label: '设备信息', key: 'equipmentInfo' },
    { label: '设备资料', key: 'equipmentData' },
    { label: '采购信息', key: 'purchaseInfo' },
    { label: '折旧信息', key: 'depreciateInfo' }
  ]

  private activeName = 'equipmentInfo'
  private createdTimes = 0

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
