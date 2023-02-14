declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/'
declare module 'element-ui/*'
declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}
declare module 'element-ui/lib/locale/lang/en'
declare module 'element-ui/lib/locale/lang/zh-CN'
declare module 'vue'
declare module 'moment'
declare module 'vue-svgicon'
declare module 'vxe-table'
declare module 'vue-property-decorator'
declare module '*.gif' {
  export const gif: any
}

// TODO: remove this part after vue-count-to has its typescript file
declare module 'vue-count-to'

// TODO: remove this part after vue2-dropzone has its typescript file
declare module 'vue2-dropzone'

// TODO: remove this part after vue-image-crop-upload has its typescript file
declare module 'vue-image-crop-upload'

declare module '@riophae/vue-treeselect'
