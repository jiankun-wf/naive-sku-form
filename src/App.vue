<script setup lang="ts">
 import SkuForm from './components/SkuForm';
 import { CheckedAttributeItem, SkuTableItem, SourceAttriButeItem } from './components/SkuForm/types'
 import { SkeletonItem  } from './components/SkuForm/types/skeleton'


 const sourceAttributes: SourceAttriButeItem[] = [
   { name: '颜色', id: '1', disabled: false, items: [{ name: '胭脂', id: '1-1' }, { name: '禅', id: '1-2' }, { name: '远山黛', id: '1-3' }] }, 
   { name: '内存', id: '2', disabled: false, items: [{ name: '128G', id: '128G' }, { name: '256G', id: '256G' }, { name: '512G', id: '512G' }, { name: '1T', id: '1T' }] },
   { name: '运营商', id: '3', disabled: true, items: [{ name: '电信', id: 'dx' }, { name: '联通', id: 'lt' }, { name: '移动', id: 'yd' }] }
  ]

  const sourceSkeleton: SkeletonItem[] = [
    {
      key: 'price',
      component: 'InputNumber',
      title: '商品价格',
      componentProps: {
        min: 0.01,
        showButton: false,  
        placeholder: '请输入价格',
        precision: 2,
      },
      rules: [{ required: true, message: '请输入商品价格', type: 'number', trigger: ['blur'] }],
      titleRequireMark: true,
      titleHelpMessage: '价格须大于等于0.01元',
    },
    {
      key: 'inventory',
      component: 'InputNumber',
      title: '商品库存',
      componentProps: {
        placeholder: '请输入库存',
        min: 0,
        showButton: false,  
        precision: 0,
      },
      rules: [{ required: true, message: '请输入商品库存', type: 'number', trigger: ['blur'] }],
      titleRequireMark: true,
      titleHelpMessage: '库存须大于等于0',
      defaultValue: 0,
    },
    {
      key: 'rate',
      component: 'Rate',
      title: '历史评分',
      rules: [{ required: false, message: '请选择商品评分', type: 'number', trigger: ['blur'] }],
    },
    {
      key: 'cover',
      component: 'ImageUpload',
      componentProps: {
        action: 'https://www.mocky.io/v2/5e4bafc63100007100d8b70f',
        listType: 'image-card',
        max: 1,
      },
      title: '商品图',
      rules: [{ required: true, message: '请上传商品图', type: 'array' }]
    }
  ]

  const handleUpdateSku = (val: SkuTableItem[]) => {
     console.log(val, 'sku');
  }

  const handleUpdateSelectedAttrs = (val: CheckedAttributeItem[]) => {
    console.log(val, 'select-attribute')
  }
</script>

<template>
  <SkuForm
    class="sku-form-demo"
    :source-attributes="sourceAttributes"
    :skeleton="sourceSkeleton"
    :inline-theme-disabled="true"
    @update:sku="handleUpdateSku"
    @update:selected-attribute="handleUpdateSelectedAttrs"
  ></SkuForm>
</template>

<style>
.sku-form-demo {
  width: 75%;
  margin: 0 auto;
}
</style>