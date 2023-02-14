<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <iframe id="01" src="/static/index.html"  width="100%" height="100%" scrolling="no" frameborder="'0'"/>
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
}
</script>

<style scoped lang="scss">
.dashboard-container{
  width:100%;
  height: 100%;
}
</style>
