import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";
import { StickyTableCell } from "../../styled/styledComponents";

interface TableHeaderProps {
  orderBy: keyof CryptoModel.CryptoCoinMarket;
  order: "asc" | "desc";
  onRequestSort: (property: keyof CryptoModel.CryptoCoinMarket) => () => void;
}

export default function TableHeader({ orderBy, order, onRequestSort }: TableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        {/* Market cap rank */}
        <StickyTableCell align="right" sx={{ left: 0, height: "auto" }}>
          <TableSortLabel active={orderBy === "market_cap_rank"} direction={orderBy === "market_cap_rank" ? order : "asc"} onClick={onRequestSort("market_cap_rank")}>
            #
          </TableSortLabel>
        </StickyTableCell>

        {/* Name */}
        <StickyTableCell sx={{ left: 70, height: "auto" }}>
          <TableSortLabel active={orderBy === "name"} direction={orderBy === "name" ? order : "asc"} onClick={onRequestSort("name")}>
            Name
          </TableSortLabel>
        </StickyTableCell>

        {/* Current price */}
        <TableCell>
          <TableSortLabel active={orderBy === "current_price"} direction={orderBy === "current_price" ? order : "asc"} onClick={onRequestSort("current_price")}>
            Price
          </TableSortLabel>
        </TableCell>

        {/* 1H */}
        <TableCell>
          <TableSortLabel
            active={orderBy === "price_change_percentage_1h_in_currency"}
            direction={orderBy === "price_change_percentage_1h_in_currency" ? order : "asc"}
            onClick={onRequestSort("price_change_percentage_1h_in_currency")}
          >
            1h
          </TableSortLabel>
        </TableCell>

        {/* 24H */}
        <TableCell>
          <TableSortLabel
            active={orderBy === "price_change_percentage_24h_in_currency"}
            direction={orderBy === "price_change_percentage_24h_in_currency" ? order : "asc"}
            onClick={onRequestSort("price_change_percentage_24h_in_currency")}
          >
            24h
          </TableSortLabel>
        </TableCell>

        {/* 7D */}
        <TableCell>
          <TableSortLabel
            active={orderBy === "price_change_percentage_7d_in_currency"}
            direction={orderBy === "price_change_percentage_7d_in_currency" ? order : "asc"}
            onClick={onRequestSort("price_change_percentage_7d_in_currency")}
          >
            7d
          </TableSortLabel>
        </TableCell>

        {/* Market cap */}
        <TableCell>
          <TableSortLabel active={orderBy === "market_cap"} direction={orderBy === "market_cap" ? order : "asc"} onClick={onRequestSort("market_cap")}>
            Market Cap
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">Last 7 Days </TableCell>
      </TableRow>
    </TableHead>
  );
}
