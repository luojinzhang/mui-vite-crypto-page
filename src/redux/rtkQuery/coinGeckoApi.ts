import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { COIN_GECKO_API_BASE_URL } from '../../constants'

const API_KEY = 'CG-4RtojGTK1gSYePKwVXQQUDiD';

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
    endpoints: (builder) => ({
        // Ping to test api
        ping: builder.query<void, void>({
            query: () => `ping`,
        }),
    }),
})

export const { usePingQuery } = coinGeckoApi