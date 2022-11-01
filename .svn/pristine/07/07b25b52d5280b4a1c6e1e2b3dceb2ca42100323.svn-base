import request from '@/utils/businessRequest'
import { EquipmentInfoData } from './types'

export const equipmentInfoData: EquipmentInfoData = {
  id: 0,
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
  avatar: '',
  introduction: '',
  roles: []
}

// 获取科室左侧树形数据
export const getTreeData = (url: any, data: any) =>
  request({
    url,
    method: 'POST',
    data
  })

// 获取列表数据
export const getTableDataList = (url:any, data: any) =>
  request({
    url,
    method: 'POST',
    data
  })

// 修改科室数据
export const updateEquipmentData = (data: any) =>
  request({
    url: 'THospitalDepartmentInfo/save',
    method: 'POST',
    data
  })

// 删除科室
export const dealEquipmentData = (data: any) =>
  request({
    url: 'THospitalDepartmentInfo/del',
    method: 'POST',
    data
  })

// 修改医院数据 /api/hospitalInfo/save
export const updateHospitalData = (data: any) =>
  request({
    url: 'hospitalInfo/save',
    method: 'POST',
    data
  })

// 删除医院
export const dealHospitalData = (data: any) =>
  request({
    url: 'hospitalInfo/del',
    method: 'POST',
    data
  })
