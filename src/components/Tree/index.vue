<template>
  <div v-loading="treeLoading">
    <el-input placeholder="输入关键字进行过滤"
              v-model="filterText"
              clearable>
    </el-input>
    <div class="mt-md"></div>
    <el-tree :data="treeData"
             :props="defaultProps"
             default-expand-all
             @node-click="handleNodeClick"
             :filter-node-method="filterNode"
             ref="tree"></el-tree>
  </div>
</template>

<script lang="ts">
import { getTreeData } from '@/api/equipment'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({
  name: 'Tree',
  components: {}
})
export default class extends Vue {
  @Prop({ default: String }) url!: string
  @Prop() params!: any
  public filterText = ''
  public treeData = [] // 树形数据
  public treeLoading = false // loading是否
  created() {
    this.getTreeListData()
  }

  // 获取科室树形图数据
  private async getTreeListData() {
    this.treeLoading = true
    try {
      const res: any = await getTreeData(this.url, this.params)
      if (res?.code === 200) {
        console.log('🚀 ~ res', res.data)
        this.$nextTick(() => {
          this.treeData = res.data
        })
      }
    } catch (error) {
      this.treeData = []
      console.log('🚀 ~ error', error)
    }
    this.treeLoading = false
  }

  // 监听输入框输入数据
  @Watch('filterText', { immediate: true, deep: true })
  onChangeValue(val: any) {
    (this.$refs.tree as any).filter(val)
  }

  // 默认配置项
  public defaultProps = {
    children: 'children',
    label: 'title'
  }

  @Emit()
  emitHandleClick(data: any) {
    return data
  }

  // 点击节点事件
  public handleNodeClick = (data: any) => {
    this.emitHandleClick(data)
  }

  public filterNode(value: any, data: any) {
    if (!value) return true
    return data.title.indexOf(value) !== -1
  }
}
</script>
