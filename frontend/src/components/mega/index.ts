// MEGA COMPONENTS INDEX - Consolidated components with cyber theme
import MegaAppComponent from "./MegaApp";
import MegaDashboardComponent from "./MegaDashboard";
import MegaBettingComponent from "./MegaBetting";
import MegaAnalyticsComponent from "./MegaAnalytics";
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CYBER_ANIMATIONS,
  CyberContainer,
  CyberText,
  CyberButton,
} from "./CyberTheme";

export { MegaAppComponent as MegaApp };
export { MegaDashboardComponent as MegaDashboard };
export { MegaBettingComponent as MegaBetting };
export { MegaAnalyticsComponent as MegaAnalytics };
export {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CYBER_GLASS,
  CYBER_ANIMATIONS,
  CyberContainer,
  CyberText,
  CyberButton,
};

// Legacy component deprecation notice
console.warn(`
🚀 MEGA COMPONENTS ACTIVE 🚀
- All duplicate components have been consolidated
- Legacy components moved to _legacy folder
- Using unified cyber theme system
- Performance optimized with reduced bundle size
`);

export default {
  MegaApp: MegaAppComponent,
  MegaDashboard: MegaDashboardComponent,
  MegaBetting: MegaBettingComponent,
  MegaAnalytics: MegaAnalyticsComponent,
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
