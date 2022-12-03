export default  {
  code :200,
  data: [
    {
      id: "FEF8F3FB74E12C-878A-4F74-B777-14B43A2590C5",
      path: "WDGZT",
      component: "/workBench",
      redirect: "菜单管理/我的工作台",
      name: "我的工作台",
      menuType: "2",
      meta: {
        title: "我的工作台",
        icon: "",
        roles: null
      },
      children: []
    },
    {
      id: "45C174BC67D45C-5EB6-4B94-8D64-B7EB03044F8E",
      path: "SJJC",
      component: "/workBench",
      redirect: "菜单管理/数据决策",
      name: "数据决策",
      menuType: "2",
      meta: {
        title: "数据决策",
        icon: "",
        roles: null
      },
      children: []
    },
    {
      id: "590C3A164D00D7-31E7-4FA2-96EC-82005E93DAFA",
      path: "ZCGR",
      component: "",
      redirect: "菜单管理/资产购入",
      name: "设备购入流程",
      menuType: "1",
      meta: {
        title: "设备购入流程",
        icon: "",
        roles: null
      },
      children: [
        {
          id: "D6FDF6BF7F03B1-582C-4394-9D7D-DA626BD53BBB",
          path: "CGSQ",
          component: "/fileManagement",
          redirect: "菜单管理/资产购入/采购申请",
          name: "采购申请",
          menuType: "1",
          meta: {
            title: "采购申请",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "E0C22B2A7FCCDE-316C-4D64-B898-BA5BE83E4C54",
              path: "CGSQ-CGX",
              component: "/fileManagement/equipmentRequest",
              redirect: "菜单管理/资产购入/采购申请/科室申请",
              name: "草稿箱",
              menuType: "2",
              meta: {
                title: "草稿箱",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "9C37544BD9111A-41C9-44DD-99B6-87994F5255B0",
              path: "CGSQ-YSQ",
              component: "/fileManagement/equipmentClass",
              redirect: "菜单管理/资产购入/采购申请/已申请查看",
              name: "已申请查看",
              menuType: "2",
              meta: {
                title: "已申请查看",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "2D0595FC5ED9AD-B400-4838-B33A-130C57761D6C",
          path: "CGSP",
          component: "",
          redirect: "菜单管理/资产购入/采购审批",
          name: "采购审批",
          menuType: "1",
          meta: {
            title: "采购审批",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "E7DB72DEBDF992-72F3-472B-9DD5-32C0792A6B92",
              path: "CGSO-DSP",
              component: "",
              redirect: "菜单管理/资产购入/采购审批/待审批",
              name: "待审批",
              menuType: "2",
              meta: {
                title: "待审批",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "F146FE9B8BAFCF-2B71-4F2E-B885-D509CD55F5F9",
              path: "CGSP-YSPCK",
              component: "",
              redirect: "菜单管理/资产购入/采购审批/已审批查看",
              name: "已审批查看",
              menuType: "2",
              meta: {
                title: "已审批查看",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "C2F86F7E761EE5-2A52-4FAB-9A07-FBD548E29A2E",
          path: "CGLZ",
          component: "",
          redirect: "菜单管理/资产购入/采购论证",
          name: "采购论证",
          menuType: "1",
          meta: {
            title: "采购论证",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "1A71BD339EBDA2-EA5E-4E41-AD61-247C6128A34E",
              path: "CGLZ-ZJPS",
              component: "",
              redirect: "菜单管理/资产购入/采购论证/专家评审",
              name: "专家评审",
              menuType: "2",
              meta: {
                title: "专家评审",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "288FD6AFAC476F-B644-4A58-A207-77607A615AFF",
              path: "CGLZ-PSJDCX",
              component: "",
              redirect: "菜单管理/资产购入/采购论证/专家评审/评审进度查询",
              name: "评审进度查询",
              menuType: "2",
              meta: {
                title: "评审进度查询",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "C853872FC1295D-B057-485A-AE75-F1A4E8D078C5",
              path: "CGLZ-PSJG",
              component: "",
              redirect: "菜单管理/资产购入/采购论证/评审结果",
              name: "评审结果",
              menuType: "2",
              meta: {
                title: "评审结果",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "46BB4A8520D3C1-DA2F-470F-95E0-A638C3DB7A48",
              path: "CGLZ-XMJG",
              component: "",
              redirect: "菜单管理/资产购入/采购论证/项目结果",
              name: "项目结果",
              menuType: "2",
              meta: {
                title: "项目结果",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "FFC419C7D9B7CA-417C-454A-B487-7F6B75881485",
          path: "CGZBJL",
          component: "",
          redirect: "菜单管理/资产购入/采购招标记录",
          name: "采购招标记录",
          menuType: "1",
          meta: {
            title: "采购招标记录",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "58BEAB51271D8E-001F-4D67-9814-069BEA0CF410",
              path: "ZBJL",
              component: "",
              redirect: "菜单管理/资产购入/采购招标记录/招标记录",
              name: "招标记录",
              menuType: "2",
              meta: {
                title: "招标记录",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "29DA60240C0307-2464-428D-85F0-83319EDCD1A8",
          path: "CGHT",
          component: "",
          redirect: "菜单管理/资产购入/采购合同",
          name: "采购合同",
          menuType: "1",
          meta: {
            title: "采购合同",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "09222C02F9898D-8A16-4774-8AF9-4341E4476B08",
              path: "CGHT-LR",
              component: "",
              redirect: "菜单管理/资产购入/采购合同/合同录入",
              name: "合同录入",
              menuType: "2",
              meta: {
                title: "合同录入",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "DE3BF4431EC64A-E56C-407A-A6E6-D5AF674D4926",
          path: "CGYS",
          component: "",
          redirect: "菜单管理/资产购入/采购验收",
          name: "采购验收",
          menuType: "1",
          meta: {
            title: "采购验收",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "DCE3B79892FC76-965F-41AA-9AA7-51645F9CF99B",
              path: "CGYS-CGX",
              component: "",
              redirect: "菜单管理/资产购入/采购验收/草稿箱",
              name: "草稿箱",
              menuType: "2",
              meta: {
                title: "草稿箱",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "C8AF7BB566BAB4-22EF-473C-AAD0-9DC658F5D27A",
              path: "CGYS-DYS",
              component: "",
              redirect: "菜单管理/资产购入/采购验收/确认验收",
              name: "待验收",
              menuType: "2",
              meta: {
                title: "待验收",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "FE086EEE7204D9-C47D-4BAE-BBF0-481DFEBE1B32",
              path: "CGYS-YYS",
              component: "",
              redirect: "菜单管理/资产购入/采购验收/已验收",
              name: "已验收查看",
              menuType: "2",
              meta: {
                title: "已验收查看",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        },
        {
          id: "F980A578A9FBCA-2E75-4872-B127-4AA90A9C5835",
          path: "SBCRK",
          component: "",
          redirect: "菜单管理/资产购入/设备出入库",
          name: "设备出入库",
          menuType: "1",
          meta: {
            title: "设备出入库",
            icon: "",
            roles: null
          },
          children: [
            {
              id: "6D4DCDF61A07D5-FADB-4D3E-954C-9F2C0D800C6F",
              path: "SBCRK-RK",
              component: "",
              redirect: "菜单管理/资产购入/设备出入库/入库",
              name: "入库",
              menuType: "2",
              meta: {
                title: "入库",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "D70B33B6FFBC08-187F-4C26-8D75-051909B78683",
              path: "SBCRK-CK",
              component: "",
              redirect: "菜单管理/资产购入/设备出入库/出库-科室领用",
              name: "出库-科室领用",
              menuType: "2",
              meta: {
                title: "出库-科室领用",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "4DD60F6BB2C737-A209-4FE4-A2A5-E8BEBEF9781B",
              path: "SBCRK-TH",
              component: "",
              redirect: "菜单管理/资产购入/设备出入库/退货",
              name: "退货",
              menuType: "2",
              meta: {
                title: "退货",
                icon: "",
                roles: null
              },
              children: []
            },
            {
              id: "EBF7F1CCB8FE1A-965B-4676-9BD4-4BDB2C1091C1",
              path: "SBCRK",
              component: "",
              redirect: "菜单管理/资产购入/设备出入库/换货",
              name: "换货",
              menuType: "2",
              meta: {
                title: "换货",
                icon: "",
                roles: null
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};
