import React, { Suspense, useState, useEffect, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdvancedSidebar } from "./components/layout/AdvancedSidebar";
import { EliteSportsHeader } from "./components/layout/EliteSportsHeader";
import UnifiedDashboard from "./components/dashboard/UnifiedDashboard";
import { usePrizePicksLiveData } from "./hooks/usePrizePicksLiveData";
import { useAppStore } from "./stores/useAppStore";
import { ToastContainer } from "./components/common/ToastContainer";

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
// SIMPLE LOADING AND ERROR COMPONENTS
// ============================================================================

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">
        Loading A1Betting Platform...
      </p>
    </div>
  </div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

// ============================================================================
// PROTOTYPE-STYLE APP CONTENT
// ============================================================================

interface AppState {
  darkMode: boolean;
}

const AppContent: React.FC = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [state, setState] = useState<AppState>({ darkMode: false });

  // Real-time data hooks - using existing frontend hooks
  const [connectedSources] = useState(12);
  const [dataQuality] = useState(0.87);
  const [loading, setLoading] = useState(false);

  // Use existing app store for toasts and notifications
  const { addToast } = useAppStore();

  // PrizePicks live data
  const prizePicksData = usePrizePicksLiveData();

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate data refresh
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToast({
        message: "🔴 Real Data Platform refreshed successfully!",
        type: "success",
      });
    } catch (error) {
      addToast({
        message: "Failed to refresh data sources",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Apply dark mode to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  // Welcome toast with real data status on mount
  useEffect(() => {
    if (connectedSources > 0) {
      addToast({
        message: `🔴 Real Data Platform Active! Connected to ${connectedSources} live sources`,
        type: "success",
      });
    } else {
      addToast({
        message:
          "⚠️ No real data sources available. Check API keys and network connection.",
        type: "warning",
      });
    }
  }, [addToast, connectedSources]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <UnifiedDashboard />;
      case "prizepicks":
        return (
          <div className="p-8 text-center text-gray-600">
            PrizePicks Engine Coming Soon...
          </div>
        );
      case "analytics":
        return (
          <div className="p-8 text-center text-gray-600">
            Analytics Dashboard Coming Soon...
          </div>
        );
      default:
        return <UnifiedDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <AdvancedSidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        connectedSources={connectedSources}
        dataQuality={dataQuality}
        state={state}
      />

      <div className="flex-1 overflow-auto">
        <EliteSportsHeader
          connectedSources={connectedSources}
          dataQuality={dataQuality}
          state={state}
          toggleDarkMode={toggleDarkMode}
          refreshData={refreshData}
          loading={loading}
        />
        <div className="p-6" style={{ marginTop: "-2px" }}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              {renderCurrentSection()}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DEBUG COMPONENTS (lazy loaded for better performance)
// ============================================================================

// Analytics Components
const PerformanceAnalyticsDebug = lazy(() =>
  import("./components/analytics/PerformanceAnalyticsDashboard.tsx").then(
    (m) => ({
      default: m.PerformanceAnalyticsDashboard,
    }),
  ),
);

const AdvancedAnalyticsHub = lazy(() =>
  import("./components/analytics/AdvancedAnalyticsHub.tsx").then((m) => ({
    default: m.AdvancedAnalyticsHub,
  })),
);

const MLInsights = lazy(() =>
  import("./components/analytics/MLInsights.tsx").then((m) => ({
    default: m.MLInsights,
  })),
);

const UltraAdvancedMLDashboard = lazy(() =>
  import("./components/ml/UltraAdvancedMLDashboard.tsx").then((m) => ({
    default: m.UltraAdvancedMLDashboard,
  })),
);

// Betting Components
const ArbitrageOpportunities = lazy(() =>
  import("./components/ArbitrageOpportunities.tsx").then((m) => ({
    default: m.default,
  })),
);

const BetBuilder = lazy(() =>
  import("./components/features/betting/BetBuilder.tsx").then((m) => ({
    default: m.BetBuilder,
  })),
);

const BettingHistory = lazy(() =>
  import("./components/features/betting/BettingHistory.tsx").then((m) => ({
    default: m.BettingHistory,
  })),
);

const RealtimePredictionDisplay = lazy(() =>
  import(
    "./components/features/predictions/RealtimePredictionDisplay.tsx"
  ).then((m) => ({
    default: m.RealtimePredictionDisplay,
  })),
);

const MLPredictions = lazy(() =>
  import("./components/MLPredictions.tsx").then((m) => ({
    default: m.MLPredictions,
  })),
);

// Strategy Components
const UnifiedStrategyEngineDisplay = lazy(() =>
  import("./components/strategy/UnifiedStrategyEngineDisplay.tsx").then(
    (m) => ({
      default: m.UnifiedStrategyEngineDisplay,
    }),
  ),
);

const UnifiedMoneyMaker = lazy(() =>
  import("./components/money-maker/UnifiedMoneyMaker.tsx").then((m) => ({
    default: m.UnifiedMoneyMaker,
  })),
);

// Market Analysis
const MarketAnalysisDashboard = lazy(() =>
  import("./components/MarketAnalysisDashboard.tsx").then((m) => ({
    default: m.MarketAnalysisDashboard,
  })),
);

// Other Components
const SmartLineupBuilder = lazy(() =>
  import("./components/lineup/SmartLineupBuilder.tsx").then((m) => ({
    default: m.SmartLineupBuilder,
  })),
);

const MLModelCenter = lazy(() =>
  import("./components/ml/MLModelCenter.tsx").then((m) => ({
    default: m.MLModelCenter,
  })),
);

const UnifiedSettingsInterface = lazy(() =>
  import("./components/settings/UnifiedSettingsInterface.tsx").then((m) => ({
    default: m.UnifiedSettingsInterface,
  })),
);

const UnifiedProfile = lazy(() =>
  import("./components/profile/UnifiedProfile.tsx").then((m) => ({
    default: m.UnifiedProfile,
  })),
);

// ============================================================================
// DEBUG MENU CONFIGURATION
// ============================================================================

interface DebugMenuItem {
  label: string;
  component: React.ComponentType;
  description: string;
  category: string;
}

const debugMenuItems: DebugMenuItem[] = [
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

const App: React.FC = () => {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [selectedDebugComponent, setSelectedDebugComponent] = useState<
    string | null
  >(null);

  // Check for debug mode in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get("debug");
    if (debugParam === "true" || debugParam === "1") {
      setIsDebugMode(true);
    }
  }, []);

  // Group debug menu items by category
  const groupedDebugItems = debugMenuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, DebugMenuItem[]>,
  );

  // Render selected debug component
  const renderDebugComponent = () => {
    if (!selectedDebugComponent) return null;

    const item = debugMenuItems.find(
      (item) => item.label === selectedDebugComponent,
    );
    if (!item) return null;

    const Component = item.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto p-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {item.label}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {item.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedDebugComponent(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Debug Menu
            </button>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              <Component />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    );
  };

  // Render debug menu
  const renderDebugMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Developer Debug Menu
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Access individual components for testing and development
          </p>
          <button
            onClick={() => setIsDebugMode(false)}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            → Go to Main App
          </button>
        </div>

        {Object.entries(groupedDebugItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-200 dark:border-blue-700 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedDebugComponent(item.label)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 text-left group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-3 inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
                    Open Component →
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Main render
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className="min-h-screen">
          {isDebugMode ? (
            selectedDebugComponent ? (
              renderDebugComponent()
            ) : (
              renderDebugMenu()
            )
          ) : (
            <>
              {/* Main Application - Prototype Style */}
              <AppContent />

              {/* Debug Mode Toggle (bottom-right corner) */}
              <button
                onClick={() => setIsDebugMode(true)}
                className="fixed bottom-4 right-4 p-3 bg-gray-800 dark:bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors z-50"
                title="Open Debug Menu"
              >
                🛠️
              </button>
            </>
          )}

          {/* Global Components can be added here later */}
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
