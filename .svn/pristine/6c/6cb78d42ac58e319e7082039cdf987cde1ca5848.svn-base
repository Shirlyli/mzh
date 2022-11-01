import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import MainSubLayout from '@/components/CollpaseFlex/index.vue'
import ProTable from '@/components/Table/index.vue'
import Tree from '@/components/Tree/index.vue'
import VexTable from '@/components/VexTable/index.vue'
@Component({
  name: 'RightContent',
  components: {
    Pagination,
    MainSubLayout,
    ProTable,
    Tree,
    VexTable
  }
})
export default class extends Vue {
  @Prop({ default: '' }) private title!: string;

  created() {
    console.log(this.title)
  }

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
