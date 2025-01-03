import { Paper, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import React, { startTransition } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomTablePaginationActionComponent from "./CustomTablePaginationActionComponent";
import { usePagination } from "..";
import { useNavigate } from "react-router-dom";
import { utils } from "../../utils";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRow";

export default function CryptoTable() {
  const navigate = useNavigate();
  const { currentPage, rowsPerPage, setCurrentPage, setRowsPerPage } = usePagination();

  const totalCoins = useSelector((state: RootState) => state.coinsClientSlice.coinsIdMap.length);
  const coins = useSelector((state: RootState) => state.coinsClientSlice.coinsListMarket);

  // Sorting state
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof CryptoModel.CryptoCoinMarket>("market_cap_rank");

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

  // Sorting function
  const handleRequestSort = (property: keyof CryptoModel.CryptoCoinMarket) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Scroll to top when currentPage or rowsPerPage changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "40rem" }}>
        {/* Header */}
        <TableHeader onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />

        {/* Body */}
        <TableBody>
          {utils.sortCoins(coins, orderBy, order).map((coin) => (
            <TableRowComponent key={coin.id} coin={coin} onRowClick={handleRowClick} />
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
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
