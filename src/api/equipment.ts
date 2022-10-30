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
export const getNextNodeData = (data: any) =>
  request({
    url: 'THospitalDepartmentInfo/querySelfAndPar',
    method: 'POST',
    data
  })

// 新增科室数据
export const addEquipmentData = (data: any) =>
  request({
    url: 'THospitalDepartmentInfo/save',
    method: 'POST',
    data
  })
