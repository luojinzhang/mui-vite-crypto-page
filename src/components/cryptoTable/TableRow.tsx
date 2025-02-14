import React from "react";
import { ConsistentHeightTableCell, SelectableTableRow, StickyTableCell } from "../../styled/styledComponents";
import { Avatar, Box, Stack } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { formatCurrency } from "@coingecko/cryptoformat";
import PushPinIcon from '@mui/icons-material/PushPin';
import { utils } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { coinsClientSliceActions } from "../../redux/coins/coinsClientSlice";
import { useDispatch } from "react-redux";

interface TableRowComponentProps {
  coin: CryptoModel.CryptoCoinMarket;
  onRowClick: (coinId: string) => () => void;
}

export default function TableRowComponent({ coin, onRowClick }: TableRowComponentProps) {
  const pinnedCoinList = useSelector((x: RootState) => x.coinsClientSlice.pinnedCoinList)

  const { addPinnedCoin } = coinsClientSliceActions

  const dispatch = useDispatch();

  const isPinned = React.useMemo(() => {
    return pinnedCoinList.findIndex(x => x.id === coin.id) > -1
  }, [pinnedCoinList])

  const handleClickPin = React.useCallback<React.MouseEventHandler<SVGSVGElement>>((evt) => {
    evt.stopPropagation();

    if (!isPinned) {
      dispatch(addPinnedCoin(coin))
    }
  }, [isPinned])

  return (
    <SelectableTableRow key={coin.id} onClick={onRowClick(coin.id)}>
      {/* Market cap rank */}
      <StickyTableCell sx={{ left: 0, width: "3rem" }} align="right">
        {coin.market_cap_rank !== null ? `${coin.market_cap_rank}` : "-"}
      </StickyTableCell>

      {/* Name */}
      <StickyTableCell sx={{ left: 70 }}>
        <Stack direction="row" alignItems="center">
          {/* Pin icon */}
          <PushPinIcon sx={{
            color: isPinned ? '#ffd480' : '#00004d',
          }
          } onClick={handleClickPin} />

          <Avatar src={coin.image} alt={coin.name} sx={{ mr: "0.5rem" }} />
          {coin.name}
        </Stack>
      </StickyTableCell>

      {/* Price */}
      <ConsistentHeightTableCell align="right">
        {coin.current_price !== null ? `${formatCurrency(coin.current_price, "USD", "en", false, { decimalPlaces: 10, significantFigures: 6 })}` : "-"}
      </ConsistentHeightTableCell>

      {/* 1H */}
      {(coin.price_change_percentage_1h_in_currency !== null && (
        <ConsistentHeightTableCell align="right" style={{ color: utils.getCryptoPercentageColor(coin.price_change_percentage_1h_in_currency) }}>
          {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
        </ConsistentHeightTableCell>
      )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

      {/* 24H */}
      {(coin.price_change_percentage_24h_in_currency !== null && (
        <ConsistentHeightTableCell align="right" style={{ color: utils.getCryptoPercentageColor(coin.price_change_percentage_24h_in_currency) }}>
          {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
        </ConsistentHeightTableCell>
      )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

      {/* 7D */}
      {(coin.price_change_percentage_7d_in_currency !== null && (
        <ConsistentHeightTableCell align="right" style={{ color: utils.getCryptoPercentageColor(coin.price_change_percentage_7d_in_currency) }}>
          {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
        </ConsistentHeightTableCell>
      )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

      {/* Market cap */}
      <ConsistentHeightTableCell align="right">{coin.market_cap !== null ? `$${coin.market_cap.toLocaleString()}` : "-"}</ConsistentHeightTableCell>

      {/* Sparkline chart */}
      <ConsistentHeightTableCell align="center" padding="checkbox">
        <Box sx={{ width: "10rem", height: "100%", p: 0 }}>
          <SparkLineChart
            sx={{ width: "100%" }}
            plotType="line"
            data={coin.sparkline_in_7d.price}
            colors={coin.price_change_percentage_7d_in_currency && coin.price_change_percentage_7d_in_currency < 0 ? ["red"] : ["green"]}
            skipAnimation
          ></SparkLineChart>
        </Box>
      </ConsistentHeightTableCell>
    </SelectableTableRow>
  );
}
