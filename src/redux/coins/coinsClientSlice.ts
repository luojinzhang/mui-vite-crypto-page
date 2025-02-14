import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state of the client
const initialState: CryptoModel.CryptoCoinClientReducerState = {
  coinsIdMap: [],
  coinsListMarket: [],
  pinnedCoinList: [],
};

// Create the slice
const coinsClientSlice = createSlice({
  name: "coinsClientSlice",
  initialState,
  reducers: {
    setCoinsIdMap: (state, action: PayloadAction<CryptoModel.CryptoCoinIDMap[]>) => {
      state.coinsIdMap = action.payload;
    },
    setCoinsListMarket: (state, action: PayloadAction<CryptoModel.CryptoCoinMarket[]>) => {
      state.coinsListMarket = action.payload;
    },
    addPinnedCoin: (state, action: PayloadAction<CryptoModel.CryptoCoinMarket>) => {
      // Check whether payload is in the pinned list
      let index = state.pinnedCoinList.findIndex(x => x.id === action.payload.id);

      // If not in pinned list, add in
      if (index < 0) {
        state.pinnedCoinList.push(action.payload);
      }
    },
    removePinnedCoin: (state, action: PayloadAction<CryptoModel.CryptoCoinMarket>) => {
      // Check whether payload is in the pinned list
      let index = state.pinnedCoinList.findIndex(x => x.id === action.payload.id);

      // If is in the list, remove it
      if (index > -1) {
        state.pinnedCoinList.splice(index, 1);
      }
    },

  },
});

// Export actions
export const coinsClientSliceActions = coinsClientSlice.actions;

// Export the reducer
export default coinsClientSlice;
