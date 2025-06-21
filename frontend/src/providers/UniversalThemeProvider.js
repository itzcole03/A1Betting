import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
// ============================================================================
// THEME DEFINITIONS
// ============================================================================
const createThemeConfig = (variant, customColors) => {
    const themes = {
        standard: {
            primary: "#3b82f6",
            secondary: "#6b7280",
            accent: "#10b981",
            background: "#ffffff",
            surface: "#f9fafb",
            text: {
                primary: "#111827",
                secondary: "#6b7280",
                muted: "#9ca3af",
            },
            border: "#e5e7eb",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
        cyber: {
            primary: "#06ffa5",
            secondary: "#00ff88",
            accent: "#00d4ff",
            background: "linear-gradient(135deg, #0f172a 0%, #7c3aed 50%, #0f172a 100%)",
            surface: "rgba(255, 255, 255, 0.05)",
            text: {
                primary: "#ffffff",
                secondary: "#e5e7eb",
                muted: "#9ca3af",
            },
            border: "rgba(255, 255, 255, 0.1)",
            success: "#06ffa5",
            warning: "#fbbf24",
            error: "#ff4757",
        },
        premium: {
            primary: "#f59e0b",
            secondary: "#d97706",
            accent: "#92400e",
            background: "#0f0f0f",
            surface: "#1a1a1a",
            text: {
                primary: "#ffffff",
                secondary: "#d1d5db",
                muted: "#9ca3af",
            },
            border: "#374151",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
        minimal: {
            primary: "#000000",
            secondary: "#666666",
            accent: "#333333",
            background: "#ffffff",
            surface: "#fafafa",
            text: {
                primary: "#000000",
                secondary: "#666666",
                muted: "#999999",
            },
            border: "#e0e0e0",
            success: "#4caf50",
            warning: "#ff9800",
            error: "#f44336",
        },
        dark: {
            primary: "#3b82f6",
            secondary: "#6b7280",
            accent: "#10b981",
            background: "#111827",
            surface: "#1f2937",
            text: {
                primary: "#f9fafb",
                secondary: "#d1d5db",
                muted: "#9ca3af",
            },
            border: "#374151",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
        light: {
            primary: "#3b82f6",
            secondary: "#6b7280",
            accent: "#10b981",
            background: "#ffffff",
            surface: "#f9fafb",
            text: {
                primary: "#111827",
                secondary: "#6b7280",
                muted: "#9ca3af",
            },
            border: "#e5e7eb",
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
        },
    };
    const baseColors = themes[variant];
    const mergedColors = customColors
        ? { ...baseColors, ...customColors }
        : baseColors;
    return {
        variant,
        colors: mergedColors,
        gradients: {
            primary: variant === "cyber"
                ? "linear-gradient(135deg, #06ffa5, #00ff88)"
                : `linear-gradient(135deg, ${mergedColors.primary}, ${mergedColors.secondary})`,
            secondary: variant === "cyber"
                ? "linear-gradient(135deg, #00d4ff, #7c3aed)"
                : `linear-gradient(135deg, ${mergedColors.secondary}, ${mergedColors.accent})`,
            background: variant === "cyber"
                ? "linear-gradient(135deg, #0f172a 0%, #7c3aed 50%, #0f172a 100%)"
                : `linear-gradient(135deg, ${mergedColors.background}, ${mergedColors.surface})`,
        },
        effects: {
            glass: variant === "cyber"
                ? "backdrop-filter: blur(20px) saturate(180%); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);"
                : "backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);",
            blur: "backdrop-filter: blur(8px);",
            shadow: variant === "cyber"
                ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 255, 165, 0.2)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            glow: variant === "cyber"
                ? "0 0 20px rgba(6, 255, 165, 0.6), 0 0 40px rgba(6, 255, 165, 0.4)"
                : `0 0 20px ${mergedColors.primary}60`,
        },
        animations: {
            duration: "300ms",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    };
};
// ============================================================================
// CONTEXT
// ============================================================================
const ThemeContext = createContext(undefined);
export const UniversalThemeProvider = ({ children, defaultVariant = "cyber", enablePersistence = true, }) => {
    const [variant, setVariantState] = useState(() => {
        if (enablePersistence && typeof window !== "undefined") {
            const saved = localStorage.getItem("theme-variant");
            return saved || defaultVariant;
        }
        return defaultVariant;
    });
    const [customColors, setCustomColors] = useState({});
    const theme = createThemeConfig(variant, customColors);
    const isDark = ["cyber", "premium", "dark"].includes(variant);
    const setVariant = (newVariant) => {
        setVariantState(newVariant);
        if (enablePersistence && typeof window !== "undefined") {
            localStorage.setItem("theme-variant", newVariant);
        }
    };
    const toggleDarkMode = () => {
        const newVariant = isDark ? "light" : "dark";
        setVariant(newVariant);
    };
    // Apply theme to document
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const root = document.documentElement;
        // Set CSS custom properties
        root.style.setProperty("--color-primary", theme.colors.primary);
        root.style.setProperty("--color-secondary", theme.colors.secondary);
        root.style.setProperty("--color-accent", theme.colors.accent);
        root.style.setProperty("--color-background", theme.colors.background);
        root.style.setProperty("--color-surface", theme.colors.surface);
        root.style.setProperty("--color-text-primary", theme.colors.text.primary);
        root.style.setProperty("--color-text-secondary", theme.colors.text.secondary);
        root.style.setProperty("--color-text-muted", theme.colors.text.muted);
        root.style.setProperty("--color-border", theme.colors.border);
        root.style.setProperty("--color-success", theme.colors.success);
        root.style.setProperty("--color-warning", theme.colors.warning);
        root.style.setProperty("--color-error", theme.colors.error);
        // Set gradient variables
        root.style.setProperty("--gradient-primary", theme.gradients.primary);
        root.style.setProperty("--gradient-secondary", theme.gradients.secondary);
        root.style.setProperty("--gradient-background", theme.gradients.background);
        // Set theme class on body
        document.body.className = document.body.className.replace(/theme-\w+/g, "");
        document.body.classList.add(`theme-${variant}`);
        // Set dark mode class
        if (isDark) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
        }
        // Apply background for cyber theme
        if (variant === "cyber") {
            document.body.style.background = theme.colors.background;
            document.body.style.color = theme.colors.text.primary;
        }
    }, [theme, variant, isDark]);
    return (_jsx(ThemeContext.Provider, { value: {
            theme,
            variant,
            setVariant,
            isDark,
            toggleDarkMode,
            customColors,
            setCustomColors,
        }, children: children }));
};
// ============================================================================
// HOOKS
// ============================================================================
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a UniversalThemeProvider");
    }
    return context;
};
export const useThemeColors = () => {
    const { theme } = useTheme();
    return theme.colors;
};
export const useThemeVariant = () => {
    const { variant, setVariant } = useTheme();
    return [variant, setVariant];
};
export const useDarkMode = () => {
    const { isDark, toggleDarkMode } = useTheme();
    return [isDark, toggleDarkMode];
};
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
export const getThemeCSS = (variant) => {
    const config = createThemeConfig(variant);
    return `
    :root {
      --color-primary: ${config.colors.primary};
      --color-secondary: ${config.colors.secondary};
      --color-accent: ${config.colors.accent};
      --color-background: ${config.colors.background};
      --color-surface: ${config.colors.surface};
      --color-text-primary: ${config.colors.text.primary};
      --color-text-secondary: ${config.colors.text.secondary};
      --color-text-muted: ${config.colors.text.muted};
      --color-border: ${config.colors.border};
      --color-success: ${config.colors.success};
      --color-warning: ${config.colors.warning};
      --color-error: ${config.colors.error};
      --gradient-primary: ${config.gradients.primary};
      --gradient-secondary: ${config.gradients.secondary};
      --gradient-background: ${config.gradients.background};
    }
  `;
};
// ============================================================================
// EXPORTS
// ============================================================================
export default UniversalThemeProvider;
