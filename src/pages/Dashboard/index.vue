<script setup lang="ts">
import {computed, ref} from "vue";
import Chart from "@/components/core/Chart/Chart.vue";
import Select from "@/components/core/Select/Select.vue";
import Table from "@/components/core/Table/Table.vue";
import Pagination from "@/components/core/Pagination/Pagination.vue";
import ChartSkeleton from "@/components/skeletons/ChartSkeleton.vue";

import useDailySalesAnalytic, {PERIODS} from "@/application/useDailySalesAnalytic.ts";
import useDailySalesSkuListAnalytic from "@/application/useDailySalesSkuListAnalytic.ts";
import {Header} from "@/components/core/Table/types.ts";

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Daily Sales',
      align: 'left'
    },
    xAxis: {
      categories: dates.value
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Amount ($)'
      }
    },
    tooltip: {
      formatter() {
        //@ts-ignore
        const item = findDailySalesItemByDate(this.key);

        return `<b>Total Sales:</b> ${item?.totalSales}<br />
                <b>Shipping:</b> ${item?.fbaShippingAmount} <br />
                <b>Profit:</b> ${item?.profit} <br />
                <b>FBA Sales:</b> ${item?.fbaAmount} <br />
                <b>FBM Sales:</b> ${item?.fbmAmount} <br />`
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      }
    },
    series: [
      {
        name: 'Profit',
        data: totalSales.value,
        stack: 'Europe',
      },
      {
        name: 'FBA Sales',
        data: fbaAmounts.value,
        stack: 'Europe'
      },
      {
        name: 'FBM Sales',
        data: fbmAmounts.value,
        stack: 'Europe'
      }
    ]
  }
});
const periods = [
  {value: PERIODS.ONEWEEK, text: 'Last 7 Days', selected: false},
  {value: PERIODS.TWOWEEK, text: 'Last 14 Days', selected: false},
  {value: PERIODS.ONEMONTH, text: 'Last 30 Days', selected: false},
  {value: PERIODS.TWOMONTH, text: 'Last 60 Days', selected: true},
] as Header[];
const {
  fbmAmounts,
  fbaAmounts,
  totalSales,
  isLoading,
  dates,
  period,
  findDailySalesItemByDate,
  dailySalesOverviewItems,
} = useDailySalesAnalytic();

const {
  selectedSeries,
  comparedData,
  currentPage,
  isVisible
} = useDailySalesSkuListAnalytic()


const headers = ref([
  {key: 'sku', text: 'SKU'},
  {key: 'productName', text: 'Prdocut Name'},
  {key: 'refundRate', text: 'Refund Rate'}]
)
</script>

<template>
  <div class="pt-12">
    <div class="ml-auto w-max">
      <Select :options="periods" @onSelect="period = $event"/>
    </div>
    <div class="mb-2"></div>
    <Chart
        v-bind="chartOptions"
        v-if="!isLoading"
        @onClickColumn="(point)=> {
          selectedSeries.length>1 ?
          (
              selectedSeries[1] = selectedSeries[0],
              selectedSeries[0] = dailySalesOverviewItems[point.index]
          ) :
          selectedSeries.push(dailySalesOverviewItems[point.index])
        }"/>
    <ChartSkeleton v-else/>
    <div class="mb-2"></div>
    <Table :items="comparedData" :headers="headers" v-if="isVisible">
      <template v-slot:sku="item">
        {{ item.sku }}
      </template>
      <template v-slot:productName="item">
        {{ item.productName }}
      </template>
    </Table>
    <div class="mb-2"></div>
    <Pagination class-name="ml-auto" :total-page="5" @onChange="currentPage = $event" v-if="isVisible"/>
  </div>
</template>
