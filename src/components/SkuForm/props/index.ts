import { PropType } from 'vue';
import { GlobalThemeOverrides, lightTheme, GlobalTheme, configProviderProps } from 'naive-ui'
import { SkuTableItem, SourceAttriButeItem } from '../types/index'
import { SkeletonItem } from '../types/skeleton';

export const ProviderConfigProps = {
  // 主题配置 参考naive-ui
  themeOverrides: {
    type: Object as PropType<GlobalThemeOverrides>,
    default: null,
  },
  // 全局生成class 前缀 默认 sku-*
  clsPrefix: {
    type: String as PropType<string>,
    default: 'sku',
  },
  // 全局断点配置
  breakpoints: {
    type: Object as PropType<{ [key: string]: number }>,
    default: { xs: 0, s: 640, m: 1024, l: 1280, xl: 1536, xxl: 1920 },
  },
  //
  inlineThemeDisabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // 全局组件默认生成标签 
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div',
  },
  // 暗黑、明亮模式
  theme: {
    type: Object as PropType<GlobalTheme>,
    default: () => lightTheme,
  },
}

// sku表格属性
export const SkuFormTableProps = {
  // 表格文字位置
  tableAlign: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left'
  },
  tableRowKey: {
    type: String as PropType<string>,
    default: 'id',
  },
  tableBordered: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  tableSingleLine: {
    type: Boolean as PropType<boolean>,
    default: false,
  }
}

export const SkuFormProps = {
  ...configProviderProps,
  // 以上为表单全局化配置
  // 从现在开始，为表单逻辑props
  /* 规格来源 */  
  sourceAttributes: {
    type: Array as PropType<SourceAttriButeItem[]>,
    default: () => [],
  },
  /* 表单骨架字段 */
  skeleton: {
    type: Array as PropType<SkeletonItem[]>,
    default: () => [],
  },
  /* 已选择规格 受控(v-model:selectedAttribute) | 非受控(:selectedAttribute onUpdate:selectedAttribute) */
  selectedAttribute: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  /* 已填写规格数据 受控(v-model:sku) | 非受控(:sku onUpdate:sku) */
  sku: {
    type: Array as PropType<SkuTableItem[]>,
    default: () => [],
  },
  ...SkuFormTableProps,
}