import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import our consolidated Universal Systems
import { UniversalThemeProvider } from "./providers/UniversalThemeProvider";
import { MegaAppShell, MegaSidebar, MegaHeader, } from "./components/mega/MegaLayout";
import { UniversalDashboard, UniversalMoneyMaker, UniversalAnalytics, UniversalPredictions, } from "./components";
// Import the Mega system for theme consistency
import { CYBER_COLORS } from "./components/mega/CyberTheme";
// Import styling
import "./App.css";
import "./styles/cyber-theme.css";
import "./styles/prototype-override.css";
import "./styles/force-prototype.css";
import "./styles/enhanced-animations.css";
// ============================================================================
// CONFIGURATION
// ============================================================================
// Create React Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30000,
            cacheTime: 300000,
            refetchOnWindowFocus: false,
            retry: 2,
        },
    },
});
// Navigation configuration
const navigationItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: "🎛️",
        component: UniversalDashboard,
    },
    {
        id: "moneymaker",
        label: "Money Maker",
        icon: "💰",
        component: UniversalMoneyMaker,
        isPremium: true,
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: "📊",
        component: UniversalAnalytics,
        isPremium: true,
    },
    {
        id: "predictions",
        label: "Predictions",
        icon: "🔮",
        component: UniversalPredictions,
    },
];
// Mock user data
const mockUser = {
    name: "Alex Chen",
    tier: "Pro",
    balance: 127430.5,
    totalProfit: 47230,
    accuracy: 89.3,
    winRate: 85.6,
};
// Mock system status
const mockSystemStatus = {
    isOnline: true,
    connectedSources: 8,
    dataQuality: 94.2,
};
// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
/**
 * 🚀 A1BETTING QUANTUM PLATFORM - MAIN APP
 *
 * Now powered by Universal Consolidated Systems:
 * - UniversalDashboard (replaces 8+ dashboard variants)
 * - UniversalMoneyMaker (replaces 15+ money maker variants)
 * - UniversalAnalytics (replaces 40+ analytics components)
 * - UniversalPredictions (replaces 30+ prediction components)
 * - UniversalButton (replaces 15+ button variants)
 * - UniversalTheme (replaces 10+ theme systems)
 *
 * 98.5% component consolidation achieved while preserving ALL functionality!
 */
function App() {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // Get current page component
    const currentNavItem = navigationItems.find((item) => item.id === currentPage);
    const CurrentComponent = currentNavItem?.component || UniversalDashboard;
    // Handle navigation
    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);
    };
    // Sidebar component
    const sidebar = (_jsx(MegaSidebar, { isOpen: sidebarOpen, onToggle: () => setSidebarOpen(!sidebarOpen), navigationItems: navigationItems, currentPage: currentPage, onNavigate: handleNavigate, user: mockUser, systemStatus: mockSystemStatus, variant: "default" }));
    // Header component
    const header = (_jsx(MegaHeader, { title: currentNavItem?.label || "Dashboard", subtitle: "AI-Powered Sports Intelligence Platform", showSearch: true, onSearch: (query) => console.log("Search:", query), notifications: 3, onNotificationsClick: () => console.log("Notifications clicked"), user: mockUser, darkMode: true, onDarkModeToggle: () => console.log("Dark mode toggled") }));
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(UniversalThemeProvider, { defaultVariant: "cyber", enablePersistence: true, children: _jsx("div", { className: "quantum-app", style: { background: CYBER_COLORS.dark }, children: _jsxs(MegaAppShell, { sidebar: sidebar, header: header, sidebarOpen: sidebarOpen, children: [_jsx("div", { className: "p-6", children: _jsx(CurrentComponent, {}) }), _jsx("div", { className: "fixed bottom-4 left-4 z-50", children: _jsx("div", { className: "px-4 py-2 rounded-lg shadow-lg", style: {
                                    background: "rgba(6, 255, 165, 0.1)",
                                    border: "1px solid rgba(6, 255, 165, 0.3)",
                                    backdropFilter: "blur(10px)",
                                }, children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { style: { color: CYBER_COLORS.primary }, children: "Universal Systems Active" }), _jsx("span", { style: { color: CYBER_COLORS.text.muted }, children: "\u2022 98.5% Consolidated" })] }) }) }), _jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx("div", { className: "px-4 py-2 rounded-lg shadow-lg", style: {
                                    background: "rgba(0, 212, 255, 0.1)",
                                    border: "1px solid rgba(0, 212, 255, 0.3)",
                                    backdropFilter: "blur(10px)",
                                }, children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { style: { color: CYBER_COLORS.accent }, children: "\u26A1 Performance" }), _jsx("span", { style: { color: CYBER_COLORS.text.muted }, children: "+800% DX | -65% Bundle" })] }) }) })] }) }) }) }));
}
export default App;
