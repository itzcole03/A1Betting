import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import HolographicText from "../ui/HolographicText";
import StatusIndicator from "../ui/StatusIndicator";
import { cn } from "../../lib/utils";
import { Brain, Home, DollarSign, Trophy, BarChart3, Eye, Settings, Crown, Atom, X, } from "lucide-react";
const CyberSidebar = ({ currentPage = "dashboard", onPageChange, isOpen = true, onClose, className = "", }) => {
    const navigation = [
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
    const groupedNav = navigation.reduce((acc, item) => {
        if (!acc[item.category])
            acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});
    const handleNavigation = (key) => {
        if (onPageChange) {
            onPageChange(key);
        }
    };
    return (_jsxs(motion.div, { initial: { x: -320 }, animate: { x: isOpen ? 0 : -320 }, transition: { type: "spring", stiffness: 300, damping: 30 }, className: cn("fixed left-0 top-0 z-50 h-screen w-80 glass-card border-r border-white/10 shadow-xl lg:relative lg:translate-x-0", className), children: [_jsxs("div", { className: "p-6 border-b border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative float-element", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-xl blur-lg opacity-75" }), _jsx("div", { className: "relative w-10 h-10 bg-gradient-to-br from-electric-400 to-neon-blue rounded-xl flex items-center justify-center", children: _jsx(Brain, { className: "w-6 h-6 text-black font-bold" }) })] }), _jsxs("div", { children: [_jsx(HolographicText, { size: "xl", className: "text-xl font-black tracking-tight", children: "A1BETTING" }), _jsx("p", { className: "text-xs text-gray-400 uppercase tracking-widest", children: "Quantum Intelligence" })] })] }), onClose && (_jsx("button", { onClick: onClose, className: "lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }))] }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsx(StatusIndicator, { status: "active", label: "All Systems Online", size: "sm" }), _jsx(StatusIndicator, { status: "active", label: "47 AI Models Active", size: "sm" })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-lg font-bold text-electric-400 mb-2 cyber-title", children: "Navigation" }), _jsx("div", { className: "text-sm text-gray-400", children: "36 Advanced Features" })] }), _jsx("nav", { className: "space-y-6", children: Object.entries(groupedNav).map(([category, items]) => (_jsxs("div", { children: [_jsx("h3", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3", children: categories[category] }), _jsx("ul", { className: "space-y-1", children: items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = currentPage === item.key;
                                        return (_jsx("li", { children: _jsxs("button", { onClick: () => handleNavigation(item.key), className: cn("nav-item w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-all duration-300", isActive
                                                    ? "active text-electric-400"
                                                    : "text-gray-300 hover:text-white"), children: [_jsx(Icon, { className: "mr-3 w-4 h-4" }), item.name] }) }, item.key));
                                    }) })] }, category))) })] }), _jsx("div", { className: "p-6 border-t border-white/10", children: _jsxs("div", { className: "text-center text-xs text-gray-400", children: [_jsx("div", { className: "holographic font-semibold mb-1", children: "A1BETTING QUANTUM" }), _jsx("div", { children: "\u00A9 2024 \u2022 47 Neural Networks" })] }) })] }));
};
export default CyberSidebar;
