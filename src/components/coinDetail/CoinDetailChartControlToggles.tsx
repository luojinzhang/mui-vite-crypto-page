import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

interface CoinDetailChartControlTogglesProps {
  selectedMetric: keyof CryptoModel.CoinHistoricalChart;
  selectedTimeRange: CoinGeckoApiRequest.GetCoinHistoricalChartDataByIdRequest["days"];
  onChangeMetric: (event: React.MouseEvent<HTMLElement>, newMetric: keyof CryptoModel.CoinHistoricalChart) => void;
  onChangeTimeRange: (event: React.MouseEvent<HTMLElement>, newDays: CoinGeckoApiRequest.GetCoinHistoricalChartDataByIdRequest["days"]) => void;
}

export default function CoinDetailChartControlToggles({ onChangeMetric, onChangeTimeRange, selectedMetric, selectedTimeRange }: CoinDetailChartControlTogglesProps) {
  return (
    <Stack
      gap="1rem"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column", // column direction for small screens
          sm: "row", // row direction for larger screens
        },
        padding: "1rem 1rem 0rem 1rem",
      }}
    >
      <ToggleButtonGroup value={selectedMetric} exclusive onChange={onChangeMetric} color="primary">
        <ToggleButton value="prices">Price</ToggleButton>
        <ToggleButton value="market_caps">Market Cap</ToggleButton>
        <ToggleButton value="total_volumes">Volume</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={selectedTimeRange} exclusive onChange={onChangeTimeRange} color="primary">
        <ToggleButton value="1">24H</ToggleButton>
        <ToggleButton value="30">1M</ToggleButton>
        <ToggleButton value="90">3M</ToggleButton>
        <ToggleButton value="365">1Y</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
