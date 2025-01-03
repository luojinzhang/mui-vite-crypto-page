import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PaginationProvider } from "../components";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Create the context object
const LoadingContext = React.createContext<CryptoModel.LoadingContext>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export default function ApplicationWrapper({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <Provider store={store}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <PaginationProvider>
            {children}

            {isLoading && (
              <Box
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black",
                  opacity: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </PaginationProvider>
        </LoadingContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}
