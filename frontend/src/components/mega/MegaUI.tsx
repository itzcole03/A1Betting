import React, { useState, useEffect, ReactNode } from "react";
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CyberContainer,
  CyberText,
  CyberButton,
} from "./CyberTheme";
import {
  X,
  Check,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  Heart,
  Share,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Settings,
  Menu,
} from "lucide-react";

// MEGA UI SYSTEM - Consolidates all base UI components (35+ components)

// ============================================================================
// BUTTON COMPONENTS (Consolidates 6 button variants)
// ============================================================================
export const MegaButton: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}> = ({
  children,
  onClick,
  variant = "secondary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
}) => {
  const getVariantStyle = () => {
    const variants = {
      primary: {
        ...CYBER_GLASS.button.active,
        color: "#000",
        fontWeight: "600",
        background:
          "linear-gradient(135deg, rgba(6, 255, 165, 0.95), rgba(0, 255, 136, 0.9))",
      },
      secondary: {
        ...CYBER_GLASS.button.inactive,
        color: CYBER_COLORS.text.secondary,
      },
      ghost: {
        background: "rgba(6, 255, 165, 0.1)",
        border: `1px solid ${CYBER_COLORS.primary}80`,
        color: CYBER_COLORS.primary,
        fontWeight: "500",
      },
      danger: {
        background:
          "linear-gradient(135deg, rgba(255, 71, 87, 0.8), rgba(255, 107, 107, 0.6))",
        border: "1px solid rgba(255, 71, 87, 0.3)",
        color: "#fff",
      },
      success: {
        background: `linear-gradient(135deg, ${CYBER_COLORS.primary}90, ${CYBER_COLORS.secondary}80)`,
        border: `1px solid ${CYBER_COLORS.primary}50`,
        color: "#000",
        fontWeight: "600",
      },
    };
    return variants[variant];
  };

  const getSizeStyle = () => {
    const sizes = {
      sm: { padding: "6px 12px", fontSize: "12px" },
      md: { padding: "12px 16px", fontSize: "14px" },
      lg: { padding: "16px 24px", fontSize: "16px" },
    };
    return sizes[size];
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`mega-button ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.3s ease",
        width: fullWidth ? "100%" : "auto",
        ...getVariantStyle(),
        ...getSizeStyle(),
      }}
    >
      {loading && (
        <div
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid transparent",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

// ============================================================================
// CARD COMPONENTS (Consolidates 4 card variants)
// ============================================================================
export const MegaCard: React.FC<{
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  footer?: ReactNode;
  variant?: "default" | "glass" | "glowing" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}> = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  variant = "glass",
  padding = "md",
  className = "",
  onClick,
}) => {
  const getVariantStyle = () => {
    const variants = {
      default: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      },
      glass: CYBER_GLASS.card,
      glowing: {
        ...CYBER_GLASS.card,
        boxShadow: `0 0 20px ${CYBER_COLORS.primary}40, 0 8px 32px rgba(0, 0, 0, 0.1)`,
        border: `1px solid ${CYBER_COLORS.primary}30`,
      },
      bordered: {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: `2px solid ${CYBER_COLORS.primary}60`,
      },
    };
    return variants[variant];
  };

  const getPaddingStyle = () => {
    const paddings = {
      none: "0",
      sm: "12px",
      md: "20px",
      lg: "32px",
    };
    return paddings[padding];
  };

  return (
    <div
      className={`mega-card ${className}`}
      onClick={onClick}
      style={{
        borderRadius: "12px",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        ...getVariantStyle(),
      }}
    >
      {(title || subtitle || headerActions) && (
        <div
          style={{
            padding: getPaddingStyle(),
            paddingBottom: children ? "16px" : getPaddingStyle(),
            borderBottom: children
              ? "1px solid rgba(255, 255, 255, 0.05)"
              : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              {title && (
                <CyberText
                  variant="title"
                  style={{ marginBottom: subtitle ? "4px" : "0" }}
                >
                  {title}
                </CyberText>
              )}
              {subtitle && (
                <CyberText variant="body" color="muted">
                  {subtitle}
                </CyberText>
              )}
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </div>
      )}

      {children && (
        <div
          style={{
            padding:
              title || subtitle || headerActions
                ? `0 ${getPaddingStyle()} ${getPaddingStyle()}`
                : getPaddingStyle(),
          }}
        >
          {children}
        </div>
      )}

      {footer && (
        <div
          style={{
            padding: getPaddingStyle(),
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MODAL COMPONENTS (Consolidates 3 modal variants)
// ============================================================================
export const MegaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}) => {
  const getSizeStyle = () => {
    const sizes = {
      sm: { width: "400px", maxWidth: "90vw" },
      md: { width: "600px", maxWidth: "90vw" },
      lg: { width: "800px", maxWidth: "90vw" },
      xl: { width: "1200px", maxWidth: "95vw" },
    };
    return sizes[size];
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        }}
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          ...CYBER_GLASS.panel,
          borderRadius: "16px",
          ...getSizeStyle(),
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            style={{
              padding: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title && (
              <CyberText variant="title" style={{ fontSize: "20px" }}>
                {title}
              </CyberText>
            )}
            {showCloseButton && (
              <MegaButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                icon={<X size={16} />}
              />
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "20px" }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: "16px 20px 20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// INPUT COMPONENTS (Consolidates 5 input variants)
// ============================================================================
export const MegaInput: React.FC<{
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  return (
    <div
      className={`mega-input-wrapper ${className}`}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      {label && (
        <CyberText
          variant="body"
          style={{ marginBottom: "8px", fontWeight: "500" }}
        >
          {label}
        </CyberText>
      )}

      <div style={{ position: "relative" }}>
        {icon && iconPosition === "left" && (
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: CYBER_COLORS.text.muted,
              pointerEvents: "none",
            }}
          >
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          style={{
            width: "100%",
            padding: icon
              ? iconPosition === "left"
                ? "12px 16px 12px 40px"
                : "12px 40px 12px 16px"
              : "12px 16px",
            borderRadius: "8px",
            border: error
              ? "1px solid #ff4757"
              : "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            color: CYBER_COLORS.text.primary,
            fontSize: "14px",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.border = `1px solid ${CYBER_COLORS.primary}60`;
            e.target.style.boxShadow = `0 0 0 3px ${CYBER_COLORS.primary}20`;
          }}
          onBlur={(e) => {
            e.target.style.border = error
              ? "1px solid #ff4757"
              : "1px solid rgba(255, 255, 255, 0.1)";
            e.target.style.boxShadow = "none";
          }}
        />

        {icon && iconPosition === "right" && (
          <div
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: CYBER_COLORS.text.muted,
              pointerEvents: "none",
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {error && (
        <CyberText
          variant="caption"
          style={{ color: "#ff4757", marginTop: "4px" }}
        >
          {error}
        </CyberText>
      )}
    </div>
  );
};

// ============================================================================
// ALERT COMPONENTS (Consolidates 4 alert variants)
// ============================================================================
export const MegaAlert: React.FC<{
  type: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}> = ({
  type,
  title,
  children,
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const getAlertStyle = () => {
    const styles = {
      info: {
        backgroundColor: `${CYBER_COLORS.accent}10`,
        border: `1px solid ${CYBER_COLORS.accent}30`,
        color: CYBER_COLORS.accent,
      },
      success: {
        backgroundColor: `${CYBER_COLORS.primary}10`,
        border: `1px solid ${CYBER_COLORS.primary}30`,
        color: CYBER_COLORS.primary,
      },
      warning: {
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        border: "1px solid rgba(255, 193, 7, 0.3)",
        color: "#ffc107",
      },
      error: {
        backgroundColor: "rgba(255, 71, 87, 0.1)",
        border: "1px solid rgba(255, 71, 87, 0.3)",
        color: "#ff4757",
      },
    };
    return styles[type];
  };

  const getIcon = () => {
    const icons = {
      info: <Info size={16} />,
      success: <Check size={16} />,
      warning: <AlertTriangle size={16} />,
      error: <X size={16} />,
    };
    return icons[type];
  };

  return (
    <div
      className={`mega-alert ${className}`}
      style={{
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        ...getAlertStyle(),
      }}
    >
      <div style={{ flexShrink: 0, marginTop: "2px" }}>{getIcon()}</div>

      <div style={{ flex: 1 }}>
        {title && (
          <CyberText
            variant="body"
            style={{ fontWeight: "600", marginBottom: "4px" }}
          >
            {title}
          </CyberText>
        )}
        <div>{children}</div>
      </div>

      {dismissible && (
        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

// ============================================================================
// LOADING COMPONENTS (Consolidates 3 loading variants)
// ============================================================================
export const MegaSkeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rect" | "circle";
  animation?: "pulse" | "wave";
  className?: string;
}> = ({
  width = "100%",
  height = "20px",
  variant = "rect",
  animation = "pulse",
  className = "",
}) => {
  const baseStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  const variantStyle = {
    text: { borderRadius: "4px", height: "1em" },
    rect: { borderRadius: "8px" },
    circle: { borderRadius: "50%" },
  };

  const animationStyle = {
    pulse: {
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    wave: {
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)",
      backgroundSize: "200% 100%",
      animation: "wave 2s ease-in-out infinite",
    },
  };

  return (
    <div
      className={`mega-skeleton ${className}`}
      style={{
        ...baseStyle,
        ...variantStyle[variant],
        ...animationStyle[animation],
      }}
    />
  );
};

// Named exports for direct importing
export { MegaButton, MegaCard, MegaModal, MegaInput, MegaAlert, MegaSkeleton };

export default {
  MegaButton,
  MegaCard,
  MegaModal,
  MegaInput,
  MegaAlert,
  MegaSkeleton,
};
