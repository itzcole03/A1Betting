<<<<<<< HEAD
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
=======
import React, { ReactNode } from 'react';
interface GlassCardProps {
    className?: string;
    children: ReactNode;
}
export declare const GlassCard: React.FC<GlassCardProps>;
>>>>>>> 2d39fa5fd04a40604745d55f795c6bab853c02d4
export default GlassCard;
