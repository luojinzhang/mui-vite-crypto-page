namespace CoinGeckoApiRequest {
  export type GetCoinsListIdMapRequest = {
    include_platform?: boolean;
    status?: string;
  };

  export type GetCoinsListWithMarketDataRequest = {
    vs_currency: string;
    ids?: string;
    category?: string;
    order?: "market_cap_desc" | "market_cap_asc" | "volumn_asc" | "volumn_desc" | "id_asc" | "id_desc";
    per_page?: number;
    page?: number;
    sparkline?: boolean;
    price_change_percentage?: string;
    locale?: string;
    precision?: string;
  };

  export type GetCoinDataByIdRequest = {
    id: string;
    localization?: boolean;
    tickers?: boolean;
    market_data?: boolean;
    community_data?: boolean;
    developer_data?: boolean;
    sparkline?: boolean;
  };

  export type GetCoinHistoricalChartDataByIdRequest = {
    id: string;
    vs_currency: string;
    days: "1" | "30" | "90" | "365"; // Maximum 365 for free plan.
    interval?: string;
    precision?: string;
  };
}
