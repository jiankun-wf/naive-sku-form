import { SourceAttriButeItem, ReactiveSourceAttriButeItem, CheckedAttributeItem, DimensionaAttribute } from "../types";
import { v4 } from "uuid";
import { SkeletonComponentType, SkeletonItem } from "../types/skeleton";
import type { DataTableColumn } from 'naive-ui';

// Component 
import { NFormItem, NInput, NSelect, NRate, NUpload, NInputNumber } from "naive-ui";
import { h } from "vue";


// 生成反应式来源
export function createAttributeList(data: SourceAttriButeItem[]): ReactiveSourceAttriButeItem[] {
  return data.map(attr => {
    return {
       id: attr.id,
       name: attr.name,
       disabled: attr.disabled,
       items: attr.items.map(child => {
         return {
            id: child.id,
            name: child.name,
            checked: false,
         }
       })
    }
  })
}

export function randomId(): string {
  return v4();
}
// 二维化sku规格
// 上方函数的数据 转换成
/*
  [ 
    [ attrName: '', attrId: '', id: '', name: '' ]
  ]
*/
export function AttributeListToDimensiona(attrs: CheckedAttributeItem[]) {
  return attrs.reduce((summary: DimensionaAttribute[][], attr) => {
    summary.push(attr.items.map(child => {
      return {
        ...child,
        attrName: attr.name,
        attrId: attr.id,
      }
    }))
    return summary;
  }, [])
}

// 根据骨架列，生成渲染函数
export function RenderSkeletonColumn(skeletons: SkeletonItem[]): DataTableColumn[]  {
  return skeletons.map(skeleton => {
    return {
       ...skeleton,
       render: (rowData, rowIndex) => RenderFormItemInput(rowData, rowIndex, skeleton),

    }
  })
}

// 渲染form-item 及 输入项
function RenderFormItemInput(rowData: Record<string, any>, index: number, skeleton: SkeletonItem) {
  const path = `sku[${index}].${skeleton.key}`
  return h(NFormItem, { path, rule: skeleton.rules, key: `${skeleton.key}-${index}`, name: path }, [
    skeleton.renderComponent ? skeleton.renderComponent(rowData, index, skeleton) : RenderInputComponent(rowData, index, skeleton),
  ])
}

const componentRenderMap: Record<SkeletonComponentType, any> = {
  Input: NInput,
  InputNumber: NInputNumber,
  Select: NSelect,
  Rate: NRate,
  ImageUpload: NUpload,
}

function RenderInputComponent(rowData: Record<string, any>, index: number, skeleton: SkeletonItem) {
 return h(componentRenderMap[skeleton.component], {
  ...skeleton.componentProps,
   value: rowData[skeleton.key], 
   onUpdateValue(val: any) {
     rowData[skeleton.key] = val
   }, 
   placeholder: `请完善${skeleton.title}`,
  })
}