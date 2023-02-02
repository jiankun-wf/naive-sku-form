<script setup lang='ts'>
 import { 
   NForm, 
   NInput, 
   NConfigProvider, 
   NCard, 
   NGrid, 
   NGridItem, 
   NCheckbox, 
   NButton, 
   NInputGroup, 
   DataTableColumn, 
   NDataTable, 
 } from 'naive-ui';
 import { ref, computed, h, unref, watch } from 'vue';
 import { SkuFormProps } from '../props/index'
 import { AttributeListToDimensiona, RenderSkeletonColumn, createAttributeList, randomId } from '../utils/index';

 // types
 import type { FormItemRule, FormValidationError } from 'naive-ui';
 import { CheckedAttributeItem, DimensionaAttribute, ReactiveSourceAttriButeItem, SkuTableItem } from '../types/index'
 import { v4 } from 'uuid';
 import { CreateRowKey } from 'naive-ui/es/data-table/src/interface';

 const emit = defineEmits<{
    (e: 'update:selectedAttribute', attributes: CheckedAttributeItem[]): void;
    (e: 'update:sku', skuData: SkuTableItem[] ): void;
 }>()

 const props = defineProps(SkuFormProps);

 const attributesList = ref<ReactiveSourceAttriButeItem[]>(createAttributeList(props.sourceAttributes));

 const skuListData = ref<SkuTableItem[]>(props.sku);

 const skuFormRef = ref<any>(null);
  

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
      const result: SkuTableItem = {
		    attributes: []
		  };
		
		  attrs.forEach(attr => {
		    result.attributes = [ ...result.attributes, attr.attrId ];
		    result[attr.attrId] = attr.name;
		    result[attr.attrName] = attr.name;	
		  }) 
      props.skeleton.forEach(ske => {
        result[ske.key] = ske.defaultValue;
      })
      result.id = v4();
		  return result;
    })
 }

 // RowKey  
 const createTableRowKey: CreateRowKey<any> = (rowData: any) => {
  return rowData[props.tableRowKey];
 }
 // ConfigProvider 配置
 const GetConfigProviderProps = computed(() => {
   return {
     themeOverrides: props.themeOverrides,
     clsPrefix: props.clsPrefix,
     breakpoints: props.breakpoints,
     theme: props.theme,
     inlineThemeDisabled: props.inlineThemeDisabled,
     tag: props.tag,
   }
 })

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
 //  绑定的表单 
 const FormModel = computed(() => {
  console.log(unref(skuListData));
   return { sku: unref(skuListData) };
 })

 watch(() =>CheckedAttribute, () => {
   emit('update:selectedAttribute', unref(CheckedAttribute));
   if(unref(CheckedAttribute).length) {
      const data = createSkuTableData();
      skuListData.value = data;
   } else {
      skuListData.value = [{
        attributes: []
      }]  
   }
 }, { deep: true })

 watch(() => FormModel, () => {
    emit('update:sku', unref(FormModel).sku);
 }, { deep: true })

//  暴漏验证方法
defineExpose({
  validate(validateCallback?: (errors?: FormValidationError[]) => void, shouldRuleBeApplied?:(rule: FormItemRule ) => boolean ){
    return unref(skuFormRef)?.validate(validateCallback, shouldRuleBeApplied)
  },
  restoreValidation(): void{
    return unref(skuFormRef)?.restoreValidation();  
  }
})

</script>

<template>
    <div class="sku-navie-form">
     <NConfigProvider abstract v-bind="GetConfigProviderProps">
      <!-- 头部 -->
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
      <!-- 表格表单 -->
      <div class="sku-structure-container">
         <NForm ref="skuFormRef" :model="FormModel">
            <NDataTable 
              :row-key="createTableRowKey" 
              :columns="GetSkuFormTableColumns" 
              :bordered="props.tableBordered"
              :single-line="props.tableSingleLine"
              :data="skuListData" 
              size="small"
            ></NDataTable>
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