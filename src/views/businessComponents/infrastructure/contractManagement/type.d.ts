export interface ContractTypes {
  /**
   * 合同编码
   */
  cCode: string;
  /**
   * 合同名称
   */
  cName: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 厂商id
   */
  supplierId: string;
}

export interface FormItemTypes {
  field?: string;
  title?: string;
  slots?: {
    default: string;
  };
  itemRender?: any;
  resetValue?: any;
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
   * 附件
   */
  cAttahUrl?: null;
  /**
   * 合同编码
   */
  cCode?: null;
  /**
   * 经办人
   */
  cDefend?: null;
  /**
   * 有效期限
   */
  cEffective?: null;
  /**
   * 合同名称
   */
  cName?: string;
  /**
   * 签订日期
   */
  cSignDate?: null;
  ctime?: null;
  /**
   * 合同总金额
   */
  cTotal?: null;
  dispindex?: null;
  /**
   * 主键
   */
  id?: string;
  note?: null;
  supplierId?: null;
}

export interface ContractFormTypes {
  cAttahUrl: string;
  cCode: string;
  cDefend: string;
  cEffective: string;
  cName: string;
  cSignDate: string;
  ctime: string;
  cTotal: string;
  dispindex: string;
  note: string;
  supplierId: string;
  id?:string
}
