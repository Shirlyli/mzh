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
  mounted() {
    window.addEventListener('unload', this.saveState)
  }
  private saveState() {
    console.log('🚀 ~ UserModule', UserModule)
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
