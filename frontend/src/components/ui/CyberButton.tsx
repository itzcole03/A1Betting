import React from "react";
import { cn } from "../../lib/utils";

interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  glowing?: boolean;
  children: React.ReactNode;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  glowing = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: "cyber-btn",
    secondary:
      "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost:
      "bg-transparent border border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-black",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const glowClass = glowing ? "animate-glow-pulse" : "";

  return (
    <button
      className={cn(
        "rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed",
        sizes[size],
        variants[variant],
        glowClass,
        className,
      )}
      {...props}
    >
      {icon && <i className={icon} />}
      <span>{children}</span>
    </button>
  );
};

export default CyberButton;
