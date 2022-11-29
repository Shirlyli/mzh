import request from "@/utils/request";

// 获取字典左侧树形数据
export const getTreeData = (url: any, data: any) =>
  request({
    url,
    method: "POST",
    data
  });

/**
 * 字典管理start
 * @param data
 * @returns
 */
// 获取下级字典数据
export const getTableDataList = (data: any) =>
  request({
    url: "common/dicInfo/saver",
    method: "POST",
    data
  });

// 修改字典数据
export const updateCommonData = (data: any) =>
  request({
    url: "/common/dicInfo/save",
    method: "POST",
    data
  });

// 删除字典
export const dealCommonData = (data: any) =>
  request({
    url: "/common/dicInfo/del",
    method: "POST",
    data
  });

/**
 * 字典管理end
 */

/**
 * 员工管理start
 */
// 修改员工信息
export const updatePersonalData = (data: any) =>
  request({
    url: "/auth/employee/save",
    method: "POST",
    data
  });

// 删除员工信息
export const dealPersonalData = (data: any) =>
  request({
    url: "/auth/employee/del",
    method: "POST",
    data
  });

/**
 * 员工管理end
 */

/**
 * 用户管理start
 */
// 获取用户信息根据员工id
export const getPersonalInfo = (data: any) =>
  request({
    url: "/auth/user/getUserByEmployeeId",
    method: "POST",
    data
  });

// 新增用户账号信息 --修改
// /auth/user/bindAccount
export const bindPersonalInfo = (data: any) =>
  request({
    url: "/auth/user/bindAccount",
    method: "POST",
    data
  });

// 删除用户账号信息
// /auth/user/del
export const delPersonalInfo = (data: any) =>
  request({
    url: "/auth/user/del",
    method: "POST",
    data
  });

// 获取角色树数据
export const getRoleTreeData = () =>
  request({
    url: "/auth/role/queryTree",
    method: "POST"
  });

// 用户关联角色 /auth/userRole/bindRole
export const personalBindRole = (data: { userId: string; roleId: string }) =>
  request({
    url: "/auth/userRole/bindRole",
    method: "POST",
    data
  });

// 查看用户已关联绑定角色 /auth/role/queryRolesByUserId
export const queryRolesByUserId = (data: { user_id: string }) =>
  request({
    url: "/auth/role/queryRolesByUserId",
    method: "POST",
    data
  });

// 解绑用户关联角色 /auth/userRole/unbindRole
export const personalUnbindRole = (data: { userId: string; roleId: string }) =>
  request({
    url: "/auth/userRole/unbindRole",
    method: "POST",
    data
  });
/**
 * 用户管理end
 */

/**
 * 菜单管理start
 */
// 获取菜单树   /auth/menu/queryTree
export const queryMenuTree = () =>
  request({
    url: "/auth/menu/queryTree",
    method: "POST"
  });

// 新增菜单  /auth/menu/save
/**
 * @param data
 * @returns
 */
export const saveMenuInfo = (data: any) =>
  request({
    url: "/auth/menu/save",
    method: "POST",
    data
  });

// 菜单树删除 /auth/menu/del {ids:string}
export const delMenuInfo = (data: any) =>
  request({
    url: "/auth/menu/del",
    method: "POST",
    data
  });

// 菜单树点击  /auth/menu/queryByCondition
export const queryByCondition = (data: {
  page: string;
  limit: string;
  entity: {
    pid: string;
  };
}) =>
  request({
    url: "/auth/menu/queryByCondition",
    method: "POST",
    data
  });

// 菜单关联角色 /auth/menuRole/bindRole
export const onMenuIdBindRole = (data: { menuId: string; roleId: string }) =>
  request({
    url: "/auth/menuRole/bindRole",
    method: "POST",
    data
  });

// 菜单解绑角色 /auth/menuRole/unbindRole
export const onMenuIdUnBindRole = (data: { menuId: string; roleId: string }) =>
  request({
    url: "/auth/menuRole/unbindRole",
    method: "POST",
    data
  });

//  菜单查询已绑定的角色 /auth/role/queryRolesByMenuId
export const queryRolesByMenuId = (data: { menu_id: string }) =>
  request({
    url: "/auth/role/queryRolesByMenuId",
    method: "POST",
    data
  });

// 菜单树删除 /auth/menu/del {ids:string}
export const delRoleInfo = (data: any) =>
  request({
    url: "/auth/role/del",
    method: "POST",
    data
  });
/**
 * 菜单管理end
 */

/**
 * 角色管理start
 */
// 角色修改
export const saveRoleInfo = (data: any) =>
  request({
    url: "/auth/role/save",
    method: "POST",
    data
  });
/**
 * 角色管理end
 */

/***
 *  流程相关start
 */
// 获取流程配置列表
export const queryProcessData = (data: any) =>
  request({
    url: "/hospitalProcess/query",
    method: "POST",
    data
  });

// 添加流程配置--修改流程配置
export const updateProcessData = (data: any) =>
  request({
    url: "/hospitalProcess/save",
    method: "POST",
    data
  });

// 删除流程配置
export const delProcessData = (data: any) =>
  request({
    url: "/hospitalProcess/del",
    method: "POST",
    data
  });

//获取节点人员权限列表  /hospitalProcess/getUserListProcessCodeAndBh
export const getUserListProcessCode = (data: any) =>
  request({
    url: "/hospitalProcess/getUserListProcessCodeAndBh",
    method: "POST",
    data
  });

// 转科申请查询  /rollDepartment/getRollDepartmentInfo

// 通过科室id查询转科申请  /rollDepartment/getRollDepartmentById

// 保存转科申请 /rollDepartment/saveRollDepartment

// 获取节点信息 /hospitalProcess/getProcessNodeInfoByProcessCodeAndBh
export const getProcessNodeInfoByProcessCodeAndBh = (data: any) =>
  request({
    url: "/hospitalProcess/getProcessNodeInfoByProcessCodeAndBh",
    method: "POST",
    data
  });

// 获取流程操作记录 /hospitalProcessRecord/queryProcessRecordList
export const queryProcessRecordList = (data: any) =>
  request({
    url: "/hospitalProcessRecord/queryProcessRecordList",
    method: "POST",
    data
  });

// 发起科室申请流程 /hospitalProcessBusiness/save
export const queryHospitalProcessBusinessSave = (data: any) =>
  request({
    url: "/hospitalProcessBusiness/save",
    method: "POST",
    data
  });

// 审批流程 hospitalProcessBusiness/update
export const queryHospitalProcessBusinessUpdate = (data: any) =>
  request({
    url: "/hospitalProcessBusiness/update",
    method: "POST",
    data
  });

// 获取流程列表 /hospitalProcessBusiness/queryProcessList
export const queryProcessList = (data: any) =>
  request({
    url: "/hospitalProcessBusiness/queryProcessList",
    method: "POST",
    data
  });

// 删除业务流程 /hospitalProcessBusiness/del
export const delHospitalProcessBusiness = (data: any) =>
  request({
    url: "/hospitalProcessBusiness/del",
    method: "POST",
    data
  });

/***
 *  流程相关end
 */

// 获取科室数据 THospitalDepartmentInfo/queryTree
export const queryDepartmentInfoTree = (data: any) =>
  request({
    url: "/THospitalDepartmentInfo/queryTree",
    method: "POST",
    data
  });

/**
 *供应商管理start
 */
// 供应商查询 /api/supplier/queryByCondition
export const queryByConditionSupplier = (data: any) =>
  request({
    url: "/supplier/queryByCondition",
    method: "POST",
    data
  });

// 供应商新增
export const handleSupplierSave = (data: any) =>
  request({
    url: "/supplier/save",
    method: "POST",
    data
  });

// 供应商删除
export const handleSupplierDel = (data: any) =>
  request({
    url: "/supplier/del",
    method: "POST",
    data
  });
/**
 *供应商管理end
 */

/**
 * 获取左侧菜单栏数据
 * @param data
 */
export const queryLeftMenuData = (data: any) =>
  request({
    url: "/auth/menu/queryIndexMenu",
    method: "POST",
    data
  });
