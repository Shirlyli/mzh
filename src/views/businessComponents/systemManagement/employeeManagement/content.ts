import { getTableDataList } from '@/api/equipment'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component({
  name: 'Content',
  components: {}
})
export default class extends Vue {
  @Prop() paramsConfig!: any
  @Watch('paramsConfig', { immediate: true, deep: true })
  private onParamsConfigChange(newdata: any) {
    this.findList(newdata)
  }

  private loading = false
  private personalData = []
  created() {
    this.findList(this.paramsConfig)
  }

  // 获取列表数据
  private async findList(config: any) {
    console.log('🚀 ~ config', config)
    this.loading = true
    try {
      const res: any = await getTableDataList(config.url, config.params)
      if (res.result && res.data) {
        this.personalData = res.data
      } else {
        this.personalData = []
      }
    } catch (error) {
      console.log('🚀 ~ error', error)
      this.personalData = []
    }

    this.loading = false
  }
}