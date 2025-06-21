import { jsx as _jsx } from "react/jsx-runtime";
export const Tabs = ({ children, ...props }) => (_jsx("div", { ...props, children: children }));
export const TabsList = ({ children, ...props }) => (_jsx("div", { className: "flex border-b mb-2", ...props, children: children }));
export const TabsTrigger = ({ active, children, ...props }) => (_jsx("button", { className: `px-4 py-2 focus:outline-none border-b-2 transition-colors ${active ? 'border-blue-500 text-blue-700 font-semibold' : 'border-transparent text-gray-600'}`, ...props, children: children }));
export const TabsContent = ({ children, ...props }) => (_jsx("div", { className: "py-2", ...props, children: children }));
