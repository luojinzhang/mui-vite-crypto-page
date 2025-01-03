import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";
import { utils } from "../../utils";
import { formatCurrency } from "@coingecko/cryptoformat";

interface CoinDetailPriceChartProps {
  selectedMetric: keyof CryptoModel.CoinHistoricalChart;
  coinHistoricalChart: CryptoModel.CoinHistoricalChart;
  selectedTimeRange: CoinGeckoApiRequest.GetCoinHistoricalChartDataByIdRequest["days"];
}

export default function CoinDetailPriceChart({ coinHistoricalChart, selectedMetric, selectedTimeRange }: CoinDetailPriceChartProps) {
  return (
    <Box sx={{ width: "100%", height: "25rem", marginTop: "1rem", p: "0" }}>
      <LineChart
        sx={{ pl: "1rem" }}
        xAxis={[
          {
            data: coinHistoricalChart[selectedMetric].map((x) => x[0]),
            valueFormatter: (value) => (selectedTimeRange === "1" ? utils.getShortenTime(value) : utils.getShortenDateString(value)), // When time range is 1d, display time instead of date.
            domainLimit: "strict",
          },
        ]}
        yAxis={[
          {
            data: coinHistoricalChart[selectedMetric].map((x) => x[1]),
            valueFormatter: (value) => utils.getShortNumberNotation(value),
            domainLimit: "nice",
          },
        ]}
        series={[
          {
            data: coinHistoricalChart[selectedMetric].map((x) => x[1]),
            showMark: false,
            valueFormatter: (value) => (value !== null ? formatCurrency(value, "USD", "en", false, { decimalPlaces: 10, significantFigures: 6 }) : value),
            baseline: "min",
          },
        ]}
        grid={{ horizontal: true }}
      />
    </Box>
  );
}
