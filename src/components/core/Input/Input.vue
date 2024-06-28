<template>
  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
    {{ label }}
  </label>
  <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="type" :placeholder="placeholder"
      @input="onChange"
      :value="defaultValue"
  >
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {DefaultValue, Label, Placeholder, Type} from "@/components/core/Input/types.ts";
export default defineComponent({
  props: {
    label: {
      type: String as PropType<Label>,
      required: false
    },
    placeholder: {
      type: String as PropType<Placeholder>,
      required: false
    },
    type: {
      type: String as PropType<Type>,
      required: false
    },
    defaultValue: {
      type: String as PropType<DefaultValue>,
      required: false
    }
  },
  emits: ['onChange'],
  methods: {
    onChange(event: Event) {
      this.$emit('onChange', event)
    }
  }
})
</script>