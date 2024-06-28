<template>
  <nav :class="className" class="w-max">
    <ul class="inline-flex -space-x-px text-sm">
      <li @click="currentPage > 1 && (currentPage -= 1)">
        <a class="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg">
          Previous
        </a>
      </li>
      <li v-for="i in totalPage">
        <a @click="currentPage = i"
           class="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300"
           :class="{'text-blue-600 bg-blue-50': currentPage === i, 'text-gray-500 bg-white' : currentPage !== i}"
        >
          {{ i }}
        </a>
      </li>
      <li>
        <a @click="currentPage < totalPage && (currentPage += 1)"
           class="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    totalPage: {
      type: Number,
      required: false,
      default: 0
    },
    className: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  emits: ['onChange'],
  watch: {
    currentPage() {
      this.$emit('onChange', this.currentPage)
    }
  }
})
</script>