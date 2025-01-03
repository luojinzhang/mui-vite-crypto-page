import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material";
import React from "react";

const PriceChangeTableHeaderCell = styled(TableCell)({
  borderRight: "1px solid rgba(0,0,0,0.2)",
  backgroundColor: "#f1f5f9",
  p: 0,
});

const PriceChangeTableBodyCell = styled(TableCell)({
  p: {
    xs: "0rem",
    sm: "0.1rem",
    md: "0.3rem",
    lg: "0.5rem",
  },
  borderRight: "1px solid rgba(0,0,0,0.2)",
});

interface CoinDetailPriceChangeTableProps {
  coinData: CryptoModel.Coin | null;
}

export default function CoinDetailPriceChangeTable({ coinData }: CoinDetailPriceChangeTableProps) {
  return (
    <TableContainer component="div" sx={{ borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.2)" }}>
      <Table sx={{ width: "100%", borderRadius: "1rem", borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            <PriceChangeTableHeaderCell align="center">1h</PriceChangeTableHeaderCell>
            <PriceChangeTableHeaderCell align="center">24h</PriceChangeTableHeaderCell>
            <PriceChangeTableHeaderCell align="center">7d</PriceChangeTableHeaderCell>
            <PriceChangeTableHeaderCell align="center">14d</PriceChangeTableHeaderCell>
            <PriceChangeTableHeaderCell align="center">30d</PriceChangeTableHeaderCell>
            <PriceChangeTableHeaderCell align="center" sx={{ borderRight: "0px transparent" }}>
              1y
            </PriceChangeTableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <PriceChangeTableBodyCell
            align="center"
            sx={{
              color: coinData?.market_data.price_change_percentage_1h_in_currency.usd && coinData?.market_data.price_change_percentage_1h_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_1h_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>

          <PriceChangeTableBodyCell
            align="center"
            sx={{
              color: coinData?.market_data.price_change_percentage_24h_in_currency.usd && coinData?.market_data.price_change_percentage_24h_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_24h_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>

          <PriceChangeTableBodyCell
            align="center"
            sx={{
              color: coinData?.market_data.price_change_percentage_7d_in_currency.usd && coinData?.market_data.price_change_percentage_7d_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_7d_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>

          <PriceChangeTableBodyCell
            align="center"
            sx={{
              borderRight: "1px solid rgba(0,0,0,0.2)",
              color: coinData?.market_data.price_change_percentage_14d_in_currency.usd && coinData?.market_data.price_change_percentage_14d_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_14d_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>

          <PriceChangeTableBodyCell
            align="center"
            sx={{
              color: coinData?.market_data.price_change_percentage_30d_in_currency.usd && coinData?.market_data.price_change_percentage_30d_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_30d_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>

          <PriceChangeTableBodyCell
            align="center"
            sx={{
              borderRight: "0px transparent",
              color: coinData?.market_data.price_change_percentage_1y_in_currency.usd && coinData?.market_data.price_change_percentage_1y_in_currency.usd > 0 ? "green" : "red",
            }}
          >
            {coinData?.market_data.price_change_percentage_1y_in_currency.usd !== null ? `${coinData?.market_data.price_change_percentage_1y_in_currency.usd.toFixed(2)}%` : "-"}
          </PriceChangeTableBodyCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
