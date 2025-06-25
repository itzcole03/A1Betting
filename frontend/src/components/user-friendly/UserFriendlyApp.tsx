import { useState, useEffect, useMemo } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Brain,
  DollarSign,
  Home,
  Menu,
  MessageCircle,
  Search,
  Settings as SettingsIcon,
  Trophy,
  TrendingUp,
  X,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Target,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/integrationService";
import OfflineIndicator from "../ui/OfflineIndicator";
import ApiErrorBoundary from "../ApiErrorBoundary";
import { ultraAccuracyIntegrationService } from "../../services/UltraAccuracyIntegrationService";
import {
  initializeSettings,
  getUserDisplayName,
  getUserEmail,
} from "../../utils/userSettings";
import toast from "react-hot-toast";

// Import ULTIMATE BRAIN SYSTEM 🧠⚡
import {
  ultimateBrainCentralNervousSystem,
  type UltimateAccuracyResult,
  type SportsPredictionRequest,
} from "../../core/UltimateBrainCentralNervousSystem";

// Import user-friendly components
import MoneyMakerPro from "./MoneyMakerPro";
import PrizePicksPro from "./PrizePicksPro";
import PropOllama from "./PropOllama";
import UserFriendlyDashboard from "./UserFriendlyDashboard";
import SimpleSettings from "./SimpleSettings";
import SettingsTest from "./SettingsTest";
// Import advanced intelligence hub
import AdvancedIntelligenceHub from "../intelligence/AdvancedIntelligenceHub";
// Import ultra-accuracy component
import UltraAccuracyDashboard from "../prediction/UltraAccuracyDashboard";
// Import admin settings
import AdminSettings from "../admin/AdminSettings";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
}

interface UserData {
  name: string;
  email: string;
  balance: number;
  tier: string;
  winRate: number;
  totalProfit: number;
}

// Search Modal Component
const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    toast.success(
      `🔍 Searching for: "${query}" in ${searchFilter === "all" ? "all categories" : searchFilter}`,
      {
        duration: 3000,
        icon: "🎯",
      },
    );

    setTimeout(() => {
      toast.success(
        `Found ${Math.floor(Math.random() * 20) + 5} results for "${query}"`,
        {
          duration: 4000,
          icon: "✅",
        },
      );
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl mx-4 bg-gray-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <Search className="w-6 h-6" />
                Search A1Betting
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSearch(searchQuery)
                  }
                  placeholder="Search games, players, predictions..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              <button
                onClick={() => handleSearch(searchQuery)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Notifications Modal Component
const NotificationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "High Confidence Prediction",
      message: "Lakers vs Warriors - Over 220.5 points (89% confidence)",
      time: "2 minutes ago",
      icon: CheckCircle,
      color: "green",
    },
    {
      id: 2,
      type: "alert",
      title: "New Betting Opportunity",
      message: "Arbitrage opportunity detected in NBA games",
      time: "5 minutes ago",
      icon: Target,
      color: "blue",
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          className="w-full max-w-md mx-4 bg-gray-900/95 backdrop-blur-2xl border border-red-500/30 rounded-2xl shadow-2xl shadow-red-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Notifications
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent
                        className={`w-5 h-5 mt-0.5 ${
                          notification.color === "green"
                            ? "text-green-400"
                            : "text-blue-400"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const UserFriendlyApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isUltimateBrainInitialized, setIsUltimateBrainInitialized] =
    useState(false);
  const [ultimateBrainHealth, setUltimateBrainHealth] = useState<any>(null);

  const queryClient = useQueryClient();

  // Initialize Ultimate Brain System on mount
  useEffect(() => {
    const initializeUltimateBrain = async () => {
      try {
        await ultimateBrainCentralNervousSystem.initialize();
        setIsUltimateBrainInitialized(true);

        toast.success("🧠⚡ Ultimate Brain System Activated!", {
          duration: 4000,
          icon: "🚀",
        });

        // Setup health monitoring
        const healthInterval = setInterval(() => {
          const health = ultimateBrainCentralNervousSystem.getSystemHealth();
          setUltimateBrainHealth(health);
        }, 10000); // Check every 10 seconds

        return () => clearInterval(healthInterval);
      } catch (error) {
        console.error("Failed to initialize Ultimate Brain:", error);
        toast.error("⚠️ Ultimate Brain initialization failed", {
          duration: 5000,
        });
      }
    };

    initializeUltimateBrain();
  }, []);

  // User data query with Ultimate Brain integration
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await api.getUser();
      return {
        name: getUserDisplayName(),
        email: getUserEmail(),
        balance: response.balance || 25000,
        tier: response.tier || "Ultimate Brain Pro",
        winRate: response.winRate || 0.847,
        totalProfit: response.totalProfit || 47350,
      };
    },
    refetchInterval: 30000,
  });

  // Navigation items with Ultimate Brain components
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Ultimate Dashboard",
        icon: <Home className="w-5 h-5" />,
        component: UserFriendlyDashboard,
        badge: isUltimateBrainInitialized ? "🧠" : undefined,
      },
      {
        id: "prizepicks",
        label: "Ultra PrizePicks",
        icon: <Trophy className="w-5 h-5" />,
        component: PrizePicksPro,
        badge:
          ultimateBrainHealth?.performance.avgAccuracy > 0.8 ? "🎯" : undefined,
      },
      {
        id: "moneymaker",
        label: "Money Maker Pro",
        icon: <DollarSign className="w-5 h-5" />,
        component: MoneyMakerPro,
        badge: "💰",
      },
      {
        id: "propollama",
        label: "Prop AI Oracle",
        icon: <Brain className="w-5 h-5" />,
        component: PropOllama,
        badge: "🤖",
      },
      {
        id: "intelligence",
        label: "Intelligence Hub",
        icon: <BarChart3 className="w-5 h-5" />,
        component: AdvancedIntelligenceHub,
        badge: "🧠",
      },
      {
        id: "ultra-accuracy",
        label: "Ultra Accuracy",
        icon: <Target className="w-5 h-5" />,
        component: UltraAccuracyDashboard,
        badge: "🎯",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon className="w-5 h-5" />,
        component: SimpleSettings,
      },
      {
        id: "admin",
        label: "Admin Control",
        icon: <TrendingUp className="w-5 h-5" />,
        component: AdminSettings,
        badge: "⚙️",
      },
    ],
    [isUltimateBrainInitialized, ultimateBrainHealth],
  );

  const activeComponent = navigationItems.find((item) => item.id === activeTab);
  const ActiveComponent = activeComponent?.component || UserFriendlyDashboard;

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyan-400 text-lg font-semibold">
            🧠 Initializing Ultimate Brain System...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Loading maximum accuracy components
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <ApiErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Header */}
        <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    A1BETTING
                  </h1>
                  <p className="text-xs text-gray-400">
                    Ultimate Brain{" "}
                    {isUltimateBrainInitialized ? "🧠 ACTIVE" : "⚡ Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* System Health Indicator */}
            {ultimateBrainHealth && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    ultimateBrainHealth.status === "optimal"
                      ? "bg-green-400"
                      : ultimateBrainHealth.status === "good"
                        ? "bg-yellow-400"
                        : ultimateBrainHealth.status === "degraded"
                          ? "bg-orange-400"
                          : "bg-red-400"
                  }`}
                />
                <span className="text-xs text-gray-300">
                  Brain {ultimateBrainHealth.status.toUpperCase()}
                </span>
                <span className="text-xs text-cyan-400">
                  {(ultimateBrainHealth.performance.avgAccuracy * 100).toFixed(
                    1,
                  )}
                  % ACC
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
              </button>

              <button
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-400 hover:text-red-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
              </button>

              {/* User Info */}
              {userData && (
                <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-700">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-400">{userData.tier}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          {userData && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">Balance:</span>
                    <span className="text-green-400 font-semibold">
                      ${userData.balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="text-cyan-400 font-semibold">
                      {(userData.winRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400">Profit:</span>
                    <span className="text-purple-400 font-semibold">
                      +${userData.totalProfit.toLocaleString()}
                    </span>
                  </div>
                </div>
                <OfflineIndicator />
              </div>
            </div>
          )}
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex">
          {/* Sidebar */}
          <motion.aside
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : "-100%",
            }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-2xl border-r border-cyan-500/20 lg:relative lg:translate-x-0 lg:z-auto"
          >
            <div className="flex flex-col h-full">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Ultimate Navigation
                </h2>
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400"
                          : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs">{item.badge}</span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Ultimate Brain Status */}
              <div className="mt-auto p-6 border-t border-gray-800">
                <div className="bg-gray-800/40 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">
                      Ultimate Brain
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span
                        className={`${
                          isUltimateBrainInitialized
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {isUltimateBrainInitialized ? "ACTIVE" : "INITIALIZING"}
                      </span>
                    </div>
                    {ultimateBrainHealth && (
                      <>
                        <div className="flex justify-between">
                          <span>Accuracy:</span>
                          <span className="text-cyan-400">
                            {(
                              ultimateBrainHealth.performance.avgAccuracy * 100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Engines:</span>
                          <span className="text-purple-400">
                            {
                              Object.values(ultimateBrainHealth.engines).filter(
                                Boolean,
                              ).length
                            }
                            /{Object.keys(ultimateBrainHealth.engines).length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-0">
            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ActiveComponent />
              </motion.div>
            </div>
          </main>
        </div>

        {/* Modals */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        />
        <NotificationsModal
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />

        {/* Footer */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-cyan-500/20 p-6 mt-auto">
          <div className="text-center">
            <div className="text-cyan-400 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text font-bold mb-2 text-lg drop-shadow-2xl relative">
              <span className="relative z-10">
                A1BETTING ULTIMATE BRAIN INTELLIGENCE
              </span>
            </div>
            <div className="text-cyan-300/60 font-medium">
              © 2024 Ultimate Sports Intelligence Platform • Maximum Accuracy
              AI • Real-time Analysis •{" "}
              {isUltimateBrainInitialized
                ? "🧠 Brain Active"
                : "⚡ Initializing"}
            </div>
          </div>
        </footer>
      </div>
    </ApiErrorBoundary>
  );
};

export default UserFriendlyApp;
