import request from '@/utils/request'

/**************************
 * 获取字典左侧树形数据
 * @param url
 * @param data
 * @returns
 *************************/
export const getTreeData = (url: any, data: any) =>
  request({
    url,
    method: 'POST',
    data
  })

/*********************************************
 * 字典管理start
 * @param data
 * @returns
 ********************************************/
export const getTableDataList = (data: any) =>
  request({
    url: 'common/dicInfo/saver',
    method: 'POST',
    data
  })

/*************************
 * 修改字典数据
 * @param data
 * @returns
 ************************/
export const updateCommonData = (data: any) =>
  request({
    url: '/common/dicInfo/save',
    method: 'POST',
    data
  })

/*************************
 * 删除字典
 * @param data
 * @returns
 ************************/
export const dealCommonData = (data: any) =>
  request({
    url: '/common/dicInfo/del',
    method: 'POST',
    data
  })

/*************************
 * 字典管理end
 ************************/

/*************************
 * 员工管理start
 ************************/
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

/*************************
 * 员工管理end
 ************************/

/*************************
 * 用户管理start
 ************************/
// 获取用户信息根据员工id
export const getPersonalInfo = (data: any) =>
  request({
    url: '/auth/user/getUserByEmployeeId',
    method: 'POST',
    data
  })

// 新增用户账号信息 --修改
export const bindPersonalInfo = (data: any) =>
  request({
    url: '/auth/user/bindAccount',
    method: 'POST',
    data
  })

// 删除用户账号信息
export const delPersonalInfo = (data: any) =>
  request({
    url: '/auth/user/del',
    method: 'POST',
    data
  })

// 获取角色树数据
export const getRoleTreeData = () =>
  request({
    url: '/auth/role/queryTree',
    method: 'POST'
  })

// 用户关联角色
export const personalBindRole = (data: { userId: string, roleId: string }) =>
  request({
    url: '/auth/userRole/bindRole',
    method: 'POST',
    data
  })

// 查看用户已关联绑定角色
export const queryRolesByUserId = (data: { userId: string }) =>
  request({
    url: '/auth/role/queryRolesByUserId',
    method: 'POST',
    data
  })

// 解绑用户关联角色
export const personalUnbindRole = (data: { userId: string, roleId: string }) =>
  request({
    url: '/auth/userRole/unbindRole',
    method: 'POST',
    data
  })
/*************************
 * 用户管理end
 ************************/

/*************************
 * 菜单管理start
 ************************/
// 获取菜单树
export const queryMenuTree = () =>
  request({
    url: '/auth/menu/queryTree',
    method: 'POST'
  })

// 新增菜单
export const saveMenuInfo = (data: any) =>
  request({
    url: '/auth/menu/save',
    method: 'POST',
    data
  })

// 菜单树删除
export const delMenuInfo = (data: any) =>
  request({
    url: '/auth/menu/del',
    method: 'POST',
    data
  })

// 菜单树点击
export const queryByCondition = (data: {
  page: string
  limit: string
  entity: {
    pid: string
  }
}) =>
  request({
    url: '/auth/menu/queryByCondition',
    method: 'POST',
    data
  })

// 菜单关联角色 /auth/menuRole/bindRole
export const onMenuIdBindRole = (data: { menuId: string, roleId: string }) =>
  request({
    url: '/auth/menuRole/bindRole',
    method: 'POST',
    data
  })

// 菜单解绑角色 /auth/menuRole/unbindRole
export const onMenuIdUnBindRole = (data: { menuId: string, roleId: string }) =>
  request({
    url: '/auth/menuRole/unbindRole',
    method: 'POST',
    data
  })

//  菜单查询已绑定的角色 /auth/role/queryRolesByMenuId
export const queryRolesByMenuId = (data: { menuId: string }) =>
  request({
    url: '/auth/role/queryRolesByMenuId',
    method: 'POST',
    data
  })

// 菜单树删除 /auth/menu/del {ids:string}
export const delRoleInfo = (data: any) =>
  request({
    url: '/auth/role/del',
    method: 'POST',
    data
  })
/*************************
 * 菜单管理end
 ************************/

/*************************
 * 角色管理start
 ************************/
// 角色修改
export const saveRoleInfo = (data: any) =>
  request({
    url: '/auth/role/save',
    method: 'POST',
    data
  })
/*************************
 * 角色管理end
 ************************/

/**************************
 *  流程相关start
 ************************/
// 根据流程编码获取所有流程节点
export const queryProcessData = (data: any) =>
  request({
    url: '/hospitalProcess/queryProcessNodeListByProcessNode',
    method: 'POST',
    data
  })

// 添加流程配置--修改流程配置
export const updateProcessData = (data: any) =>
  request({
    url: '/hospitalProcess/save',
    method: 'POST',
    data
  })

// 删除流程配置
export const delProcessData = (data: any) =>
  request({
    url: '/hospitalProcess/del',
    method: 'POST',
    data
  })

// 获取节点人员权限列表  /hospitalProcess/getUserListProcessCodeAndBh
export const getUserListProcessCode = (data: any) =>
  request({
    url: '/hospitalProcess/getUserListProcessCodeAndBh',
    method: 'POST',
    data
  })

// 转科申请查询
export const getRollDepartmentInfo = (data: any) =>
  request({
    url: '/rollDepartment/getRollDepartmentInfo',
    method: 'POST',
    data
  })

// 通过科室id查询转科申请  /rollDepartment/getRollDepartmentById

// 保存转科申请 /rollDepartment/saveRollDepartment
export const handleSaveRollDepartment = (data: any) =>
  request({
    url: '/rollDepartment/saveRollDepartment',
    method: 'POST',
    data
  })

/*************************
 * 盘点申请保存
 * @param data
 * @returns
 ************************/
export const handleSaveCheckApply = (data: any) =>
  request({
    url: '/checkApply/saveCheckApply',
    method: 'POST',
    data
  })

// 获取节点信息 /hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
export const getProcessNodeInfoByProcessCodeAndBh = (data: any) =>
  request({
    url: '/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh',
    method: 'POST',
    data
  })

// 获取流程操作记录 /hospitalProcessRecord/queryProcessRecordList
export const queryProcessRecordList = (data: any) =>
  request({
    url: '/hospitalProcessRecord/queryProcessRecordList',
    method: 'POST',
    data
  })

// 发起科室申请流程 /kssq/save
export const queryHospitalProcessBusinessSave = (data: any) =>
  request({
    url: '/kssq/save',
    method: 'POST',
    data
  })

// 审批流程 kssq/update
export const queryHospitalProcessBusinessUpdate = (data: any) =>
  request({
    url: '/kssq/update',
    method: 'POST',
    data
  })

// 获取流程列表 /kssq/queryProcessList
export const queryProcessList = (data: any) =>
  request({
    url: '/kssq/queryProcessList',
    method: 'POST',
    data
  })

// 删除业务流程 /kssq/del
export const delHospitalProcessBusiness = (data: any) =>
  request({
    url: '/kssq/del',
    method: 'POST',
    data
  })

/**************************
 *  流程相关end
 ************************/

/*************************
 * 科室相关start
 ************************/
// 获取科室数据 THospitalDepartmentInfo/queryTree
export const queryDepartmentInfoTree = (data: any) =>
  request({
    url: '/THospitalDepartmentInfo/queryTree',
    method: 'POST',
    data
  })

/*************************
 * 科室相关end
 ************************/

/*************************
 *厂商管理start
 ************************/
// 供应商查询 /api/supplier/queryByCondition
export const queryByConditionSupplier = (data: any) =>
  request({
    url: '/supplier/queryByCondition',
    method: 'POST',
    data
  })

// 供应商新增
export const handleSupplierSave = (data: any) =>
  request({
    url: '/supplier/save',
    method: 'POST',
    data
  })

// 供应商删除
export const handleSupplierDel = (data: any) =>
  request({
    url: '/supplier/del',
    method: 'POST',
    data
  })
/*************************
 *厂商管理end
 ************************/

/*************************
 * 获取左侧菜单栏数据
 * @param data
 ************************/
export const queryLeftMenuData = (data: any) =>
  request({
    url: '/mainPage/leftMenuTree',
    method: 'POST',
    data
  })

/*************************
 * 厂商联系人开始
 ************************/
export const handleLinkmanAdd = (data: any) =>
  request({
    url: '/supplierLinkman/insert',
    method: 'POST',
    data
  })

export const handleLinkmanUpdate = (data: any) =>
  request({
    url: '/supplierLinkman/update',
    method: 'POST',
    data
  })

export const handleLinkmanDel = (data: { ids: string } | {}) =>
  request({
    url: '/supplierLinkman/del',
    method: 'POST',
    data
  })
/*************************
 * 厂商联系人结束
 ************************/

/*************************
 * 合同管理开始
 ************************/
export const handleSupplierContractAdd = (data: any) =>
  request({
    url: '/supplierContract/insert',
    method: 'POST',
    data
  })

export const handleSupplierContractUpdate = (data: any) =>
  request({
    url: '/supplierContract/update',
    method: 'POST',
    data
  })

export const handleSupplierContractDel = (data: { ids: string } | {}) =>
  request({
    url: '/supplierContract/del',
    method: 'POST',
    data
  })
/*************************
 * 合同管理结束
 ************************/

/*************************
 * 权限管理
 ************************/
export const queryMenuTreeAndChoose = (data: { roleId: string }) =>
  request({
    url: '/auth/menuRole/queryMenuTreeAndChoose',
    method: 'POST',
    data
  })

export const saveRoleWithMenu = (data: { roleId: string, menuId: string }) =>
  request({
    url: '/auth/menuRole/save',
    method: 'POST',
    data
  })

/*************************
 * 操作日志
 ************************/
export const queryOperationLogs = (data: { roleId: string }) =>
  request({
    url: '/log/queryByCondition',
    method: 'POST',
    data
  })

export const delOperationLogs = (data: { roleId: string, menuId: string }) =>
  request({
    url: '/log/del',
    method: 'POST',
    data
  })

/**************************
 * 根据科室获取设备 getEquipmentData
 * @param data
 *************************/

export const getEquipmentData = (data: any) =>
  request({
    url: '/equipment/getEquipmentInfo',
    method: 'POST',
    data
  })
