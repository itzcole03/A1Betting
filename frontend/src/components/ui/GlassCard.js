import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";

const GlassCard = ({
  title,
  children,
  className = "",
  glowing = false,
  animated = false,
  neonColor = "green",
}) => {
  const baseClasses =
    "glass-card backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-500";
  const glowClasses = glowing
    ? `shadow-lg shadow-${neonColor}-500/20 border-${neonColor}-500/30`
    : "shadow-lg";
  const animationClasses = animated ? "hover:scale-105 hover:bg-white/10" : "";

  return _jsxs("div", {
    className: cn(baseClasses, glowClasses, animationClasses, className),
    children: [
      title &&
        _jsx("h3", {
          className: `text-lg font-semibold mb-4 text-${neonColor}-400`,
          children: title,
        }),
      _jsx("div", { children: children }),
    ],
  });
};

export default GlassCard;
