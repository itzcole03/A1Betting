import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, Suspense, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  Brain,
  Settings,
  User,
} from "lucide-react";
// Import unified components
import { MegaCard, MegaButton } from "../mega/MegaUI";
import { CyberText, CyberContainer } from "../mega/CyberTheme";
import { predictionService } from "../../services/predictionService";
import useStore from "../../store/useStore";
// Lazy load heavy components
const PerformanceAnalyticsDashboard = React.lazy(() =>
  import("../analytics/PerformanceAnalyticsDashboard").then((m) => ({
    default: m.PerformanceAnalyticsDashboard,
  })),
);
const UnifiedMoneyMaker = React.lazy(() =>
  import("../money-maker/UnifiedMoneyMaker").then((m) => ({
    default: m.UnifiedMoneyMaker,
  })),
);
const UnifiedStrategyEngineDisplay = React.lazy(() =>
  import("../strategy/UnifiedStrategyEngineDisplay").then((m) => ({
    default: m.default,
  })),
);
// ============================================================================
// COMPONENTS
// ============================================================================
const MetricCard = ({ label, value, icon, change, trend, loading }) => {
  const trendColor =
    trend === "up" ? "#06ffa5" : trend === "down" ? "#ff4757" : "#00d4ff";
  if (loading) {
    return _jsx(MegaCard, {
      variant: "glass",
      padding: "md",
      children: _jsxs("div", {
        className: "animate-pulse",
        children: [
          _jsx("div", { className: "h-4 bg-gray-600 rounded mb-2" }),
          _jsx("div", { className: "h-8 bg-gray-600 rounded mb-2" }),
          _jsx("div", { className: "h-3 bg-gray-600 rounded w-1/2" }),
        ],
      }),
    });
  }
  return _jsxs(MegaCard, {
    variant: "glowing",
    padding: "md",
    onClick: () => {},
    className: "transition-all duration-300 hover:scale-105 cursor-pointer",
    children: [
      _jsxs("div", {
        className: "flex items-center justify-between mb-4",
        children: [
          _jsx("div", { style: { color: "#06ffa5" }, children: icon }),
          change &&
            _jsx("span", {
              style: { color: trendColor, fontSize: "12px", fontWeight: "600" },
              children: change,
            }),
        ],
      }),
      _jsx(CyberText, {
        variant: "caption",
        color: "secondary",
        className: "mb-1",
        children: label,
      }),
      _jsx(CyberText, {
        variant: "title",
        style: { fontSize: "24px", fontWeight: "700" },
        children: value,
      }),
    ],
  });
};
const DashboardSkeleton = () =>
  _jsxs("div", {
    className: "space-y-6",
    children: [
      _jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        children: [...Array(4)].map((_, i) =>
          _jsx(
            MetricCard,
            { label: "", value: "", icon: _jsx("div", {}), loading: true },
            i,
          ),
        ),
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
        children: [
          _jsx(MegaCard, {
            variant: "glass",
            padding: "lg",
            children: _jsxs("div", {
              className: "animate-pulse space-y-4",
              children: [
                _jsx("div", { className: "h-6 bg-gray-600 rounded w-1/3" }),
                _jsx("div", { className: "h-32 bg-gray-600 rounded" }),
              ],
            }),
          }),
          _jsx(MegaCard, {
            variant: "glass",
            padding: "lg",
            children: _jsxs("div", {
              className: "animate-pulse space-y-4",
              children: [
                _jsx("div", { className: "h-6 bg-gray-600 rounded w-1/2" }),
                _jsx("div", {
                  className: "space-y-2",
                  children: [...Array(5)].map((_, i) =>
                    _jsx("div", { className: "h-4 bg-gray-600 rounded" }, i),
                  ),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================
export const UniversalDashboard = ({
  variant = "standard",
  user = {
    name: "User",
    tier: "Pro",
    balance: 0,
    totalProfit: 0,
    accuracy: 0,
    winRate: 0,
  },
  defaultTab = "overview",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = useStore();
  // Data fetching with React Query
  const { data: predictions, isLoading: predictionsLoading } = useQuery({
    queryKey: ["dashboard-predictions"],
    queryFn: () => predictionService.getRecentPredictions(),
    staleTime: 30000,
    refetchInterval: 60000,
  });
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: () => predictionService.getEngineMetrics(),
    staleTime: 30000,
    refetchInterval: 60000,
  });
  // Dashboard tabs configuration
  const dashboardTabs = useMemo(
    () => [
      {
        key: "overview",
        label: "Overview",
        icon: _jsx(BarChart3, { size: 20 }),
        component: () =>
          _jsx(OverviewTab, {
            user: user,
            predictions: predictions,
            metrics: metrics,
          }),
      },
      {
        key: "analytics",
        label: "Analytics",
        icon: _jsx(Brain, { size: 20 }),
        component: PerformanceAnalyticsDashboard,
        isPremium: true,
      },
      {
        key: "moneymaker",
        label: "Money Maker",
        icon: _jsx(TrendingUp, { size: 20 }),
        component: UnifiedMoneyMaker,
        isPremium: true,
      },
      {
        key: "strategy",
        label: "Strategy Engine",
        icon: _jsx(Target, { size: 20 }),
        component: UnifiedStrategyEngineDisplay,
      },
      {
        key: "profile",
        label: "Profile",
        icon: _jsx(User, { size: 20 }),
        component: () => _jsx("div", { children: "Profile Component" }),
      },
    ],
    [user, predictions, metrics],
  );
  const currentTab = dashboardTabs.find((tab) => tab.key === activeTab);
  // Loading state
  if (predictionsLoading && metricsLoading) {
    return _jsx("div", {
      className: "min-h-screen p-6",
      children: _jsx(DashboardSkeleton, {}),
    });
  }
  return _jsxs("div", {
    className: "min-h-screen relative",
    children: [
      _jsx(AnimatePresence, {
        children:
          (sidebarOpen || window.innerWidth >= 1024) &&
          _jsx(motion.div, {
            initial: { x: -280 },
            animate: { x: 0 },
            exit: { x: -280 },
            className:
              "fixed left-0 top-0 h-full w-72 z-40 lg:relative lg:w-64",
            children: _jsx(CyberContainer, {
              variant: "panel",
              className: "h-full",
              style: { borderRadius: "0 16px 16px 0" },
              children: _jsxs("div", {
                className: "p-6",
                children: [
                  _jsx(CyberText, {
                    variant: "title",
                    className: "mb-6",
                    children: "A1Betting Dashboard",
                  }),
                  _jsx("nav", {
                    className: "space-y-2",
                    children: dashboardTabs.map((tab) =>
                      _jsxs(
                        MegaButton,
                        {
                          variant:
                            activeTab === tab.key ? "primary" : "secondary",
                          onClick: () => {
                            setActiveTab(tab.key);
                            setSidebarOpen(false);
                          },
                          icon: tab.icon,
                          fullWidth: true,
                          className: "justify-start",
                          children: [
                            _jsx("span", {
                              className: "ml-3",
                              children: tab.label,
                            }),
                            tab.isPremium &&
                              _jsx("span", {
                                className:
                                  "ml-auto text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded",
                                children: "PRO",
                              }),
                          ],
                        },
                        tab.key,
                      ),
                    ),
                  }),
                ],
              }),
            }),
          }),
      }),
      _jsx("div", {
        className: `transition-all duration-300 ${sidebarOpen || window.innerWidth >= 1024 ? "lg:ml-64" : ""}`,
        children: _jsxs("div", {
          className: "p-6 lg:p-8",
          children: [
            _jsxs("div", {
              className: "mb-8",
              children: [
                _jsx(CyberText, {
                  variant: "title",
                  style: { fontSize: "28px" },
                  className: "mb-2",
                  children: currentTab?.label || "Dashboard",
                }),
                _jsxs(CyberText, {
                  variant: "body",
                  color: "secondary",
                  children: [
                    "Welcome back, ",
                    user.name,
                    ". Here's your performance overview.",
                  ],
                }),
              ],
            }),
            _jsx(AnimatePresence, {
              mode: "wait",
              children: _jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  transition: { duration: 0.3 },
                  children: _jsx(Suspense, {
                    fallback: _jsx(DashboardSkeleton, {}),
                    children:
                      currentTab?.component && _jsx(currentTab.component, {}),
                  }),
                },
                activeTab,
              ),
            }),
          ],
        }),
      }),
      sidebarOpen &&
        _jsx("div", {
          className: "fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden",
          onClick: () => setSidebarOpen(false),
        }),
    ],
  });
};
const OverviewTab = ({ user, predictions, metrics }) => {
  const metricCards = [
    {
      label: "Total Profit",
      value: `$${user.totalProfit.toLocaleString()}`,
      icon: _jsx(DollarSign, { size: 24 }),
      change: "+$3.2K",
      trend: "up",
    },
    {
      label: "Accuracy",
      value: `${user.accuracy}%`,
      icon: _jsx(Target, { size: 24 }),
      change: "+2.3%",
      trend: "up",
    },
    {
      label: "Win Rate",
      value: `${user.winRate}%`,
      icon: _jsx(TrendingUp, { size: 24 }),
      change: "+1.2%",
      trend: "up",
    },
    {
      label: "Active Bets",
      value: predictions?.length || 0,
      icon: _jsx(Activity, { size: 24 }),
      change: "+5",
      trend: "up",
    },
  ];
  return _jsxs("div", {
    className: "space-y-8",
    children: [
      _jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        children: metricCards.map((metric, index) =>
          _jsx(MetricCard, { ...metric }, index),
        ),
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
        children: [
          _jsx(MegaCard, {
            title: "Recent Predictions",
            variant: "glass",
            padding: "lg",
            children: _jsx("div", {
              className: "space-y-4",
              children:
                predictions
                  ?.slice(0, 5)
                  .map((prediction, index) =>
                    _jsxs(
                      "div",
                      {
                        className:
                          "flex items-center justify-between p-3 rounded-lg bg-gray-800 bg-opacity-50",
                        children: [
                          _jsxs("div", {
                            children: [
                              _jsx(CyberText, {
                                variant: "body",
                                className: "font-medium",
                                children:
                                  prediction.game || `Game ${index + 1}`,
                              }),
                              _jsxs(CyberText, {
                                variant: "caption",
                                color: "muted",
                                children: [
                                  "Confidence: ",
                                  prediction.confidence,
                                  "%",
                                ],
                              }),
                            ],
                          }),
                          _jsx("div", {
                            className: "text-right",
                            children: _jsxs(CyberText, {
                              variant: "body",
                              style: { color: "#06ffa5" },
                              children: ["$", prediction.potentialWin || "0"],
                            }),
                          }),
                        ],
                      },
                      index,
                    ),
                  ) ||
                _jsx(CyberText, {
                  variant: "body",
                  color: "muted",
                  children: "No recent predictions available",
                }),
            }),
          }),
          _jsx(MegaCard, {
            title: "Quick Actions",
            variant: "glass",
            padding: "lg",
            children: _jsxs("div", {
              className: "space-y-4",
              children: [
                _jsx(MegaButton, {
                  variant: "primary",
                  fullWidth: true,
                  icon: _jsx(Brain, { size: 16 }),
                  children: "Run Analysis",
                }),
                _jsx(MegaButton, {
                  variant: "secondary",
                  fullWidth: true,
                  icon: _jsx(TrendingUp, { size: 16 }),
                  children: "View Opportunities",
                }),
                _jsx(MegaButton, {
                  variant: "secondary",
                  fullWidth: true,
                  icon: _jsx(Settings, { size: 16 }),
                  children: "Configure Strategy",
                }),
              ],
            }),
          }),
        ],
      }),
      metrics &&
        _jsx(MegaCard, {
          title: "Performance Summary",
          variant: "glass",
          padding: "lg",
          children: _jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
            children: [
              _jsxs("div", {
                className: "text-center",
                children: [
                  _jsx(CyberText, {
                    variant: "title",
                    style: { fontSize: "32px", color: "#06ffa5" },
                    children: metrics.totalPredictions || 0,
                  }),
                  _jsx(CyberText, {
                    variant: "body",
                    color: "secondary",
                    children: "Total Predictions",
                  }),
                ],
              }),
              _jsxs("div", {
                className: "text-center",
                children: [
                  _jsxs(CyberText, {
                    variant: "title",
                    style: { fontSize: "32px", color: "#00d4ff" },
                    children: [metrics.accuracy || user.accuracy, "%"],
                  }),
                  _jsx(CyberText, {
                    variant: "body",
                    color: "secondary",
                    children: "Average Accuracy",
                  }),
                ],
              }),
              _jsxs("div", {
                className: "text-center",
                children: [
                  _jsxs(CyberText, {
                    variant: "title",
                    style: { fontSize: "32px", color: "#06ffa5" },
                    children: [
                      "$",
                      (
                        metrics.totalProfit || user.totalProfit
                      ).toLocaleString(),
                    ],
                  }),
                  _jsx(CyberText, {
                    variant: "body",
                    color: "secondary",
                    children: "Total Profit",
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
};
export default UniversalDashboard;
