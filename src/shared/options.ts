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
      value: "1",
      label: "目录"
    },
    {
      value: "2",
      label: "菜单"
    },
    {
      value: "3",
      label: "按钮"
    }
  ],
  //性别
  sex: [
    { label: "男", value: 1 },
    { label: "女", value: 2 }
  ]
};

export default ALL_OPTIONS;
