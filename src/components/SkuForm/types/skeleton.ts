import { DataTableBaseColumn, FormItemRule, TooltipProps } from "naive-ui"
import { CSSProperties, VNode, VNodeChild } from "vue"

type SkeletonColumn = Omit<
  DataTableBaseColumn,
  'cellProps' | 
  'filter' | 
  'render' | 
  'type' | 
  'sorter' | 
  'multiple' | 
  'expandable' | 
  'tree'
>

export type SkeletonComponentType = 'Input' | 'InputNumber' | 'Rate' | 'ImageUpload' | 'Select'

export interface SkeletonItem<Props = Record<string, any>, DefaultValue = any> extends SkeletonColumn {
  // 表格标题
  title: string;
  // 必填星号
  titleRequireMark?: boolean;
  // 表格标题提示语
  titleHelpMessage?: string;

  titleHelpProps?: TooltipProps;
  // 标题样式
  titleStyle?: Partial<CSSProperties>;
  // 组件类型
  component: SkeletonComponentType;
  // 组件Props
  componentProps?: Props;
  // 自定义component-render
  renderComponent?: (rowData: Record<string, any>, rowIndex: number, column: SkeletonItem) => VNodeChild | string | VNode; 
  // 输入项rules
  rules?: FormItemRule | FormItemRule[];
  // 默认值
  defaultValue?: DefaultValue;
}