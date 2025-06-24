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
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl border border-gray-600 bg-gray-800/60 hover:bg-gray-700/60 transition-all cursor-pointer"
                    onClick={() => {
                      toast.success(`Opened: ${notification.title}`, {
                        icon: "👁️",
                      });
                      onClose();
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className="w-5 h-5 mt-0.5 text-green-400" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
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

export const UserFriendlyApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [ultraAccuracyStats, setUltraAccuracyStats] = useState<any>(null);
  const [userSettings, setUserSettings] = useState({
    name: "User",
    email: "user@a1betting.com",
    darkMode: true,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const queryClient = useQueryClient();

  // Initialize settings on app mount
  useEffect(() => {
    initializeSettings();
  }, []);

  // Initialize Ultra Accuracy integration
  useEffect(() => {
    const updateStats = () => {
      const stats = ultraAccuracyIntegrationService.getLiveStats();
      setUltraAccuracyStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 10000);

    ultraAccuracyIntegrationService.on("statusUpdated", updateStats);

    return () => {
      clearInterval(interval);
      ultraAccuracyIntegrationService.off("statusUpdated", updateStats);
    };
  }, []);

  // Real API data fetching
  const { data: userProfile, error: userError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const result = await api.getUserProfile("default_user");
      return result;
    },
    retry: 2,
    retryDelay: 1000,
  });

  const { data: userAnalytics, error: analyticsError } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: async () => {
      const result = await api.getUserAnalytics("default_user");
      return result;
    },
    retry: 2,
    retryDelay: 1000,
  });

  const { data: healthStatus, error: healthError } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: async () => {
      const result = await api.getHealthStatus();
      return result;
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const { data: accuracyMetrics, error: accuracyError } = useQuery({
    queryKey: ["accuracyMetrics"],
    queryFn: async () => {
      const result = await api.getAccuracyMetrics();
      return result;
    },
    refetchInterval: 10000,
    retry: 2,
    retryDelay: 1000,
  });

  // Check if backend is offline
  const isOffline = healthError || healthStatus?.status === "offline";

  // Handle retry functionality
  const handleRetry = () => {
    queryClient.invalidateQueries();
  };

  // Load user settings from localStorage
  useEffect(() => {
    const loadUserSettings = () => {
      setUserSettings({
        name: getUserDisplayName(),
        email: getUserEmail(),
        darkMode: true,
      });
    };

    loadUserSettings();

    const handleSettingsChange = (event: CustomEvent) => {
      const newSettings = event.detail;
      setUserSettings({
        name: newSettings.profile?.name || getUserDisplayName(),
        email: newSettings.profile?.email || getUserEmail(),
        darkMode: newSettings.display?.darkMode ?? true,
      });
    };

    window.addEventListener(
      "settingsChanged",
      handleSettingsChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "settingsChanged",
        handleSettingsChange as EventListener,
      );
    };
  }, []);

  // Extract real user data from backend
  const user: UserData = {
    name: userSettings.name || userProfile?.name || "User",
    email: userSettings.email || userProfile?.email || "user@a1betting.com",
    balance: userAnalytics?.current_balance || 0,
    tier: userProfile?.tier || "Free",
    winRate: accuracyMetrics?.overall_accuracy * 100 || 0,
    totalProfit: userAnalytics?.total_profit || 0,
  };

  // Extract live stats from real API data
  const liveStats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return {
      liveGames: healthStatus?.metrics?.active_predictions || 0,
      aiAccuracy: accuracyMetrics?.overall_accuracy * 100 || 0,
      profit24h: userAnalytics?.daily?.[today] || 0,
      activeUsers: healthStatus?.metrics?.active_connections || 0,
    };
  }, [healthStatus, accuracyMetrics, userAnalytics]);

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      component: UserFriendlyDashboard,
    },
    {
      id: "money-maker",
      label: "Money Maker Pro",
      icon: <DollarSign className="w-5 h-5" />,
      component: MoneyMakerPro,
      badge: "HOT",
    },
    {
      id: "prizepicks",
      label: "PrizePicks Pro",
      icon: <Trophy className="w-5 h-5" />,
      component: PrizePicksPro,
      badge: "NEW",
    },
    {
      id: "propgpt",
      label: "PropOllama",
      icon: <MessageCircle className="w-5 h-5" />,
      component: PropOllama,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      component: UserFriendlyDashboard,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon className="w-5 h-5" />,
      component: SimpleSettings,
    },
  ];

  const currentItem = navigationItems.find((item) => item.id === currentPage);
  const CurrentComponent = currentItem?.component || UserFriendlyDashboard;

  return (
    <ApiErrorBoundary>
      <div className="user-friendly-app min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Offline Indicator */}
        <OfflineIndicator
          show={!!isOffline}
          service="Backend Services"
          onRetry={handleRetry}
        />

        {/* Search Modal */}
        <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10 relative">
          <div className="relative max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 rounded-xl blur-xl opacity-80 animate-pulse" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 border border-cyan-400/30">
                    <Brain className="w-7 h-7 text-black font-bold drop-shadow-lg" />
                  </div>
                </motion.div>

                <div>
                  <h1 className="text-2xl font-black text-cyan-400 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text drop-shadow-2xl relative">
                    <span className="relative z-10">A1BETTING</span>
                  </h1>
                  <p className="text-xs text-cyan-300/80 uppercase tracking-wider font-semibold">
                    Quantum Intelligence Platform
                  </p>
                </div>
              </div>

              {/* User Info & Actions */}
              <div className="flex items-center space-x-6">
                {/* User Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-60" />
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=7c3aed&color=fff&bold=true`}
                      alt="Profile"
                      className="relative w-10 h-10 rounded-full border-2 border-purple-500 shadow-2xl shadow-purple-500/50"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="font-semibold text-white text-sm drop-shadow-lg">
                      {user.name}
                    </div>
                    <div className="text-xs text-cyan-300/80">{user.email}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                    className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border-2 ${
                      isAdvancedMode
                        ? "bg-gradient-to-r from-purple-500/50 to-blue-500/50 border-purple-400 text-purple-300 shadow-2xl shadow-purple-500/50"
                        : "bg-gray-800/80 hover:bg-gray-700/80 border-gray-500 text-gray-300 hover:text-purple-300 hover:border-purple-400 hover:bg-gray-600/80"
                    }`}
                    title={
                      isAdvancedMode
                        ? "Exit Intelligence Hub"
                        : "Enter Intelligence Hub"
                    }
                  >
                    <span className="text-lg drop-shadow-lg font-bold">
                      {isAdvancedMode ? "🧠" : "⚡"}
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowSearch(true)}
                    className="p-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl hover:bg-blue-500/30 hover:border-blue-400 transition-all backdrop-blur-sm group"
                    title="Search games, players, and predictions"
                  >
                    <Search className="w-5 h-5 text-gray-300 group-hover:text-blue-300 transition-colors drop-shadow-lg" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowNotifications(true)}
                    className="relative p-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl hover:bg-red-500/30 hover:border-red-400 transition-all backdrop-blur-sm group"
                    title="View notifications and alerts"
                  >
                    <Bell className="w-5 h-5 text-gray-300 group-hover:text-red-300 transition-colors drop-shadow-lg" />
                    <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 border border-white/50" />
                  </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-gray-200 hover:text-white hover:border-cyan-400 hover:bg-gray-700/80 transition-all backdrop-blur-sm"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 drop-shadow-lg" />
                  ) : (
                    <Menu className="w-6 h-6 drop-shadow-lg" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 min-h-screen bg-black/30 backdrop-blur-2xl border-r border-cyan-500/20 relative">
            <div className="relative p-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 backdrop-blur-sm border-2 ${
                      currentPage === item.id
                        ? "bg-gradient-to-r from-cyan-500/50 to-blue-500/50 border-cyan-400 text-cyan-200 shadow-2xl shadow-cyan-500/50"
                        : "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-500/30 border-gray-600 hover:border-cyan-400 bg-gray-800/50 hover:bg-gray-700/70"
                    }`}
                  >
                    <div
                      className={`${currentPage === item.id ? "text-cyan-400 drop-shadow-lg" : "text-gray-400"} transition-all`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-semibold flex-1 drop-shadow-lg">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full shadow-lg shadow-cyan-500/50">
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  className="w-80 h-full bg-slate-900/95 backdrop-blur-2xl border-r border-cyan-500/30 p-6 relative shadow-2xl shadow-cyan-500/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentPage(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all backdrop-blur-sm border-2 ${
                            currentPage === item.id
                              ? "bg-gradient-to-r from-cyan-500/50 to-blue-500/50 border-cyan-400 text-cyan-200 shadow-2xl shadow-cyan-500/50"
                              : "text-gray-200 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400 hover:text-cyan-200 border-gray-600 hover:border-cyan-400 bg-gray-800/60 hover:bg-gray-700/80"
                          }`}
                        >
                          <div
                            className={`${currentPage === item.id ? "text-cyan-400 drop-shadow-lg" : "text-gray-400"} transition-all`}
                          >
                            {item.icon}
                          </div>
                          <span className="font-semibold flex-1 drop-shadow-lg">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full shadow-lg shadow-cyan-500/50">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 min-h-screen pt-24">
            <div className="p-6">
              <div>
                {isAdvancedMode ? (
                  <AdvancedIntelligenceHub />
                ) : (
                  <CurrentComponent onNavigate={setCurrentPage} />
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="relative bg-black/30 backdrop-blur-2xl border-t border-cyan-500/20 py-6 shadow-2xl shadow-cyan-500/10">
          <div className="relative max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
            <div className="text-cyan-400 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text font-bold mb-2 text-lg drop-shadow-2xl relative">
              <span className="relative z-10">
                A1BETTING QUANTUM INTELLIGENCE
              </span>
            </div>
            <div className="text-cyan-300/60 font-medium">
              © 2024 Advanced Sports Intelligence Platform • Auto-Optimizing AI
              • Real-time Analysis
            </div>
          </div>
        </footer>
      </div>
    </ApiErrorBoundary>
  );
};

export default UserFriendlyApp;
