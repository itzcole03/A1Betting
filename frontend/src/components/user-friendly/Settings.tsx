import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Eye,
  Shield,
  DollarSign,
  Download,
  Trash2,
  Save,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { api } from "../../services/integrationService";
import { ultraAccuracyIntegrationService } from "../../services/UltraAccuracyIntegrationService";
import OfflineIndicator from "../ui/OfflineIndicator";
import toast from "react-hot-toast";

interface UserSettings {
  profile: {
    name: string;
    email: string;
    timezone: string;
    currency: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
    highConfidencePicks: boolean;
    arbitrageAlerts: boolean;
  };
  display: {
    darkMode: boolean;
    compactView: boolean;
    showAnimations: boolean;
    fontSize: number;
  };
  betting: {
    defaultStake: number;
    maxStake: number;
    riskLevel: "conservative" | "moderate" | "aggressive";
    autoApprove: boolean;
  };
  privacy: {
    sharePredictions: boolean;
    showStats: boolean;
    allowAnalytics: boolean;
  };
  ultraAccuracy: {
    enabled: boolean;
    targetAccuracy: number;
    enhanceMoneyMaker: boolean;
    enhancePrizePicks: boolean;
  };
}

export const Settings: React.FC = () => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: "User",
      email: "user@a1betting.com",
      timezone: "UTC-5",
      currency: "USD",
    },
    notifications: {
      email: true,
      push: true,
      sound: false,
      highConfidencePicks: true,
      arbitrageAlerts: true,
    },
    display: {
      darkMode: true,
      compactView: false,
      showAnimations: true,
      fontSize: 16,
    },
    betting: {
      defaultStake: 10,
      maxStake: 100,
      riskLevel: "moderate",
      autoApprove: false,
    },
    privacy: {
      sharePredictions: false,
      showStats: true,
      allowAnalytics: true,
    },
    ultraAccuracy: {
      enabled: true,
      targetAccuracy: 99.5,
      enhanceMoneyMaker: true,
      enhancePrizePicks: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  // Load user analytics for current values
  const { data: userAnalytics, error: analyticsError } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: () => api.getUserAnalytics("default_user"),
    retry: false,
  });

  // Load Ultra Accuracy status
  const [ultraAccuracyStats, setUltraAccuracyStats] = useState<any>(null);

  useEffect(() => {
    const updateStats = () => {
      const stats = ultraAccuracyIntegrationService.getLiveStats();
      setUltraAccuracyStats(stats);

      // Update Ultra Accuracy settings based on current status
      setSettings((prev) => ({
        ...prev,
        ultraAccuracy: {
          ...prev.ultraAccuracy,
          enabled: stats.isActive,
          enhanceMoneyMaker: stats.components.moneyMaker,
          enhancePrizePicks: stats.components.prizePicks,
        },
      }));
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const isOffline = analyticsError;

  const handleSectionUpdate = (section: keyof UserSettings, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
  };

  const handleUltraAccuracyUpdate = (updates: any) => {
    ultraAccuracyIntegrationService.updateConfig({
      enabled: updates.enabled,
      targetAccuracy: updates.targetAccuracy,
      enhanceMoneyMaker: updates.enhanceMoneyMaker,
      enhancePrizePicks: updates.enhancePrizePicks,
    });

    handleSectionUpdate("ultraAccuracy", updates);
    toast.success("Ultra Accuracy settings updated!");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate saving settings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = () => {
    const exportData = {
      userAnalytics,
      settings,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "a1betting-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Data exported successfully!");
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone.",
      )
    ) {
      queryClient.clear();
      localStorage.clear();
      toast.success("All data cleared!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <OfflineIndicator
          show={!!isOffline}
          service="Settings API"
          onRetry={handleSave}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <SettingsIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Customize your A1Betting experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" />
              Profile & Account
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) =>
                    handleSectionUpdate("profile", { name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    handleSectionUpdate("profile", { email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select
                    value={settings.profile.timezone}
                    onChange={(e) =>
                      handleSectionUpdate("profile", {
                        timezone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="UTC-5">Eastern Time</option>
                    <option value="UTC-6">Central Time</option>
                    <option value="UTC-7">Mountain Time</option>
                    <option value="UTC-8">Pacific Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Currency</label>
                  <select
                    value={settings.profile.currency}
                    onChange={(e) =>
                      handleSectionUpdate("profile", {
                        currency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-purple-400" />
              Notifications
            </h2>

            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      handleSectionUpdate("notifications", {
                        [key]: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                  />
                </label>
              ))}
            </div>
          </motion.div>

          {/* Display Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-green-400" />
              Display & Interface
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Dark Mode</span>
                <input
                  type="checkbox"
                  checked={settings.display.darkMode}
                  onChange={(e) =>
                    handleSectionUpdate("display", {
                      darkMode: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Compact View</span>
                <input
                  type="checkbox"
                  checked={settings.display.compactView}
                  onChange={(e) =>
                    handleSectionUpdate("display", {
                      compactView: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Animations</span>
                <input
                  type="checkbox"
                  checked={settings.display.showAnimations}
                  onChange={(e) =>
                    handleSectionUpdate("display", {
                      showAnimations: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-green-400 bg-gray-800 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                />
              </label>

              <div>
                <label className="block text-gray-300 mb-2">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={settings.display.fontSize}
                  onChange={(e) =>
                    handleSectionUpdate("display", {
                      fontSize: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center text-gray-400 text-sm mt-1">
                  {settings.display.fontSize}px
                </div>
              </div>
            </div>
          </motion.div>

          {/* Betting Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              Betting Preferences
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Default Stake
                </label>
                <input
                  type="number"
                  value={settings.betting.defaultStake}
                  onChange={(e) =>
                    handleSectionUpdate("betting", {
                      defaultStake: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Maximum Stake
                </label>
                <input
                  type="number"
                  value={settings.betting.maxStake}
                  onChange={(e) =>
                    handleSectionUpdate("betting", {
                      maxStake: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Risk Level</label>
                <select
                  value={settings.betting.riskLevel}
                  onChange={(e) =>
                    handleSectionUpdate("betting", {
                      riskLevel: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">
                  Auto-approve recommended bets
                </span>
                <input
                  type="checkbox"
                  checked={settings.betting.autoApprove}
                  onChange={(e) =>
                    handleSectionUpdate("betting", {
                      autoApprove: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-yellow-400 bg-gray-800 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                />
              </label>
            </div>
          </motion.div>
        </div>

        {/* Ultra Accuracy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-purple-400" />
            Ultra Accuracy Engine
            {ultraAccuracyStats && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  ultraAccuracyStats.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {ultraAccuracyStats.isActive ? "ACTIVE" : "OFFLINE"}
              </span>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Enable Ultra Accuracy</span>
                <input
                  type="checkbox"
                  checked={settings.ultraAccuracy.enabled}
                  onChange={(e) =>
                    handleUltraAccuracyUpdate({
                      ...settings.ultraAccuracy,
                      enabled: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Enhance Money Maker</span>
                <input
                  type="checkbox"
                  checked={settings.ultraAccuracy.enhanceMoneyMaker}
                  onChange={(e) =>
                    handleUltraAccuracyUpdate({
                      ...settings.ultraAccuracy,
                      enhanceMoneyMaker: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Enhance PrizePicks</span>
                <input
                  type="checkbox"
                  checked={settings.ultraAccuracy.enhancePrizePicks}
                  onChange={(e) =>
                    handleUltraAccuracyUpdate({
                      ...settings.ultraAccuracy,
                      enhancePrizePicks: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Target Accuracy (%)
                </label>
                <input
                  type="range"
                  min="95"
                  max="99.9"
                  step="0.1"
                  value={settings.ultraAccuracy.targetAccuracy}
                  onChange={(e) =>
                    handleUltraAccuracyUpdate({
                      ...settings.ultraAccuracy,
                      targetAccuracy: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center text-purple-400 font-bold mt-1">
                  {settings.ultraAccuracy.targetAccuracy}%
                </div>
              </div>

              {ultraAccuracyStats && (
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Quality:</span>
                      <span className="text-purple-400 font-bold">
                        {(ultraAccuracyStats.currentQuality * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Enhancements Active:
                      </span>
                      <span className="text-green-400 font-bold">
                        {ultraAccuracyStats.enhancementsActive}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Data & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-400" />
            Data & Privacy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Share Predictions</span>
                <input
                  type="checkbox"
                  checked={settings.privacy.sharePredictions}
                  onChange={(e) =>
                    handleSectionUpdate("privacy", {
                      sharePredictions: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-red-400 bg-gray-800 border-gray-600 rounded focus:ring-red-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Show Statistics</span>
                <input
                  type="checkbox"
                  checked={settings.privacy.showStats}
                  onChange={(e) =>
                    handleSectionUpdate("privacy", {
                      showStats: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-red-400 bg-gray-800 border-gray-600 rounded focus:ring-red-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Allow Analytics</span>
                <input
                  type="checkbox"
                  checked={settings.privacy.allowAnalytics}
                  onChange={(e) =>
                    handleSectionUpdate("privacy", {
                      allowAnalytics: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-red-400 bg-gray-800 border-gray-600 rounded focus:ring-red-400 focus:ring-2"
                />
              </label>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>

              <button
                onClick={handleClearData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>

              <button
                onClick={() => window.open("/backend-status", "_blank")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Backend Status
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white rounded-xl transition-all transform hover:scale-105"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
