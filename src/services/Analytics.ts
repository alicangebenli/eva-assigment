import type {
    AnalyticsDailySalesOverviewResponseDto,
    AnalyticsDailySalesOverviewResponseItemDto,
    AnalyticsServiceInterface
} from "./ports";
import http from "../shared/helper/http";

export const AnalyticsService: AnalyticsServiceInterface = {
    async dailySalesOverview(body) {
        const response = await http.post<ApiResponse<AnalyticsDailySalesOverviewResponseDto>>('/data/daily-sales-overview/', body);
        if (response.status === 200) {
            response.data.Data.item = response.data.Data.item.map(normalizers.dailySalesOverviewItemNormalize)
            return response.data;
        }
        return false
    },
    async dailySalesSkuList(body) {
        const response = await http.post('/data/daily-sales-sku-list/', body)
        if (response.status === 200) {
            return response.data;
        }
        return false
    },
    async getSkuRefundRate(body) {
        const response = await http.post('/data/get-sku-refund-rate/', body)
        if (response.status === 200) {
            return response.data;
        }
        return false
    }
}

const normalizers = {
    dailySalesOverviewItemNormalize({profit, fbaAmount, fbmAmount, fbaShippingAmount, date}: {
        profit: number,
        fbaAmount: number,
        fbmAmount: number,
        fbaShippingAmount: number,
        date: string
    }): AnalyticsDailySalesOverviewResponseItemDto {
        return {
            profit,
            fbaAmount: fbaAmount,
            fbmAmount: fbaAmount,
            fbaShippingAmount: fbaShippingAmount,
            totalSales: fbaAmount + fbmAmount,
            date
        }
    }
}