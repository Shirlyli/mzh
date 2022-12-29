import ALL_OPTIONS from "@/shared/options";
import _ from 'lodash';
export function FormatApproveStatusColumns(data: any) {
  const cellValue = _.filter(ALL_OPTIONS.APPROVE_STATUS,['value',Number(data.cellValue)])
  return cellValue[0]?.label ?? '退回'
}
