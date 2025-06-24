import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Eye,
  Shield,
  DollarSign,
  Save,
  RefreshCw,
} from "lucide-react";
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
  };
  display: {
    darkMode: boolean;
    compactView: boolean;
    fontSize: number;
  };
  betting: {
    defaultStake: number;
    maxStake: number;
    currency: string;
  };
  privacy: {
    sharePredictions: boolean;
    showStats: boolean;
  };
}

interface SimpleSettingsProps {
  onNavigate?: (page: string) => void;
}

export const SimpleSettings: React.FC<SimpleSettingsProps> = ({
  onNavigate,
}) => {
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
    },
    display: {
      darkMode: true,
      compactView: false,
      fontSize: 16,
    },
    betting: {
      defaultStake: 10,
      maxStake: 100,
      currency: "USD",
    },
    privacy: {
      sharePredictions: false,
      showStats: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSectionUpdate = (section: keyof UserSettings, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...updates },
    }));
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

  const handleReset = () => {
    if (
      confirm("Are you sure you want to reset all settings to default values?")
    ) {
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
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
            Customize your basic preferences
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
              Profile
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
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) =>
                    handleSectionUpdate("notifications", {
                      email: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) =>
                    handleSectionUpdate("notifications", {
                      push: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <span className="text-gray-300">Sound Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications.sound}
                  onChange={(e) =>
                    handleSectionUpdate("notifications", {
                      sound: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-400 bg-gray-800 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                />
              </label>
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
              Display
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

          {/* Basic Betting Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              Betting
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
                <label className="block text-gray-300 mb-2">Currency</label>
                <select
                  value={settings.betting.currency}
                  onChange={(e) =>
                    handleSectionUpdate("betting", {
                      currency: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-red-500/20 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-400" />
            Privacy
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
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-gray-400 text-sm">
                Control what information is shared and displayed publicly. Your
                personal data is always protected.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={handleReset}
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

        {/* Note for advanced settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            Looking for advanced settings?{" "}
            <button
              onClick={() => onNavigate?.("backend-test")}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Check the Admin Panel
            </button>{" "}
            or use the Advanced Mode toggle (🔄) in the header.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleSettings;
