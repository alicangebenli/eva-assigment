import {useStore} from "vuex";
import {AnalyticsDailySalesOverviewRequestDto, AnalyticsDailySalesOverviewResponseItemDto} from "@/services/ports.ts";
import {computed, ComputedRef, ref, watch} from "vue";

export enum PERIODS {
    TWOMONTH = 60,
    ONEMONTH = 30,
    TWOWEEK = 14,
    ONEWEEK = 7
}

export default function useDailySalesAnalytic() {
    const store = useStore();
    const dailySalesOverviewItems: ComputedRef<AnalyticsDailySalesOverviewResponseItemDto[]> = computed(() => store.getters["analytics/dailySalesOverview"])
    const totalSales = computed(() => dailySalesOverviewItems.value?.map(
        (item: AnalyticsDailySalesOverviewResponseItemDto) => item.totalSales
    ));
    const fbmAmounts = computed(() => dailySalesOverviewItems.value?.map(
        (item: AnalyticsDailySalesOverviewResponseItemDto) => item.fbmAmount
    ));
    const fbaAmounts = computed(() => dailySalesOverviewItems.value?.map(
        (item: AnalyticsDailySalesOverviewResponseItemDto) => item?.fbaAmount
    ));
    const dates = computed(() => dailySalesOverviewItems.value?.map(
        (item: AnalyticsDailySalesOverviewResponseItemDto) => item?.date
    ));
    const period = ref(PERIODS.TWOMONTH)
    const isLoading = ref();

    async function fetchDailySalesOverview() {
        isLoading.value = true;
        const requestBody: Omit<AnalyticsDailySalesOverviewRequestDto, 'marketplace' | 'sellerId'> = {
            "requestStatus": "()",
            "day": period.value,
            "excludeYoYData": true
        }

        await store.dispatch('analytics/fetchDailySalesOverview', requestBody)
        isLoading.value = false;
    }

    function findDailySalesItemByDate(date: string) {
        return dailySalesOverviewItems.value.find(x => x.date === date)
    }

    watch(period, () => {
        fetchDailySalesOverview()
    }, {immediate: true})

    return {
        fetchDailySalesOverview,
        totalSales,
        fbmAmounts,
        fbaAmounts,
        period,
        isLoading,
        dates,
        dailySalesOverviewItems,
        findDailySalesItemByDate
    }
}