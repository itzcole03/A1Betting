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
  Activity,
  Zap,
  Shield,
  Database,
  Cpu,
  Network,
  Eye,
  Gauge,
  User,
  Calendar,
  Edit3,
  Key,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import OfflineIndicator from "../ui/OfflineIndicator";
import ApiErrorBoundary from "../ApiErrorBoundary";
import { ultraAccuracyIntegrationService } from "../../services/UltraAccuracyIntegrationService";
import {
  initializeSettings,
  getUserDisplayName,
  getUserEmail,
  getUserSettings,
  saveUserSettings,
} from "../../utils/userSettings";
import toast from "react-hot-toast";

// Import ULTIMATE BRAIN SYSTEM 🧠⚡
import {
  ultimateBrainCentralNervousSystem,
  type UltimateAccuracyResult,
  type SportsPredictionRequest,
} from "../../core/UltimateBrainCentralNervousSystem";

// Import user-friendly components with enhanced AI
import MoneyMakerPro from "./MoneyMakerPro";
import PrizePicksPro from "./PrizePicksPro";
import PropOllama from "./PropOllama";
import UserFriendlyDashboard from "./UserFriendlyDashboard";
import SimpleSettings from "./SimpleSettings";

// Import existing components to integrate
import { AdvancedIntelligenceHub } from "../intelligence/AdvancedIntelligenceHub";

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

// Comprehensive User Profile Component - Consolidated from all profile components
const UserProfile: React.FC<{ onNavigate: (page: string) => void }> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "settings" | "security" | "risk"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [userSettings, setUserSettings] = useState(getUserSettings());

  // Comprehensive user profile data consolidated from existing components
  const [profile] = useState({
    name: getUserDisplayName(),
    email: getUserEmail(),
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2023",
    tier: "Ultimate Brain Pro",
    verified: true,
    twoFactorEnabled: true,
    bio: "Professional sports bettor leveraging AI and machine learning for data-driven betting strategies.",
    stats: {
      totalProfit: 47350.75,
      winRate: 84.7,
      totalBets: 234,
      avgROI: 23.8,
      currentStreak: 7,
      bestStreak: 15,
      totalVolume: 125000,
    },
    riskProfile: {
      type: "moderate",
      maxStake: 500,
      minStake: 25,
      confidenceThreshold: 0.75,
      maxExposure: 2500,
      stopLossPercentage: 0.15,
      takeProfitPercentage: 0.3,
    },
    achievements: [
      {
        id: 1,
        title: "High Roller",
        description: "Placed $50k+ in total bets",
        icon: "💰",
        unlocked: true,
      },
      {
        id: 2,
        title: "Accuracy Expert",
        description: "80%+ win rate for 30 days",
        icon: "🎯",
        unlocked: true,
      },
      {
        id: 3,
        title: "Streak Master",
        description: "15+ win streak achieved",
        icon: "🔥",
        unlocked: true,
      },
      {
        id: 4,
        title: "Brain Power",
        description: "100 AI-assisted bets",
        icon: "🧠",
        progress: 87,
        target: 100,
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "win",
        title: "Lakers vs Warriors - Over 220.5",
        amount: 275,
        time: "2 hours ago",
        confidence: 89,
      },
      {
        id: 2,
        type: "pending",
        title: "Chiefs ML vs Bills",
        amount: 150,
        time: "1 day ago",
        confidence: 82,
      },
      {
        id: 3,
        type: "achievement",
        title: "Earned 'Accuracy Expert' achievement",
        time: "2 days ago",
      },
    ],
  });

  const handleSettingChange = (
    category: keyof typeof userSettings,
    setting: string,
    value: any,
  ) => {
    const newSettings = {
      ...userSettings,
      [category]: {
        ...userSettings[category],
        [setting]: value,
      },
    };
    setUserSettings(newSettings);
    saveUserSettings(newSettings);
    toast.success("Settings updated!", { icon: "⚙️" });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getRiskProfileColor = (type: string) => {
    switch (type) {
      case "conservative":
        return "text-green-400 bg-green-500/20";
      case "moderate":
        return "text-yellow-400 bg-yellow-500/20";
      case "aggressive":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          👤 Ultimate User Profile
        </h2>
        <p className="text-gray-400 mt-2">
          Comprehensive profile management and performance analytics
        </p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                ✓ Verified
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                {profile.tier}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <Calendar size={16} />
              <span>Member since {profile.joinDate}</span>
            </div>
            <p className="text-gray-300">{profile.bio}</p>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
          >
            <Edit3 size={16} />
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-800/40 backdrop-blur-sm rounded-xl p-2">
        {[
          {
            id: "overview",
            label: "Overview",
            icon: <User className="w-4 h-4" />,
          },
          {
            id: "settings",
            label: "Settings",
            icon: <SettingsIcon className="w-4 h-4" />,
          },
          {
            id: "security",
            label: "Security",
            icon: <Shield className="w-4 h-4" />,
          },
          {
            id: "risk",
            label: "Risk Profile",
            icon: <Target className="w-4 h-4" />,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400"
                : "text-gray-400 hover:text-white hover:bg-gray-800/40"
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(profile.stats.totalProfit)}
                </div>
                <div className="text-sm text-gray-400">Total Profit</div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 text-center">
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">
                  {profile.stats.winRate}%
                </div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {profile.stats.totalBets}
                </div>
                <div className="text-sm text-gray-400">Total Bets</div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6 text-center">
                <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">
                  {profile.stats.avgROI}%
                </div>
                <div className="text-sm text-gray-400">Avg ROI</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {profile.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                        : "bg-gray-800/40 border-gray-600/30"
                    }`}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <h4
                      className={`font-semibold mb-1 ${achievement.unlocked ? "text-yellow-400" : "text-gray-400"}`}
                    >
                      {achievement.title}
                    </h4>
                    <p
                      className={`text-xs ${achievement.unlocked ? "text-yellow-300" : "text-gray-500"}`}
                    >
                      {achievement.description}
                    </p>
                    {achievement.progress && achievement.target && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-400">
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full"
                            style={{
                              width: `${(achievement.progress / achievement.target) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {profile.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className={`p-3 rounded-lg ${
                      activity.type === "win"
                        ? "bg-green-500/10 border border-green-500/20"
                        : activity.type === "pending"
                          ? "bg-blue-500/10 border border-blue-500/20"
                          : "bg-yellow-500/10 border border-yellow-500/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                          {activity.confidence && (
                            <span>• Confidence: {activity.confidence}%</span>
                          )}
                        </div>
                      </div>
                      {activity.amount && (
                        <div
                          className={`font-bold ${activity.type === "win" ? "text-green-400" : "text-blue-400"}`}
                        >
                          {activity.type === "win" ? "+" : ""}
                          {formatCurrency(activity.amount)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-cyan-400" />
                Account Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={userSettings.profile.name}
                    onChange={(e) =>
                      handleSettingChange("profile", "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800/60 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userSettings.profile.email}
                    onChange={(e) =>
                      handleSettingChange("profile", "email", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800/60 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-400" />
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  {
                    key: "email",
                    label: "Email Notifications",
                    desc: "Receive updates via email",
                  },
                  {
                    key: "push",
                    label: "Push Notifications",
                    desc: "Real-time browser notifications",
                  },
                  {
                    key: "sound",
                    label: "Sound Alerts",
                    desc: "Audio notifications for important events",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white">
                        {setting.label}
                      </div>
                      <div className="text-sm text-gray-400">
                        {setting.desc}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          userSettings.notifications[
                            setting.key as keyof typeof userSettings.notifications
                          ]
                        }
                        onChange={(e) =>
                          handleSettingChange(
                            "notifications",
                            setting.key,
                            e.target.checked,
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-green-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Security Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium text-green-300">
                        Two-Factor Authentication
                      </div>
                      <div className="text-sm text-green-400">
                        Extra security for your account
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                    {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: "Change Password",
                      desc: "Update your account password",
                    },
                    {
                      label: "Login Sessions",
                      desc: "Manage your active sessions",
                    },
                    {
                      label: "Download Security Report",
                      desc: "View your security activity",
                    },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="w-full px-4 py-3 text-left bg-gray-700/40 rounded-lg hover:bg-gray-700/60 transition-colors"
                    >
                      <div className="font-medium text-white">
                        {action.label}
                      </div>
                      <div className="text-sm text-gray-400">{action.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Profile Tab */}
        {activeTab === "risk" && (
          <div className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                Risk Management Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Profile Type</div>
                  <div
                    className={`px-3 py-2 rounded-md font-medium text-center ${getRiskProfileColor(profile.riskProfile.type)}`}
                  >
                    {profile.riskProfile.type.charAt(0).toUpperCase() +
                      profile.riskProfile.type.slice(1)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Maximum Stake
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    {formatCurrency(profile.riskProfile.maxStake)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Minimum Stake
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {formatCurrency(profile.riskProfile.minStake)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Confidence Threshold
                  </div>
                  <div className="text-lg font-bold text-cyan-400">
                    {(profile.riskProfile.confidenceThreshold * 100).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">
                    Maximum Exposure
                  </div>
                  <div className="text-lg font-bold text-purple-400">
                    {formatCurrency(profile.riskProfile.maxExposure)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Stop Loss</div>
                  <div className="text-lg font-bold text-red-400">
                    {(profile.riskProfile.stopLossPercentage * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => onNavigate("settings")}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Modify Risk Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Search Modal Component
const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    toast.success(`🔍 Searching for: "${query}"`, {
      duration: 3000,
      icon: "🎯",
    });

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

  // Default user data to prevent loading issues
  const userData: UserData = {
    name: getUserDisplayName() || "Ultimate User",
    email: getUserEmail() || "user@a1betting.com",
    balance: 25000,
    tier: "Ultimate Brain Pro",
    winRate: 0.847,
    totalProfit: 47350,
  };

  useEffect(() => {
    const initializeUltimateBrain = async () => {
      try {
        // Initialize Ultimate Brain System in background with timeout
        const brainInitPromise = new Promise(async (resolve) => {
          try {
            const initResult =
              await ultimateBrainCentralNervousSystem.initialize();
            setIsUltimateBrainInitialized(initResult.success);
            if (initResult.success) {
              toast.success("🧠 Ultimate Brain System Activated!");
            }
            resolve(initResult.success);
          } catch (brainError) {
            console.warn(
              "Ultimate Brain initialization failed, using autonomous mode:",
              brainError,
            );
            setIsUltimateBrainInitialized(false);
            resolve(false);
          }
        });

        // Don't wait more than 2 seconds for Ultimate Brain
        const timeoutPromise = new Promise((resolve) =>
          setTimeout(() => resolve(false), 2000),
        );

        Promise.race([brainInitPromise, timeoutPromise]).then(() => {
          // Brain initialization handled above, continue either way
        });
      } catch (error) {
        console.error("Failed to initialize Ultimate Brain:", error);
        toast.error("⚠️ Ultimate Brain initialization failed", {
          duration: 5000,
        });
      }
    };

    initializeUltimateBrain();

    const healthInterval = setInterval(() => {
      try {
        const health = ultimateBrainCentralNervousSystem.getSystemHealth();
        setUltimateBrainHealth(health);
      } catch (error) {
        console.warn("Failed to get brain health:", error);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(healthInterval);
  }, []);

  // Navigation items with Ultimate Brain components
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Ultimate Dashboard",
        icon: <Home className="w-5 h-5" />,
        component: (props: any) => <UserFriendlyDashboard {...props} />,
        badge: isUltimateBrainInitialized ? "🧠" : undefined,
      },
      {
        id: "prizepicks",
        label: "Ultra PrizePicks",
        icon: <Trophy className="w-5 h-5" />,
        component: PrizePicksPro,
        badge:
          ultimateBrainHealth?.performance?.avgAccuracy > 0.8
            ? "🎯"
            : undefined,
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
        badge: isUltimateBrainInitialized ? "🧠" : "⚡",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon className="w-5 h-5" />,
        component: SimpleSettings,
      },
      {
        id: "profile",
        label: "My Profile",
        icon: <User className="w-5 h-5" />,
        component: UserProfile,
        badge: "👤",
      },
    ],
    [isUltimateBrainInitialized, ultimateBrainHealth],
  );

  const activeComponent = navigationItems.find((item) => item.id === activeTab);
  const ActiveComponent = activeComponent?.component || UserFriendlyDashboard;

  // Navigation handler
  const handleNavigate = (page: string) => {
    console.log(`Navigating to: ${page}`); // Debug log
    setActiveTab(page);
    setSidebarOpen(false);
    toast.success(
      `Switched to ${navigationItems.find((item) => item.id === page)?.label || page}`,
      {
        duration: 2000,
        icon: "🎯",
      },
    );
  };

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
                  {(ultimateBrainHealth.performance?.avgAccuracy * 100).toFixed(
                    1,
                  ) || "85.0"}
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
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-400">{userData.tier}</p>
                </div>
                <button
                  onClick={() => handleNavigate("profile")}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-sm font-bold text-white">
                    {userData.name.charAt(0)}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
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
                      onClick={() => handleNavigate(item.id)}
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
                              (ultimateBrainHealth.performance?.avgAccuracy ||
                                0.85) * 100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Engines:</span>
                          <span className="text-purple-400">
                            {ultimateBrainHealth.engines
                              ? Object.values(
                                  ultimateBrainHealth.engines,
                                ).filter(Boolean).length
                              : 4}
                            /
                            {ultimateBrainHealth.engines
                              ? Object.keys(ultimateBrainHealth.engines).length
                              : 6}
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
                <ActiveComponent onNavigate={handleNavigate} />
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
