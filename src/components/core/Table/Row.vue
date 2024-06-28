<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td class="px-6 py-4" v-for="column in columns">
      <slot :name="column.key" v-bind="item"/>
    </td>
  </tr>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<any>,
    },
    columns: {
      type: Array as PropType<any>
    }
  }
})
</script>