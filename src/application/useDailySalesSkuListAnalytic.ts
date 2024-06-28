import {useStore} from "vuex";
import {
    AnalyticsDailySalesOverviewResponseItemDto,
    AnalyticsDailySalesSkuListItemResponseDto,
    AnalyticsDailySalesSkuListRequestDto,
    AnalyticsGetSkuRefundRateItemResponseDto,
    AnalyticsGetSkuRefundRateRequestDto,
} from "@/services/ports.ts";
import {computed, ComputedRef, Ref, ref, watch} from "vue";

export default function useDailySalesSkuListAnalytic() {
    const store = useStore();
    const isLoading: Ref<boolean> = ref(false);
    const currentPage: Ref<number> = ref(1);
    const selectedSeries: Ref<AnalyticsDailySalesOverviewResponseItemDto[]> = ref([]);
    const dailySaleSkuList: ComputedRef<AnalyticsDailySalesSkuListItemResponseDto[]> = computed(() => store.getters["analytics/dailySalesSkuList"] || []);
    const skuRefundRateList: ComputedRef<AnalyticsGetSkuRefundRateItemResponseDto[]> = computed(() => store.getters["analytics/skuRefundRateList"] || []);
    const comparedData: ComputedRef<(AnalyticsDailySalesSkuListItemResponseDto & AnalyticsGetSkuRefundRateItemResponseDto)[]> = computed(
        () => {
            return dailySaleSkuList.value.map(item => {
                return {
                    ...item,
                    ...skuRefundRateList.value.find(rateItem => rateItem.sku === item.sku)
                }
            }) as (AnalyticsDailySalesSkuListItemResponseDto & AnalyticsGetSkuRefundRateItemResponseDto)[]
        }
    )
    const showedData = computed(() => {
        return comparedData.value.slice(((currentPage.value % 3) - 1) * 10, (currentPage.value % 3) * 10)
    })
    const apiPageNumber = computed(() => {
        return  Math.floor(((currentPage.value - 1) / 3) + 1);
    });
    const isVisible = ref(false);
    async function fetchDailySalesSkuList() {
        isLoading.value = true;
        const requestBody: Omit<AnalyticsDailySalesSkuListRequestDto, 'marketplace' | 'sellerId'> = {
            isDaysCompare: 0,
            pageNumber: apiPageNumber.value,
            pageSize: 30,
            salesDate: selectedSeries.value?.[0]?.date || "",
            salesDate2: selectedSeries.value?.[1]?.date || ""
        }

        await store.dispatch('analytics/fetchDailySalesSkuList', requestBody)
        isLoading.value = false;
        isVisible.value = true;
    }

    async function fetchSkuRefundRateList() {
        if (dailySaleSkuList.value.length === 0) {
            return
        }
        const requestBody: Omit<AnalyticsGetSkuRefundRateRequestDto, 'marketplace' | 'sellerId'> = {
            "skuList": dailySaleSkuList.value.map(x => x.sku),
            "requestedDay": 0
        }

        await store.dispatch('analytics/fetchGetSkuRefundRate', requestBody)
    }


    watch(() => [selectedSeries.value, apiPageNumber.value], async () => {
        isLoading.value = true;
        await fetchDailySalesSkuList();
        await fetchSkuRefundRateList();
        isLoading.value = false;
    }, {deep: true})
    return {
        selectedSeries,
        currentPage,
        fetchDailySalesSkuList,
        dailySaleSkuList,
        isLoading,
        skuRefundRateList,
        comparedData: showedData,
        isVisible
    }
}