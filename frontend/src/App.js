import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, useState, useEffect, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider";
import CyberSidebar from "./components/layout/CyberSidebar";
import CyberFooter from "./components/layout/CyberFooter";
import CyberDashboard from "./components/dashboard/CyberDashboard";
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
const LoadingScreen = () => (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Loading A1Betting Platform..." })] }) }));
const ErrorBoundary = ({ children, }) => {
    return _jsx(_Fragment, { children: children });
};
const AppContent = () => {
    const [state, setState] = useState({
        darkMode: false,
        sidebarOpen: true,
        currentSection: "dashboard",
        connectedSources: 12,
        dataQuality: 0.87,
        loading: false,
    });
    // Use existing app store for toasts and notifications
    const { addToast, user } = useAppStore();
    // PrizePicks live data
    const prizePicksData = usePrizePicksLiveData();
    const toggleDarkMode = () => {
        setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
    };
    const toggleSidebar = () => {
        setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
    };
    const handleSectionChange = (section) => {
        setState((prev) => ({ ...prev, currentSection: section }));
    };
    const refreshData = async () => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
            // Simulate data refresh
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setState((prev) => ({
                ...prev,
                connectedSources: Math.min(15, prev.connectedSources + 1),
                dataQuality: Math.min(1, prev.dataQuality + 0.05),
                loading: false,
            }));
            addToast({
                message: "🔴 Real Data Platform refreshed successfully!",
                type: "success",
            });
        }
        catch (error) {
            setState((prev) => ({ ...prev, loading: false }));
            addToast({
                message: "Failed to refresh data. Please try again.",
                type: "error",
            });
        }
    };
    // Apply dark mode to document
    useEffect(() => {
        if (state.darkMode) {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [state.darkMode]);
    // Auto-refresh data periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (state.connectedSources > 0) {
                // Simulate live data updates
                setState((prev) => ({
                    ...prev,
                    dataQuality: Math.max(0.5, Math.min(1, prev.dataQuality + (Math.random() - 0.5) * 0.1)),
                }));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [state.connectedSources]);
    return (_jsxs("div", { className: "flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white cyber-bg", children: [state.sidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-40 lg:hidden", onClick: toggleSidebar })), _jsx(CyberSidebar, { currentPage: state.currentSection, onPageChange: handleSectionChange, isOpen: state.sidebarOpen, onClose: toggleSidebar }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx("div", { className: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30", children: _jsxs("div", { className: "flex items-center justify-between p-4", children: [_jsx("button", { onClick: toggleSidebar, className: "lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }), _jsx("div", { className: "flex-1 lg:flex-none", children: _jsx("h1", { className: "text-xl font-semibold text-gray-900 dark:text-white capitalize", children: state.currentSection.replace(/([A-Z])/g, " $1").trim() }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { onClick: refreshData, disabled: state.loading, className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50", children: _jsx("svg", { className: `w-5 h-5 ${state.loading ? "animate-spin" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }) }), _jsx("button", { onClick: toggleDarkMode, className: "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", title: "Toggle Dark Mode", children: state.darkMode ? "☀️" : "🌙" }), user && (_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center", children: _jsx("span", { className: "text-white text-sm font-medium", children: user.name?.charAt(0) || "U" }) }))] })] }) }), _jsx("main", { className: "p-8", children: _jsx(ErrorBoundary, { children: _jsx(CyberDashboard, { currentPage: state.currentSection }) }) }), _jsx(CyberFooter, {})] }), _jsx(Toaster, {})] }));
};
// ============================================================================
// DEBUG COMPONENTS (lazy loaded for better performance)
// ============================================================================
// Analytics Components
const PerformanceAnalyticsDebug = lazy(() => import("./components/analytics/PerformanceAnalyticsDashboard.tsx").then((m) => ({
    default: m.PerformanceAnalyticsDashboard,
})));
const AdvancedAnalyticsHub = lazy(() => import("./components/analytics/AdvancedAnalyticsHub.tsx").then((m) => ({
    default: m.AdvancedAnalyticsHub,
})));
const MLInsights = lazy(() => import("./components/analytics/MLInsights.tsx").then((m) => ({
    default: m.MLInsights,
})));
const UltraAdvancedMLDashboard = lazy(() => import("./components/ml/UltraAdvancedMLDashboard.tsx").then((m) => ({
    default: m.UltraAdvancedMLDashboard,
})));
// Betting Components
const ArbitrageOpportunities = lazy(() => import("./components/ArbitrageOpportunities.tsx").then((m) => ({
    default: m.default,
})));
const BetBuilder = lazy(() => import("./components/features/betting/BetBuilder.tsx").then((m) => ({
    default: m.BetBuilder,
})));
const BettingHistory = lazy(() => import("./components/features/betting/BettingHistory.tsx").then((m) => ({
    default: m.BettingHistory,
})));
const RealtimePredictionDisplay = lazy(() => import("./components/features/predictions/RealtimePredictionDisplay.tsx").then((m) => ({
    default: m.RealtimePredictionDisplay,
})));
const MLPredictions = lazy(() => import("./components/MLPredictions.tsx").then((m) => ({
    default: m.MLPredictions,
})));
// Strategy Components
const UnifiedStrategyEngineDisplay = lazy(() => import("./components/strategy/UnifiedStrategyEngineDisplay.tsx").then((m) => ({
    default: m.UnifiedStrategyEngineDisplay,
})));
const UnifiedMoneyMaker = lazy(() => import("./components/money-maker/UnifiedMoneyMaker.tsx").then((m) => ({
    default: m.UnifiedMoneyMaker,
})));
// Market Analysis
const MarketAnalysisDashboard = lazy(() => import("./components/MarketAnalysisDashboard.tsx").then((m) => ({
    default: m.MarketAnalysisDashboard,
})));
// Other Components
const SmartLineupBuilder = lazy(() => import("./components/lineup/SmartLineupBuilder.tsx").then((m) => ({
    default: m.SmartLineupBuilder,
})));
const MLModelCenter = lazy(() => import("./components/ml/MLModelCenter.tsx").then((m) => ({
    default: m.MLModelCenter,
})));
const UnifiedSettingsInterface = lazy(() => import("./components/settings/UnifiedSettingsInterface.tsx").then((m) => ({
    default: m.UnifiedSettingsInterface,
})));
const UnifiedProfile = lazy(() => import("./components/profile/UnifiedProfile.tsx").then((m) => ({
    default: m.UnifiedProfile,
})));
const debugMenuItems = [
    // Analytics
    {
        label: "Performance Dashboard",
        component: PerformanceAnalyticsDebug,
        description: "Comprehensive analytics and performance metrics",
        category: "Analytics",
    },
    {
        label: "Advanced Analytics Hub",
        component: AdvancedAnalyticsHub,
        description: "Advanced ML analytics and insights",
        category: "Analytics",
    },
    {
        label: "ML Insights",
        component: MLInsights,
        description: "Machine learning insights and analysis",
        category: "Analytics",
    },
    {
        label: "Ultra Advanced ML",
        component: UltraAdvancedMLDashboard,
        description: "Ultra-advanced ML dashboard",
        category: "Analytics",
    },
    // Betting
    {
        label: "Arbitrage Opportunities",
        component: ArbitrageOpportunities,
        description: "Real-time arbitrage betting opportunities",
        category: "Betting",
    },
    {
        label: "Bet Builder",
        component: BetBuilder,
        description: "Advanced bet building interface",
        category: "Betting",
    },
    {
        label: "Betting History",
        component: BettingHistory,
        description: "Historical betting performance",
        category: "Betting",
    },
    // Predictions
    {
        label: "Realtime Predictions",
        component: RealtimePredictionDisplay,
        description: "Live prediction updates",
        category: "Predictions",
    },
    {
        label: "ML Predictions",
        component: MLPredictions,
        description: "Machine learning predictions",
        category: "Predictions",
    },
    // Strategy
    {
        label: "Strategy Engine",
        component: UnifiedStrategyEngineDisplay,
        description: "Unified strategy engine interface",
        category: "Strategy",
    },
    {
        label: "Money Maker",
        component: UnifiedMoneyMaker,
        description: "Automated money-making strategies",
        category: "Strategy",
    },
    // Market Analysis
    {
        label: "Market Analysis",
        component: MarketAnalysisDashboard,
        description: "Comprehensive market analysis",
        category: "Market Analysis",
    },
    // Tools
    {
        label: "Lineup Builder",
        component: SmartLineupBuilder,
        description: "Smart DFS lineup builder",
        category: "Tools",
    },
    {
        label: "ML Model Center",
        component: MLModelCenter,
        description: "Machine learning model management",
        category: "Tools",
    },
    // Settings & Profile
    {
        label: "Settings",
        component: UnifiedSettingsInterface,
        description: "Application settings and configuration",
        category: "Settings",
    },
    {
        label: "Profile",
        component: UnifiedProfile,
        description: "User profile and preferences",
        category: "Settings",
    },
];
// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const App = () => {
    const [isDebugMode, setIsDebugMode] = useState(false);
    const [selectedDebugComponent, setSelectedDebugComponent] = useState(null);
    // Check for debug mode in URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const debugParam = urlParams.get("debug");
        if (debugParam === "true" || debugParam === "1") {
            setIsDebugMode(true);
        }
    }, []);
    // Group debug menu items by category
    const groupedDebugItems = debugMenuItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});
    // Render selected debug component
    const renderDebugComponent = () => {
        if (!selectedDebugComponent)
            return null;
        const item = debugMenuItems.find((item) => item.label === selectedDebugComponent);
        if (!item)
            return null;
        const Component = item.component;
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900", children: _jsxs("div", { className: "container mx-auto p-4", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: item.label }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-1", children: item.description })] }), _jsx("button", { onClick: () => setSelectedDebugComponent(null), className: "px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors", children: "\u2190 Back to Debug Menu" })] }), _jsx(ErrorBoundary, { children: _jsx(Suspense, { fallback: _jsx(LoadingScreen, {}), children: _jsx(Component, {}) }) })] }) }));
    };
    // Render debug menu
    const renderDebugMenu = () => (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 dark:text-white mb-4", children: "\uD83D\uDEE0\uFE0F Developer Debug Menu" }), _jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300", children: "Access individual components for testing and development" }), _jsx("button", { onClick: () => setIsDebugMode(false), className: "mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "\u2192 Go to Main App" })] }), Object.entries(groupedDebugItems).map(([category, items]) => (_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-200 dark:border-blue-700 pb-2", children: category }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((item) => (_jsxs("button", { onClick: () => setSelectedDebugComponent(item.label), className: "p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-left group", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400", children: item.label }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: item.description }), _jsx("div", { className: "mt-3 inline-flex items-center text-sm text-blue-600 dark:text-blue-400", children: "Open Component \u2192" })] }, item.label))) })] }, category)))] }) }));
    // Main render
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(ThemeProvider, { defaultTheme: "light", children: _jsx(ErrorBoundary, { children: _jsx("div", { className: "min-h-screen", children: isDebugMode ? (selectedDebugComponent ? (renderDebugComponent()) : (renderDebugMenu())) : (_jsxs(_Fragment, { children: [_jsx(AppContent, {}), _jsx("button", { onClick: () => setIsDebugMode(true), className: "fixed bottom-4 left-4 p-3 bg-gray-800/80 dark:bg-gray-600/80 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-gray-700/80 dark:hover:bg-gray-500/80 transition-all duration-200 z-50", title: "Open Debug Menu", children: "\uD83D\uDEE0\uFE0F" })] })) }) }) }) }) }));
};
export default App;
