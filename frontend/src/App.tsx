import React, {
  Component,
  ErrorInfo,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
} from "react";
import PremiumDashboard from "./components/dashboard/PremiumDashboard.tsx";
import { MLPredictions } from "./components/MLPredictions.tsx";
import PerformanceMonitor from "./components/PerformanceMonitor.tsx";
import WebSocketSecurityDashboard from "./components/WebSocketSecurityDashboard.tsx";
import PrizePicksPageEnhanced from "./pages/PrizePicksPageEnhanced.tsx";

// Core Money-Making Components
import UltimateMoneyMaker from "./components/betting/UltimateMoneyMaker.tsx";
import MoneyMakerAdvanced from "./components/MoneyMaker/MoneyMakerAdvanced.tsx";
import UltimateMoneyMakerEnhanced from "./components/UltimateMoneyMakerEnhanced.tsx";

// Enhanced Design System
import {
  Badge,
  Button,
  Card,
  Spinner,
} from "./components/ui/design-system.tsx";
import { cn } from "./lib/utils.ts";

// Builder.io components and initialization
import "./components/builder";

// Ultra-Advanced Accuracy Components
const UltraAdvancedMLDashboard = lazy(
  () => import("./components/ml/UltraAdvancedMLDashboard.tsx"),
);
const AdvancedConfidenceVisualizer = lazy(
  () => import("./components/prediction/AdvancedConfidenceVisualizer.tsx"),
);
const RealTimeAccuracyDashboard = lazy(
  () => import("./components/analytics/RealTimeAccuracyDashboard.tsx"),
);
const QuantumPredictionsInterface = lazy(
  () => import("./components/prediction/QuantumPredictionsInterface.tsx"),
);
const UltraAccuracyOverview = lazy(
  () => import("./components/overview/UltraAccuracyOverview.tsx"),
);
const RevolutionaryAccuracyInterface = lazy(
  () => import("./components/revolutionary/RevolutionaryAccuracyInterface.tsx"),
);
const EnhancedRevolutionaryInterface = lazy(
  () => import("./components/revolutionary/EnhancedRevolutionaryInterface.tsx"),
);

// TypeScript interfaces
interface NavigationItem {
  href: string;
  label: string;
  color: string;
}

interface NavigationGroup {
  group: string;
  items: NavigationItem[];
}

interface LoadingFallbackProps {
  message?: string;
}

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  routeName: string;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface SuspenseWrapperProps {
  children: React.ReactNode;
  loadingMessage?: string;
}

interface RouteWrapperProps {
  children: React.ReactNode;
  routeName: string;
}

// Enhanced Loading Component with Design System
const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = "Loading...",
}) => (
  <div
    className="flex-center flex-col h-64 space-y-6"
    role="status"
    aria-live="polite"
  >
    <Spinner variant="brand" size="xl" />
    <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
      {message}
    </div>
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce dot-delay-0" />
      <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce dot-delay-150" />
      <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce dot-delay-300" />
    </div>
  </div>
);

// Enhanced Error Boundary
class RouteErrorBoundary extends Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in route ${this.props.routeName}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card
          variant="premium"
          className="flex-center flex-col h-64 space-y-6 text-center max-w-md mx-auto"
        >
          <div className="text-6xl animate-bounce">⚠️</div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Component Error
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              There was an error loading the {this.props.routeName} component.
            </p>
          </div>
          <Button
            variant="premium"
            onClick={() => window.location.reload()}
            aria-label="Reload page to fix error"
            className="min-w-32"
          >
            Reload Page
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Lazy-loaded Advanced Components with optimized loading
const AdvancedMLDashboard = lazy(() =>
  import("./components/MoneyMaker/AdvancedMLDashboard.tsx").then((m) => ({
    default: m.AdvancedMLDashboard,
  })),
);
const HyperMLInsights = lazy(
  () => import("./components/analytics/HyperMLInsights.tsx"),
);
const EvolutionaryInsights = lazy(
  () => import("./components/analytics/EvolutionaryInsights.tsx"),
);
const RealTimeDataStream = lazy(
  () => import("./components/realtime/RealTimeDataStream.tsx"),
);
const UnifiedDashboard = lazy(() =>
  import("./components/dashboard/UnifiedDashboard.tsx").then((m) => ({
    default: m.default,
  })),
);
const UnifiedBettingInterface = lazy(
  () => import("./components/betting/UnifiedBettingInterface.tsx"),
);
const WhatIfSimulator = lazy(
  () => import("./components/advanced/WhatIfSimulator.tsx"),
);
const SmartLineupBuilder = lazy(() =>
  import("./components/lineup/SmartLineupBuilder.tsx").then((m) => ({
    default: m.SmartLineupBuilder,
  })),
);
const MarketAnalysisDashboard = lazy(() =>
  import("./components/MarketAnalysisDashboard.tsx").then((m) => ({
    default: m.MarketAnalysisDashboard,
  })),
);
const MLModelCenter = lazy(() =>
  import("./components/ml/MLModelCenter.tsx").then((m) => ({
    default: m.default,
  })),
);
const UnifiedPredictionInterface = lazy(() =>
  import("./components/prediction/UnifiedPredictionInterface.tsx").then(
    (m) => ({ default: m.UnifiedPredictionInterface }),
  ),
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
const ArbitrageOpportunities = lazy(
  () => import("./components/ArbitrageOpportunities.tsx"),
);
const AdvancedAnalytics = lazy(() =>
  import("./components/analytics/AdvancedAnalytics.tsx").then((m) => ({
    default: m.AdvancedAnalytics,
  })),
);
const PerformanceAnalyticsDashboard = lazy(
  () => import("./components/analytics/PerformanceAnalyticsDashboard.tsx"),
);
const AdvancedAnalyticsHub = lazy(
  () => import("./components/analytics/AdvancedAnalyticsHub.tsx"),
);
const MobileOptimizedInterface = lazy(
  () => import("./components/mobile/MobileOptimizedInterface.tsx"),
);

// Navigation configuration for better maintainability
const navigationConfig: NavigationGroup[] = [
  {
    group: "Core",
    items: [
      {
        href: "#/",
        label: "🏠 Premium Dashboard",
        color: "text-gray-900 dark:text-gray-100",
      },
      {
        href: "#/prizepicks-enhanced",
        label: "🎯 PrizePicks Pro",
        color: "text-indigo-600",
      },
    ],
  },
  {
    group: "Money Making Suite",
    items: [
      {
        href: "#/money-maker",
        label: "💰 Money Maker",
        color: "text-blue-600",
      },
      {
        href: "#/money-maker-advanced",
        label: "🚀 Advanced",
        color: "text-green-600",
      },
      {
        href: "#/money-maker-enhanced",
        label: "⚡ Enhanced",
        color: "text-purple-600",
      },
    ],
  },
  {
    group: "Advanced ML Suite",
    items: [
      {
        href: "#/advanced-ml",
        label: "🧠 Advanced ML",
        color: "text-indigo-600",
      },
      { href: "#/hyper-ml", label: "🔥 Hyper ML", color: "text-pink-600" },
      {
        href: "#/evolutionary",
        label: "🧬 Evolutionary",
        color: "text-orange-600",
      },
      { href: "#/ml-center", label: "🎯 ML Center", color: "text-cyan-600" },
    ],
  },
  {
    group: "Ultra-Accuracy Suite",
    items: [
      {
        href: "#/ultra-accuracy-overview",
        label: "🎯 Accuracy Overview",
        color: "text-purple-600",
      },
      {
        href: "#/ultra-ml-dashboard",
        label: "🧠 Ultra ML Dashboard",
        color: "text-purple-600",
      },
      {
        href: "#/confidence-visualizer",
        label: "📊 Confidence Analysis",
        color: "text-blue-600",
      },
      {
        href: "#/accuracy-monitor",
        label: "🔍 Real-time Monitor",
        color: "text-green-600",
      },
      {
        href: "#/quantum-predictions",
        label: "⚛️ Quantum Predictions",
        color: "text-violet-600",
      },
    ],
  },
  {
    group: "Revolutionary 2024 Research",
    items: [
      {
        href: "#/revolutionary-accuracy",
        label: "🚀 Revolutionary Engine",
        color: "text-pink-600",
      },
      {
        href: "#/enhanced-revolutionary",
        label: "🧮 Enhanced Mathematical Engine",
        color: "text-purple-700",
      },
      {
        href: "#/neuromorphic-interface",
        label: "🧠 Neuromorphic Computing",
        color: "text-indigo-600",
      },
      {
        href: "#/physics-informed",
        label: "⚗️ Physics-Informed ML",
        color: "text-emerald-600",
      },
      {
        href: "#/causal-discovery",
        label: "🔀 Causal Inference",
        color: "text-orange-600",
      },
      {
        href: "#/manifold-learning",
        label: "🌐 Manifold Learning",
        color: "text-cyan-600",
      },
    ],
  },
  {
    group: "Analytics & Real-time",
    items: [
      { href: "#/analytics", label: "📊 Analytics", color: "text-emerald-600" },
      {
        href: "#/analytics-hub",
        label: "🚀 Analytics Hub",
        color: "text-purple-600",
      },
      {
        href: "#/performance",
        label: "📈 Performance",
        color: "text-blue-600",
      },
      { href: "#/real-time", label: "⚡ Real-time", color: "text-red-600" },
      {
        href: "#/market-analysis",
        label: "📈 Market Analysis",
        color: "text-teal-600",
      },
    ],
  },
  {
    group: "Mobile & PWA",
    items: [
      {
        href: "#/mobile",
        label: "📱 Mobile Experience",
        color: "text-pink-600",
      },
    ],
  },
  {
    group: "Unified Interfaces",
    items: [
      {
        href: "#/unified-dashboard",
        label: "🌟 Unified Dashboard",
        color: "text-violet-600",
      },
      {
        href: "#/unified-betting",
        label: "🎲 Unified Betting",
        color: "text-amber-600",
      },
      {
        href: "#/unified-predictions",
        label: "🔮 Unified Predictions",
        color: "text-lime-600",
      },
    ],
  },
  {
    group: "Advanced Tools",
    items: [
      {
        href: "#/what-if",
        label: "🔬 What-If Simulator",
        color: "text-slate-600",
      },
      {
        href: "#/lineup-builder",
        label: "🏗️ Lineup Builder",
        color: "text-stone-600",
      },
      { href: "#/arbitrage", label: "⚖️ Arbitrage", color: "text-rose-600" },
    ],
  },
  {
    group: "User & Core Features",
    items: [
      { href: "#/profile", label: "👤 Profile", color: "text-blue-500" },
      { href: "#/settings", label: "⚙️ Settings", color: "text-gray-600" },
      {
        href: "#/ml-predictions",
        label: "🧠 ML Predictions",
        color: "text-indigo-600",
      },
      { href: "#/security", label: "🔒 Security", color: "text-red-600" },
    ],
  },
];

// Route wrapper with error boundary and loading
const RouteWrapper: React.FC<RouteWrapperProps> = ({ children, routeName }) => (
  <RouteErrorBoundary routeName={routeName}>{children}</RouteErrorBoundary>
);

// Suspense wrapper with custom loading
const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  loadingMessage,
}) => (
  <Suspense fallback={<LoadingFallback message={loadingMessage} />}>
    {children}
  </Suspense>
);

const App: React.FC = () => {
  // Always show UnifiedDashboard by default - no complex routing needed
  const [showDebugMenu, setShowDebugMenu] = useState(false);

  // Show debug menu only in development or when explicitly requested
  useEffect(() => {
    const showMenu =
      import.meta.env.MODE === "development" &&
      new URLSearchParams(window.location.search).has("debug");
    setShowDebugMenu(showMenu);
  }, []);

  // No complex routing needed - just render the main dashboard
  // Debug mode toggle for development
  const toggleDebugMenu = useCallback(() => {
    setShowDebugMenu(!showDebugMenu);
  }, [showDebugMenu]);

  // Simple render - just show the unified dashboard like the prototype
  const renderMainApp = () => (
    <RouteWrapper routeName="Unified Dashboard">
      <SuspenseWrapper loadingMessage="Loading A1Betting Platform...">
        <UnifiedDashboard />
      </SuspenseWrapper>
    </RouteWrapper>
  );

  // Debug menu for development (only shown when explicitly requested)
  const renderDebugMenu = () => (
    <div className="p-6">
      <Card className="max-w-4xl mx-auto">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Development Debug Menu</h1>
          <p className="text-gray-600 mb-6">
            This menu is only available in development mode. Add ?debug to the
            URL to access individual components.
          </p>
          <Button onClick={() => setShowDebugMenu(false)} className="mb-4">
            ← Back to Main Dashboard
          </Button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {navigationConfig.slice(0, 3).map((group) => (
              <div key={group.group} className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-700">
                  {group.group}
                </h3>
                {group.items.slice(0, 5).map((item) => (
                  <Button
                    key={item.href}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => (window.location.hash = item.href)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );

  // Render the clean app like the prototype - main dashboard with optional debug access
  return (
    <div className="min-h-screen">
      {/* Main App - Clean like prototype */}
      {!showDebugMenu && renderMainApp()}

      {/* Debug Menu - Only for development */}
      {showDebugMenu && renderDebugMenu()}

      {/* Development Debug Toggle */}
      {import.meta.env.MODE === "development" && (
        <button
          onClick={toggleDebugMenu}
          className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full text-xs"
          title="Toggle Debug Menu"
        >
          {showDebugMenu ? "🏠" : "🛠️"}
        </button>
      )}

      {/* Development Performance Monitor */}
      {typeof window !== "undefined" &&
        import.meta.env.MODE === "development" &&
        !showDebugMenu && (
          <div className="fixed bottom-4 left-4 z-40">
            <PerformanceMonitor />
          </div>
        )}
    </div>
  );
};

export default App;
