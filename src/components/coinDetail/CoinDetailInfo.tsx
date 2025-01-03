import { Typography } from "@mui/material";
import React from "react";
import { utils } from "../../utils";

interface CoinDetailInfoProps {
  market_data: CryptoModel.Coin["market_data"];
}

export default function CoinDetailInfo({ market_data }: CoinDetailInfoProps) {
  return (
    <>
      <Typography variant="body1">
        <strong>Current Price:</strong> {market_data.current_price.usd ? `$${market_data.current_price.usd}` : "-"}
      </Typography>
      <Typography variant="body1" sx={{ color: utils.getCryptoPercentageColor(market_data.price_change_percentage_24h) }}>
        <strong style={{ color: "black" }}>24h Change:</strong> {market_data.price_change_percentage_24h ? `${market_data.price_change_percentage_24h.toFixed(2)}%` : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Market Cap:</strong> {market_data.market_cap.usd ? `$${market_data.market_cap.usd.toLocaleString()}` : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Fully Diluted Valuation:</strong> {market_data.fully_diluted_valuation.usd ? `$${market_data.fully_diluted_valuation.usd.toLocaleString()}` : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Total Trading Vol:</strong> {market_data.total_volume.usd ? `$${market_data.total_volume.usd.toLocaleString()}` : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Circulating Supply:</strong> {market_data.circulating_supply ? market_data.circulating_supply.toLocaleString() : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Total Supply:</strong> {market_data.total_supply ? market_data.total_supply.toLocaleString() : "-"}
      </Typography>
      <Typography variant="body1">
        <strong>Max Supply:</strong> {market_data.max_supply ? market_data.max_supply.toLocaleString() : "-"}
      </Typography>
    </>
  );
}
