
export const formatMIsAvailable = {
  1: '启用',
  0: '不启用'
}

export const formatMIsRoleType = (data: any) => {
  return data.cellValue === '1'
    ? '角色'
    : data.cellValue === '0'
      ? '用户'
      : '-'
}

// 处理科室数据适配vuetreeselect
export const handleDepartData = (datas: any) => {
  return datas.map((item: any) => {
    if (item.children.length) {
      return {
        id: item.id,
        label: item.title,
        children: handleDepartData(item.children)
      }
    }
    return { id: item.id, label: item.title }
  })
}

export const formatIsOrNotType = (data: any) => {
  return String(data.cellValue) === '1'
    ? '是'
    : String(data.cellValue) === '0'
      ? '否'
      : '-'
}

export const formatSexType = (data: any) => {
  return String(data.cellValue) === '1'
    ? '男'
    : String(data.cellValue) === '0'
      ? '女'
      : '-'
}
