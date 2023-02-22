<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <iframe id="01" src="./static/index.html"  width="100%" height="100%" scrolling="no" frameborder="'0'"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'
import { BusinessViewModule } from '@/store/modules/business'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get roles() {
    return UserModule.roles
  }

  async created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editor-dashboard'
    }
  }

  mounted() {
    this.getData()
    this.getAdata()
    this.getBDAta()
    this.GET_EQUIPMENT_CATEGORY_DATA()
  }

  public async getData() {
    await BusinessViewModule.GET_EQUIPMENT_DATA('001', 1, 10)
  }

  public async getAdata() {
    await BusinessViewModule.GET_DEPARTMENT_DATA()// 获取科室数据
  }

  public async getBDAta() {
    await BusinessViewModule.GET_EMPLOYEE_DATA()// 获取员工信息
  }

  public async GET_EQUIPMENT_CATEGORY_DATA() {
    await BusinessViewModule.GET_EQUIPMENT_CATEGORY_DATA()// 获取设备类别信息
  }
}
</script>

<style scoped lang="scss">
.dashboard-container{
  width:100%;
  height: 100%;
}
</style>
