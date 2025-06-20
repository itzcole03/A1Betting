import React from "react";
interface AdvancedSidebarProps {
    currentSection: string;
    onSectionChange: (section: string) => void;
    connectedSources: number;
    dataQuality: number;
    state?: {
        darkMode?: boolean;
    };
}
export declare const AdvancedSidebar: React.FC<AdvancedSidebarProps>;
export {};
