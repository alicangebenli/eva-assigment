<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3" v-for="column in headers">
         {{ column.text }}
        </th>
      </tr>
    </thead>
    <tbody>
    <Row v-for="item in items" :item="item" :columns="headers">
      <template v-slot:[column.key]="scopedSlot" v-for="column in headers" >
        <slot :name="column.key" v-bind="scopedSlot" v-if="column.scopedSlot"/>
        <template v-else>
          {{ item[column.key] }}
        </template>
      </template>
    </Row>
    </tbody>
  </table>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import Row from "@/components/core/Table/Row.vue";
import {Header} from "@/components/core/Table/types.ts";
export default defineComponent({
  components: {Row},
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      default: [
        {
          key: 'sku',
          text: 'Sku',
          scopedSlot: true
        },
        {
          key: 'productName',
          text: 'Product Name',
          scopedSlot: false
        }
      ]
    },
    items: {
      type: Array as PropType<any[]>,
      default: [
        {
          sku: 123123,
          productName: 'test test test'
        },
        {
          sku: 123123,
          productName: 'test test test'
        },
      ]
    }
  }
})
</script>