import React, { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
// Removed unused CyberTheme imports
import { useTheme } from "../../providers/SafeThemeProvider";
import { MegaButton } from "./MegaUI";
// Removed problematic import
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
  ChevronDown,
  UserCircle,
} from "lucide-react";

// MEGA LAYOUT SYSTEM - Consolidates 23 layout components

// ============================================================================
// USER AVATAR DROPDOWN COMPONENT
// ============================================================================
const UserAvatarDropdown: React.FC<{
  user: { name: string; avatar?: string };
  isDark?: boolean;
  onNavigate?: (pageId: string) => void;
}> = ({ user, isDark, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  // Calculate dropdown position based on button position
  useEffect(() => {
    if (isOpen && buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen, buttonRef]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef &&
        !dropdownRef.contains(event.target as Node) &&
        buttonRef &&
        !buttonRef.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownRef, buttonRef, isOpen]);

  const handleAccountProfile = () => {
    // Navigate to profile page using app navigation
    if (onNavigate) {
      onNavigate("profile");
    }
    setIsOpen(false);
  };

  const handleSignOut = () => {
    // Handle sign out
    if (confirm("Are you sure you want to sign out?")) {
      // Clear any stored auth data
      localStorage.removeItem("authToken");
      sessionStorage.clear();
      // Redirect to login or home page
      window.location.href = "/login";
    }
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={setButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "32px",
          height: "32px",
          background: "linear-gradient(135deg, #06ffa5, #00ff88)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          transition: "all 0.2s ease",
          transform: isOpen ? "scale(1.05)" : "scale(1)",
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
      </button>

      {/* Dropdown Menu using Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={setDropdownRef}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              minWidth: "220px",
              background: "rgba(15, 23, 42, 0.98)",
              backdropFilter: "blur(40px) saturate(2)",
              border: "1px solid rgba(6, 255, 165, 0.4)",
              borderRadius: "16px",
              boxShadow:
                "0 25px 80px rgba(0, 0, 0, 0.6), 0 10px 40px rgba(6, 255, 165, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              zIndex: 2147483647,
              padding: "12px",
              transform: "translateY(0)",
              opacity: 1,
            }}
          >
            {/* User Info Header */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(6, 255, 165, 0.2)",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginBottom: "2px",
                }}
              >
                {user.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                Pro User
              </div>
            </div>

            {/* Menu Items */}
            <button
              onClick={handleAccountProfile}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#0f172a",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <UserCircle
                size={16}
                style={{ marginRight: "12px", color: "#06ffa5" }}
              />
              Account & Profile
            </button>

            <button
              onClick={handleSignOut}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#dc2626",
                transition: "all 0.2s ease",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <LogOut size={16} style={{ marginRight: "12px" }} />
              Sign Out
            </button>
          </div>,
        )}
    </div>
  );
};

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
      return { icon: Wifi, color: "#00d4ff", text: "Limited" };
    return { icon: Wifi, color: "#06ffa5", text: "Connected" };
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
        backdropFilter: "blur(40px) saturate(2)",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
        borderRight:
          variant !== "floating"
            ? `1px solid rgba(255, 255, 255, 0.1)`
            : "none",
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
                background:
                  "linear-gradient(135deg, rgba(6, 255, 165, 0.8), rgba(0, 255, 136, 0.6))",
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
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    lineHeight: "1.2",
                  }}
                >
                  A1Betting
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    lineHeight: "1.2",
                  }}
                >
                  Quantum Platform
                </div>
              </div>
            )}
          </div>

          {!isCompact && (
            <button
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.1)",
                border: "1px solid rgba(6, 255, 165, 0.8)",
                color: "#06ffa5",
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
          <div
            style={{
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
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
                  background:
                    "linear-gradient(135deg, rgba(6, 255, 165, 0.8), rgba(0, 255, 136, 0.6))",
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
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    lineHeight: "1.2",
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    lineHeight: "1.2",
                  }}
                >
                  {user.tier || "Pro User"}
                </div>
              </div>
            </div>
            {user.balance && (
              <div
                style={{
                  fontSize: "12px",
                  color: "#06ffa5",
                  lineHeight: "1.2",
                }}
              >
                Balance: ${user.balance.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* System Status */}
        {systemStatus && !isCompact && (
          <div
            style={{
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
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
                <div
                  style={{
                    fontSize: "12px",
                    marginLeft: "8px",
                    color: status.color,
                    lineHeight: "1.2",
                  }}
                >
                  {status.text}
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  lineHeight: "1.2",
                }}
              >
                {systemStatus.dataQuality}%
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button for Compact */}
        {isCompact && (
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.1)",
                border: "1px solid rgba(6, 255, 165, 0.8)",
                color: "#06ffa5",
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
                  color: isActive ? "#000" : "#e2e8f0",
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
                    color: isActive ? "#000" : "#ffffff",
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
                          background: "#06ffa5",
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

      {/* Footer - Removed duplicate settings/signout buttons */}
      {!isCompact && (
        <div style={{ padding: "12px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              textAlign: "center",
              padding: "8px",
            }}
          >
            Use the navigation above or the user avatar in the header for
            account settings.
          </div>
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
  onNavigate?: (pageId: string) => void;
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
  onNavigate,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use try-catch to handle any theme access errors
  let theme, isDark, toggleDarkMode;
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    isDark = themeContext.isDark;
    toggleDarkMode = themeContext.toggleDarkMode;
  } catch (error) {
    console.warn("Theme context error in MegaHeader, using fallback:", error);
    theme = null;
    isDark = false;
    toggleDarkMode = () => console.warn("Theme toggle not available");
  }

  // Comprehensive fallback theme
  const defaultTheme = {
    colors: {
      surface: "rgba(255, 255, 255, 0.8)",
      border: "rgba(15, 23, 42, 0.1)",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
      },
      primary: "#06ffa5",
    },
    effects: {
      shadow: "0 8px 32px rgba(15, 23, 42, 0.1)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #06ffa5, #00ff88)",
    },
  };

  // Ensure we always have a complete theme object
  const safeTheme = theme?.colors ? theme : defaultTheme;

  return (
    <header
      className={`mega-header ${className}`}
      style={{
        background: safeTheme.colors?.surface || "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${safeTheme.colors?.border || "rgba(15, 23, 42, 0.1)"}`,
        borderBottom: `1px solid ${safeTheme.colors?.border || "rgba(15, 23, 42, 0.1)"}`,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "64px",
        boxShadow:
          safeTheme.effects?.shadow || "0 8px 32px rgba(15, 23, 42, 0.1)",
        position: "relative",
        zIndex: 1000,
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {leftActions}

        {(title || subtitle) && (
          <div style={{ marginLeft: leftActions ? "16px" : "0" }}>
            {title && (
              <div
                style={{
                  fontSize: "18px",
                  marginBottom: "2px",
                  color: safeTheme.colors?.text?.primary || "#0f172a",
                  fontWeight: "600",
                  lineHeight: "1.2",
                }}
              >
                {title}
              </div>
            )}
            {subtitle && (
              <div
                style={{
                  fontSize: "12px",
                  color: safeTheme.colors?.text?.muted || "#64748b",
                  lineHeight: "1.2",
                }}
              >
                {subtitle}
              </div>
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
                color: safeTheme.colors?.text?.muted || "#64748b",
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
                border: `1px solid ${safeTheme.colors?.border || "rgba(15, 23, 42, 0.1)"}`,
                backgroundColor:
                  safeTheme.colors?.surface || "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                color: safeTheme.colors?.text?.primary || "#0f172a",
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
        <button
          onClick={toggleDarkMode}
          style={{
            background: safeTheme.colors?.surface || "rgba(255, 255, 255, 0.8)",
            border: `1px solid ${safeTheme.colors?.border || "rgba(15, 23, 42, 0.1)"}`,
            color: safeTheme.colors?.text?.primary || "#0f172a",
            fontWeight: "500",
            padding: "8px",
            fontSize: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications */}
        {onNotificationsClick && (
          <div style={{ position: "relative" }}>
            <button
              onClick={onNotificationsClick}
              style={{
                background: `rgba(6, 255, 165, 0.1)`,
                border: `1px solid ${safeTheme.colors?.primary || "#06ffa5"}`,
                color: safeTheme.colors?.primary || "#06ffa5",
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
                  background: safeTheme.colors?.primary || "#06ffa5",
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

        {/* User Avatar with Dropdown */}
        {user && (
          <UserAvatarDropdown
            user={user}
            isDark={isDark}
            onNavigate={onNavigate}
          />
        )}

        {/* Custom Right Actions */}
        {rightActions}

        {/* Current Time */}
        <div
          style={{
            fontSize: "12px",
            color: safeTheme.colors?.text?.muted || "#64748b",
            lineHeight: "1.2",
          }}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
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
  // Use try-catch to handle any theme access errors
  let safeTheme;
  try {
    const { theme } = useTheme();
    safeTheme = theme;
  } catch (error) {
    console.warn("Theme context error, using fallback:", error);
    safeTheme = null;
  }

  // Comprehensive fallback theme with all required properties
  const defaultTheme = {
    colors: {
      background:
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
      },
      primary: "#06ffa5",
      secondary: "#00ff88",
      surface: "rgba(255, 255, 255, 0.8)",
      border: "rgba(15, 23, 42, 0.1)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #06ffa5, #00ff88)",
    },
    effects: {
      shadow: "0 8px 32px rgba(15, 23, 42, 0.1)",
    },
  };

  // Ensure we always have a complete theme object
  const finalTheme = safeTheme?.colors ? safeTheme : defaultTheme;

  return (
    <div
      className={`mega-app-shell ${className}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          finalTheme.colors?.background || defaultTheme.colors.background,
        color:
          finalTheme.colors?.text?.primary || defaultTheme.colors.text.primary,
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
