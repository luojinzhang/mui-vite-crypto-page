import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import "./index.css";
import { ApplicationWrapper } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationWrapper>
        <App />
      </ApplicationWrapper>
    </ThemeProvider>
  </React.StrictMode>,
);
