/**
 * Quick cleanup script to remove the most problematic duplicate files
 */

const fs = require("fs");
const path = require("path");

const filesToRemove = [
  // Duplicate dashboard components - keep UniversalDashboard
  "components/dashboard/Dashboard.tsx",
  "components/dashboard/Dashboard.js",
  "components/dashboard/Dashboard.d.ts",
  "components/dashboard/CyberDashboard.tsx",
  "components/dashboard/CyberDashboard.js",
  "components/dashboard/CyberDashboard.d.ts",
  "components/dashboard/PremiumDashboard.tsx",
  "components/dashboard/PremiumDashboard.js",
  "components/dashboard/PremiumDashboard.d.ts",

  // Duplicate button components - keep UniversalButton
  "components/common/buttons/Button.tsx",
  "components/common/buttons/Button.js",
  "components/common/buttons/Button.d.ts",
  "components/Button.tsx",
  "components/Button.js",
  "components/Button.d.ts",
  "components/base/Button.tsx",
  "components/base/Button.js",
  "components/base/Button.d.ts",

  // Duplicate theme files - keep UniversalThemeProvider
  "providers/ThemeProvider.tsx",
  "providers/ThemeProvider.js",
  "providers/ThemeProvider.d.ts",
  "contexts/ThemeContext.tsx",
  "contexts/ThemeContext.js",
  "contexts/ThemeContext.d.ts",
  "theme/ThemeProvider.tsx",
  "theme/ThemeProvider.js",
  "store/useThemeStore.ts",
  "store/useThemeStore.js",

  // Some of the most duplicate-heavy hooks
  "hooks/useTheme.tsx",
  "hooks/useTheme.js",
  "hooks/useTheme.d.ts",
  "hooks/useDarkMode.tsx",
  "hooks/useDarkMode.js",
  "hooks/useDarkMode.d.ts",
  "hooks/useDebounce.tsx",
  "hooks/useDebounce.js",
  "hooks/useDebounce.d.ts",
  "hooks/useLocalStorage.tsx",
  "hooks/useLocalStorage.js",
  "hooks/useLocalStorage.d.ts",
  "hooks/useWindowSize.tsx",
  "hooks/useWindowSize.js",
  "hooks/useWindowSize.d.ts",
  "hooks/useMediaQuery.tsx",
  "hooks/useMediaQuery.js",
  "hooks/useMediaQuery.d.ts",
  "hooks/useClickOutside.tsx",
  "hooks/useClickOutside.js",
  "hooks/useClickOutside.d.ts",
  "hooks/useWebSocket.tsx",
  "hooks/useWebSocket.js",
  "hooks/useWebSocket.d.ts",
  "hooks/useAnimation.tsx",
  "hooks/useAnimation.js",
  "hooks/useAnimation.d.ts",
  "hooks/useForm.tsx",
  "hooks/useForm.js",
  "hooks/useForm.d.ts",
];

function removeFile(filePath) {
  const fullPath = path.join(__dirname, "..", filePath);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Removed: ${filePath}`);
    } catch (error) {
      console.error(`❌ Failed to remove ${filePath}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
}

console.log("🧹 Starting cleanup of duplicate files...\n");

filesToRemove.forEach(removeFile);

console.log("\n✨ Cleanup completed!");
console.log("📝 Note: This removed the most problematic duplicate files.");
console.log("🔧 You may need to update import statements in affected files.");
