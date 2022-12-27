<template>
  <div id="app">
    <router-view />
    <service-worker-update-popup />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup,
  },
})
export default class extends Vue {
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
    }
    // 在页面刷新时将 vuex 里的信息保存到 sessionStorage 里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', this.saveState)
  }
  mounted() {
    window.addEventListener('unload', this.saveState)
  }
  private saveState() {
    sessionStorage.setItem(
      'state',
      JSON.stringify({
        token: UserModule.token,
        loginForm: UserModule.loginForm,
        roles: UserModule.roles,
      })
    )
  }
}
</script>
