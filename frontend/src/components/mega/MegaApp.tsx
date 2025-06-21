import React, { useState, useEffect } from "react";
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CyberContainer,
  CyberText,
} from "./CyberTheme";
import MegaDashboard from "./MegaDashboard";
import MegaBetting from "./MegaBetting";
import MegaAnalytics from "./MegaAnalytics";
import { MegaSidebar, MegaHeader, MegaAppShell } from "./MegaLayout";
import { MegaCard, MegaButton } from "./MegaUI";
import {
  Brain,
  Target,
  BarChart3,
  Zap,
  TrendingUp,
  DollarSign,
  Settings,
  User,
  Shield,
  Activity,
  Menu,
  X,
  Home,
  Wifi,
  WifiOff,
  Bell,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

// MASTER MEGA APP - Consolidates all functionality with cyber theme
const MegaApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [connectedSources, setConnectedSources] = useState(12);
  const [dataQuality, setDataQuality] = useState(87);
  const [notifications, setNotifications] = useState(3);

  const [user] = useState({
    name: "Alex Chen",
    email: "alex@a1betting.com",
    balance: 127430.5,
    tier: "Quantum Pro",
    accuracy: 97.3,
    winRate: 89.4,
    totalProfit: 47230,
  });

  // Auto-update system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectedSources(Math.floor(Math.random() * 5) + 10);
      setDataQuality(Math.floor(Math.random() * 20) + 80);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      component: MegaDashboard,
      description: "Overview and system status",
    },
    {
      id: "money-maker",
      label: "Money Maker",
      icon: DollarSign,
      component: MegaBetting,
      description: "AI-powered betting opportunities",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      component: MegaAnalytics,
      description: "Advanced ML insights",
    },
    {
      id: "real-time",
      label: "Real-time Monitor",
      icon: Activity,
      description: "Live data streams",
    },
    {
      id: "arbitrage",
      label: "Arbitrage Scanner",
      icon: Shield,
      description: "Cross-platform opportunities",
    },
    {
      id: "predictions",
      label: "Quantum Predictions",
      icon: Brain,
      description: "Advanced ML predictions",
    },
  ];

  const getConnectionStatus = () => {
    if (connectedSources === 0) {
      return { icon: WifiOff, text: "No Data", color: "#ff4757" };
    }
    if (connectedSources < 8) {
      return { icon: Wifi, text: "Limited", color: CYBER_COLORS.accent };
    }
    return { icon: Wifi, text: "Connected", color: CYBER_COLORS.primary };
  };

  const status = getConnectionStatus();
  const StatusIcon = status.icon;

  const renderCurrentPage = () => {
    const currentItem = navigationItems.find((item) => item.id === currentPage);
    if (!currentItem?.component) {
      return (
        <div style={{ padding: "24px" }}>
          <MegaCard
            variant="glass"
            padding="lg"
            style={{ textAlign: "center" }}
          >
            <div style={{ marginBottom: "16px" }}>
              {currentItem?.id === "real-time" && (
                <Activity size={48} color={CYBER_COLORS.primary} />
              )}
              {currentItem?.id === "arbitrage" && (
                <Shield size={48} color={CYBER_COLORS.secondary} />
              )}
              {currentItem?.id === "predictions" && (
                <Brain size={48} color={CYBER_COLORS.accent} />
              )}
            </div>
            <CyberText
              variant="title"
              style={{ marginBottom: "8px", fontSize: "24px" }}
            >
              {currentItem?.label}
            </CyberText>
            <CyberText variant="body" color="muted">
              {currentItem?.description} - Coming Soon
            </CyberText>
          </MegaCard>
        </div>
      );
    }

    const Component = currentItem.component;
    return (
      <Component
        connectedSources={connectedSources}
        dataQuality={dataQuality}
        userBalance={user.balance}
      />
    );
  };

  return (
    <MegaAppShell
      sidebar={
        <MegaSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          navigationItems={navigationItems}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          user={user}
          systemStatus={{
            connectedSources,
            dataQuality,
            isOnline: true,
          }}
        />
      }
      header={
        <MegaHeader
          title={
            navigationItems.find((item) => item.id === currentPage)?.label ||
            "Dashboard"
          }
          subtitle={
            navigationItems.find((item) => item.id === currentPage)?.description
          }
          notifications={notifications}
          onNotificationsClick={() => console.log("Notifications clicked")}
          user={user}
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />
      }
    >
      {renderCurrentPage()}
    </MegaAppShell>
  );
};

export default MegaApp;
