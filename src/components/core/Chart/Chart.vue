<template>
  <highcharts :options="getProps"></highcharts>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from 'vue'
import {Chart, PlotOptions, Title, XAxis, YAxis, Tooltip} from "@/components/core/Chart/types.ts";

export default defineComponent({
  props: {
    chart: {
      type: Object as PropType<Chart>,
      required: true,
    },
    title: {
      type: Object as PropType<Title>,
      required: false,
    },
    xAxis: {
      type: Object as PropType<XAxis>,
      required: false,
    },
    yAxis: {
      type: Object as PropType<YAxis>
    },
    plotOptions: {
      type: Object as PropType<PlotOptions>
    },
    tooltip: {
      type: Object as PropType<Tooltip>
    },
    series: {
      type: Array
    },
  },
  emits: ['onClickColumn'],
  methods: {
    onClickColumn(event: Event) {
      if (event?.target) {
        this.$emit('onClickColumn', (event.target as HTMLInputElement)?.value)
      }
    }
  },
  computed: {
    getProps() {
      const props = this.$props;
      return {
        ...props,
        accessibility: {enabled: false},
        plotOptions: {
          ...props.plotOptions,
          column: {
            ...props.plotOptions?.column,
            events: {
              click: (event: any) => {
                this.$emit('onClickColumn', event.point)
              }
            }
          }
        }
      }
    }
  }
})
</script>
<style lang="scss">
:deep(.highcharts-series) {
  cursor: pointer;
}
.highcharts-series {
  cursor: pointer;
}
</style>