export const formatMIsAvailable = {
  "1": "启用",
  "0": "不启用"
};

export const formatMIsRoleType = (data: any) => {
  return data.cellValue === "1"
    ? "角色"
    : data.cellValue === "0"
    ? "用户"
    : "-";
};
