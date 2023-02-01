<script setup lang="ts">
 import { h } from 'vue';
 import SkuForm from './components/SkuForm';
 import { SourceAttriButeItem } from './components/SkuForm/types'
 import { SkeletonItem  } from './components/SkuForm/types/skeleton'
 import { NGradientText } from 'naive-ui';


 const sourceAttributes: SourceAttriButeItem[] = [
   { name: '颜色', id: '1', disabled: false, items: [{ name: '胭脂', id: '1-1' }, { name: '禅', id: '1-2' }, { name: '远山黛', id: '1-3' }] }, 
   { name: '内存', id: '2', disabled: false, items: [{ name: '128G', id: '128G' }, { name: '256G', id: '256G' }, { name: '512G', id: '512G' }, { name: '1T', id: '1T' }] },
   { name: '运营商', id: '3', disabled: true, items: [{ name: '电信', id: 'dx' }, { name: '联通', id: 'lt' }, { name: '移动', id: 'yd' }] }
  ]

  const sourceSkeleton: SkeletonItem[] = [
    {
      key: 'price',
      component: 'InputNumber',
      title() {
        return h(
          'div',
          {  },
          [
            h(NGradientText, { type: 'error' }, '*'),
            h('span', { style: { marginLeft: '4px' } }, '价格'),
          ]
        )
      },
      componentProps: {
        min: 0.01,
        showButton: false,  
        placeholder: '请输入价格',
        precision: 2,
      },
      rules: [{ required: true, message: '价格须大于等于0.01元', type: 'number', trigger: ['blur'] }]
    },
    {
      key: 'inventory',
      component: 'InputNumber',
      title() {
        return h(
          'div',
          {  },
          [
            h(NGradientText, { type: 'error' }, '*'),
            h('span', { style: { marginLeft: '4px' } }, '库存'),
          ]
        )
      },
      componentProps: {
        placeholder: '请输入库存',
        min: 0,
        showButton: false,  
        precision: 0,
      },
      rules: [{ required: true, message: '库存须大于等于0', type: 'number', trigger: ['blur'] }]
    },
  ]
</script>

<template>
  <SkuForm
    class="sku-form-demo"
    :source-attributes="sourceAttributes"
    :skeleton="sourceSkeleton"
  ></SkuForm>
</template>

<style>
.sku-form-demo {
  width: 75%;
  margin: 0 auto;
}
</style>