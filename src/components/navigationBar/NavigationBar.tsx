import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { clLogo } from "../../assets";
import { usePagination } from "../cryptoContext/PaginationProvider";
import { DEFAULT_RESULT_PER_PAGE } from "../../constants";
import { SearchBar } from "..";

export default function NavigationBar() {
  const { setCurrentPage, setRowsPerPage } = usePagination();

  const handleClickHome = () => {
    setCurrentPage(1);
    setRowsPerPage(DEFAULT_RESULT_PER_PAGE);
  };
  return (
    <AppBar position="sticky" variant="outlined" color="primary">
      <Toolbar sx={{ gap: "1rem" }}>
        <Avatar src={clLogo} sx={{ borderRadius: 0, width: "2.5rem", height: "2.5rem" }} />

        <Button color="inherit" component={Link} to="/" onClick={handleClickHome}>
          <Typography variant="h6">Home</Typography>
        </Button>

        {/* Search bar */}
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}
