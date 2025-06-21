import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
const MetricCard = ({ label, value, icon, change, trend = "neutral", className = "", glowing = false, }) => {
    const trendColors = {
        up: "text-green-400",
        down: "text-red-400",
        neutral: "text-gray-400",
    };
    const trendIcons = {
        up: "fa-arrow-up",
        down: "fa-arrow-down",
        neutral: "fa-minus",
    };
    const glowClass = glowing ? "shadow-neon" : "";
    return (_jsxs("div", { className: cn("glass-card rounded-xl p-6 text-center metric-card", glowClass, className), children: [_jsx("div", { className: "text-3xl mb-3 text-electric-400 float-element", children: _jsx("i", { className: icon }) }), _jsx("div", { className: "text-2xl font-bold mb-2 text-white cyber-title", children: value }), _jsx("div", { className: "text-gray-400 text-sm mb-2", children: label }), change && (_jsxs("div", { className: cn("flex items-center justify-center text-xs", trendColors[trend]), children: [_jsx("i", { className: cn("mr-1", trendIcons[trend]) }), change] }))] }));
};
export default MetricCard;
