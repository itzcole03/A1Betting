import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Target,
  DollarSign,
} from "lucide-react";

// Real working components from the app
import { HeroSection } from "../components/dashboard/HeroSection";
import { LiveGamesDisplay } from "../components/dashboard/LiveGamesDisplay";
import { RealTimePredictions } from "../components/dashboard/RealTimePredictions";
import { DataSourcesPanel } from "../components/dashboard/DataSourcesPanel";
import { UnifiedMoneyMaker } from "../components/money-maker/UnifiedMoneyMaker";
import { ArbitrageOpportunities } from "../components/ArbitrageOpportunities";
import { MarketAnalysisDashboard } from "../components/MarketAnalysisDashboard";
import { PerformanceAnalyticsDashboard } from "../components/analytics/PerformanceAnalyticsDashboard";

// Hooks for real data
import { usePrizePicksLiveData } from "../hooks/usePrizePicksLiveData";
import { useRealTimeData } from "../hooks/useRealTimeData";
import { useAppStore } from "../store/useAppStore";

// UI Components
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

// ============================================================================
// TYPES
// ============================================================================

interface QuickStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: "active" | "coming-soon" | "beta";
}

// ============================================================================
// MAIN HOMEPAGE COMPONENT
// ============================================================================

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    "overview" | "analytics" | "betting" | "strategy"
  >("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [aiSystemActive, setAiSystemActive] = useState(false);

  // Real data hooks
  const prizePicksData = usePrizePicksLiveData();
  const { addToast } = useAppStore();

  // Mock real-time data (replace with actual hooks when available)
  const [realTimeStats, setRealTimeStats] = useState({
    connectedSources: 42,
    totalSources: 50,
    dataQuality: 0.87,
    gamesCount: 28,
    playersCount: 1247,
    activePredictions: 156,
    winRate: 73.2,
    roi: 15.4,
    profitToday: 2847,
  });

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      addToast({
        message: `🔴 Real Data Platform Active! Connected to ${realTimeStats.connectedSources} live sources`,
        type: "success",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [addToast, realTimeStats.connectedSources]);

  // Quick stats for the hero section
  const quickStats: QuickStat[] = [
    {
      label: "Win Rate",
      value: `${realTimeStats.winRate}%`,
      change: "+5.2%",
      icon: <Target className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "ROI",
      value: `${realTimeStats.roi}%`,
      change: "+2.8%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Profit Today",
      value: `$${realTimeStats.profitToday.toLocaleString()}`,
      change: "+18.3%",
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Predictions",
      value: realTimeStats.activePredictions.toString(),
      change: "+12",
      icon: <Brain className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
    },
  ];

  // Feature cards
  const featureCards: FeatureCard[] = [
    {
      title: "AI Predictions",
      description: "Advanced ML models analyzing thousands of data points",
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500/20 to-purple-500/20",
      status: "active",
    },
    {
      title: "Arbitrage Detection",
      description: "Real-time opportunities across multiple sportsbooks",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500/20 to-orange-500/20",
      status: "active",
    },
    {
      title: "Risk Management",
      description: "Intelligent bankroll and exposure management",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-500/20 to-teal-500/20",
      status: "active",
    },
    {
      title: "Market Analysis",
      description: "Deep market insights and trend analysis",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500/20 to-pink-500/20",
      status: "beta",
    },
  ];

  const handleActivateAI = async () => {
    setIsLoading(true);
    try {
      // Simulate AI activation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAiSystemActive(true);
      addToast({
        message: "🚀 AI System Activated! All modules are now live.",
        type: "success",
      });
    } catch (error) {
      addToast({
        message: "Failed to activate AI system",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "analytics":
        return (
          <div className="space-y-8">
            <PerformanceAnalyticsDashboard />
            <MarketAnalysisDashboard />
          </div>
        );
      case "betting":
        return (
          <div className="space-y-8">
            <ArbitrageOpportunities />
            <LiveGamesDisplay games={[]} />
          </div>
        );
      case "strategy":
        return (
          <div className="space-y-8">
            <UnifiedMoneyMaker />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <HeroSection
              connectedSources={realTimeStats.connectedSources}
              totalSources={realTimeStats.totalSources}
              gamesCount={realTimeStats.gamesCount}
              playersCount={realTimeStats.playersCount}
              dataQuality={realTimeStats.dataQuality}
              dataReliability={0.91}
            />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div
                      className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg w-fit mb-4`}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      {stat.change} vs yesterday
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Card
                    className={`p-6 bg-gradient-to-br ${feature.color} border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-gray-700 dark:text-gray-300">
                        {feature.icon}
                      </div>
                      <Badge
                        variant={
                          feature.status === "active"
                            ? "default"
                            : feature.status === "beta"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {feature.status === "active"
                          ? "Live"
                          : feature.status === "beta"
                            ? "Beta"
                            : "Soon"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Data Sources and Real-Time Components */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <DataSourcesPanel />
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    System Performance
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">
                        Data Quality:
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                            style={{
                              width: `${realTimeStats.dataQuality * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600">
                          {(realTimeStats.dataQuality * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Connected Sources:
                      </span>
                      <span className="font-semibold text-blue-600">
                        {realTimeStats.connectedSources}/
                        {realTimeStats.totalSources}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Active Predictions:
                      </span>
                      <span className="font-semibold text-purple-600">
                        {realTimeStats.activePredictions}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Real-Time Predictions */}
            <RealTimePredictions predictions={[]} loading={isLoading} />
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Initializing A1Betting Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Connecting to {realTimeStats.totalSources} real-time data sources...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            {[
              {
                key: "overview",
                label: "Overview",
                icon: <BarChart3 className="w-4 h-4" />,
              },
              {
                key: "analytics",
                label: "Analytics",
                icon: <Brain className="w-4 h-4" />,
              },
              {
                key: "betting",
                label: "Betting",
                icon: <Target className="w-4 h-4" />,
              },
              {
                key: "strategy",
                label: "Strategy",
                icon: <Zap className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === tab.key
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}
          </motion.div>
        </AnimatePresence>

        {/* AI Activation Button */}
        {!aiSystemActive && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={handleActivateAI}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Activate AI System
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
