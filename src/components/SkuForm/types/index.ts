
import { ConfigProviderProps } from 'naive-ui'
export type IConfigProviderProps = Omit<ConfigProviderProps, 'abstract'> 



// 来源单数据 子选项接口
export interface SourceAttributeChild {
   id: string;
   name: string; 
}
// 来源单数据 接口
export interface SourceAttriButeItem {
  name: string;
  id: string;
  items: SourceAttributeChild[];
  disabled?: boolean;
}
// 反应式 规格 子选项
export interface ReactiveSourceAttributeChild {
  readonly id: string;
  readonly name: string;
  checked: boolean;
}
// 反应式 规格 单个数据
export interface ReactiveSourceAttriButeItem {
  name: string;
  readonly id: string;
  items: ReactiveSourceAttributeChild[];
  readonly disabled?: boolean;
  attributeName?: string;
}

export interface CheckedAttributeItem {
   id: string;
   name: string;
   items: Omit<CheckedAttributeItem, 'items'>[];
}
// 二维规格转化数据单个
export interface DimensionaAttribute {
   attrName: string;
   attrId: string;
   name: string;
   id: string;
}
// sku表格表单数据源 单个
export interface SkuTableItem {
   attributes: Omit<CheckedAttributeItem, 'items'>;
   [key: string]: string | number | Record<string, any> 
}