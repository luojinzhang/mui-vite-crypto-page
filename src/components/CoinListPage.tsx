import React from "react";
import { CryptoTable } from ".";
import { Box } from "@mui/material";
import PinnedCoinCardList from "./pinnedCoin/PinnedCoinCardList";

export default function CoinListPage() {
  return (
    <Box sx={{ padding: "1rem" }}>
      <h1 style={{ paddingLeft: "1rem" }}>All Cryptocurrencies</h1>
      <PinnedCoinCardList />
      <CryptoTable />
    </Box>
  );
}
