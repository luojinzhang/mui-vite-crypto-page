import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import React from "react";
import { utils } from "../../utils";

export default function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  // Calculate the total number of pages
  const totalPages = Math.ceil(count / rowsPerPage);

  // Page buttons event handlers
  const handlePageButtonClick = (newPage: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, newPage);
  };

  const pageNumbers = React.useMemo(() => utils.getPageNumbers(page, totalPages), [page, totalPages]);

  return (
    <Stack direction={"row"} textAlign={"center"} alignItems="center">
      {/* First Page Button */}
      <Button onClick={handlePageButtonClick(0)} disabled={page === 0} size="medium">
        <Typography variant="body2">1</Typography>
      </Button>

      {/* Ellipsis if the page numbers before the current page are skipped */}
      {page > 3 && <Typography variant="body2">...</Typography>}

      {/* Page Numbers */}
      {pageNumbers.map((pageNumber) => (
        <Button key={pageNumber} onClick={handlePageButtonClick(pageNumber)} disabled={page === pageNumber} sx={{ mx: 0.5 }} size="medium">
          <Typography variant="body2">{pageNumber + 1}</Typography>
        </Button>
      ))}

      {/* Ellipsis if the page numbers after the current page are skipped */}
      {page < totalPages - 4 && <Typography variant="body2">...</Typography>}

      {/* Last Page Button */}
      <Button onClick={handlePageButtonClick(totalPages - 1)} disabled={page === totalPages - 1} size="medium">
        <Typography variant="body2">{totalPages}</Typography>
      </Button>
    </Stack>
  );
}
