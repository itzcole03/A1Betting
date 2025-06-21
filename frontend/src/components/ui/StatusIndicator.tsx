import React from "react";
import { cn } from "../../lib/utils";

interface StatusIndicatorProps {
  status: "active" | "warning" | "error" | "offline";
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = "md",
  className = "",
}) => {
  const statusStyles = {
    active: "status-active",
    warning: "status-warning",
    error: "status-error",
    offline: "bg-gray-500",
  };

  const sizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div
        className={cn(
          "status-dot rounded-full",
          sizes[size],
          statusStyles[status],
        )}
      />
      <span className={cn("text-gray-300", textSizes[size])}>{label}</span>
    </div>
  );
};

export default StatusIndicator;
