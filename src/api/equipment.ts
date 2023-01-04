import request from '@/utils/request'
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
export const getTreeData = (url: string, data: any) =>
  request({
    url,
    method: 'POST',
    data
  })

// 获取列表数据
export const getTableDataList = (url: string, data: any) =>
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

// 删除科室数据
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

// 删除设备类型
export const dealEquipmentCategoryInfoData = (data: any) =>
  request({
    url: 'tHospitalEquipmentCategoryInfo/del',
    method: 'POST',
    data
  })

// 修改设备类型数据
export const updateEquipmentCategoryInfoData = (data: any) =>
  request({
    url: 'tHospitalEquipmentCategoryInfo/save',
    method: 'POST',
    data
  })

// 根据设备id查询设备详情信息
export const searchEquipmentCategoryInfoDetailsData = (data: any) =>
  request({
    url: 'equipment/getEquipmentInfoById ',
    method: 'POST',
    data
  })

// 修改设备数据 -新增或修改
export const updateEquipmentInfoData = (data: any) =>
  request({
    url: 'equipment/saveEquipment',
    method: 'POST',
    data
  })

// 根据科室类别获取设备 equipment/getEquipmentInfo
export const getEquipmentInfoByDepartmentId = (data: any) =>
  request({
    url: 'equipment/getEquipmentInfo',
    method: 'POST',
    data
  })

// 修改厂商数据 /api/hospitalInfo/save
export const updateSupplierData = (data: any) =>
  request({
    url: 'supplier/save',
    method: 'POST',
    data
  })

// 删除厂商数据
export const delSupplierData = (data: any) =>
  request({
    url: 'supplier/del',
    method: 'POST',
    data
  })

// 新增厂商联系人数据 /api/hospitalInfo/insert
export const insertSupplierLinkmanData = (data: any) =>
  request({
    url: 'supplierLinkman/insert',
    method: 'POST',
    data
  })

// 修改厂商联系人数据 /api/hospitalInfo/update
export const updateSupplierLinkmanData = (data: any) =>
  request({
    url: 'supplierLinkman/update',
    method: 'POST',
    data
  })

// 删除厂商联系人数据
export const delSupplierLinkmanData = (data: any) =>
  request({
    url: 'supplierLinkman/del',
    method: 'POST',
    data
  })
// 设备类别树
export const queryEquipmentCategoryInfo = (data: any) =>
  request({
    url: 'tHospitalEquipmentCategoryInfo/queryTree',
    method: 'POST',
    data
  })
