import React from "react";

// CYBER THEME SYSTEM - Exact match to current working prototype
export const CYBER_COLORS = {
  primary: "#06ffa5", // Electric green
  secondary: "#00ff88", // Bright green
  accent: "#00d4ff", // Cyan blue
  purple: "#7c3aed", // Purple accent
  dark: "#0f172a", // Dark slate
  glass: "rgba(255, 255, 255, 0.02)",
  border: "rgba(255, 255, 255, 0.1)",
  text: {
    primary: "rgb(255, 255, 255)",
    secondary: "rgb(209, 213, 219)",
    muted: "rgb(156, 163, 175)",
  },
} as const;

export const CYBER_GRADIENTS = {
  background:
    "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(124, 58, 237) 50%, rgb(15, 23, 42) 100%)",
  radial: `
    radial-gradient(circle at 20% 50%, rgba(0, 255, 136, 0.03) 0%, rgba(0, 0, 0, 0) 50%),
    radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.03) 0%, rgba(0, 0, 0, 0) 50%),
    radial-gradient(circle at 40% 80%, rgba(0, 212, 255, 0.03) 0%, rgba(0, 0, 0, 0) 50%)
  `,
  button:
    "linear-gradient(135deg, rgba(6, 255, 165, 0.8), rgba(0, 255, 136, 0.6))",
  card: "linear-gradient(45deg, #00ff88, #00d4ff)",
} as const;

export const CYBER_GLASS = {
  panel: {
    backdropFilter: "blur(40px) saturate(2)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
  },
  card: {
    backdropFilter: "blur(20px) saturate(1.8)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  button: {
    active: {
      backdropFilter: "blur(10px)",
      backgroundImage:
        "linear-gradient(135deg, rgba(6, 255, 165, 0.9), rgba(0, 255, 136, 0.8))",
      border: "1px solid rgba(6, 255, 165, 0.5)",
      boxShadow:
        "0 4px 20px rgba(6, 255, 165, 0.4), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
      color: "#000", // Ensure black text on green background
    },
    inactive: {
      backdropFilter: "blur(20px) saturate(1.8)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    },
  },
} as const;

export const CYBER_ANIMATIONS = {
  glow: {
    animation: "cyber-glow 2s ease-in-out infinite alternate",
    "@keyframes cyber-glow": {
      from: {
        boxShadow:
          "0 0 20px rgba(6, 255, 165, 0.6), 0 0 40px rgba(6, 255, 165, 0.4)",
      },
      to: {
        boxShadow:
          "0 0 30px rgba(6, 255, 165, 0.8), 0 0 60px rgba(6, 255, 165, 0.6)",
      },
    },
  },
  pulse: {
    animation: "cyber-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    "@keyframes cyber-pulse": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.7 },
    },
  },
  slide: {
    transition: "all 0.3s ease",
  },
} as const;

// Base cyber component wrapper
export const CyberContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "panel" | "card" | "button";
  glowing?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  className = "",
  variant = "card",
  glowing = false,
  style = {},
}) => {
  const baseStyle = CYBER_GLASS[variant] || CYBER_GLASS.card;
  const glowStyle = glowing ? CYBER_ANIMATIONS.glow : {};

  return (
    <div
      className={`cyber-container ${className}`}
      style={{
        borderRadius: "12px",
        padding: variant === "button" ? "12px 16px" : "24px",
        color: CYBER_COLORS.text.primary,
        transition: "all 0.3s ease",
        ...baseStyle,
        ...glowStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Cyber typography components
export const CyberText: React.FC<{
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "caption";
  color?: "primary" | "secondary" | "muted" | "accent";
  className?: string;
}> = ({ children, variant = "body", color = "primary", className = "" }) => {
  const styles = {
    title: {
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: "28px",
      marginBottom: "8px",
    },
    subtitle: { fontSize: "16px", fontWeight: "600", lineHeight: "24px" },
    body: { fontSize: "14px", fontWeight: "400", lineHeight: "20px" },
    caption: { fontSize: "12px", fontWeight: "400", lineHeight: "16px" },
  };

  const colors = {
    primary: CYBER_COLORS.text.primary,
    secondary: CYBER_COLORS.text.secondary,
    muted: CYBER_COLORS.text.muted,
    accent: CYBER_COLORS.primary,
  };

  return (
    <div
      className={`cyber-text cyber-text-${variant} ${className}`}
      style={{
        color: colors[color],
        ...styles[variant],
      }}
    >
      {children}
    </div>
  );
};

// Cyber button component
export const CyberButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  active?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}> = ({
  children,
  onClick,
  variant = "secondary",
  active = false,
  disabled = false,
  className = "",
  icon,
}) => {
  const getButtonStyle = () => {
    if (active || variant === "primary") {
      return {
        ...CYBER_GLASS.button.active,
        color: "#000", // Black text for better contrast on green background
      };
    }
    return {
      ...CYBER_GLASS.button.inactive,
      color: CYBER_COLORS.text.secondary,
    };
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cyber-button cyber-button-${variant} ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "400",
        marginBottom: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.3s ease",
        ...getButtonStyle(),
      }}
    >
      {icon && (
        <span
          style={{
            marginRight: "12px",
            width: "16px",
            color: active ? "#000" : CYBER_COLORS.text.muted,
          }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CYBER_ANIMATIONS,
  CyberContainer,
  CyberText,
  CyberButton,
};
