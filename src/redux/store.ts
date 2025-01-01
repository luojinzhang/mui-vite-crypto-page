import { configureStore } from '@reduxjs/toolkit'
import { coinGeckoApi } from './rtkQuery/coinGeckoApi'
import coinsClientSlice from './coins/coinsClientSlice'

export const store = configureStore({
    reducer: { 
        [coinGeckoApi.reducerPath]: coinGeckoApi.reducer, 
        [coinsClientSlice.name]: coinsClientSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinGeckoApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch