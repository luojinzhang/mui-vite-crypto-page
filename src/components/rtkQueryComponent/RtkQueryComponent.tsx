import React from "react";
import { useGetCoinsListQuery, useLazyGetCoinsListWithMarketDataQuery } from "../../redux/rtkQuery/coinGeckoApi";
import { useDispatch, useSelector } from "react-redux";
import { coinsClientSliceActions } from "../../redux/coins/coinsClientSlice";
import { usePagination } from "..";
import { RootState } from "../../redux/store";
import { utils } from "../../utils";
import { useLoading } from "../../hoc";

export default function RtkQueryComponent() {
  const { currentPage, rowsPerPage, setTotalPages } = usePagination();
  const { setIsLoading } = useLoading();
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

  React.useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  return null;
}
