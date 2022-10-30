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

// 获取下级科室数据
export const getNextNodeData = (url:any, data: any) =>
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