import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
const StatusIndicator = ({ status, label, size = "md", className = "", }) => {
    const statusStyles = {
        active: "status-active",
        warning: "status-warning",
        error: "status-error",
        offline: "bg-gray-500",
    };
    const sizes = {
        sm: "w-1.5 h-1.5",
        md: "w-2 h-2",
        lg: "w-3 h-3",
    };
    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };
    return (_jsxs("div", { className: cn("flex items-center space-x-2", className), children: [_jsx("div", { className: cn("status-dot rounded-full", sizes[size], statusStyles[status]) }), _jsx("span", { className: cn("text-gray-300", textSizes[size]), children: label })] }));
};
export default StatusIndicator;
