import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CYBER_COLORS, CYBER_GRADIENTS, CYBER_GLASS, CyberContainer, CyberText, } from "./CyberTheme";
import { MegaButton } from "./MegaUI";
import { Brain, Menu, X, Bell, Settings, User, LogOut, Search, Wifi, WifiOff, ChevronRight, Sun, Moon, } from "lucide-react";
// MEGA LAYOUT SYSTEM - Consolidates 23 layout components
// ============================================================================
// MEGA SIDEBAR (Consolidates CyberSidebar, AdvancedSidebar, Sidebar variants)
// ============================================================================
export const MegaSidebar = ({ isOpen, onToggle, navigationItems, currentPage, onNavigate, user, systemStatus, variant = "default", className = "", }) => {
    const [expandedSubmenus, setExpandedSubmenus] = useState(new Set());
    const toggleSubmenu = (itemId) => {
        const newExpanded = new Set(expandedSubmenus);
        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId);
        }
        else {
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
    return (_jsxs("div", { className: `mega-sidebar ${className}`, style: {
            width: sidebarWidth,
            height: "100vh",
            position: variant === "floating" ? "fixed" : "relative",
            left: variant === "floating" && !isOpen ? "-280px" : "0",
            zIndex: variant === "floating" ? 1000 : "auto",
            transition: "all 0.3s ease",
            ...CYBER_GLASS.panel,
            borderRight: variant !== "floating" ? `1px solid ${CYBER_COLORS.border}` : "none",
            borderRadius: variant === "floating" ? "0 16px 16px 0" : "0",
            display: "flex",
            flexDirection: "column",
        }, children: [_jsxs("div", { style: { padding: isCompact ? "16px 12px" : "20px" }, children: [_jsxs("div", { style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: isCompact ? "center" : "space-between",
                            marginBottom: isCompact ? "0" : "20px",
                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx("div", { style: {
                                            width: "40px",
                                            height: "40px",
                                            background: CYBER_GRADIENTS.button,
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: isCompact ? "0" : "12px",
                                        }, children: _jsx(Brain, { size: 24, color: "#000" }) }), !isCompact && (_jsxs("div", { children: [_jsx(CyberText, { variant: "title", style: { fontSize: "18px", marginBottom: "2px" }, children: "A1Betting" }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Quantum Platform" })] }))] }), !isCompact && (_jsx("button", { onClick: onToggle, style: {
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
                                }, children: _jsx(X, { size: 16 }) }))] }), user && !isCompact && (_jsxs(CyberContainer, { variant: "card", style: { padding: "16px", marginBottom: "16px" }, children: [_jsxs("div", { style: {
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                }, children: [_jsx("div", { style: {
                                            width: "32px",
                                            height: "32px",
                                            background: CYBER_GRADIENTS.button,
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "8px",
                                        }, children: _jsx(User, { size: 16, color: "#000" }) }), _jsxs("div", { children: [_jsx(CyberText, { variant: "body", style: { fontWeight: "600", marginBottom: "2px" }, children: user.name }), _jsx(CyberText, { variant: "caption", color: "muted", children: user.tier || "Pro User" })] })] }), user.balance && (_jsxs(CyberText, { variant: "caption", color: "accent", children: ["Balance: $", user.balance.toLocaleString()] }))] })), systemStatus && !isCompact && (_jsx(CyberContainer, { variant: "card", style: { padding: "12px", marginBottom: "16px" }, children: _jsxs("div", { style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [_jsx(StatusIcon, { size: 16, color: status.color }), _jsx(CyberText, { variant: "caption", style: { marginLeft: "8px", color: status.color }, children: status.text })] }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [systemStatus.dataQuality, "%"] })] }) })), isCompact && (_jsx("div", { style: { textAlign: "center", marginTop: "16px" }, children: _jsx("button", { onClick: onToggle, style: {
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
                            }, children: _jsx(Menu, { size: 16 }) }) }))] }), _jsx("nav", { style: { flex: 1, padding: "0 12px", overflowY: "auto" }, children: navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isExpanded = expandedSubmenus.has(item.id);
                    return (_jsxs("div", { style: { marginBottom: "4px" }, children: [_jsxs("button", { onClick: () => {
                                    if (hasSubmenu && !isCompact) {
                                        toggleSubmenu(item.id);
                                    }
                                    else {
                                        onNavigate(item.id);
                                    }
                                }, style: {
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
                                            boxShadow: "0 4px 20px rgba(6, 255, 165, 0.4), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                                        }
                                        : {
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                        }),
                                }, children: [_jsx(Icon, { size: 16, style: { color: isActive ? "#000" : CYBER_COLORS.text.muted } }), !isCompact && (_jsxs("div", { style: { display: "flex", alignItems: "center", flex: 1 }, children: [_jsx("span", { style: { marginLeft: "8px" }, children: item.label }), item.badge && (_jsx("span", { style: {
                                                    marginLeft: "auto",
                                                    background: CYBER_COLORS.primary,
                                                    color: "#000",
                                                    borderRadius: "10px",
                                                    padding: "2px 6px",
                                                    fontSize: "10px",
                                                    fontWeight: "600",
                                                }, children: item.badge })), hasSubmenu && (_jsx(ChevronRight, { size: 14, style: {
                                                    marginLeft: "4px",
                                                    transform: isExpanded
                                                        ? "rotate(90deg)"
                                                        : "rotate(0deg)",
                                                    transition: "transform 0.2s ease",
                                                } }))] }))] }), hasSubmenu && isExpanded && !isCompact && (_jsx("div", { style: { marginLeft: "16px", marginTop: "4px" }, children: item.submenu.map((subItem) => {
                                    const SubIcon = subItem.icon;
                                    return (_jsx(MegaButton, { variant: "secondary", onClick: () => onNavigate(subItem.id), icon: SubIcon ? _jsx(SubIcon, { size: 14 }) : undefined, style: {
                                            marginBottom: "2px",
                                            fontSize: "12px",
                                            padding: "8px 12px",
                                        }, children: subItem.label }, subItem.id));
                                }) }))] }, item.id));
                }) }), !isCompact && (_jsxs("div", { style: { padding: "12px" }, children: [_jsxs("button", { style: {
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
                        }, children: [_jsx(Settings, { size: 16, style: { marginRight: "8px" } }), "Settings"] }), _jsxs("button", { style: {
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
                        }, children: [_jsx(LogOut, { size: 16, style: { marginRight: "8px" } }), "Sign Out"] })] }))] }));
};
// ============================================================================
// MEGA HEADER (Consolidates CyberHeader, EliteSportsHeader, Navbar variants)
// ============================================================================
export const MegaHeader = ({ title, subtitle, leftActions, rightActions, showSearch = false, onSearch, notifications = 0, onNotificationsClick, user, darkMode = true, onDarkModeToggle, className = "", }) => {
    const [searchQuery, setSearchQuery] = useState("");
    return (_jsxs("header", { className: `mega-header ${className}`, style: {
            ...CYBER_GLASS.panel,
            borderBottom: `1px solid ${CYBER_COLORS.border}`,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "64px",
        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", flex: 1 }, children: [leftActions, (title || subtitle) && (_jsxs("div", { style: { marginLeft: leftActions ? "16px" : "0" }, children: [title && (_jsx(CyberText, { variant: "title", style: { fontSize: "18px", marginBottom: "2px" }, children: title })), subtitle && (_jsx(CyberText, { variant: "caption", color: "muted", children: subtitle }))] }))] }), showSearch && (_jsx("div", { style: { flex: 1, maxWidth: "400px", margin: "0 24px" }, children: _jsxs("div", { style: { position: "relative" }, children: [_jsx(Search, { size: 16, style: {
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: CYBER_COLORS.text.muted,
                            } }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => {
                                setSearchQuery(e.target.value);
                                onSearch?.(e.target.value);
                            }, style: {
                                width: "100%",
                                padding: "8px 16px 8px 40px",
                                borderRadius: "20px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(10px)",
                                color: CYBER_COLORS.text.primary,
                                fontSize: "14px",
                                outline: "none",
                            } })] }) })), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [onDarkModeToggle && (_jsx("button", { onClick: onDarkModeToggle, style: {
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
                        }, children: darkMode ? _jsx(Sun, { size: 16 }) : _jsx(Moon, { size: 16 }) })), onNotificationsClick && (_jsxs("div", { style: { position: "relative" }, children: [_jsx("button", { onClick: onNotificationsClick, style: {
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
                                }, children: _jsx(Bell, { size: 16 }) }), notifications > 0 && (_jsx("span", { style: {
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    background: CYBER_COLORS.primary,
                                    color: "#000",
                                    borderRadius: "50%",
                                    width: "16px",
                                    height: "16px",
                                    fontSize: "10px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }, children: notifications > 9 ? "9+" : notifications }))] })), user && (_jsx("div", { style: {
                            width: "32px",
                            height: "32px",
                            background: CYBER_GRADIENTS.button,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }, children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, style: { width: "100%", height: "100%", borderRadius: "50%" } })) : (_jsx(User, { size: 16, color: "#000" })) })), rightActions, _jsx(CyberText, { variant: "caption", color: "muted", children: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) })] })] }));
};
// ============================================================================
// MEGA APP SHELL (Complete layout wrapper)
// ============================================================================
export const MegaAppShell = ({ children, sidebar, header, footer, sidebarOpen = true, className = "", }) => {
    return (_jsxs("div", { className: `mega-app-shell ${className}`, style: {
            display: "flex",
            minHeight: "100vh",
            background: CYBER_GRADIENTS.background,
            color: CYBER_COLORS.text.primary,
        }, children: [sidebar, _jsxs("div", { style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }, children: [header, _jsx("main", { style: {
                            flex: 1,
                            overflow: "auto",
                            position: "relative",
                        }, children: children }), footer] })] }));
};
export default {
    MegaSidebar,
    MegaHeader,
    MegaAppShell,
};
