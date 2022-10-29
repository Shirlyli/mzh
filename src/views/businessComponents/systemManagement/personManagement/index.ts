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
  ];

  private formConfig = {
    data: {
      name: '',
      sex: '',
      time: ''
    },
    items: [
      { field: 'name', title: '用户姓名', slots: { default: 'name_item' } },
      {
        field: 'sex',
        title: '登录账号',
        titlePrefix: {
          message: '帮助信息！！！',
          icon: 'vxe-icon-question-circle-fill'
        },
        slots: { default: 'sex_item' }
      },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'name', title: '用户名称' },
    { field: 'name', title: '登录账号' },
    { field: 'nickname', title: '电话号码' },
    { field: 'age', title: '电子邮箱' },
    { field: 'age', title: '所属科室' },
    { field: 'age', title: '所属角色' },
    { field: 'age', title: '激活状态' },
    { field: 'age', title: '创建时间' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
      showOverflow: true
    }
  ]

  private activeName = 'CN';
  private createdTimes = 0;
  private tableData = [];
  @Watch('activeName')
  private onActiveNameChange(value: string) {
    this.$router.push(`${this.$route.path}?tab=${value}`).catch(err => {
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
