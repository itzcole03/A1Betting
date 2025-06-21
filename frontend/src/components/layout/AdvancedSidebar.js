import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StatusIndicator from "../ui/StatusIndicator";
import { Brain, Target, BarChart3, Zap, Wifi, WifiOff, Settings, User, Menu, X, Home, TrendingUp, DollarSign, Shield, Bell, LogOut, } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
const navigationItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        href: "/",
    },
    {
        id: "realdata",
        label: "Real Data Dashboard",
        icon: Zap,
        isPremium: true,
    },
    {
        id: "prizepicks",
        label: "PrizePicks Engine",
        icon: Target,
        href: "/prizepicks",
    },
    {
        id: "analytics",
        label: "Analytics Hub",
        icon: BarChart3,
        href: "/analytics",
        submenu: [
            { id: "performance", label: "Performance", icon: TrendingUp },
            { id: "models", label: "ML Models", icon: Brain },
            { id: "insights", label: "AI Insights", icon: Zap },
        ],
    },
    {
        id: "betting",
        label: "Betting Interface",
        icon: DollarSign,
        href: "/betting",
        requiresAuth: true,
    },
    {
        id: "arbitrage",
        label: "Arbitrage Scanner",
        icon: Shield,
        href: "/arbitrage",
        isPremium: true,
    },
    {
        id: "portfolio",
        label: "Portfolio Manager",
        icon: TrendingUp,
        href: "/portfolio",
        requiresAuth: true,
    },
];
export const AdvancedSidebar = ({ currentSection = "dashboard", onSectionChange, connectedSources = 0, dataQuality = 0, state = { darkMode: false }, isOpen = true, onClose, variant = "fixed", className = "", }) => {
    const { user, toasts } = useAppStore();
    // Safe useLocation that handles missing Router context
    let location = null;
    try {
        location = useLocation();
    }
    catch {
        // No Router context available, use fallback
        location = null;
    }
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [notifications, setNotifications] = useState(3);
    const [isCollapsed, setIsCollapsed] = useState(false);
    // Connection status logic
    const getConnectionStatus = () => {
        if (connectedSources === 0) {
            return {
                icon: WifiOff,
                text: "No Real Data",
                color: "text-red-400",
                bgColor: "bg-red-500/10",
            };
        }
        if (connectedSources < 5) {
            return {
                icon: Wifi,
                text: "Limited Data",
                color: "text-yellow-400",
                bgColor: "bg-yellow-500/10",
            };
        }
        return {
            icon: Wifi,
            text: "Full Data Access",
            color: "text-green-400",
            bgColor: "bg-green-500/10",
        };
    };
    const connectionStatus = getConnectionStatus();
    const ConnectionIcon = connectionStatus.icon;
    // Handle item expansion
    const toggleExpansion = (itemId) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            }
            else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };
    // Handle navigation
    const handleNavigation = (item) => {
        if (item.submenu) {
            toggleExpansion(item.id);
        }
        else {
            onSectionChange?.(item.id);
        }
    };
    // Sidebar variants for different display modes
    const sidebarVariants = {
        open: {
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 },
        },
        closed: {
            x: -320,
            transition: { type: "spring", stiffness: 300, damping: 30 },
        },
    };
    // Render navigation item
    const renderNavigationItem = (item, depth = 0) => {
        const Icon = item.icon;
        const isActive = currentSection === item.id || (location?.pathname === item.href);
        const isExpanded = expandedItems.has(item.id);
        const paddingLeft = depth === 0 ? "pl-4" : "pl-8";
        return (_jsxs("div", { children: [_jsxs(motion.button, { onClick: () => handleNavigation(item), className: `w-full flex items-center justify-between ${paddingLeft} pr-4 py-3 text-left rounded-lg transition-all duration-200 group ${isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/10 text-white border-r-2 border-blue-400"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Icon, { className: `w-5 h-5 mr-3 transition-colors ${isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white"}` }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: `font-medium text-sm ${isCollapsed ? "hidden" : ""}`, children: item.label }), item.isPremium && !isCollapsed && (_jsx("span", { className: "text-xs text-yellow-400 font-semibold", children: "PREMIUM" }))] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [item.badge && (_jsx("span", { className: "bg-red-500 text-white text-xs px-2 py-1 rounded-full", children: item.badge })), item.requiresAuth && !user && (_jsx(Shield, { className: "w-3 h-3 text-yellow-400" })), item.submenu && ()] })] }), _jsx(AnimatePresence, { children: item.submenu && isExpanded && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, className: "overflow-hidden", children: item.submenu.map((subItem) => renderNavigationItem(subItem, depth + 1)) })) })] }, item.id));
    };
    // Main sidebar content
    const sidebarContent = (_jsx("div", { className: "h-full flex flex-col bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 text-white", children: _jsxs("div", { className: "p-6 border-b border-gray-700/50", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(motion.div, { className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-xl", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Brain, { className: "w-7 h-7 text-white" }) }), !isCollapsed && (_jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-white", children: "Elite Sports AI" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Real Data Platform" })] }))] }), variant === "drawer" && onClose && (_jsx("button", { onClick: onClose, className: "lg:hidden p-2 rounded-lg hover:bg-gray-700/50 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) })), variant === "fixed" && (_jsx("button", { onClick: () => setIsCollapsed(!isCollapsed), className: "hidden lg:block p-2 rounded-lg hover:bg-gray-700/50 transition-colors", children: _jsx(Menu, { className: "w-4 h-4" }) }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(StatusIndicator, { status: connectedSources > 0 ? 'active' : 'offline', label: `${connectedSources} Data Sources Active`, size: "sm" }), _jsx(StatusIndicator, { status: "active", label: "47 AI Models Online", size: "sm" })] }), _jsx("span", { children: "Quality:" }), _jsxs("span", { className: dataQuality > 0.7
                        ? "text-green-400"
                        : dataQuality > 0.4
                            ? "text-yellow-400"
                            : "text-red-400", children: [(dataQuality * 100).toFixed(1), "%"] })] }) }));
};
motion.div >
;
div >
    { /* Navigation */}
    < nav;
className = "flex-1 px-4 py-4 space-y-1 overflow-y-auto" >
    { navigationItems, : .map((item) => renderNavigationItem(item)) };
nav >
    { /* User section */}
    < div;
className = "p-4 border-t border-gray-700/50" >
    {} && (_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-white", children: user.name || "User" }), _jsx("p", { className: "text-xs text-gray-400", children: user.email || "user@example.com" })] }));
_jsx("button", { className: "p-2 rounded-lg hover:bg-gray-700/50 transition-colors", children: _jsx(LogOut, { className: "w-4 h-4 text-gray-400" }) });
div >
;
(_jsx(Link, { to: "/auth", className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200", children: isCollapsed ? "Login" : "Sign In" }));
{ /* Settings and notifications */ }
{
    !isCollapsed && (_jsxs("div", { className: "flex items-center justify-between mt-3", children: [_jsx(Link, { to: "/settings", className: "p-2 rounded-lg hover:bg-gray-700/50 transition-colors", children: _jsx(Settings, { className: "w-4 h-4 text-gray-400" }) }), _jsxs("button", { className: "relative p-2 rounded-lg hover:bg-gray-700/50 transition-colors", children: [_jsx(Bell, { className: "w-4 h-4 text-gray-400" }), notifications > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white", children: notifications }))] })] }));
}
div >
;
div >
;
;
// Render based on variant
if (variant === "drawer") {
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black/50 z-40 lg:hidden", onClick: onClose }), _jsxs(motion.div, { variants: sidebarVariants, initial: "closed", animate: "open", exit: "closed", className: `fixed left-0 top-0 h-full w-80 z-50 lg:hidden ${className}`, children: [sidebarContent, _jsxs(motion.div, { initial: false, animate: isOpen ? "open" : "closed", variants: sidebarVariants, className: cn("fixed left-0 top-0 z-50 h-screen w-80 glass-card border-r border-white/10 shadow-xl lg:relative lg:translate-x-0", !isOpen && "lg:w-16", variant === "floating" && "lg:m-4 lg:h-[calc(100vh-2rem)] lg:rounded-xl", className), children: ["initial=", { x: -320, opacity: 0 }, "animate=", { x: 0, opacity: 1 }, "transition=", { type: "spring", stiffness: 300, damping: 30 }, ">", sidebarContent] }), "); } // Fixed variant (default) return (", _jsx("div", { className: `${isCollapsed ? "w-16" : "w-80"} transition-all duration-300 ${className}`, children: sidebarContent }), "); }; export default AdvancedSidebar;"] })] })) }));
}
