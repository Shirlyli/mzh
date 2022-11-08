import request from "@/utils/businessRequest";

// 获取字典左侧树形数据
export const getTreeData = (url: any, data: any) =>
  request({
    url,
    method: "POST",
    data
  });

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

// 获取用户信息根据员工id
export const getPersonalInfo = (data: any) =>
  request({
    url: "/auth/user/getUserByEmployeeId",
    method: "POST",
    data
  });

// 新增用户账号信息 --修改
// /api/auth/user/bindAccount
export const bindPersonalInfo = (data: any) =>
  request({
    url: "/auth/user/bindAccount",
    method: "POST",
    data
  });

// 删除用户账号信息
// /api/auth/user/del
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

// 用户关联角色 /api/auth/userRole/bindRole
export const personalBindRole = (data: { userId: string; roleId: string }) =>
  request({
    url: "/auth/userRole/bindRole",
    method: "POST",
    data
  });

// 查看用户已关联绑定角色 /api/auth/role/queryRolesByUserId
export const queryRolesByUserId = (data: { user_id: string }) =>
  request({
    url: "/auth/role/queryRolesByUserId",
    method: "POST",
    data
  });

// 解绑用户关联角色 /api/auth/userRole/unbindRole
export const personalUnbindRole = (data: { userId: string; roleId: string }) =>
  request({
    url: "/auth/userRole/unbindRole",
    method: "POST",
    data
  });

// 获取菜单树   /api/auth/menu/queryTree
export const queryMenuTree = () =>
  request({
    url: "/auth/menu/queryTree",
    method: "POST"
  });

// 新增菜单  /api/auth/menu/save
/**
 * {
  mName: string;
  mCode: string;
  mUrl: string;
  mIcon: string;
  pid: string;
  pName: string;
  mType: string;
  mOpentype: string;
  mDesc: string;
  note: string;
  mIsavailable: string;
}
 * @param data 
 * @returns 
 */
export const saveMenuInfo = (data: any) =>
  request({
    url: "/auth/menu/save",
    method: "POST",
    data
  });

// 菜单树删除 /api/auth/menu/del {ids:string}
export const delMenuInfo = (data: any) =>
  request({
    url: "/auth/menu/del",
    method: "POST",
    data
  });

// 菜单树点击  /api/auth/menu/queryByCondition
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

// 角色修改
export const saveRoleInfo = (data: any) =>
  request({
    url: "/auth/role/save",
    method: "POST",
    data
  });

// 菜单树删除 /api/auth/menu/del {ids:string}
export const delRoleInfo = (data: any) =>
  request({
    url: "/auth/role/del",
    method: "POST",
    data
  });
