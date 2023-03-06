<template>
  <div id="app">
    <keep-alive>
      <router-view />
      <!-- <service-worker-update-popup /> -->
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'App',
  components: {
    // ServiceWorkerUpdatePopup
  }
})
export default class extends Vue {
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(sessionStorage.getItem('store'))
    //     )
    //   )
    // }
    // 在页面刷新时将 vuex 里的信息保存到 sessionStorage 里
    // beforeunload事件在页面刷新时先触发
    // console.log('this.$store.state', this.$store.state.user)
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state.user))
    // })
    // beforeunload事件在页面刷新时先触发
    // window.addEventListener('beforeunload', this.saveState)
  }

  private saveState() {
    console.log('aaa')
  }
}
</script>
