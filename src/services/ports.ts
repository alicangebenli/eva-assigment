//OAuth
export type OAuthTokenReqeustDto = {
    Email: Email,
    Password: string,
    GrantType: string,
    Scope: string,
    ClientId: string,
    ClientSecret: string,
    RedirectUri: AbsolutePath
}
export type OAuthTokenResponseDto = {
    "AccessToken": string,
    "RefreshToken": string,
    "TokenType": string,
    "ExpiresAt": string
}

export interface OAuthServiceInterface {
    token(body: OAuthTokenReqeustDto): Promise<false | ApiResponse<OAuthTokenResponseDto>>
}

// Analytics
/* Daily Sales Overview */
export type AnalyticsDailySalesOverviewRequestDto = {
    "marketplace": string,
    "sellerId": string,
    "requestStatus": string,
    "day": number,
    "excludeYoYData": boolean
}
export type AnalyticsDailySalesOverviewResponseItemDto = {
    profit: number,
    fbaAmount: number,
    fbmAmount: number,
    fbaShippingAmount: number,
    totalSales: number,
    date: string
}
export type AnalyticsDailySalesOverviewResponseDto = {
    Curreny: string,
    item: AnalyticsDailySalesOverviewResponseItemDto[],
    isYoyExist: string
}
/* Daily Sales Sku List */
export type AnalyticsDailySalesSkuListRequestDto = {
    "marketplace": string,
    "sellerId": string,
    "salesDate": string,
    "salesDate2": string,
    "pageSize": number,
    "pageNumber": number,
    "isDaysCompare": number
}
export type AnalyticsDailySalesSkuListItemResponseDto = {
    sku: string,
    productName: string,
    qty: number,
    shippingAmount: number,
    amount: number,
    refundPercantage: number,
    qty2: number,
    amount2: number
}
export type AnalyticsDailySalesSkuListResponseDto = {
    Curreny: string,
    item: {
        selectedDate: string,
        TotalSale: number,
        skuList: AnalyticsDailySalesSkuListItemResponseDto[],
        seletedDate2: string,
        TotalSale2: number
    }
}
/* Get Sku Refund Rate */
export type AnalyticsGetSkuRefundRateRequestDto = {
    "marketplace": string,
    "sellerId": string,
    "skuList": string[],
    "requestedDay": number
}
export type AnalyticsGetSkuRefundRateItemResponseDto = {
    refundAmount: number,
    refundQuantity: number,
    refundRate: number,
    sku: string,
    totalOrderCount:number
}
export type AnalyticsGetSkuRefundRateResponseDto = AnalyticsGetSkuRefundRateItemResponseDto[]
export interface AnalyticsServiceInterface {
    dailySalesOverview(body: AnalyticsDailySalesOverviewRequestDto): Promise<false | ApiResponse<AnalyticsDailySalesOverviewResponseDto>>

    dailySalesSkuList(body: AnalyticsDailySalesSkuListRequestDto): Promise<false | ApiResponse<AnalyticsDailySalesSkuListResponseDto>>

    getSkuRefundRate(body: AnalyticsGetSkuRefundRateRequestDto): Promise<false | ApiResponse<AnalyticsGetSkuRefundRateResponseDto>>
}

// User
export type UserInformationRequestDto = {
    email: Email
}
export type UserLogoutResponseDto = string
export type UserInformationResponseDto = {
    "token": string,
    "user": {
        firstName: string,
        lastName: string,
        email: string,
        countryCode: string,
        callingCode: string,
        telephoneNumber: string,
        isAdmin: string,
    },
    "remainingReimbursementCredit": number,
    "monthlyReimbursementPackageCredit": number,
    "packageInformation": {
        "turnoverPackageInformation": {
            "pricingStatus": number,
            "packageName": string,
            "monthlyFee": number,
            "lowerLimit": number,
            "upperLimit": number,
            "reimbursementCredit": number
        },
        "skuPackageInformation": {
            "packageName": string,
            "skuChargeFee": number
        }
    },
    "isLinkAccount": boolean,
    "linkAccountParameters": {
        "developerName": string,
        "accountNumber": string
    },
    store: { storeId: string, "marketplaceName": string }[]
}

export interface UserServiceInterface {
    logout(): Promise<boolean | ApiResponse<UserLogoutResponseDto>>

    information(body: UserInformationRequestDto): Promise<boolean | ApiResponse<UserInformationResponseDto>>
}

// LocalStorage
export interface LocalStorageServiceInterface {
    setItem<T>(name: string, item: T): void

    getItem<T>(name: string): T
}