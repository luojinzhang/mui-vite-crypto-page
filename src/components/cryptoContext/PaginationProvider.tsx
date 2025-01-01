import React, { PropsWithChildren } from "react";
import { DEFAULT_RESULT_PER_PAGE } from "../../constants";

// Create the context object
const PaginationContext = React.createContext<CryptoModel.PaginationContext>({
  currentPage: 1,
  rowsPerPage: DEFAULT_RESULT_PER_PAGE,
  totalPages: 0,
  setCurrentPage: () => {},
  setRowsPerPage: () => {},
  setTotalPages: () => {},
});

export const usePagination = () => {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

// Create a provider component
export default function PaginationProvider({ children }: PropsWithChildren) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_RESULT_PER_PAGE);
  const [totalPages, setTotalPages] = React.useState(0);

  return <PaginationContext.Provider value={{ currentPage, rowsPerPage, totalPages, setCurrentPage, setRowsPerPage, setTotalPages }}>{children}</PaginationContext.Provider>;
}
