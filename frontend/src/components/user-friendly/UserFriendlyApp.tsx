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
import toast from "react-hot-toast";
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

// Add missing CSS classes for prototype styling
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes glow-pulse {
    0% { box-shadow: 0 0 20px rgba(0,255,136,0.4); }
    100% { box-shadow: 0 0 40px rgba(0,255,136,0.8); }
  }

  @keyframes slide-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes cyber-pulse {
    0%, 100% { text-shadow: 0 0 10px rgba(0,255,136,0.8); }
    50% { text-shadow: 0 0 20px rgba(0,255,136,1), 0 0 30px rgba(0,255,136,0.8); }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .dark .glass-card {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .holographic {
    background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b);
    background-size: 400% 400%;
    animation: gradient-shift 8s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cyber-btn {
    background: linear-gradient(45deg, #00ff88, #00d4ff);
    border: none;
    color: black;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .cyber-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s;
  }

  .cyber-btn:hover::before {
    left: 100%;
  }

  .cyber-btn:hover {
    box-shadow: 0 0 30px rgba(0,255,136,0.6);
    transform: translateY(-2px);
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite alternate;
  }

  .animate-slide-in-up {
    animation: slide-in-up 0.6s ease-out;
  }

  .animate-cyber-pulse {
    animation: cyber-pulse 3s ease-in-out infinite;
  }

  .shadow-neon {
    box-shadow: 0 0 20px rgba(0,255,136,0.6), 0 0 40px rgba(0,255,136,0.4);
  }

  .shadow-neon-pink {
    box-shadow: 0 0 20px rgba(255,16,240,0.6), 0 0 40px rgba(255,16,240,0.4);
  }

  .shadow-neon-blue {
    box-shadow: 0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.4);
  }

  .text-electric-400 { color: #06ffa5; }
  .text-electric-500 { color: #00ff88; }
  .text-neon-blue { color: #00d4ff; }
  .text-neon-pink { color: #ff10f0; }
  .text-neon-purple { color: #7c3aed; }
  .text-neon-green { color: #39ff14; }

  /* Global dropdown styling fix */
  select {
    background-color: rgba(31, 41, 55, 0.8) !important;
    color: white !important;
  }

  select option {
    background-color: #1f2937 !important;
    color: white !important;
  }

  select option:hover {
    background-color: #374151 !important;
  }
`;
document.head.appendChild(styleSheet);

export const UserFriendlyApp: React.FC = () => {
  // Ensure text visibility override
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .user-friendly-app * {
        color: inherit !important;
      }
      .user-friendly-app h1, .user-friendly-app h2, .user-friendly-app h3, .user-friendly-app p, .user-friendly-app span {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
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

  // Debug currentPage changes
  useEffect(() => {
    console.log("[Debug] currentPage changed to:", currentPage);
  }, [currentPage]);

  // Debug component re-renders
  console.log("[Debug] UserFriendlyApp rendering, currentPage:", currentPage);

  // Initialize Ultra Accuracy integration
  useEffect(() => {
    const updateStats = () => {
      const stats = ultraAccuracyIntegrationService.getLiveStats();
      setUltraAccuracyStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 10000); // Update every 10 seconds

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
      console.log("[Debug] Fetching user profile...");
      const result = await api.getUserProfile("default_user");
      console.log("[Debug] User profile result:", result);
      return result;
    },
    retry: 2,
    retryDelay: 1000,
  });

  const { data: userAnalytics, error: analyticsError } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: async () => {
      console.log("[Debug] Fetching user analytics...");
      const result = await api.getUserAnalytics("default_user");
      console.log("[Debug] User analytics result:", result);
      return result;
    },
    retry: 2,
    retryDelay: 1000,
  });

  const { data: healthStatus, error: healthError } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: async () => {
      console.log("[Debug] Fetching health status...");
      const result = await api.getHealthStatus();
      console.log("[Debug] Health status result:", result);
      return result;
    },
    refetchInterval: 30000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const { data: accuracyMetrics, error: accuracyError } = useQuery({
    queryKey: ["accuracyMetrics"],
    queryFn: async () => {
      console.log("[Debug] Fetching accuracy metrics...");
      const result = await api.getAccuracyMetrics();
      console.log("[Debug] Accuracy metrics result:", result);
      return result;
    },
    refetchInterval: 10000,
    retry: 2,
    retryDelay: 1000,
  });

  // Debug error logging
  useEffect(() => {
    if (healthError) console.log("[Debug] Health error:", healthError);
    if (analyticsError) console.log("[Debug] Analytics error:", analyticsError);
    if (userError) console.log("[Debug] User error:", userError);
    if (accuracyError) console.log("[Debug] Accuracy error:", accuracyError);
  }, [healthError, analyticsError, userError, accuracyError]);

  // Check if backend is offline
  const isOffline = healthError || healthStatus?.status === "offline";

  // Only log when status actually changes
  useEffect(() => {
    console.log("[Debug] Backend Status Check:", {
      isOffline,
      healthError: healthError ? healthError.message : null,
      healthStatus: healthStatus?.status,
    });
  }, [isOffline, healthError, healthStatus]);

  // Handle retry functionality
  const handleRetry = () => {
    queryClient.invalidateQueries();
  };

  const handleBackendStatusChange = (isOnline: boolean) => {
    if (isOnline) {
      queryClient.invalidateQueries();
    }
  };

  // userSettings state already declared above

  // Load user settings from localStorage
  useEffect(() => {
    const loadUserSettings = () => {
      setUserSettings({
        name: getUserDisplayName(),
        email: getUserEmail(),
        darkMode: true, // Will be set by settings utility
      });
    };

    loadUserSettings();

    // Listen for settings changes
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

  // Extract real user data from backend, with settings override for display name
  const user: UserData = {
    name: userSettings.name || userProfile?.name || "User",
    email: userSettings.email || userProfile?.email || "user@a1betting.com",
    balance: userAnalytics?.current_balance || 0,
    tier: userProfile?.tier || "Free",
    winRate: accuracyMetrics?.overall_accuracy * 100 || 0,
    totalProfit: userAnalytics?.total_profit || 0,
  };

  // Extract live stats from real API data - memoized to prevent infinite re-renders
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
      component: UserFriendlyDashboard, // Will show analytics view
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
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-md opacity-60" />
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

                {/* Environment Indicator */}
                {window.location.hostname.includes("fly.dev") && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-semibold text-blue-400">
                      CLOUD PREVIEW
                    </span>
                  </div>
                )}

                {/* Live Stats */}
                <div className="hidden lg:flex items-center space-x-6 ml-8">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
                    <div
                      className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-green-400 shadow-green-400/50 animate-pulse"}`}
                    />
                    <span
                      className={`text-sm font-semibold drop-shadow-lg ${isOffline ? "text-red-400" : "text-green-400"}`}
                    >
                      {isOffline
                        ? "Services Offline"
                        : `${liveStats.liveGames} Live Games`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                    <div
                      className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-blue-400 shadow-blue-400/50 animate-pulse"}`}
                    />
                    <span
                      className={`text-sm font-semibold drop-shadow-lg ${isOffline ? "text-red-400" : "text-blue-400"}`}
                    >
                      {isOffline
                        ? "API Unavailable"
                        : `${liveStats.aiAccuracy.toFixed(1)}% AI Accuracy`}
                    </span>
                  </div>
                  {ultraAccuracyStats && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                      <div
                        className={`w-2 h-2 rounded-full shadow-lg ${ultraAccuracyStats.isActive ? "bg-purple-400 shadow-purple-400/50 animate-pulse" : "bg-gray-400 shadow-gray-400/50"}`}
                      />
                      <span
                        className={`text-sm font-semibold drop-shadow-lg ${ultraAccuracyStats.isActive ? "text-purple-400" : "text-gray-400"}`}
                      >
                        Ultra:{" "}
                        {ultraAccuracyStats.isActive
                          ? `${(ultraAccuracyStats.currentQuality * 100).toFixed(1)}%`
                          : "Offline"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info & Actions */}
              <div className="flex items-center space-x-6">
                {/* Balance & Stats */}
                <div className="hidden md:flex items-center space-x-6 text-sm">
                  <div
                    className={`text-center px-4 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`}
                  >
                    <div
                      className={`text-xs uppercase font-semibold ${isOffline ? "text-red-300/80" : "text-green-300/80"}`}
                    >
                      Balance
                    </div>
                    <div
                      className={`font-bold drop-shadow-lg ${isOffline ? "text-red-400" : "text-green-400"}`}
                    >
                      {isOffline
                        ? "Offline"
                        : `$${user.balance.toLocaleString()}`}
                    </div>
                  </div>
                  <div
                    className={`text-center px-4 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-cyan-500/10 border-cyan-500/30"}`}
                  >
                    <div
                      className={`text-xs uppercase font-semibold ${isOffline ? "text-red-300/80" : "text-cyan-300/80"}`}
                    >
                      Win Rate
                    </div>
                    <div
                      className={`font-bold drop-shadow-lg ${isOffline ? "text-red-400" : "text-cyan-400"}`}
                    >
                      {isOffline ? "N/A" : `${user.winRate.toFixed(1)}%`}
                    </div>
                  </div>
                  <div
                    className={`text-center px-4 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-purple-500/10 border-purple-500/30"}`}
                  >
                    <div
                      className={`text-xs uppercase font-semibold ${isOffline ? "text-red-300/80" : "text-purple-300/80"}`}
                    >
                      Tier
                    </div>
                    <div
                      className={`font-bold drop-shadow-lg ${isOffline ? "text-red-400" : "text-purple-400"}`}
                    >
                      {isOffline ? "N/A" : user.tier}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {/* Intelligence Hub Toggle */}
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
                  >
                    <Search className="w-5 h-5 text-gray-300 group-hover:text-blue-300 transition-colors drop-shadow-lg" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="relative p-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl hover:bg-red-500/30 hover:border-red-400 transition-all backdrop-blur-sm group"
                  >
                    <Bell className="w-5 h-5 text-gray-300 group-hover:text-red-300 transition-colors drop-shadow-lg" />
                    <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50 border border-white/50" />
                  </motion.button>

                  {/* User Avatar */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-60" />
                      <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm opacity-40" />
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
                      <div className="text-xs text-cyan-300/80">
                        {user.email}
                      </div>
                    </div>
                  </div>
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
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-green-500/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent" />
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

              {/* AI Status */}
              <div className="mt-8 p-4 bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-green-500/20 rounded-xl border border-purple-500/40 backdrop-blur-sm relative shadow-2xl shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl" />
                <div className="relative">
                  <h3 className="font-bold text-purple-400 mb-3 drop-shadow-lg flex items-center gap-2">
                    <span className="text-lg">🧠</span>
                    <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                      AI Status
                    </span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg border border-green-500/30">
                      <span className="text-green-300/80 font-medium">
                        Neural Networks
                      </span>
                      <span className="text-green-400 font-bold drop-shadow-lg flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-green-400 shadow-green-400/50 animate-pulse"}`}
                        />
                        {isOffline
                          ? "Offline"
                          : `${accuracyMetrics?.models_active || 0} Active`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                      <span className="text-cyan-300/80 font-medium">
                        Processing Speed
                      </span>
                      <span className="text-cyan-400 font-bold drop-shadow-lg">
                        {isOffline
                          ? "N/A"
                          : `${accuracyMetrics?.prediction_latency?.toFixed(0) || 0}ms`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <span className="text-purple-300/80 font-medium">
                        Model Accuracy
                      </span>
                      <span className="text-purple-400 font-bold drop-shadow-lg animate-pulse">
                        {isOffline
                          ? "N/A"
                          : `${(accuracyMetrics?.overall_accuracy * 100)?.toFixed(1) || 0}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-green-500/5" />
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
          <main className="flex-1 min-h-screen">
            <div className="p-6">
              {/* Temporarily disable animations for debugging */}
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
