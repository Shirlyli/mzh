export const demoData = {
  code: 200,
  msg: "返回成功",
  data: [
    // 只有一层
    {
      path: "/workBench",
      component: "Layout",
      redirect: "/workBench/index",
      name: "",
      children: [
        // children里面的path前面不加/
        {
          path: "index",
          component: "/workBench/index",
          name: "workBench",
          meta: {
            title: "workBench",
            icon: "dashboard"
          }
        }
      ]
    },
    // 两层
    {
      path: "/infrastructure",
      component: "Layout",
      redirect: "/infrastructure/equipmentCategory",
      meta: {
        title: "infrastructure",
        icon: "lock"
      },
      children: [
        {
          path: "equipmentCategory",
          component: "/infrastructure/equipmentCategory/index",
          name: "equipmentCategory",
          meta: {
            title: "equipmentCategory"
          }
        },
        {
          path: "supplierManagement",
          component: "/infrastructure/supplierManagement/index",
          name: "supplierManagement",
          meta: {
            title: "supplierManagement"
          }
        }
      ]
    }
  ]
};
