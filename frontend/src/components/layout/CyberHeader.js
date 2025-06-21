import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import HolographicText from "../ui/HolographicText";
import StatusIndicator from "../ui/StatusIndicator";
import { cn } from "../../lib/utils";
import { Menu, Sun, Moon, Bell } from "lucide-react";
const CyberHeader = ({ currentPage = "dashboard", onToggleSidebar, theme = "dark", onToggleTheme, user = {
    name: "Alex Chen",
    email: "alex@a1betting.com",
    balance: 127430.5,
    tier: "Quantum Pro",
    accuracy: 97.3,
}, className = "", }) => {
    const formatPageTitle = (page) => {
        return page
            .replace(/([A-Z])/g, " $1")
            .trim()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    return (_jsx("header", { className: cn("glass-card border-b border-white/10 sticky top-0 z-40", className), children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [onToggleSidebar && (_jsx("button", { onClick: onToggleSidebar, className: "lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors", children: _jsx(Menu, { className: "w-6 h-6" }) })), _jsxs("div", { children: [_jsx(HolographicText, { size: "2xl", className: "text-2xl font-black", children: formatPageTitle(currentPage) }), _jsx("div", { className: "text-sm text-gray-400 mt-1", children: "Advanced Intelligence Dashboard" })] }), _jsxs("div", { className: "hidden md:flex space-x-4", children: [_jsx(StatusIndicator, { status: "active", label: "All Systems Online", size: "sm" }), _jsx(StatusIndicator, { status: "active", label: "47 AI Models Active", size: "sm" })] })] }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "hidden lg:flex items-center space-x-6 text-sm", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400 uppercase", children: "Balance" }), _jsxs("div", { className: "font-bold text-green-400", children: ["$", user.balance.toLocaleString()] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400 uppercase", children: "AI Accuracy" }), _jsxs("div", { className: "font-bold text-electric-400", children: [user.accuracy, "%"] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400 uppercase", children: "Tier" }), _jsx("div", { className: "font-bold text-purple-400", children: user.tier })] })] }), onToggleTheme && (_jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onToggleTheme, className: "p-3 glass-card rounded-xl hover:shadow-neon transition-all duration-300", children: theme === "light" ? (_jsx(Moon, { className: "w-5 h-5 text-electric-400" })) : (_jsx(Sun, { className: "w-5 h-5 text-electric-400" })) })), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "relative p-3 glass-card rounded-xl hover:shadow-neon transition-all duration-300", children: [_jsx(Bell, { className: "w-5 h-5 text-electric-400" }), _jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 bg-electric-400 rounded-full blur-sm opacity-50" }), _jsx("img", { src: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=00ff88&bold=true`, alt: "Profile", className: "relative w-9 h-9 rounded-full border-2 border-electric-400" })] }), _jsxs("div", { className: "hidden md:block", children: [_jsx("div", { className: "font-semibold text-white text-sm", children: user.name }), _jsx("div", { className: "text-xs text-gray-400", children: user.email })] })] })] })] }) }) }));
};
export default CyberHeader;
