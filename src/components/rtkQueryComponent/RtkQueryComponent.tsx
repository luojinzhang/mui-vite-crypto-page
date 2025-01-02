import React from "react";
import { useGetCoinsListQuery, useLazyGetCoinsListWithMarketDataQuery } from "../../redux/rtkQuery/coinGeckoApi";
import { useDispatch } from "react-redux";
import { coinsClientSliceActions } from "../../redux/coins/coinsClientSlice";
import { Box, CircularProgress } from "@mui/material";
import { usePagination } from "..";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { utils } from "../../utils";

export default function RtkQueryComponent() {
  const { currentPage, rowsPerPage, setTotalPages } = usePagination();

  const { data: coinsListMapData, isLoading: isLoadingCoinsListMap } = useGetCoinsListQuery();

  const [fetchCoinsListWithMarketData] = useLazyGetCoinsListWithMarketDataQuery();

  const dispatch = useDispatch();

  const { setCoinsIdMap, setCoinsListMarket } = coinsClientSliceActions;

  const totalCoins = useSelector((state: RootState) => state.coinsClientSlice.coinsIdMap.length);

  const isFetching = React.useRef(false);
  const isLoading = React.useMemo(() => isFetching.current || isLoadingCoinsListMap, [isLoadingCoinsListMap, isFetching.current]);

  // Set coins id map
  React.useEffect(() => {
    if (coinsListMapData) {
      dispatch(setCoinsIdMap(coinsListMapData));
    }
  }, [coinsListMapData]);

  // Set total pages
  React.useEffect(() => {
    setTotalPages(Math.ceil(totalCoins / rowsPerPage));
  }, [totalCoins, rowsPerPage]);

  React.useEffect(() => {
    // Ensure is not fetching already
    if (isFetching.current) {
      return;
    }

    isFetching.current = true;
    fetchCoinsListWithMarketData({
      vs_currency: "usd",
      page: currentPage,
      per_page: rowsPerPage,
      order: "market_cap_desc",
      price_change_percentage: "1h,24h,7d",
      sparkline: true,
    }).then((response) => {
      isFetching.current = false;
      if (response.error && "status" in response.error) {
        console.error(response.error);
        utils.notify(`Fetch coin data error: ${response.error.status}`, "error");
        return;
      }

      if (response.data) {
        dispatch(setCoinsListMarket(response.data));
      }
    });
  }, [currentPage, rowsPerPage]);

  return (
    (isLoading && (
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    )) ||
    null
  );
}
