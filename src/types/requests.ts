namespace CoinGeckoApiRequest {
    export type GetCoinsListIdMapRequest = {
        include_platform?: boolean;
        status?: string;
    }

    export type GetCoinsListWithMarketDataRequest = {
        vs_currency: string;
        ids?: string;
        category?: string;
        order?: 'market_cap_desc' | 'market_cap_asc' | 'volumn_asc' | 'volumn_desc' | 'id_asc' | 'id_desc';
        per_page?: number;
        page?: number;
        sparkline?: boolean;
        price_change_percentage?: string;
        locale?: string;
        precision?: string;
    }
}