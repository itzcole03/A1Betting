// ============================================================================
// UNIVERSAL COMPONENT SYSTEM EXPORTS
// ============================================================================

// Dashboard Components
export { UniversalDashboard } from "./dashboard/UniversalDashboard";
export { default as UniversalDashboard } from "./dashboard/UniversalDashboard";

// UI Components
export {
  UniversalButton,
  CyberButton,
  BettingButton,
  GlowButton,
  PremiumButton,
} from "./ui/UniversalButton";
export { default as UniversalButton } from "./ui/UniversalButton";

// Mega System Components
export {
  MegaButton,
  MegaCard,
  MegaModal,
  MegaInput,
  MegaAlert,
  MegaSkeleton,
} from "./mega/MegaUI";

export { MegaSidebar, MegaHeader, MegaAppShell } from "./mega/MegaLayout";

export {
  CyberText,
  CyberContainer,
  CyberButton as MegaCyberButton,
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
} from "./mega/CyberTheme";

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS (Deprecated - Use Universal equivalents)
// ============================================================================

// Dashboard compatibility
export { UniversalDashboard as Dashboard } from "./dashboard/UniversalDashboard";
export { UniversalDashboard as CyberDashboard } from "./dashboard/UniversalDashboard";
export { UniversalDashboard as PremiumDashboard } from "./dashboard/UniversalDashboard";

// Button compatibility
export { UniversalButton as Button } from "./ui/UniversalButton";

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  UniversalButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonTheme,
} from "./ui/UniversalButton";
