import ALL_OPTIONS from '@/shared/options'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import _ from 'lodash'

//
export function FormatApproveStatusColumns(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.APPROVE_STATUS, [
    'value',
    Number(data.cellValue)
  ])
  return cellValue[0]?.label ?? '退回'
}

// 是否启用
export function FormatMIsavailable(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.isORnot, [
    'value',
    Number(data.cellValue)
  ])
  return cellValue[0]?.label
}

export function FormatMType(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.MENU_TYPES, ['value', data.cellValue])
  return cellValue[0]?.label
}
