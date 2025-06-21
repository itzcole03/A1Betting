import React from "react";
import { motion } from "framer-motion";
import HolographicText from "../ui/HolographicText";
import StatusIndicator from "../ui/StatusIndicator";
import { cn } from "../../lib/utils";
import { Menu, Sun, Moon, Bell, User } from "lucide-react";

interface CyberHeaderProps {
  currentPage?: string;
  onToggleSidebar?: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
  user?: {
    name: string;
    email: string;
    balance: number;
    tier: string;
    accuracy: number;
  };
  className?: string;
}

const CyberHeader: React.FC<CyberHeaderProps> = ({
  currentPage = "dashboard",
  onToggleSidebar,
  theme = "dark",
  onToggleTheme,
  user = {
    name: "Alex Chen",
    email: "alex@a1betting.com",
    balance: 127430.5,
    tier: "Quantum Pro",
    accuracy: 97.3,
  },
  className = "",
}) => {
  const formatPageTitle = (page: string) => {
    return page
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header
      className={cn(
        "glass-card border-b border-white/10 sticky top-0 z-40",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu Button */}
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            {/* Page Title */}
            <div>
              <HolographicText size="2xl" className="text-2xl font-black">
                {formatPageTitle(currentPage)}
              </HolographicText>
              <div className="text-sm text-gray-400 mt-1">
                Advanced Intelligence Dashboard
              </div>
            </div>

            {/* Status Indicators - Hidden on Mobile */}
            <div className="hidden md:flex space-x-4">
              <StatusIndicator
                status="active"
                label="All Systems Online"
                size="sm"
              />
              <StatusIndicator
                status="active"
                label="47 AI Models Active"
                size="sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* User Stats - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">Balance</div>
                <div className="font-bold text-green-400">
                  ${user.balance.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">
                  AI Accuracy
                </div>
                <div className="font-bold text-electric-400">
                  {user.accuracy}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">Tier</div>
                <div className="font-bold text-purple-400">{user.tier}</div>
              </div>
            </div>

            {/* Theme Toggle */}
            {onToggleTheme && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleTheme}
                className="p-3 glass-card rounded-xl hover:shadow-neon transition-all duration-300"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-electric-400" />
                ) : (
                  <Sun className="w-5 h-5 text-electric-400" />
                )}
              </motion.button>
            )}

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 glass-card rounded-xl hover:shadow-neon transition-all duration-300"
            >
              <Bell className="w-5 h-5 text-electric-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </motion.button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-electric-400 rounded-full blur-sm opacity-50"></div>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=00ff88&bold=true`}
                  alt="Profile"
                  className="relative w-9 h-9 rounded-full border-2 border-electric-400"
                />
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-white text-sm">
                  {user.name}
                </div>
                <div className="text-xs text-gray-400">{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CyberHeader;
