import {AnalyticMutations} from "@/store/mutations-types.ts";
import {
    AnalyticsDailySalesOverviewRequestDto,
    AnalyticsDailySalesOverviewResponseDto,
    AnalyticsDailySalesOverviewResponseItemDto, AnalyticsDailySalesSkuListItemResponseDto,
    AnalyticsDailySalesSkuListRequestDto,
    AnalyticsDailySalesSkuListResponseDto, AnalyticsGetSkuRefundRateItemResponseDto,
    AnalyticsGetSkuRefundRateRequestDto,
    AnalyticsGetSkuRefundRateResponseDto,
    AnalyticsServiceInterface
} from "@/services/ports.ts";
import {AnalyticsService} from "@/services/Analytics.ts";

const analyticService: AnalyticsServiceInterface = AnalyticsService;
const state = () => ({
    dailySalesOverview: [] as AnalyticsDailySalesOverviewResponseItemDto[],
    dailySalesSkuList : [] as AnalyticsDailySalesSkuListItemResponseDto[],
    skuRefundRateList: [] as AnalyticsGetSkuRefundRateItemResponseDto[]
});

const getters = {
    dailySalesOverview(state: any): AnalyticsDailySalesOverviewResponseDto[] {
        return state.dailySalesOverview;
    },
    dailySalesSkuList(state: any): AnalyticsDailySalesSkuListResponseDto[] {
        return state.dailySalesSkuList;
    },
    skuRefundRateList(state: any): AnalyticsGetSkuRefundRateResponseDto[] {
        return state.skuRefundRateList;
    }
}

const actions = {
    async fetchDailySalesOverview(context: any, payload: Omit<AnalyticsDailySalesOverviewRequestDto, 'marketplace' | 'sellerId'>) {
        const marketplace = context.rootGetters["user/marketplace"];
        const sellerId = context.rootGetters["user/sellerId"];
        const response = await analyticService.dailySalesOverview({
            ...payload,
            marketplace,
            sellerId,
        })
        if (response) {
            context.commit(AnalyticMutations.FETCH_DAILY_SALES_OVERVIEW, response.Data.item);
        }
    },
    async fetchDailySalesSkuList(context: any, payload: Omit<AnalyticsDailySalesSkuListRequestDto, 'marketplace' | 'sellerId'>) {
        const marketplace = context.rootGetters["user/marketplace"];
        const sellerId = context.rootGetters["user/sellerId"];
        const response = await analyticService.dailySalesSkuList({
            ...payload,
            marketplace,
            sellerId,
        })
        if (response) {
            context.commit(AnalyticMutations.FETCH_DAILY_SALES_SKU_LIST, response.Data.item.skuList);
        }
    },
    async fetchGetSkuRefundRate(context: any, payload: Omit<AnalyticsGetSkuRefundRateRequestDto, 'marketplace' | 'sellerId'>) {
        const marketplace = context.rootGetters["user/marketplace"];
        const sellerId = context.rootGetters["user/sellerId"];
        const response = await analyticService.getSkuRefundRate({
            ...payload,
            marketplace,
            sellerId,
        })
        if (response) {
            context.commit(AnalyticMutations.FETCH_GET_SKU_REFUND_RATE, response.Data);
        }
    }
}

const mutations = {
    [AnalyticMutations.FETCH_DAILY_SALES_OVERVIEW](state: any, payload: any) {
        state.dailySalesOverview = payload;
    },
    [AnalyticMutations.FETCH_DAILY_SALES_SKU_LIST](state: any, payload: any) {
        state.dailySalesSkuList = payload;
    },
    [AnalyticMutations.FETCH_GET_SKU_REFUND_RATE](state: any, payload: any) {
        state.skuRefundRateList = payload;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}