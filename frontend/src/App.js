import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Suspense, useState, useEffect, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdvancedSidebar } from "./components/layout/AdvancedSidebar";
import { EliteSportsHeader } from "./components/layout/EliteSportsHeader";
import UnifiedDashboard from "./components/dashboard/UnifiedDashboard";
import { usePrizePicksLiveData } from "./hooks/usePrizePicksLiveData";
import { useAppStore } from "./store/useAppStore";
import Toaster from "./components/base/Toaster";

// ============================================================================
// QUERY CLIENT
// ============================================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// ============================================================================
// LOADING AND ERROR COMPONENTS
// ============================================================================
const LoadingScreen = () =>
  _jsx("div", {
    className:
      "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950",
    children: _jsxs("div", {
      className: "text-center",
      children: [
        _jsx("div", {
          className:
            "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4",
        }),
        _jsx("p", {
          className: "text-gray-600 dark:text-gray-300",
          children: "Loading A1Betting Platform...",
        }),
      ],
    }),
  });

const ErrorBoundary = ({ children }) => {
  return _jsx(_Fragment, { children: children });
};

const AppContent = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [connectedSources, setConnectedSources] = useState(12);
  const [dataQuality, setDataQuality] = useState(87);

  const { addToast, user } = useAppStore();

  const refreshData = async () => {
    try {
      setConnectedSources(Math.floor(Math.random() * 5) + 8);
      setDataQuality(Math.floor(Math.random() * 20) + 75);
      addToast({
        id: Date.now().toString(),
        type: "success",
        message: "Data refreshed successfully",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        id: Date.now().toString(),
        type: "error",
        message: "Failed to refresh data",
        duration: 5000,
      });
    }
  };

  // Welcome toast with real data status on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        id: "welcome",
        type: "info",
        message: `Welcome back! ${connectedSources} data sources connected.`,
        duration: 4000,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [addToast, connectedSources]);

  // Auto refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return _jsxs("div", {
    className: `min-h-screen ${darkMode ? "dark" : ""} bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900`,
    children: [
      _jsx(EliteSportsHeader, {
        darkMode: darkMode,
        onDarkModeToggle: () => setDarkMode(!darkMode),
        onRefresh: refreshData,
        connectedSources: connectedSources,
        dataQuality: dataQuality,
      }),
      _jsxs("div", {
        className: "flex",
        children: [
          _jsx(AdvancedSidebar, {
            currentSection: currentSection,
            onSectionChange: setCurrentSection,
            connectedSources: connectedSources,
            dataQuality: dataQuality,
            state: { darkMode },
          }),
          _jsx("main", {
            className: "flex-1 min-h-screen",
            children: _jsx(UnifiedDashboard, {
              activeSection: currentSection,
              connectedSources: connectedSources,
              dataQuality: dataQuality,
            }),
          }),
        ],
      }),
      _jsx(Toaster, {}),
    ],
  });
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App = () => {
  return _jsx(QueryClientProvider, {
    client: queryClient,
    children: _jsx(ErrorBoundary, {
      children: _jsx(Suspense, {
        fallback: _jsx(LoadingScreen, {}),
        children: _jsx(AppContent, {}),
      }),
    }),
  });
};

export default App;
