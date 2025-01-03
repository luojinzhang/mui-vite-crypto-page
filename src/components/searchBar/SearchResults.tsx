import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
  query: string;
  resetQuery: () => void;
}

export default function SearchResults({ query, resetQuery }: SearchResultsProps) {
  const coinsIdMap = useSelector((state: RootState) => state.coinsClientSlice.coinsIdMap);
  const navigate = useNavigate();

  const handleClickCoin = (coinId: string) => () => {
    navigate(`coins/${coinId}`);
    resetQuery();
  };

  const coins = coinsIdMap.filter((x) => x.symbol.includes(query) || x.id.includes(query) || x.name.includes(query));

  if (query === "") {
    return null;
  }

  if (coins.length === 0) {
    return (
      <p style={{ paddingLeft: "1rem" }}>
        No matches for <i>"{query}"</i>
      </p>
    );
  }

  return coins.map((coin) => (
    <Button fullWidth key={coin.id} sx={{ justifyContent: "flex-start" }} onClick={handleClickCoin(coin.id)}>
      {coin.name} ({coin.symbol})
    </Button>
  ));
}
