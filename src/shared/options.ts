const ALL_OPTIONS = {
  // 重要程度
  IMPORTANT: [
    { label: "重要", value: "重要" },
    { label: "次要", value: "次要" },
    { label: "一般", value: "一般" }
  ],
  // 厂商类型
  suppliesType: [
    { label: "生产商", value: "生产商" },
    { label: "供应商", value: "供应商" },
    { label: "维修商", value: "维修商" }
  ],
  // 运营状态
  runningState: [
    { label: "正常", value: 1 },
    { label: "注销", value: 2 }
  ],
  // 菜单类型
  MENU_TYPES: [
    {
      value: 1,
      label: "目录"
    },
    {
      value: 2,
      label: "菜单"
    },
    {
      value: 3,
      label: "按钮"
    }
  ],
  //性别
  sex: [
    { label: "男", value: 1 },
    { label: "女", value: 2 }
  ],
  //  设备状态
  equipmentStates: [
    { label: "正常", value: 1 },
    { label: "报修", value: 2 },
    { label: "报废", value: 3 },
    { label: "丢失", value: 4 },
    { label: "停用", value: 5 }
  ],
  //状态
  isExordium: [
    { label: "正常", value: 1 },
    { label: "外调中", value: 2 }
  ],
  // 是否
  isORnot: [
    { label: "是", value: 1 },
    { label: "否", value: 0 }
  ],
  // 计量检查
  isMetering: [
    { label: "未检查", value: 1 },
    { label: "已检查", value: 2 }
  ],
  // 是否计量单位
  meterings: [
    { label: "不是计量设备", value: 1 },
    { label: "是计量设备", value: 2 }
  ],
  // 国别
  region: [
    { label: "国内", value: 1 },
    { label: "国外", value: 2 }
  ],
  // 设备来源
  source: [
    { label: "采购", value: 1 },
    { label: "捐赠", value: 2 },
    { label: "政府配发", value: 3 }
  ],
  // 是否删除
  state: [
    { label: "正常", value: 1 },
    { label: "删除", value: 2 }
  ]
};

export default ALL_OPTIONS;
