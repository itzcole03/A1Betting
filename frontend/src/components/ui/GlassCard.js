<<<<<<< HEAD
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
const GlassCard = ({ title, children, className = "", glowing = false, animated = false, neonColor = "green", }) => {
    const neonShadows = {
        green: "shadow-neon",
        blue: "shadow-neon-blue",
        pink: "shadow-neon-pink",
        purple: "shadow-neon",
    };
    const glowClass = glowing ? neonShadows[neonColor] : "";
    const animatedClass = animated ? "animate-slide-in-up" : "";
    return (_jsxs("div", { className: cn("glass-card rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02]", glowClass, animatedClass, className), children: [title && (_jsx("h3", { className: "text-lg font-semibold mb-4 text-electric-400 cyber-title", children: title })), _jsx("div", { children: children })] }));
};
=======
import { jsx as _jsx } from "react/jsx-runtime";
export const GlassCard = ({ className = '', children }) => (_jsx("div", { className: `glass-morphism rounded-2xl shadow-lg p-6 ${className}`, children: children }));
>>>>>>> 2d39fa5fd04a40604745d55f795c6bab853c02d4
export default GlassCard;
