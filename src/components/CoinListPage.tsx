import React from "react";
import { CryptoTable } from ".";

export default function CoinListPage() {
  return (
    <>
      <h1 style={{ marginLeft: "1rem" }}>All Cryptocurrencies</h1>
      <CryptoTable />
    </>
  );
}
