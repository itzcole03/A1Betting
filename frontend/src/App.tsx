import React, { Suspense, useState, useEffect, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./providers/ThemeProvider";
import CyberSidebar from "./components/layout/CyberSidebar";
import CyberHeader from "./components/layout/CyberHeader";
import CyberFooter from "./components/layout/CyberFooter";
import CyberDashboard from "./components/dashboard/CyberDashboard";
import UnifiedDashboard from "./components/dashboard/UnifiedDashboard";
import { usePrizePicksLiveData } from "./hooks/usePrizePicksLiveData";
import { useAppStore } from "./store/useAppStore";
import Toaster from "./components/base/Toaster";
import GlassCard from "./components/ui/GlassCard";
import MetricCard from "./components/ui/MetricCard";
import CyberButton from "./components/ui/CyberButton";
import HolographicText from "./components/ui/HolographicText";

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

const LoadingScreen: React.FC = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{
      background:
        "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
      color: "white",
      fontFamily: "Inter, system-ui, sans-serif",
    }}
  >
    <div className="text-center">
      <div className="cyber-loading mb-4"></div>
      <HolographicText size="xl">Loading A1BETTING...</HolographicText>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          <GlassCard className="text-center max-w-md">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <HolographicText size="lg" className="mb-4">
              System Error
            </HolographicText>
            <p className="text-gray-300 mb-4">
              An unexpected error occurred in the quantum matrix.
            </p>
            <CyberButton onClick={() => window.location.reload()}>
              Reinitialize System
            </CyberButton>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// MAIN APP COMPONENT - EXACT PROTOTYPE MATCH
// ============================================================================

const App: React.FC = () => {
  const {
    state,
    user,
    refreshData,
    toggleDarkMode,
    toggleSidebar,
    setCurrentSection,
  } = useAppStore();

  const [isDebugMode, setIsDebugMode] = useState(false);
  const [selectedDebugComponent, setSelectedDebugComponent] = useState<
    string | null
  >(null);

  // Initialize live data and auto-refresh
  const { isConnecting } = usePrizePicksLiveData();

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.autoRefresh) {
        refreshData();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [state.autoRefresh, refreshData]);

  // Update connected sources based on actual data status
  useEffect(() => {
    // This would be connected to real data sources
    const connectedCount = isConnecting ? 0 : Math.floor(Math.random() * 5) + 3;
    // You could dispatch an action here to update connectedSources in the store
  }, [isConnecting]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  // Auto-refresh connected sources simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate changing connected sources
    }, 5000);

    return () => clearInterval(interval);
  }, [state.connectedSources]);

  // Main Application Content Component - EXACT PROTOTYPE LAYOUT
  const AppContent: React.FC = () => {
    return (
      <div
        className="flex min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Beautiful Cyber Sidebar - Fixed Width */}
        <CyberSidebar
          currentPage={state.currentSection}
          onPageChange={handleSectionChange}
          isOpen={state.sidebarOpen}
          onClose={toggleSidebar}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Beautiful Cyber Header */}
          <CyberHeader
            currentPage={state.currentSection}
            onToggleSidebar={toggleSidebar}
            theme={state.darkMode ? "dark" : "light"}
            onToggleTheme={toggleDarkMode}
            user={{
              name: "Alex Chen",
              email: "alex@a1betting.com",
              balance: 127430.5,
              tier: "Quantum Pro",
              accuracy: 97.3,
            }}
          />

          {/* Main Content */}
          <main className="flex-1 p-8">
            <ErrorBoundary>
              <CyberDashboard currentPage={state.currentSection} />
            </ErrorBoundary>
          </main>

          {/* Beautiful Footer */}
          <CyberFooter />
        </div>
      </div>
    );
  };

  // Debug components (lazy loaded for better performance)
  const debugComponents = {
    // ... debug components would go here if needed
  };

  const renderDebugComponent = () => {
    if (!selectedDebugComponent) return null;
    // Debug component rendering logic
    return <div>Debug Mode</div>;
  };

  const renderDebugMenu = () => {
    return (
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div className="container mx-auto p-4">
          <GlassCard className="text-center">
            <HolographicText size="2xl" className="mb-4">
              Debug Mode
            </HolographicText>
            <p className="text-gray-300 mb-6">
              Debug features available in development mode
            </p>
            <CyberButton onClick={() => setIsDebugMode(false)}>
              Return to App
            </CyberButton>
          </GlassCard>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
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
                  {/* Main Application - EXACT PROTOTYPE DESIGN */}
                  <AppContent />

                  {/* Debug Mode Toggle (bottom-left corner) */}
                  <button
                    onClick={() => setIsDebugMode(true)}
                    className="fixed bottom-4 left-4 p-3 glass-card rounded-full shadow-neon hover:shadow-neon-blue transition-all duration-200 z-50"
                    title="Open Debug Menu"
                    style={{
                      background: "rgba(0, 0, 0, 0.3)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    🛠️
                  </button>
                </>
              )}
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
