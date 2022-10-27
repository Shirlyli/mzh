<template>
  <div>
    <el-tree :data="data"
             :props="defaultProps"
             @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {TreeData} from '@/mock/tree'
console.log("🚀 ~ TreeData", TreeData)
@Component({
  name: 'Tree',
  components: {},
})
export default class extends Vue {
  public data = TreeData.data
 created() {
  console.log("🚀 ~ TreeData", this.data)
 }

  public defaultProps = {
    children: 'children',
    label: 'title',
  }

  public handleNodeClick = (data: any) => {
    console.log('🚀 ~ data', data)
  }
}
</script>