import React, { useState, useEffect } from "react";
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CyberContainer,
  CyberText,
  CyberButton,
} from "./CyberTheme";
import MegaDashboard from "./MegaDashboard";
import MegaBetting from "./MegaBetting";
import MegaAnalytics from "./MegaAnalytics";
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
        <CyberContainer
          variant="card"
          style={{ padding: "40px", textAlign: "center", margin: "24px" }}
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
        </CyberContainer>
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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: CYBER_GRADIENTS.background,
        color: CYBER_COLORS.text.primary,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? "280px" : "64px",
          transition: "width 0.3s ease",
          ...CYBER_GLASS.panel,
          borderRight: `1px solid ${CYBER_COLORS.border}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: CYBER_GRADIENTS.button,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: sidebarOpen ? "12px" : "0",
              }}
            >
              <Brain size={24} color="#000" />
            </div>
            {sidebarOpen && (
              <div>
                <CyberText
                  variant="title"
                  style={{ fontSize: "20px", marginBottom: "2px" }}
                >
                  A1Betting
                </CyberText>
                <CyberText variant="caption" color="muted">
                  Quantum Platform
                </CyberText>
              </div>
            )}
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <CyberContainer
              variant="card"
              style={{ padding: "16px", marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background: CYBER_GRADIENTS.button,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                  }}
                >
                  <User size={16} color="#000" />
                </div>
                <div>
                  <CyberText
                    variant="body"
                    style={{ fontWeight: "600", marginBottom: "2px" }}
                  >
                    {user.name}
                  </CyberText>
                  <CyberText variant="caption" color="muted">
                    {user.tier}
                  </CyberText>
                </div>
              </div>
              <CyberText variant="caption" color="accent">
                Balance: ${user.balance.toLocaleString()}
              </CyberText>
            </CyberContainer>
          )}

          {/* System Status */}
          {sidebarOpen && (
            <CyberContainer
              variant="card"
              style={{ padding: "12px", marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <StatusIcon size={16} color={status.color} />
                  <CyberText
                    variant="caption"
                    style={{ marginLeft: "8px", color: status.color }}
                  >
                    {status.text}
                  </CyberText>
                </div>
                <CyberText variant="caption" color="muted">
                  {dataQuality}%
                </CyberText>
              </div>
            </CyberContainer>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "0 20px" }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <CyberButton
                key={item.id}
                variant={isActive ? "primary" : "secondary"}
                active={isActive}
                onClick={() => setCurrentPage(item.id)}
                icon={<Icon size={16} />}
                style={{
                  marginBottom: "8px",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  padding: sidebarOpen ? "12px 16px" : "12px",
                }}
              >
                {sidebarOpen && item.label}
              </CyberButton>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "20px" }}>
          <CyberButton
            variant="secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            icon={sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            style={{
              marginBottom: "8px",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            {sidebarOpen && "Collapse"}
          </CyberButton>

          {sidebarOpen && (
            <>
              <CyberButton
                variant="secondary"
                onClick={() => setDarkMode(!darkMode)}
                icon={darkMode ? <Sun size={16} /> : <Moon size={16} />}
                style={{ marginBottom: "8px" }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </CyberButton>
              <CyberButton
                variant="secondary"
                icon={<Settings size={16} />}
                style={{ marginBottom: 0 }}
              >
                Settings
              </CyberButton>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top Bar */}
        <div
          style={{
            ...CYBER_GLASS.panel,
            borderBottom: `1px solid ${CYBER_COLORS.border}`,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <CyberText
              variant="title"
              style={{ fontSize: "18px", marginBottom: "2px" }}
            >
              {navigationItems.find((item) => item.id === currentPage)?.label ||
                "Dashboard"}
            </CyberText>
            <CyberText variant="caption" color="muted">
              {
                navigationItems.find((item) => item.id === currentPage)
                  ?.description
              }
            </CyberText>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Bell size={16} color={CYBER_COLORS.text.muted} />
              {notifications > 0 && (
                <span
                  style={{
                    background: CYBER_COLORS.primary,
                    color: "#000",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {notifications}
                </span>
              )}
            </div>
            <CyberText variant="caption" color="muted">
              {new Date().toLocaleTimeString()}
            </CyberText>
          </div>
        </div>

        {/* Page Content */}
        <div>{renderCurrentPage()}</div>
      </div>
    </div>
  );
};

export default MegaApp;
