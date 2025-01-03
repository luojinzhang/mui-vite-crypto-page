import React from "react";
import { useParams } from "react-router-dom";
import { useLazyGetCoinDataByIdQuery, useLazyGetCoinHistoricalChartDataByIdQuery } from "../redux/rtkQuery/coinGeckoApi";
import { Avatar, Box, Grid2, Paper, Typography } from "@mui/material";
import { utils } from "../utils";
import { CoinDetailPriceChart, CoinDetailInfo, CoinDetailPriceChangeTable, CoinDetailChartControlToggles } from ".";
import { useLoading } from "../hoc";

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
              <CoinDetailInfo market_data={coinData.market_data} />
            </Box>
          </Grid2>

          <Grid2 container pt="1rem" width="100%">
            {/* Toggle buttons for chart control */}
            <CoinDetailChartControlToggles
              selectedMetric={selectedMetric}
              selectedTimeRange={selectedTimeRange}
              onChangeMetric={handleChartMetricChange}
              onChangeTimeRange={handleChartTimeRangeChange}
            />

            {/* Price chart */}
            <CoinDetailPriceChart selectedTimeRange={selectedTimeRange} selectedMetric={selectedMetric} coinHistoricalChart={coinHistoricalChart} />

            {/* Price change table */}
            <CoinDetailPriceChangeTable coinData={coinData} />
          </Grid2>
        </Paper>
      </Box>
    )) ||
    null
  );
}
