<template>
  <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      :type="type" @click="onClick">
    {{ label }}
  </button>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Label, Type} from "@/components/core/Button/types.ts";
export default defineComponent({
  props: {
    type: {
      type: String as PropType<Type>,
      required: true,
      default: "button"
    },
    label: {
      type: String as PropType<Label>,
      required: false,
      default: false
    }
  },
  emits:['onClick'],
  methods: {
    onClick(event: Event) {
      if (event?.target) {
        this.$emit('onClick', (event.target as HTMLInputElement)?.value)
      }
    }
  }
})
</script>