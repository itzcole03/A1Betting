import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AppInitializer } from "./components/AppInitializer";

// Import styles
import "./index.css";
import "./styles/globals.css";

console.log("🚀 A1Betting Platform Loading - Unified Dashboard Mode");

const queryClient = new QueryClient();
const theme = createTheme();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppInitializer>
          <App />
        </AppInitializer>
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
