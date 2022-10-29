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
      {
        field: 'name',
        title: '名称',
        slots: { default: 'name_item' }
      },
      {
        field: 'sex',
        title: '菜单路由',
        slots: { default: 'sex_item' }
      },
      { field: 'time', title: '权限标识', slots: { default: 'create_time' } },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    // { type: "seq", width: 60 },
    // { type: "checkbox", width: 60 },
    { field: 'name', title: '名称', treeNode: true },
    { field: 'type', title: '菜单路由' },
    { field: 'size', title: '权限标识' },
    { field: 'date', title: '启用' },
    { field: 'date', title: '备注' },
    { field: 'date', title: '创建时间' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
      showOverflow: true
    }
  ];

  private tableData = [
    {
      id: 10000,
      parentId: null,
      name: 'test abc1',
      type: 'mp3',
      size: 1024,
      date: '2020-08-01'
    },
    {
      id: 10050,
      parentId: null,
      name: 'Test2',
      type: 'mp4',
      size: null,
      date: '2021-04-01'
    },
    {
      id: 24300,
      parentId: 10050,
      name: 'Test3',
      type: 'avi',
      size: 1024,
      date: '2020-03-01'
    },
    {
      id: 20045,
      parentId: 24300,
      name: 'test abc4',
      type: 'html',
      size: 600,
      date: '2021-04-01'
    },
    {
      id: 10053,
      parentId: 24300,
      name: 'test abc96',
      type: 'avi',
      size: null,
      date: '2021-04-01'
    },
    {
      id: 24330,
      parentId: 10053,
      name: 'test abc5',
      type: 'txt',
      size: 25,
      date: '2021-10-01'
    },
    {
      id: 21011,
      parentId: 10053,
      name: 'Test6',
      type: 'pdf',
      size: 512,
      date: '2020-01-01'
    },
    {
      id: 22200,
      parentId: 10053,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23666,
      parentId: null,
      name: 'Test8',
      type: 'xlsx',
      size: 2048,
      date: '2020-11-01'
    },
    {
      id: 23677,
      parentId: 23666,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23671,
      parentId: 23677,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23672,
      parentId: 23677,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23688,
      parentId: 23666,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23681,
      parentId: 23688,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 23682,
      parentId: 23688,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 24555,
      parentId: null,
      name: 'test abc9',
      type: 'avi',
      size: 224,
      date: '2020-10-01'
    },
    {
      id: 24566,
      parentId: 24555,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    },
    {
      id: 24577,
      parentId: 24555,
      name: 'Test7',
      type: 'js',
      size: 1024,
      date: '2021-06-01'
    }
  ];

  private activeName = 'CN';
  private createdTimes = 0;
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
