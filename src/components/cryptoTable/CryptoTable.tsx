import { Avatar, Box, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { startTransition } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomTablePaginationActionComponent from "./CustomTablePaginationActionComponent";
import { SparkLineChart } from "@mui/x-charts";
import { usePagination } from "..";
import { useNavigate } from "react-router-dom";

const ConsistentHeightTableCell = styled(TableCell)(({}) => ({
  height: "5rem",
}));

const SelectableTableRow = styled(TableRow)(({}) => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f4f4f4",
  },
}));

export default function CryptoTable() {
  const navigate = useNavigate();
  const { currentPage, rowsPerPage, setCurrentPage, setRowsPerPage } = usePagination();

  const totalCoins = useSelector((state: RootState) => state.coinsClientSlice.coinsIdMap.length);
  const coins = useSelector((state: RootState) => state.coinsClientSlice.coinsListMarket);

  // Handle page change for pagination,
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    // page is 0-based, add 1 to change to 1-based
    setCurrentPage(page + 1); // Update page to 1-based index
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    startTransition(() => setRowsPerPage(parseInt(event.target.value, 10)));
    setCurrentPage(1); // Reset to first page (1-based)
  };

  // Handle row click event
  const handleRowClick = (coinId: string) => () => {
    navigate(`/coins/${coinId}`); // Navigate to the coin's detail page
  };

  // Scroll to top when currentPage or rowsPerPage changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, rowsPerPage]);

  React.useEffect(() => {}, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="cryptocurrency table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">1h</TableCell>
            <TableCell align="right">24h</TableCell>
            <TableCell align="right">7d</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Last 7 Days </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coins.map((coin) => (
            <SelectableTableRow key={coin.id} onClick={handleRowClick(coin.id)}>
              <ConsistentHeightTableCell style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <Avatar src={coin.image} alt={coin.name} sx={{ width: `1.5rem`, height: `1.5rem`, mr: "0.5rem" }} />
                {coin.name}
              </ConsistentHeightTableCell>
              <ConsistentHeightTableCell align="right">{coin.current_price !== null ? `$${coin.current_price}` : "-"}</ConsistentHeightTableCell>

              {(coin.price_change_percentage_1h_in_currency !== null && (
                <ConsistentHeightTableCell align="right" style={{ color: coin.price_change_percentage_1h_in_currency < 0 ? "red" : "green" }}>
                  {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                </ConsistentHeightTableCell>
              )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

              {(coin.price_change_percentage_24h_in_currency !== null && (
                <ConsistentHeightTableCell align="right" style={{ color: coin.price_change_percentage_24h_in_currency < 0 ? "red" : "green" }}>
                  {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                </ConsistentHeightTableCell>
              )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

              {(coin.price_change_percentage_7d_in_currency !== null && (
                <ConsistentHeightTableCell align="right" style={{ color: coin.price_change_percentage_7d_in_currency < 0 ? "red" : "green" }}>
                  {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                </ConsistentHeightTableCell>
              )) || <ConsistentHeightTableCell align="right">-</ConsistentHeightTableCell>}

              <ConsistentHeightTableCell align="right">{coin.market_cap !== null ? `$${coin.market_cap?.toLocaleString()}` : "-"}</ConsistentHeightTableCell>

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
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        rowsPerPageOptions={[50, 100, 250]}
        count={totalCoins}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1} // Change to 0-based
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={CustomTablePaginationActionComponent}
        labelDisplayedRows={() => null}
        sx={{ overflow: "visible" }}
      />
    </TableContainer>
  );
}
