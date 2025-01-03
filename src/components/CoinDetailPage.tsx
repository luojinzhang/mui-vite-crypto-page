import React from "react";
import { useParams } from "react-router-dom";
import { useLazyGetCoinDataByIdQuery, useLazyGetCoinHistoricalChartDataByIdQuery } from "../redux/rtkQuery/coinGeckoApi";
import { Avatar, Box, Grid2, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { utils } from "../utils";
import { CoinInfo } from ".";
import { useLoading } from "../hoc";
import { formatCurrency } from "@coingecko/cryptoformat";

export default function CoinDetailPage() {
  const { setIsLoading } = useLoading();
  const { coinId } = useParams<{ coinId: string }>(); // Route param
  const isFetching = React.useRef(false); // Use to ensure only 1 fetch at a time due to api limitation.
  const [fetchCoinDataById] = useLazyGetCoinDataByIdQuery();
  const [fetchCoinChartById] = useLazyGetCoinHistoricalChartDataByIdQuery();
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
    if (coinId && !isFetching.current) {
      isFetching.current = true;
      fetchCoinDataById({ id: coinId, community_data: false, developer_data: false, localization: false, market_data: true, sparkline: false, tickers: false }).then((response) => {
        isFetching.current = false;
        if (response.error && "status" in response.error) {
          console.error(response.error);
          utils.notify(`Fetch coin data error: ${response.error.status}`, "error");
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
    if (coinData && !isFetching.current) {
      isFetching.current = true;
      fetchCoinChartById({ id: coinData.id, vs_currency: "usd", days: selectedTimeRange }).then((response) => {
        isFetching.current = false;
        if (response.error && "status" in response.error) {
          console.error(response.error);
          utils.notify(`Fetch coin chart data error: ${response.error.status}`, "error");
          return;
        }

        if (response.data) {
          setCoinHistoricalChart(response.data);
        }
      });
    }
  }, [coinData, selectedTimeRange]);

  React.useEffect(() => {
    setIsLoading(isFetching.current);
  }, [isFetching.current]);

  return (
    (coinData && (
      <Box sx={{ padding: "1rem" }}>
        <Paper sx={{ padding: "1rem", marginBottom: "2rem" }}>
          <Grid2 container spacing="1rem">
            <Box display="flex" sx={{ flexDirection: { xs: "row", sm: "column" } }} alignItems="center" gap="0.2rem">
              {/* Coin avatar, name, rank */}
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

            {/* Coin info */}
            <Box display="flex" flexDirection="column" gap="0.2rem">
              <CoinInfo market_data={coinData.market_data} />
            </Box>
          </Grid2>

          <Grid2 container pt="1rem" width="100%">
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
              <ToggleButtonGroup value={selectedMetric} exclusive onChange={handleChartMetricChange} color="primary">
                <ToggleButton value="prices">Price</ToggleButton>
                <ToggleButton value="market_caps">Market Cap</ToggleButton>
                <ToggleButton value="total_volumes">Volume</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup value={selectedTimeRange} exclusive onChange={handleChartTimeRangeChange} color="primary">
                <ToggleButton value="1">24H</ToggleButton>
                <ToggleButton value="30">1M</ToggleButton>
                <ToggleButton value="90">3M</ToggleButton>
                <ToggleButton value="365">1Y</ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Box sx={{ width: "100%", height: "30rem", marginTop: "1rem", p: "0" }}>
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
          </Grid2>
        </Paper>
      </Box>
    )) ||
    null
  );
}
