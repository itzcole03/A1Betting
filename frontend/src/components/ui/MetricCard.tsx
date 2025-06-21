import React from "react";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
  glowing?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  change,
  trend = "neutral",
  className = "",
  glowing = false,
}) => {
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

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 text-center metric-card",
        glowClass,
        className,
      )}
    >
      {/* Icon */}
      <div className="text-3xl mb-3 text-electric-400 float-element">
        <i className={icon} />
      </div>

      {/* Value */}
      <div className="text-2xl font-bold mb-2 text-white cyber-title">
        {value}
      </div>

      {/* Label */}
      <div className="text-gray-400 text-sm mb-2">{label}</div>

      {/* Change Indicator */}
      {change && (
        <div
          className={cn(
            "flex items-center justify-center text-xs",
            trendColors[trend],
          )}
        >
          <i className={cn("mr-1", trendIcons[trend])} />
          {change}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
