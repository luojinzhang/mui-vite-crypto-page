import { styled, TableCell, TableRow } from "@mui/material";

export const ConsistentHeightTableCell = styled(TableCell)(() => ({
  height: "5rem",
  backgroundColor: "white",
}));

export const SelectableTableRow = styled(TableRow)(() => ({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f4f4f4",
  },
  "&:hover .MuiTableCell-root": {
    backgroundColor: "#f4f4f4",
  },
}));

export const StickyTableCell = styled(ConsistentHeightTableCell)(() => ({
  position: "sticky",
  backgroundColor: "white",
  zIndex: 1,
}));
