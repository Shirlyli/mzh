import request from '@/utils/businessRequest'

// 获取字典左侧树形数据
export const getTreeData = (url: any, data: any) =>
  request({
    url,
    method: 'POST',
    data
  })

// 获取下级字典数据
export const getTableDataList = (data: any) =>
  request({
    url: 'common/dicInfo/saver',
    method: 'POST',
    data
  })

// 修改字典数据
export const updateCommonData = (data: any) =>
  request({
    url: '/common/dicInfo/save',
    method: 'POST',
    data
  })

// 删除字典
export const dealCommonData = (data: any) =>
  request({
    url: '/common/dicInfo/del',
    method: 'POST',
    data
  })

// 修改员工信息
export const updatePersonalData = (data: any) =>
  request({
    url: '/auth/employee/save',
    method: 'POST',
    data
  })

// 删除员工信息
export const dealPersonalData = (data: any) =>
  request({
    url: '/auth/employee/del',
    method: 'POST',
    data
  })
