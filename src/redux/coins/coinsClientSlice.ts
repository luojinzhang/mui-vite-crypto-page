import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Initial state of the client
const initialState: CryptoModel.CryptoCoinClientReducerState = {
    coinsIdMap: [],
    coinsListMarket: [],
};

// Create the slice
const coinsClientSlice = createSlice({
    name: 'coinsClientSlice',
    initialState,
    reducers: {
        setCoinsIdMap: (state, action: PayloadAction<CryptoModel.CryptoCoinIDMap[]>) => {
            state.coinsIdMap = action.payload;
        },
        setCoinsListMarket: (state, action: PayloadAction<CryptoModel.CryptoCoinMarket[]>) => {
            state.coinsListMarket = action.payload;
        },

    },
});

// Export actions
export const coinsClientSliceActions = coinsClientSlice.actions;

// Export the reducer
export default coinsClientSlice;