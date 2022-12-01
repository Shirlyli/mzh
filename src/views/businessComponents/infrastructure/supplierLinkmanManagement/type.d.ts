/**
 * SupplierLinkmanFormTypes
 */
export interface SupplierLinkmanFormTypes {
  /**
   * 重要程度，重要程度
   */
  lImportant: string;
  /**
   * 关联厂商id
   */
  linkId: string;
  /**
   * 联系人姓名
   */
  lName: string;
  /**
   * 公司职务
   */
  lPosition: string;
  /**
   * 电话
   */
  lTelphone: string;
}

export interface FormItemTypes {
  field?: string;
  title?: string;
  slots?: {
    default: string;
  };
  itemRender?:any
}

export interface SupplierLinkmanResDataType {
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
   * 关联主表类型
   */
  busType?: null;
  /**
   * 创建数据
   */
  ctime?: string;
  /**
   * 排序
   */
  dispindex?: number;
  /**
   * 主键
   */
  id?: string;
  /**
   * 微信
   */
  lChart?: string;
  /**
   * 创建人
   */
  lDefend?: null;
  /**
   * 邮箱
   */
  lEmail?: string;
  /**
   * 重要程度
   */
  lImportant?: string;
  /**
   * 关联厂商
   */
  linkId?: null;
  /**
   * 姓名
   */
  lName?: string;
  /**
   * 职务
   */
  lPosition?: string;
  /**
   * qq
   */
  lQq?: string;
  /**
   * 电话
   */
  lTelphone?: string;
  /**
   * 备注
   */
  note?: string;
}
