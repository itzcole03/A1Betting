import React from "react";
interface GlassCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    glowing?: boolean;
    animated?: boolean;
    neonColor?: "green" | "blue" | "pink" | "purple";
}
declare const GlassCard: React.FC<GlassCardProps>;
export default GlassCard;
