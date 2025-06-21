import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
if (!rootElement)
    throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
root.render(_jsx(React.StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(AppInitializer, { children: _jsx(App, {}) }), _jsx(Toaster, { position: "top-right" })] }) }) }));
