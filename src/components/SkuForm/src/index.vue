<script setup lang='ts'>
 import { NForm, NFormItem, NInput, NConfigProvider, NCard, NGrid, NGridItem, NCheckbox, NButton, NInputGroup, DataTableColumn, NDataTable } from 'naive-ui';
 import { ref, computed, h, unref, watchEffect, reactive } from 'vue';
 import { SkuFormProps } from '../props/index'
 import { AttributeListToDimensiona, RenderSkeletonColumn, createAttributeList, randomId } from '../utils/index';

 // types
 import { CheckedAttributeItem, DimensionaAttribute, ReactiveSourceAttriButeItem, SkuTableItem } from '../types/index'

 const emit = defineEmits<{
    (e: 'update:selectedAttribute', attributes: CheckedAttributeItem[]): void;
 }>()

 const props = defineProps(SkuFormProps);

 const attributesList = ref<ReactiveSourceAttriButeItem[]>(createAttributeList(props.sourceAttributes));

 const skuListData = ref<Record<string, any>[]>(props.sku);
  

 const handleAddAttributeChild = (attr: ReactiveSourceAttriButeItem) => {
   attr.items.push({
     name: (attr.attributeName as string),
     id: randomId(),
     checked: false, 
   })
   attr.attributeName = '';
 }

 // 按照多规格 二阶数组 生成sku 数据; 
 const createSkuTableData = () => {
    // 转化为二维数组
    const dimensionalAttributes = AttributeListToDimensiona(unref(CheckedAttribute));
  
    const resultTableData =  dimensionalAttributes.reduce((summary: DimensionaAttribute[][], attrs) => {
      const result: DimensionaAttribute[][] = [];    
      summary.forEach(v => {
         attrs.forEach(attr => {
	          result.push(v.concat(attr));
	        });
	      });
      return result;
    }, [[]])

    return resultTableData.map(attrs => {
      const result: Record<string, any> = {
		    attributes: []
		  };
		
		  attrs.forEach(attr => {
		    result.attributes.push(attr.attrId);
		    result[attr.attrId] = attr.name;
		    result[attr.attrName] = attr.name;	
		  }) 
      props.skeleton.forEach(ske => {
        result[ske.key] = ske.defaultValue || undefined;
      })
		  return result;
    })
 }


  //  相同规格名 不可添加
  const AttributeDisabled = computed(() => {
    return (attr: ReactiveSourceAttriButeItem) => !attr.attributeName || attr.items.some(item => item.name === attr.attributeName);
 })

 // 过滤出选中的所有规格

 const CheckedAttribute = computed<CheckedAttributeItem[]>(() => {
    return unref(attributesList).filter(attr => {
       return attr.items.some(child => child.checked); 
    }).map(attr => {
        return {
           name: attr.name,
           id: attr.id,
           items: attr.items.filter(item => item.checked).map(item => ({ 
              name: item.name,
              id: item.id,
            })) 
        }
    })
 })
 
 // 表格columns  
 const GetSkuFormTableColumns = computed<DataTableColumn[]>(() => {
    return [
      {
        align: props.tableAlign,
        title: '序号',
        key: 'index',
        maxWidth: 50,
        minWidth: 50,
        render: (_, rowIndex: number) => h('span', {}, rowIndex + 1),
      },
      ...unref(CheckedAttribute).map(attr => {
        let column: DataTableColumn = {
          align: props.tableAlign,
          title: attr.name,
          key: attr.id,
          maxWidth: 200,
          minWidth: 120,
          sorter: 'default', 
        }
        return column;
      }),
      ...RenderSkeletonColumn(props.skeleton),
    ]
 })

 const FormModel = computed(() => {
  console.log(unref(skuListData));
   return { sku: unref(skuListData) };
 })

 watchEffect(() => {
   emit('update:selectedAttribute', unref(CheckedAttribute));
   if(unref(CheckedAttribute).length) {
      const data = createSkuTableData();
      skuListData.value = data;
   }
 })

//  const GetSkuFOrmTableData = computed()

</script>

<template>
    <div class="sku-navie-form">
     <NConfigProvider abstract v-bind="props">

      <div class="sku-attribute-container">
        <NGrid :x-gap="20" :y-gap="20" :cols="4" >
            <NGridItem v-for="attr in attributesList" :key="attr.name" >
                <NCard :title="attr.name" :size="'small'" style="height: 100%" :segmented="{ content: true, footer: true }">
                   <NCheckbox v-for="attrChild in attr.items" :key="attrChild.id" v-model:checked="attrChild.checked">
                     {{  attrChild.name  }}
                   </NCheckbox>   
                   <template v-if="!attr.disabled" #footer>
                    <NInputGroup>
                        <NInput v-model:value="attr.attributeName" placeholder="输入规格名添加，不得重复"></NInput>
                        <NButton @click="handleAddAttributeChild(attr)" :disabled="AttributeDisabled(attr)" type="primary">添加规格</NButton>
                    </NInputGroup>
                   </template>
                </NCard>
            </NGridItem>
        </NGrid>
      </div>
      <div class="sku-structure-container">
         <NForm :model="FormModel">
            <NDataTable :columns="GetSkuFormTableColumns" :data="skuListData" size="small"></NDataTable>
         </NForm>
      </div>
     </NConfigProvider> 
    </div>
</template>

<style>
.sku-navie-form {
  margin: 12px;
  padding: 12px;
}
.sku-structure-container {
    margin-top: 20px;
}
</style>