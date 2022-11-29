export interface SupplierFormTypes {
  /**
   * 注册地，先不用绑定字典，手填
   */
  domicile: string;
  /**
   * 主键
   */
  id: string;
  /**
   * 供应商名称，供应商名字查询 模糊查询
   */
  name: string;
  /**
   * 简称，武汉大学-武大 简称查询 模糊查询
   */
  nameAbbreviation: string;
  /**
   * 运营状态，1：正常 2：注销
   */
  runningState: string;
  /**
   * 纳税识别号，模糊查询
   */
  taxId: string;
  /**
   *厂商类型
   */
  suppliesType: string;
}

export interface FormItemTypes {
  field?: string;
  title?: string;
  slots?: {
    default: string;
  };
  itemRender?:any
}

export interface SupplierResDataType {
  /**
   * 200，返回成功
   */
  code: number;
  /**
   * 10，返回数量
   */
  count: number;
  /**
   * json数组，返回json数组
   */
  data: DataResTypes[];
  /**
   * 提示，提示信息
   */
  msg: string;
  /**
   * true，成功或者失败
   */
  result: boolean;
}

export interface DataResTypes {
  /**
   * 地址
   */
  address?: string;
  /**
   * 资产性质
   */
  assetsPro?: string;
  checkCode?: string;
  /**
   * 创建时间
   */
  ctime: string;
  /**
   * 排序
   */
  dispindex: string;
  /**
   * 注册地
   */
  domicile?: string;
  /**
   * 电子邮件
   */
  email?: string;
  /**
   * 传真
   */
  foxNo?: string;
  /**
   * 主键，影藏
   */
  id?: string;
  /**
   * 法人
   */
  legalPerson?: string;
  /**
   * 供应商名称
   */
  name?: string;
  /**
   * 供应商简称
   */
  nameAbbreviation: string;
  note: string;
  /**
   * 联系电话
   */
  phoneNo: string;
  /**
   * 邮政编码
   */
  postcode: string;
  /**
   * 运营状态，1：正常 2：注销
   */
  runningState: string;
  suppliesType: string;
  /**
   * 纳税识别号
   */
  taxId: string;
}
