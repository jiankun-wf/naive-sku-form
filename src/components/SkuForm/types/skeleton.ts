import { DataTableBaseColumn, FormItemRule } from "naive-ui"
import { VNode, VNodeChild } from "vue"

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

export interface SkeletonItem<ComponentProps = Record<string, any>> extends SkeletonColumn {
  component: SkeletonComponentType;
  componentProps?: ComponentProps;
  renderComponent?: (rowData: Record<string, any>, rowIndex: number, column: SkeletonItem) => VNodeChild | string | VNode;
  rules?: FormItemRule | FormItemRule[];
  defaultValue?: unknown;
}