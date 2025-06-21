import React, { useState, useEffect, ReactNode } from "react";
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CyberContainer,
  CyberText,
  CyberButton,
} from "./CyberTheme";
import { useTheme } from "../../providers/UniversalThemeProvider";
import { MegaButton } from "./MegaUI";
import { CyberThemeToggle } from "../ThemeToggle/ThemeToggle";
import {
  Brain,
  Menu,
  X,
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  Wifi,
  WifiOff,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  DollarSign,
  Target,
  Activity,
  Shield,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

// MEGA LAYOUT SYSTEM - Consolidates 23 layout components

// ============================================================================
// MEGA SIDEBAR (Consolidates CyberSidebar, AdvancedSidebar, Sidebar variants)
// ============================================================================
export const MegaSidebar: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    href?: string;
    badge?: string | number;
    submenu?: Array<{
      id: string;
      label: string;
      icon?: React.ComponentType<any>;
    }>;
  }>;
  currentPage: string;
  onNavigate: (pageId: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    tier?: string;
    balance?: number;
  };
  systemStatus?: {
    connectedSources: number;
    dataQuality: number;
    isOnline: boolean;
  };
  variant?: "default" | "compact" | "floating";
  className?: string;
}> = ({
  isOpen,
  onToggle,
  navigationItems,
  currentPage,
  onNavigate,
  user,
  systemStatus,
  variant = "default",
  className = "",
}) => {
  const { theme } = useTheme();
  const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string>>(
    new Set(),
  );

  const toggleSubmenu = (itemId: string) => {
    const newExpanded = new Set(expandedSubmenus);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedSubmenus(newExpanded);
  };

  const getStatusIcon = () => {
    if (!systemStatus?.isOnline)
      return { icon: WifiOff, color: "#ff4757", text: "Offline" };
    if (systemStatus.connectedSources < 5)
      return { icon: Wifi, color: CYBER_COLORS.accent, text: "Limited" };
    return { icon: Wifi, color: CYBER_COLORS.primary, text: "Connected" };
  };

  const status = getStatusIcon();
  const StatusIcon = status.icon;

  const sidebarWidth = isOpen ? "280px" : "64px";
  const isCompact = !isOpen || variant === "compact";

  return (
    <div
      className={`mega-sidebar ${className}`}
      style={{
        width: sidebarWidth,
        height: "100vh",
        position: variant === "floating" ? "fixed" : "relative",
        left: variant === "floating" && !isOpen ? "-280px" : "0",
        zIndex: variant === "floating" ? 1000 : "auto",
        transition: "all 0.3s ease",
        ...CYBER_GLASS.panel,
        borderRight:
          variant !== "floating" ? `1px solid ${CYBER_COLORS.border}` : "none",
        borderRadius: variant === "floating" ? "0 16px 16px 0" : "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ padding: isCompact ? "16px 12px" : "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCompact ? "center" : "space-between",
            marginBottom: isCompact ? "0" : "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: CYBER_GRADIENTS.button,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: isCompact ? "0" : "12px",
              }}
            >
              <Brain size={24} color="#000" />
            </div>
            {!isCompact && (
              <div>
                <CyberText
                  variant="title"
                  style={{ fontSize: "18px", marginBottom: "2px" }}
                >
                  A1Betting
                </CyberText>
                <CyberText variant="caption" color="muted">
                  Quantum Platform
                </CyberText>
              </div>
            )}
          </div>

          {!isCompact && (
            <button
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.1)",
                border: "1px solid rgba(6, 255, 165, 0.8)",
                color: CYBER_COLORS.primary,
                fontWeight: "500",
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* User Info */}
        {user && !isCompact && (
          <CyberContainer
            variant="card"
            style={{ padding: "16px", marginBottom: "16px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
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
                  {user.tier || "Pro User"}
                </CyberText>
              </div>
            </div>
            {user.balance && (
              <CyberText variant="caption" color="accent">
                Balance: ${user.balance.toLocaleString()}
              </CyberText>
            )}
          </CyberContainer>
        )}

        {/* System Status */}
        {systemStatus && !isCompact && (
          <CyberContainer
            variant="card"
            style={{ padding: "12px", marginBottom: "16px" }}
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
                {systemStatus.dataQuality}%
              </CyberText>
            </div>
          </CyberContainer>
        )}

        {/* Toggle Button for Compact */}
        {isCompact && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.1)",
                border: "1px solid rgba(6, 255, 165, 0.8)",
                color: CYBER_COLORS.primary,
                fontWeight: "500",
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isExpanded = expandedSubmenus.has(item.id);

          return (
            <div key={item.id} style={{ marginBottom: "4px" }}>
              <button
                onClick={() => {
                  if (hasSubmenu && !isCompact) {
                    toggleSubmenu(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: "12px",
                  padding: isCompact ? "12px" : "12px 16px",
                  fontSize: "14px",
                  fontWeight: "400",
                  marginBottom: "4px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  justifyContent: isCompact ? "center" : "space-between",
                  border: "none",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(6, 255, 165, 0.9), rgba(0, 255, 136, 0.8))"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isActive ? "#000" : CYBER_COLORS.text.secondary,
                  backdropFilter: "blur(20px) saturate(1.8)",
                  ...(isActive
                    ? {
                        border: "1px solid rgba(6, 255, 165, 0.5)",
                        boxShadow:
                          "0 4px 20px rgba(6, 255, 165, 0.4), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                      }
                    : {
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      }),
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: isActive ? "#000" : CYBER_COLORS.text.primary,
                  }}
                >
                  {item.icon}
                </span>
                {!isCompact && (
                  <div
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    <span style={{ marginLeft: "8px" }}>{item.label}</span>
                    {item.badge && (
                      <span
                        style={{
                          marginLeft: "auto",
                          background: CYBER_COLORS.primary,
                          color: "#000",
                          borderRadius: "10px",
                          padding: "2px 6px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {hasSubmenu && (
                      <ChevronRight
                        size={14}
                        style={{
                          marginLeft: "4px",
                          transform: isExpanded
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    )}
                  </div>
                )}
              </button>

              {/* Submenu */}
              {hasSubmenu && isExpanded && !isCompact && (
                <div style={{ marginLeft: "16px", marginTop: "4px" }}>
                  {item.submenu!.map((subItem) => {
                    const SubIcon = subItem.icon;
                    return (
                      <MegaButton
                        key={subItem.id}
                        variant="secondary"
                        onClick={() => onNavigate(subItem.id)}
                        icon={
                          SubIcon ? (
                            <span style={{ fontSize: "14px" }}>{SubIcon}</span>
                          ) : undefined
                        }
                        style={{
                          marginBottom: "2px",
                          fontSize: "12px",
                          padding: "8px 12px",
                        }}
                      >
                        {subItem.label}
                      </MegaButton>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCompact && (
        <div style={{ padding: "12px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
              marginBottom: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: CYBER_COLORS.text.secondary,
              backdropFilter: "blur(20px) saturate(1.8)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Settings size={16} style={{ marginRight: "8px" }} />
            Settings
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.05)",
              color: CYBER_COLORS.text.secondary,
              backdropFilter: "blur(20px) saturate(1.8)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LogOut size={16} style={{ marginRight: "8px" }} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MEGA HEADER (Consolidates CyberHeader, EliteSportsHeader, Navbar variants)
// ============================================================================
export const MegaHeader: React.FC<{
  title?: string;
  subtitle?: string;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  notifications?: number;
  onNotificationsClick?: () => void;
  user?: {
    name: string;
    avatar?: string;
  };
  className?: string;
}> = ({
  title,
  subtitle,
  leftActions,
  rightActions,
  showSearch = false,
  onSearch,
  notifications = 0,
  onNotificationsClick,
  user,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, isDark } = useTheme();

  return (
    <header
      className={`mega-header ${className}`}
      style={{
        background: theme.colors.surface,
        backdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${theme.colors.border}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "64px",
        boxShadow: theme.effects.shadow,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {leftActions}

        {(title || subtitle) && (
          <div style={{ marginLeft: leftActions ? "16px" : "0" }}>
            {title && (
              <CyberText
                variant="title"
                style={{ fontSize: "18px", marginBottom: "2px" }}
              >
                {title}
              </CyberText>
            )}
            {subtitle && (
              <CyberText variant="caption" color="muted">
                {subtitle}
              </CyberText>
            )}
          </div>
        )}
      </div>

      {/* Center Section - Search */}
      {showSearch && (
        <div style={{ flex: 1, maxWidth: "400px", margin: "0 24px" }}>
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: theme.colors.text.muted,
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px 16px 8px 40px",
                borderRadius: "20px",
                border: `1px solid ${theme.colors.border}`,
                backgroundColor: theme.colors.surface,
                backdropFilter: "blur(10px)",
                color: theme.colors.text.primary,
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Theme Toggle */}
        <CyberThemeToggle variant="icon" showLabel={false} />

        {/* Notifications */}
        {onNotificationsClick && (
          <div style={{ position: "relative" }}>
            <button
              onClick={onNotificationsClick}
              style={{
                background: `rgba(6, 255, 165, 0.1)`,
                border: `1px solid ${theme.colors.primary}`,
                color: theme.colors.primary,
                fontWeight: "500",
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell size={16} />
            </button>
            {notifications > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: theme.colors.primary,
                  color: "#000",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "10px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {notifications > 9 ? "9+" : notifications}
              </span>
            )}
          </div>
        )}

        {/* User Avatar */}
        {user && (
          <div
            style={{
              width: "32px",
              height: "32px",
              background: theme.gradients.primary,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <User size={16} color={isDark ? "#000" : "#fff"} />
            )}
          </div>
        )}

        {/* Custom Right Actions */}
        {rightActions}

        {/* Current Time */}
        <CyberText variant="caption" color="muted">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </CyberText>
      </div>
    </header>
  );
};

// ============================================================================
// MEGA APP SHELL (Complete layout wrapper)
// ============================================================================
export const MegaAppShell: React.FC<{
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebarOpen?: boolean;
  className?: string;
}> = ({
  children,
  sidebar,
  header,
  footer,
  sidebarOpen = true,
  className = "",
}) => {
  return (
    <div
      className={`mega-app-shell ${className}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        background: CYBER_GRADIENTS.background,
        color: CYBER_COLORS.text.primary,
      }}
    >
      {/* Sidebar */}
      {sidebar}

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        {header}

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            overflow: "auto",
            position: "relative",
          }}
        >
          {children}
        </main>

        {/* Footer */}
        {footer}
      </div>
    </div>
  );
};

export default {
  MegaSidebar,
  MegaHeader,
  MegaAppShell,
};
