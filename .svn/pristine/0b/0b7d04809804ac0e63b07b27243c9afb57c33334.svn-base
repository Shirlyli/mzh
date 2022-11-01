<template>
  <div>
    <el-input placeholder="输入关键字进行过滤"
              v-model="filterText" clearable>
    </el-input>
    <div class="mt-md"></div>
    <el-tree :data="data"
             :props="defaultProps"
             default-expand-all
             @node-click="handleNodeClick"
             :filter-node-method="filterNode"
             ref="tree"></el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TreeData } from '@/mock/tree'
console.log('🚀 ~ TreeData', TreeData)
@Component({
  name: 'Tree',
  components: {}
})
export default class extends Vue {
  public data = TreeData.data
  public filterText = ''
  created() {
    console.log('🚀 ~ TreeData', this.data)
  }

  @Watch('filterText', { immediate: true, deep: true })
  onChangeValue(val: any) {
    (this.$refs.tree as any).filter(val)
  }

  public defaultProps = {
    children: 'children',
    label: 'title'
  }

  public handleNodeClick = (data: any) => {
    console.log('🚀 ~ data', data)
  }

  public filterNode(value: any, data: any) {
    if (!value) return true
    return data.title.indexOf(value) !== -1
  }
}
</script>
