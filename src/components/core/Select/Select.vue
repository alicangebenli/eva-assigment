<template>
  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" v-if="label">{{
      label
    }}</label>
  <select
      @change="onSelect"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option :key="option.value" :value="option.value" :selected="option.selected" v-for="option in options">
      {{ option.text }}
    </option>
  </select>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from 'vue'
import {Option, Label} from "./types.ts"

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<Option>,
      required: true,
      default: () => [{
        value: 'test',
        text: 'test',
        selected: false
      }]
    },
    label: {
      type: String as PropType<Label>,
      required: false,
      default: ""
    }
  },
  emits: ['onSelect'],
  methods: {
    onSelect(event: Event) {
      if (event?.target) {
        this.$emit('onSelect', (event.target as HTMLInputElement)?.value)
      }
    }
  }
})
</script>