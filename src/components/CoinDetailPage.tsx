import React from "react";
import { useParams } from "react-router-dom";
import { useLazyGetCoinDataByIdQuery, useLazyGetCoinHistoricalChartDataByIdQuery } from "../redux/rtkQuery/coinGeckoApi";
import { Avatar, Box, Grid2, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { utils } from "../utils";

export default function CoinDetailPage() {
  const { coinId } = useParams<{ coinId: string }>();
  const [fetchCoinDataById, { isFetching: isFetchingCoinData }] = useLazyGetCoinDataByIdQuery();
  const [fetchCoinChartById, { isFetching: isFetchingCoinChart }] = useLazyGetCoinHistoricalChartDataByIdQuery();
  const [coinData, setCoinData] = React.useState<CryptoModel.Coin | null>(null);
  const [coinHistoricalChart, setCoinHistoricalChart] = React.useState<CryptoModel.CoinHistoricalChart>({
    market_caps: [],
    prices: [],
    total_volumes: [],
  });

  // Selected chart: prices/market_caps/total_volumes
  const [selectedMetric, setSelectedMetric] = React.useState<keyof CryptoModel.CoinHistoricalChart>("prices");

  // Selected time range: 24h/1m/3m/1y
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<CoinGeckoApiRequest.GetCoinHistoricalChartDataByIdRequest["days"]>("30");

  const handleChartMetricChange = (event: React.MouseEvent<HTMLElement>, newMetric: keyof CryptoModel.CoinHistoricalChart) => {
    if (newMetric !== null) {
      setSelectedMetric(newMetric);
    }
  };

  const handleChartTimeRangeChange = (event: React.MouseEvent<HTMLElement>, newDays: CoinGeckoApiRequest.GetCoinHistoricalChartDataByIdRequest["days"]) => {
    if (newDays !== null) {
      setSelectedTimeRange(newDays);
    }
  };

  // Fetch coin data by id
  React.useEffect(() => {
    if (coinId && !isFetchingCoinData) {
      fetchCoinDataById({ id: coinId, community_data: false, developer_data: false, localization: false, market_data: true, sparkline: false, tickers: false }).then((response) => {
        if (response.error) {
          console.error(response.error);
          return;
        }

        if (response.data) {
          setCoinData(response.data);
        }
      });
    }
  }, [coinId]);

  // API Limitation, wait for the last api to be finished before calling another.
  // Fetch coin historical chart data by id
  React.useEffect(() => {
    if (coinData && !isFetchingCoinChart) {
      fetchCoinChartById({ id: coinData.id, vs_currency: "usd", days: selectedTimeRange }).then((response) => {
        if (response.error) {
          console.error(response.error);
          return;
        }

        if (response.data) {
          setCoinHistoricalChart(response.data);
        }
      });
    }
  }, [coinData, selectedTimeRange]);

  return (
    (coinData && (
      <Box sx={{ padding: "1rem" }}>
        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }}>
          <Grid2 container spacing="1rem">
            <Box display="flex" sx={{ flexDirection: { xs: "row", sm: "column" } }} alignItems="center" gap="0.2rem">
              <Avatar
                src={coinData.image.large}
                alt={coinData.name}
                sx={{
                  width: { xs: "2rem", sm: '5rem"', md: "8rem" },
                  height: { xs: "2rem", sm: '5rem"', md: "8rem" },
                }}
              />
              <Box
                display="flex"
                sx={{
                  flexDirection: { xs: "row", sm: "column" },
                  alignItems: { xs: "end", sm: "center" },
                }}
                columnGap="0.5rem"
                textAlign={"end"}
              >
                <Typography variant="h5">{coinData.name}</Typography>
                <Typography variant="body1" color="textSecondary" textAlign="end">
                  {coinData.symbol.toUpperCase()}
                </Typography>

                <Typography variant="body1" color="textSecondary">
                  #{coinData.market_cap_rank}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap="0.2rem">
              <Typography variant="body1">
                <strong>Current Price:</strong> {`$${coinData.market_data.current_price.usd}`}
              </Typography>
              <Typography variant="body1">
                <strong>Market Cap:</strong> {`$${coinData.market_data.market_cap.usd.toLocaleString()}`}
              </Typography>
              <Typography variant="body1">
                <strong>24h Change:</strong> {coinData.market_data.price_change_percentage_24h !== null ? `${coinData.market_data.price_change_percentage_24h.toFixed(2)}%` : "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Fully Diluted Valuation:</strong> {coinData.market_data.fully_diluted_valuation.usd !== null ? `$${coinData.market_data.fully_diluted_valuation.usd.toLocaleString()}` : "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Total Trading Vol:</strong> {coinData.market_data.total_volume.usd !== null ? `$${coinData.market_data.total_volume.usd.toLocaleString()}` : "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Circulating Supply:</strong> {coinData.market_data.circulating_supply !== null ? coinData.market_data.circulating_supply.toLocaleString() : "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Total Supply:</strong> {coinData.market_data.total_supply !== null ? coinData.market_data.total_supply.toLocaleString() : "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Max Supply:</strong> {coinData.market_data.max_supply !== null ? coinData.market_data.max_supply.toLocaleString() : "-"}
              </Typography>
            </Box>
          </Grid2>

          <Grid2 container pt="1rem" width="100%">
            <Grid2
              gap="1rem"
              display="flex"
              sx={{
                flexDirection: {
                  xs: "column", // column direction for small screens
                  sm: "row", // row direction for larger screens
                },
              }}
            >
              <ToggleButtonGroup value={selectedMetric} exclusive onChange={handleChartMetricChange}>
                <ToggleButton value="prices" aria-label="price">
                  Price
                </ToggleButton>
                <ToggleButton value="market_caps" aria-label="market_cap">
                  Market Cap
                </ToggleButton>
                <ToggleButton value="total_volumes" aria-label="volume">
                  Volume
                </ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup value={selectedTimeRange} exclusive onChange={handleChartTimeRangeChange}>
                <ToggleButton value="1" aria-label="price">
                  24H
                </ToggleButton>
                <ToggleButton value="30" aria-label="market_cap">
                  1M
                </ToggleButton>
                <ToggleButton value="90" aria-label="volume">
                  3M
                </ToggleButton>
                <ToggleButton value="365" aria-label="volume">
                  1Y
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid2>

            <Box sx={{ width: "100%", height: "30rem", marginTop: "1rem", p: "0" }}>
              <LineChart
                xAxis={[
                  {
                    data: coinHistoricalChart[selectedMetric].map((x) => x[0]),
                    valueFormatter: (value) => (selectedTimeRange === "1" ? utils.getShortenTime(value) : utils.getShortenDateString(value)), // When time range is 1d, display time instead of date.
                    min: coinHistoricalChart[selectedMetric].length > 0 ? coinHistoricalChart[selectedMetric][0][0] : undefined,
                    max: coinHistoricalChart[selectedMetric].length > 0 ? coinHistoricalChart[selectedMetric][coinHistoricalChart[selectedMetric].length - 1][0] : undefined,
                  },
                ]}
                yAxis={[
                  {
                    data: coinHistoricalChart[selectedMetric].map((x) => x[1]),
                    valueFormatter: (value) => utils.getShortNumberNotation(value),
                    domainLimit: "strict",
                  },
                ]}
                series={[
                  {
                    data: coinHistoricalChart[selectedMetric].map((x) => x[1]),
                    showMark: false,
                    valueFormatter: (value) => utils.getShortNumberNotation(value!),
                    baseline: "min",
                  },
                ]}
                grid={{ horizontal: true }}
              />
            </Box>
          </Grid2>
        </Paper>
      </Box>
    )) ||
    null
  );
}
