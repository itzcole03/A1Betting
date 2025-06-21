import React from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  animated?: boolean;
  neonColor?: "green" | "blue" | "pink" | "purple";
}

const GlassCard: React.FC<GlassCardProps> = ({
  title,
  children,
  className = "",
  glowing = false,
  animated = false,
  neonColor = "green",
}) => {
  const neonShadows = {
    green: "shadow-neon",
    blue: "shadow-neon-blue",
    pink: "shadow-neon-pink",
    purple: "shadow-neon",
  };

  const glowClass = glowing ? neonShadows[neonColor] : "";
  const animatedClass = animated ? "animate-slide-in-up" : "";

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02]",
        glowClass,
        animatedClass,
        className,
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-electric-400 cyber-title">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
};

export default GlassCard;
