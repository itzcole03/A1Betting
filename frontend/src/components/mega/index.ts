// MEGA COMPONENTS INDEX - Consolidated components with cyber theme
export { default as MegaApp } from "./MegaApp";
export { default as MegaDashboard } from "./MegaDashboard";
export { default as MegaBetting } from "./MegaBetting";
export { default as MegaAnalytics } from "./MegaAnalytics";
export {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CYBER_ANIMATIONS,
  CyberContainer,
  CyberText,
  CyberButton,
} from "./CyberTheme";

// Legacy component deprecation notice
console.warn(`
🚀 MEGA COMPONENTS ACTIVE 🚀
- All duplicate components have been consolidated
- Legacy components moved to _legacy folder
- Using unified cyber theme system
- Performance optimized with reduced bundle size
`);

export default {
  MegaApp,
  MegaDashboard,
  MegaBetting,
  MegaAnalytics,
  CyberTheme: {
    CYBER_COLORS,
    CYBER_GRADIENTS,
    CYBER_GLASS,
    CYBER_ANIMATIONS,
    CyberContainer,
    CyberText,
    CyberButton,
  },
};
