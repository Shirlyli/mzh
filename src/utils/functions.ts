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

// 菜单类型
export function FormatMType(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.MENU_TYPES, ['value', data.cellValue])
  return cellValue[0]?.label
}

// 状态
export function FormatIsExordium(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.isExordium, ['value', data.cellValue])
  return cellValue[0]?.label
}

// 是否计量检查
export function FormatIsisMetering(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.isMetering, ['value', data.cellValue])
  return cellValue[0]?.label
}

// 运营状态
export function FormatRunningState(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.runningState, ['value', Number(data.cellValue)])
  return cellValue[0]?.label
}

// 审批状态
export function FormatApproveStatus(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.APPROVAL_STATUS, ['value', Number(data.cellValue)])
  return cellValue[0]?.label
}
