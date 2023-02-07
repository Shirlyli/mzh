import Vue from 'vue'
import Vuex from 'vuex'
import { AppModule, IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { ITagsViewState } from './modules/tags-view'
import { IErrorLogState } from './modules/error-log'
import { IPermissionState, PermissionModule } from './modules/permission'
import { ISettingsState, SettingsModule } from './modules/settings'
import { BusinessState, BusinessViewModule } from './modules/business'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IUserState
  tagsView: ITagsViewState
  errorLog: IErrorLogState
  permission: IPermissionState
  settings: ISettingsState
  business: BusinessState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  // modules: {
  //   AppModule,
  //   BusinessViewModule,
  //   SettingsModule,
  //   PermissionModule
  // },
  plugins: [createPersistedState()]
})
