// ============================================================================
// UNIVERSAL COMPONENT SYSTEM EXPORTS - PHASE 2 COMPLETE
// ============================================================================

// Dashboard Components
export { default as UniversalDashboard } from "./dashboard/UniversalDashboard";

// UI Components
export {
  CyberButton,
  BettingButton,
  GlowButton,
  PremiumButton,
} from "./ui/UniversalButton";
export { default as UniversalButton } from "./ui/UniversalButton";

// Money Maker Systems
export { default as UniversalMoneyMaker } from "./moneymaker/UniversalMoneyMaker";

// Analytics Systems
export { default as UniversalAnalytics } from "./analytics/UniversalAnalytics";

// Prediction Systems
export { default as UniversalPredictions } from "./predictions/UniversalPredictions";

// Settings Systems
export { default as UltimateSettingsPage } from "./settings/UltimateSettingsPage";
export { UnifiedSettingsInterface } from "./settings/UnifiedSettingsInterface";

// Mega System Components
export {
  MegaButton,
  MegaCard,
  MegaModal,
  MegaInput,
  MegaAlert,
  MegaSkeleton,
} from "./mega/MegaUI.tsx";

// Theme Components
export { default as ThemeToggle, CyberThemeToggle } from "./ThemeToggle";

export { MegaSidebar, MegaHeader, MegaAppShell } from "./mega/MegaLayout.tsx";

export {
  CyberText,
  CyberContainer,
  CyberButton as MegaCyberButton,
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
} from "./mega/CyberTheme.tsx";

// ============================================================================
// LEGACY COMPATIBILITY EXPORTS (Deprecated - Use Universal equivalents)
// ============================================================================

// Dashboard compatibility
export { UniversalDashboard as Dashboard } from "./dashboard/UniversalDashboard";
export { UniversalDashboard as CyberDashboard } from "./dashboard/UniversalDashboard";
export { UniversalDashboard as PremiumDashboard } from "./dashboard/UniversalDashboard";

// Button compatibility
export { UniversalButton as Button } from "./ui/UniversalButton";

// Money Maker compatibility
export { UniversalMoneyMaker as MoneyMaker } from "./moneymaker/UniversalMoneyMaker";
export { UniversalMoneyMaker as UltimateMoneyMaker } from "./moneymaker/UniversalMoneyMaker";
export { UniversalMoneyMaker as CyberUltimateMoneyMaker } from "./moneymaker/UniversalMoneyMaker";
export { UniversalMoneyMaker as MoneyMakerAdvanced } from "./moneymaker/UniversalMoneyMaker";

// Analytics compatibility
export { UniversalAnalytics as Analytics } from "./analytics/UniversalAnalytics";
export { UniversalAnalytics as AdvancedAnalytics } from "./analytics/UniversalAnalytics";
export { UniversalAnalytics as CyberAnalyticsHub } from "./analytics/UniversalAnalytics";
export { UniversalAnalytics as AdvancedAnalyticsHub } from "./analytics/UniversalAnalytics";
export { UniversalAnalytics as PerformanceAnalyticsDashboard } from "./analytics/UniversalAnalytics";

// Prediction compatibility
export { UniversalPredictions as PredictionDisplay } from "./predictions/UniversalPredictions";
export { UniversalPredictions as RealtimePredictionDisplay } from "./predictions/UniversalPredictions";
export { UniversalPredictions as LivePredictions } from "./predictions/UniversalPredictions";
export { UniversalPredictions as PredictionGenerator } from "./predictions/UniversalPredictions";

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  UniversalButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonTheme,
} from "./ui/UniversalButton";

export type {
  MoneyMakerConfig,
  OpportunityCandidate,
  MoneyMakerPortfolio,
  MoneyMakerMetrics,
} from "./moneymaker/UniversalMoneyMaker";

export type {
  AnalyticsMetric,
  ModelAnalysis,
  BettingAnalysis,
  SystemAnalytics,
} from "./analytics/UniversalAnalytics";

export type {
  EnhancedPrediction,
  PredictionFilters,
} from "./predictions/UniversalPredictions";
