import { defaultArticleData } from "@/api/articles";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "AddDialog",
  components: {}
})
export default class extends Vue {
  @Prop({ default: false, type: Boolean }) dialogFormVisible!: boolean;
  private diaDialogFormVisible = this.dialogFormVisible;
  @Watch("diaDialogFormVisible")
  private ondialogFormVisibleChange() {}

  @Prop({ default: "create" }) dialogStatus!: string;
  @Watch("dialogStatus", { immediate: true, deep: true })
  private ondialogStatusChange() {}

  private rules = {
    type: [{ required: true, message: "type is required", trigger: "change" }],
    timestamp: [
      { required: true, message: "timestamp is required", trigger: "change" }
    ],
    title: [{ required: true, message: "title is required", trigger: "blur" }]
  };

  private tempArticleData = defaultArticleData; // 默认新增模态框数据

  // 新增表单确认
  private createData() {
    // (this.$refs.dataForm as Form).validate(async valid => {
    //   if (valid) {
    //     const articleData = this.tempArticleData
    //     articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
    //     articleData.author = 'vue-typescript-admin'
    //     const { data } = await createArticle({ article: articleData })
    //     data.article.timestamp = Date.parse(data.article.timestamp)
    //     this.list.unshift(data.article)
    //     this.dialogFormVisible = false
    //     this.$notify({
    //       title: '成功',
    //       message: '创建成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //   }
    // })
  }

  private handleUpdate(row: any) {
    // this.tempArticleData = Object.assign({}, row)
    // this.tempArticleData.timestamp = +new Date(this.tempArticleData.timestamp)
    // this.dialogStatus = 'update'
    // this.dialogFormVisible = true
    // this.$nextTick(() => {
    //   (this.$refs.dataForm as Form).clearValidate()
    // })
  }

  // 编辑表单-确认
  private updateData() {
    // (this.$refs.dataForm as Form).validate(async valid => {
    //   if (valid) {
    //     const tempData = Object.assign({}, this.tempArticleData)
    //     tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
    //     const { data } = await updateArticle(tempData.id, {
    //       article: tempData
    //     })
    //     const index = this.list.findIndex((v: any) => v.id === data.article.id)
    //     this.list.splice(index, 1, data.article)
    //     this.dialogFormVisible = false
    //     this.$notify({
    //       title: '成功',
    //       message: '更新成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //   }
    // })
  }
}
