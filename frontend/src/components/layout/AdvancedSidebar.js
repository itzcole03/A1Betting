import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Brain, Target, BarChart3, Zap, Wifi, WifiOff } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export const AdvancedSidebar = ({
  currentSection,
  onSectionChange,
  connectedSources,
  dataQuality,
  state = { darkMode: false },
}) => {
  const { user, toasts } = useAppStore();
  const navItems = [
    { id: "dashboard", label: "Real Data Dashboard", icon: Zap },
    { id: "prizepicks", label: "PrizePicks Engine", icon: Target },
    { id: "analytics", label: "Live Analytics", icon: BarChart3 },
  ];

  const getConnectionStatus = () => {
    if (connectedSources === 0) {
      return { icon: WifiOff, text: "No Real Data", color: "text-red-400" };
    }
    if (connectedSources < 3) {
      return { icon: Wifi, text: "Limited Data", color: "text-yellow-400" };
    }
    return { icon: Wifi, text: "Full Data Access", color: "text-green-400" };
  };

  const status = getConnectionStatus();
  const StatusIcon = status.icon;

  return _jsxs("div", {
    className: `w-64 min-h-screen glass-card border-r border-white/10 p-6 ${state.darkMode ? "dark" : ""}`,
    children: [
      _jsxs("div", {
        className: "flex items-center space-x-3 mb-8",
        children: [
          _jsx(Brain, { className: "h-8 w-8 text-electric-400" }),
          _jsx("h1", {
            className: "text-xl font-bold text-white",
            children: "A1Betting",
          }),
        ],
      }),
      _jsxs("div", {
        className: "mb-6 p-3 rounded-lg bg-white/5 border border-white/10",
        children: [
          _jsx("h3", {
            className: "text-sm font-medium text-gray-300 mb-2",
            children: "System Status",
          }),
          _jsxs("div", {
            className: "flex items-center space-x-2",
            children: [
              _jsx(StatusIcon, { className: `h-4 w-4 ${status.color}` }),
              _jsx("span", {
                className: `text-sm ${status.color}`,
                children: status.text,
              }),
            ],
          }),
          _jsx("div", {
            className: "mt-2 text-xs text-gray-400",
            children: `Data Quality: ${Math.round(dataQuality)}%`,
          }),
        ],
      }),
      _jsx("nav", {
        className: "space-y-2",
        children: navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return _jsxs(
            "button",
            {
              onClick: () => onSectionChange(item.id),
              className: `w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-electric-500/20 text-electric-400 border border-electric-500/30" : "text-gray-300 hover:bg-white/5 hover:text-white"}`,
              children: [
                _jsx(Icon, { className: "h-5 w-5" }),
                _jsx("span", { children: item.label }),
              ],
            },
            item.id,
          );
        }),
      }),
    ],
  });
};

export default AdvancedSidebar;
