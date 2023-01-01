import ALL_OPTIONS from '@/shared/options'
import { ITagView, TagsViewModule } from '@/store/modules/tags-view'
import { UserModule } from '@/store/modules/user'
import _ from 'lodash'
export function FormatApproveStatusColumns(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.APPROVE_STATUS, ['value', Number(data.cellValue)])
  return cellValue[0]?.label ?? '退回'
}
