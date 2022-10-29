import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import ProTable from '@/components/Table/index.vue'
import Tree from '@/components/Tree/index.vue'
import {
  getPageviews,
  createArticle,
  updateArticle,
  defaultArticleData
} from '@/api/articles'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import RightContent from '@/views/rightContent/index.vue'
import VexTable from '@/components/VexTable/index.vue'
const calendarTypeOptions = [
  { key: 'CN', displayName: 'China' },
  { key: 'US', displayName: 'USA' },
  { key: 'JP', displayName: 'Japan' },
  { key: 'EU', displayName: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce(
  (
    acc: {
      [key: string]: string
    },
    cur
  ) => {
    acc[cur.key] = cur.displayName
    return acc
  },
  {}
) as {
  [key: string]: string
}

@Component({
  name: 'EquipmentCategory',
  components: {
    Pagination,
    MainSubLayout,
    ProTable,
    Tree,
    RightContent,
    VexTable
  },
  filters: {
    typeFilter: (type: string) => {
      return calendarTypeKeyValue[type]
    }
  }
})
export default class extends Vue {
  private dialogStatus = '';
  public dialogFormVisible = false; // 新增模态框显隐
  private tempArticleData = defaultArticleData; // 默认新增模态框数据
  private showReviewer = false;
  // 新增设备类别
  public addNewEquipmentClass = () => {
    console.log('aaa')
  };

  private textMap = {
    update: '编辑',
    create: '添加'
  };

  private formConfig = {
    data: {
      name: '',
      time: ''
    },
    items: [
      { field: 'name', title: '角色名称', slots: { default: 'name_item' } },
      { field: 'time', title: '创建时间', slots: { default: 'create_time' } },
      { slots: { default: 'operate_item' } }
    ] // 表单项
  };

  private columns = [
    { type: 'seq', width: 60 },
    { type: 'checkbox', width: 60 },
    { field: 'name', title: '授权角色' },
    { field: 'name', title: '角色名称' },
    { field: 'nickname', title: '角色类型' },
    { field: 'age', title: '角色描述' },
    { field: 'age', title: '创建时间' },
    {
      width: 250,
      title: '操作',
      slots: { default: 'operate' },
      showOverflow: true
    }
  ];

  private list: any = [];
  private rules = {
    type: [{ required: true, message: 'type is required', trigger: 'change' }],
    timestamp: [
      { required: true, message: 'timestamp is required', trigger: 'change' }
    ],
    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
  };

  private dialogPageviewsVisible = false;
  private pageviewsData = [];
  mounted() {
    console.log(this.dialogFormVisible)
  }

  private createData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const articleData = this.tempArticleData
        articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
        articleData.author = 'vue-typescript-admin'
        const { data } = await createArticle({ article: articleData })
        data.article.timestamp = Date.parse(data.article.timestamp)
        this.list.unshift(data.article)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private handleUpdate(row: any) {
    this.tempArticleData = Object.assign({}, row)
    this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp)
    this.dialogStatus = 'update'
    this.dialogFormVisible = true
    this.$nextTick(() => {
      (this.$refs.dataForm as Form).clearValidate()
    })
  }

  private updateData() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        const tempData = Object.assign({}, this.tempArticleData)
        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        const { data } = await updateArticle(tempData.id, {
          article: tempData
        })
        const index = this.list.findIndex((v: any) => v.id === data.article.id)
        this.list.splice(index, 1, data.article)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      }
    })
  }

  private resetTempArticleData() {
    this.tempArticleData = cloneDeep(defaultArticleData)
  }

  private async handleGetPageviews(pageviews: string) {
    const { data } = await getPageviews({ pageviews })
    this.pageviewsData = data.pageviews
    this.dialogPageviewsVisible = true
  }
}
