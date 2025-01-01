import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COIN_GECKO_API_BASE_URL } from '../../constants';

const API_KEY = 'CG-BDHzSjF5BMUr6nKKmbUx5KZe';
// const API_KEY = 'CG-4RtojGTK1gSYePKwVXQQUDiD';

export const coinGeckoApi = createApi({
    reducerPath: 'coinGeckoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COIN_GECKO_API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            headers.set("x_cg_demo_api_key", API_KEY);
            return headers;
        },
    }),
    tagTypes: ['CryptoCoinsIDMap', 'CryptoCoinsListMarketData'],
    endpoints: (builder) => ({
        // Ping to test api
        ping: builder.query<void, void>({
            query: () => ({ url: `ping`, method: 'GET' }),
        }),
        // This endpoint allows you to query all the supported coins on CoinGecko with coins id, name and symbol.
        getCoinsList: builder.query<CryptoModel.CryptoCoinIDMap[], CoinGeckoApiRequest.GetCoinsListIdMapRequest | void>({
            query: (params) => ({
                url: `coins/list`,
                method: 'GET',
                params: params ? params : undefined,
            }),
            providesTags: ['CryptoCoinsIDMap']
        }),
        // This endpoint allows you to query all the supported coins with price, market cap, volume and market related data.
        getCoinsListWithMarketData: builder.query<CryptoModel.CryptoCoinMarket[], CoinGeckoApiRequest.GetCoinsListWithMarketDataRequest | void>({
            query: (params) => ({
                url: `coins/markets`,
                method: 'GET',
                params: params ? params : { vs_currency: 'usd' },
            }),
            providesTags: ['CryptoCoinsListMarketData']
        }),
    }),
})

export const { usePingQuery, useGetCoinsListQuery, useGetCoinsListWithMarketDataQuery, useLazyGetCoinsListWithMarketDataQuery } = coinGeckoApi