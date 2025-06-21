import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HolographicText from "../ui/HolographicText";
import StatusIndicator from "../ui/StatusIndicator";
import { cn } from "../../lib/utils";
import {
  Brain,
  Home,
  TrendingUp,
  DollarSign,
  Trophy,
  BarChart3,
  Eye,
  Settings,
  Crown,
  Atom,
  Zap,
  Target,
  Shield,
  User,
  X,
} from "lucide-react";

interface CyberSidebarProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

interface NavigationItem {
  name: string;
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const CyberSidebar: React.FC<CyberSidebarProps> = ({
  currentPage = "dashboard",
  onPageChange,
  isOpen = true,
  onClose,
  className = "",
}) => {
  const navigation: NavigationItem[] = [
    { name: "Dashboard", key: "dashboard", icon: Home, category: "main" },
    {
      name: "Premium Dashboard",
      key: "premium-dashboard",
      icon: Crown,
      category: "premium",
    },
    {
      name: "Money Maker",
      key: "money-maker",
      icon: DollarSign,
      category: "main",
    },
    {
      name: "PrizePicks Pro",
      key: "prizepicks",
      icon: Trophy,
      category: "main",
    },
    { name: "ML Center", key: "ml-center", icon: Brain, category: "ai" },
    { name: "Quantum Predictions", key: "quantum", icon: Atom, category: "ai" },
    {
      name: "Analytics",
      key: "analytics",
      icon: BarChart3,
      category: "insights",
    },
    {
      name: "Real-time Monitor",
      key: "realtime",
      icon: Eye,
      category: "insights",
    },
    { name: "Settings", key: "settings", icon: Settings, category: "account" },
  ];

  const categories = {
    main: "Core Features",
    premium: "Premium",
    ai: "AI & ML",
    insights: "Analytics",
    account: "Account",
  };

  const groupedNav = navigation.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, NavigationItem[]>,
  );

  const handleNavigation = (key: string) => {
    if (onPageChange) {
      onPageChange(key);
    }
  };

  return (
    <div
      className={cn(
        "w-80 glass-card h-screen border-r border-white/10",
        className,
      )}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header with Beautiful Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Beautiful Floating Logo */}
            <div className="relative float-element">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-xl blur-lg opacity-75"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-electric-400 to-neon-blue rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-black font-bold" />
              </div>
            </div>

            {/* Holographic Branding */}
            <div>
              <HolographicText
                size="xl"
                className="text-xl font-black tracking-tight"
              >
                A1BETTING
              </HolographicText>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Quantum Intelligence
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Beautiful Status Indicators */}
        <div className="mt-4 space-y-2">
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

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-electric-400 mb-2 cyber-title">
            Navigation
          </h2>
          <div className="text-sm text-gray-400">36 Advanced Features</div>
        </div>

        <nav className="space-y-6">
          {Object.entries(groupedNav).map(([category, items]) => (
            <div key={category}>
              {/* Category Header */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {categories[category as keyof typeof categories]}
              </h3>

              {/* Navigation Items */}
              <ul className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.key;

                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => handleNavigation(item.key)}
                        className={cn(
                          "nav-item w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-all duration-300",
                          isActive
                            ? "active text-electric-400"
                            : "text-gray-300 hover:text-white",
                        )}
                      >
                        <Icon className="mr-3 w-4 h-4" />
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Beautiful Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="text-center text-xs text-gray-400">
          <div className="holographic font-semibold mb-1">
            A1BETTING QUANTUM
          </div>
          <div>© 2024 • 47 Neural Networks</div>
        </div>
      </div>
    </div>
  );
};

export default CyberSidebar;
