import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  CheckCircle,
  DollarSign,
  Activity,
  Brain,
  Zap,
  Award,
  HelpCircle,
  X,
  Users,
  RefreshCw,
} from "lucide-react";

interface PlayerProp {
  id: string;
  player: string;
  team: string;
  opponent: string;
  stat: string;
  line: number;
  overOdds: number;
  underOdds: number;
  confidence: number;
  aiRecommendation: "over" | "under";
  reasoning: string;
  trend: string;
  recentForm: string;
  position?: string;
  sport?: string;
  gameTime?: string;
  pickType?: "normal" | "demon" | "goblin";
  trendValue?: number;
}

interface ExpandedPlayerProp {
  id: string;
  stat: string;
  line: number;
  overOdds: number;
  underOdds: number;
  confidence: number;
  aiRecommendation: "over" | "under";
  reasoning: string;
  pickType?: "normal" | "demon" | "goblin";
  expectedValue: number;
  volume: number;
  oddsExplanation: string;
}

interface ExpandedPlayerData {
  player: string;
  team: string;
  opponent: string;
  position: string;
  sport: string;
  gameTime: string;
  seasonStats: Record<string, number>;
  recentForm: string[];
  props: ExpandedPlayerProp[];
}

interface SelectedPick {
  propId: string;
  choice: "over" | "under";
  player: string;
  stat: string;
  line: number;
  confidence: number;
  pickType?: "normal" | "demon" | "goblin";
}

// Demons & Goblins Rules Modal Component
const DemonsGoblinsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto border border-purple-500/30"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            Demons &amp; Goblins
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-gray-300 text-sm leading-5">
            Lineups containing a Demon or Goblin may pay out differently than
            standard lineups. You can only pick{" "}
            <strong className="text-green-400">MORE</strong> on these
            projections.
          </div>

          {/* Demons */}
          <div className="flex items-start gap-3 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <img
              alt="Demon"
              src="https://app.prizepicks.com/7534b2e82fa0ac08ec43.png"
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="text-gray-300 text-sm leading-5">
              <span className="text-red-400 font-semibold">Demons</span>
              <span>
                {" "}
                are a little wild. They're harder to win, but the lineup
                qualifies for higher payouts (1.25x multiplier).
              </span>
            </div>
          </div>

          {/* Goblins */}
          <div className="flex items-start gap-3 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <img
              alt="Goblin"
              src="https://app.prizepicks.com/e00b98475351cdfd1c38.png"
              className="w-8 h-8 flex-shrink-0"
            />
            <div className="text-gray-300 text-sm leading-5">
              <span className="text-green-400 font-semibold">Goblins</span>
              <span>
                {" "}
                love the green. They're easier to win, but come with lower
                payout multipliers (0.85x multiplier).
              </span>
            </div>
          </div>

          {/* Rules Section */}
          <div className="space-y-4 border-t border-gray-700/50 pt-6">
            <h3 className="text-lg font-semibold text-white">Lineup Rules</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Pick between{" "}
                  <strong className="text-purple-400">
                    2 and 6 projections
                  </strong>{" "}
                  to create a valid lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Must have picks from{" "}
                  <strong className="text-purple-400">
                    at least 2 different teams
                  </strong>
                  .
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Cannot have the{" "}
                  <strong className="text-purple-400">same player twice</strong>{" "}
                  in your lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All picks must be submitted{" "}
                  <strong className="text-purple-400">before game start</strong>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="w-full cyber-btn py-3 px-4 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Expanded Player View Component
const ExpandedPlayerView: React.FC<{
  playerData: ExpandedPlayerData;
  onClose: () => void;
  onSelect: (propId: string, choice: "over" | "under") => void;
  isSelected: (propId: string, choice: "over" | "under") => boolean;
}> = ({ playerData, onClose, onSelect, isSelected }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 99999,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#1f2937",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#374151",
            padding: "1rem",
            borderBottom: "1px solid #4b5563",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", margin: 0 }}>
              {playerData.player}
            </h2>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: 0 }}>
              {playerData.team} vs {playerData.opponent}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            All Available Props
          </h3>

          {playerData.props.map((prop) => (
            <div
              key={prop.id}
              style={{
                backgroundColor: "#374151",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginBottom: "1rem",
                border: "1px solid #4b5563",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                      {prop.line}
                    </span>
                    <span style={{ color: "#d1d5db" }}>{prop.stat}</span>
                    {prop.pickType === "demon" && <span>😈</span>}
                    {prop.pickType === "goblin" && <span>👺</span>}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                    Confidence: {prop.confidence}% | Rec:{" "}
                    {prop.aiRecommendation.toUpperCase()}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => onSelect(prop.id, "under")}
                    disabled={
                      prop.pickType === "demon" || prop.pickType === "goblin"
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                      border: "none",
                      cursor:
                        prop.pickType === "demon" || prop.pickType === "goblin"
                          ? "not-allowed"
                          : "pointer",
                      backgroundColor: isSelected(prop.id, "under")
                        ? "#10b981"
                        : prop.pickType === "demon" ||
                            prop.pickType === "goblin"
                          ? "#4b5563"
                          : "#374151",
                      color: isSelected(prop.id, "under") ? "black" : "white",
                    }}
                  >
                    Less
                  </button>

                  <button
                    onClick={() => onSelect(prop.id, "over")}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "0.25rem",
                      fontWeight: "500",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: isSelected(prop.id, "over")
                        ? "#10b981"
                        : "#374151",
                      color: isSelected(prop.id, "over") ? "black" : "white",
                    }}
                  >
                    More
                  </button>
                </div>
              </div>

              <div
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#111827",
                  borderRadius: "0.25rem",
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ color: "#a855f7", fontWeight: "600" }}>AI:</span>{" "}
                {prop.reasoning}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid #4b5563",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(147, 51, 234, 0.2)",
              borderRadius: "0.5rem",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#a855f7",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              🧠 PropOllama can explain any prop or strategy
            </p>
            <button
              style={{
                backgroundColor: "#9333ea",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ask PropOllama
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Perfect PrizePicks PropCard Component
const PropCard: React.FC<{
  prop: PlayerProp;
  onSelect: (propId: string, choice: "over" | "under") => void;
  isSelected: (propId: string, choice: "over" | "under") => boolean;
  showAIAnalysis: string | null;
  onToggleAnalysis: (playerName: string) => void;
}> = ({ prop, onSelect, isSelected, showAIAnalysis, onToggleAnalysis }) => {
  // Real NBA player headshots from official sources
  const getPlayerImageUrl = (playerName: string) => {
    const playerMap: Record<string, string> = {
      "LeBron James":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
      "Stephen Curry":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
      "Giannis Antetokounmpo":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png",
      "Jayson Tatum":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png",
      "Kevin Durant":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png",
      "Nikola Jokic":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
      "Joel Embiid":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/203954.png",
      "Luka Doncic":
        "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png",
    };

    return (
      playerMap[playerName] ||
      `https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png`
    );
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a generic NBA player silhouette
    target.src = "https://cdn.nba.com/manage/2021/08/nba-player-fallback.png";
  };

  const playerImageUrl = getPlayerImageUrl(prop.player);

  return (
    <div
      className="rounded-lg overflow-hidden relative text-center"
      style={{
        backgroundColor: "rgb(18, 19, 32)",
        borderBottom: "1px solid rgb(44, 44, 57)",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        display: "grid",
        gridTemplateRows: "min-content min-content 1fr",
        overflowX: "hidden",
        overflowY: "hidden",
        paddingTop: "8px",
        position: "relative",
        textAlign: "center",
        minHeight: "220px",
        maxWidth: "100%",
      }}
    >
      {/* Stats Button - Top Left */}
      <button
        onClick={() => onToggleAnalysis(prop.player)}
        className="absolute top-2 left-2 bg-black/50 rounded-md p-1 text-gray-300 hover:text-white transition-colors z-10"
        title="View all player props & odds"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "none",
          borderRadius: "6px",
          color: "rgb(212, 211, 218)",
          cursor: "pointer",
          left: "8px",
          padding: "4px",
          position: "absolute",
          top: "8px",
        }}
      >
        <svg
          width="16"
          height="16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.333 2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11ZM4 4.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-9ZM8.667 7.833a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V13.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.833ZM14 5.833a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V5.833Z" />
        </svg>
      </button>

      {/* Trending Indicator - Top Right */}
      <div
        className="absolute top-2 right-2 flex items-center z-10"
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
          display: "flex",
        }}
      >
        <img
          alt="Trending"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAEXUlEQVR4Ae2VW2gcVRjH/+ecmZ3LXpvYrcnGJtskqG9qRSgNhZI+1D6oFIQUxT4piIiKINQLmhYvL4r0VfCCFVREiwENVaNYrIUQWtrExraxoTYXN3Gzu83uZG7n+E2KIq3NZvPkQz84zNmz832/73a+AW7Iv2S8p23n+D3Zb091GaNKKbHSuxrWIH88tWdD9fzpQ+rShR0KDMh3jzDGwpV0OBqUC307O6rD3x/n85d2MDsBbykA37ztzXp6DYEoPUzz57/RvMsdvLUL0qnBTzSj+4l9h+vpNpS6qd78Xl6a6kKyCTKegvQDSF2sSrehiDj8J7lGhpW8oqrpUIUZ/PLZod31dRsQpuRd4KQSerRc8EQKmlBwjw29VSwW02sGTTy7p+fcA12d0b4yPX0TWBnICLAERaTKYBvWQUtzhKM/ZmfeO/jMmkDTL97/ghwbOCoC52zl56GtyZaWKmslp7M20MzA9CJUxgJr0hBLB3CGv37u4sXx1oZAM6/3dbCFEwf0tjRkSuPuT4dfo3vi8Gz2LJriYGkdbAvVqjMGmaB9kkFNjViVzz98pSGQYIWXJWYZktSUGRvOme+2VSdO7ZK+96liVJ94DEqvgW/0wfM6YDOIBFA7Odg3/+vJ3KpAdFcM7k3sRpy8NOgglYRbOY+l41+9k7n36feVvwQlHEQDR4UVYFPkDAez6PfcaHLqy3cfXRWoOri/h/HZFLNotHAyqocIqRbloYOtbraznzXnSoo7kBqDpM6DCsBuoQYxGDRbQk6feJyc1eqCwvLI7TxOHtq0Yg6Y5lLBm+BpJcx/8PBDbu23jKT/QykoIheSQDJBTqUiGEcwN5adOPLJbXVBwpQ5FtehxU3oJs2xZBHSbIZa34GAADJGkJRFIHIqoBSqEIo4KgKZ1BisSlGN3X213WtHkKHHuCUgYmnEKO9+3AE3ivCm0tATNwNyAWFiEVIuQSIgiFx2V9k6RI1D0ak/O9ZcF8S5NwmDQCxDzUCRaQV6zkGyRQTTCiLnUYSUrkDRqJBQUU6oXozKwsoiGlPQbW7XBans9t+ZMwwubHDLpFSWoNxFmFYFYbu6MuYiSPT18ekZEC8kiKSlc3KQgceThWsCuPrAzmz+AVZLhcdscpRmmd0MQY0hqKOEFVIaQ6qFpMIT0VDgJhmhVHNicqpftLfyW07XBbH89pJIdX3E+AJ5TC0rCagbEJq2vKLp/c/Soyh0Sjel+HKM6gqYGzZN5nofO1YXFInR/dKrTNMmOZ+HmHMhYBCM0rgMpCWip7m81ygko0DOUJ30uIB96337/8smw3XEG3v+Dr9wdEB5QZv0qwgtB4HpIaAGCKku0qMOK9KLRfomhSZFRjk0Um+07x3a1xAoEufMFx3yz4F+6dUeke4CGaeJ4HvLHSfpwspoRjET3G4p8WSuf33vgbevZ2tF0N+ydO7jzqA8+aB0F7fKULXTtU4SaSaUfDwUxqC+cdeRdfk7S/g/yF/ZrLFK5X31mgAAAABJRU5ErkJggg=="
          className="w-4 h-4 mr-1"
          style={{ height: "16px", width: "16px", paddingRight: "2px" }}
        />
        <span
          className="text-white text-xs"
          style={{
            color: "rgb(251, 249, 255)",
            fontSize: "12px",
            lineHeight: "16px",
            paddingTop: "4px",
          }}
        >
          {prop.trendValue || Math.floor(Math.random() * 10 + 1)}K
        </span>
      </div>

      {/* Player Image and Basic Info */}
      <div className="text-center">
        <button className="inline-block cursor-pointer">
          <img
            alt={prop.player}
            src={playerImageUrl}
            onError={handleImageError}
            className="cursor-pointer inline-block max-w-full"
            style={{
              borderBottomStyle: "none",
              borderLeftStyle: "none",
              borderRightStyle: "none",
              borderTopStyle: "none",
              cursor: "pointer",
              display: "inline-block",
              height: "48px",
              maxWidth: "100%",
              overflowClipMargin: "content-box",
              overflowX: "clip",
              overflowY: "clip",
              textAlign: "center",
              verticalAlign: "middle",
              width: "48px",
            }}
          />
        </button>

        {/* Demon/Goblin Icon */}
        {(prop.pickType === "demon" || prop.pickType === "goblin") && (
          <div
            className="absolute"
            style={{
              left: "50%",
              position: "absolute",
              right: "-12px",
              textAlign: "center",
              top: "36px",
            }}
          >
            <button
              title={
                prop.pickType === "demon"
                  ? "Demon pick - Harder to win, higher payout (1.25x)"
                  : "Goblin pick - Easier to win, lower payout (0.85x)"
              }
              className="inline-block cursor-pointer relative group"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "none",
                cursor: "pointer",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              <img
                alt={prop.pickType === "demon" ? "Demon" : "Goblin"}
                src={
                  prop.pickType === "demon"
                    ? "https://app.prizepicks.com/7534b2e82fa0ac08ec43.png"
                    : "https://app.prizepicks.com/e00b98475351cdfd1c38.png"
                }
                className="cursor-pointer inline-block max-w-full"
                style={{
                  borderBottomStyle: "none",
                  borderLeftStyle: "none",
                  borderRightStyle: "none",
                  borderTopStyle: "none",
                  cursor: "pointer",
                  display: "inline-block",
                  height: "24px",
                  maxWidth: "100%",
                  overflowClipMargin: "content-box",
                  overflowX: "clip",
                  overflowY: "clip",
                  textAlign: "center",
                  verticalAlign: "middle",
                  width: "24px",
                  transform:
                    "matrix(0.978148, 0.207912, -0.207912, 0.978148, 0, 0)",
                }}
              />
            </button>
          </div>
        )}

        {/* Team and Position */}
        <div
          className="text-gray-400 text-xs mx-auto mt-1 relative"
          style={{
            color: "rgb(199, 198, 206)",
            fontSize: "10px",
            lineHeight: "12px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "4px",
            paddingBottom: "1px",
            position: "relative",
            textAlign: "center",
          }}
        >
          <span>{prop.team}</span>
          <span> - </span>
          <span>{prop.position || "Unknown"}</span>
        </div>
      </div>

      {/* Player Name and Game Info */}
      <div
        className="grid px-2"
        style={{
          display: "grid",
          gridTemplateRows: "min-content min-content 1fr",
          paddingLeft: "8px",
          paddingRight: "8px",
          textAlign: "center",
        }}
      >
        <h3
          className="text-white text-xs pb-1"
          style={{
            fontSize: "12px",
            lineHeight: "14px",
            paddingBottom: "2px",
            textAlign: "center",
            color: "rgb(255, 255, 255)",
            fontWeight: "500",
          }}
        >
          {prop.player}
        </h3>

        <time
          className="text-gray-400 text-xs"
          style={{
            color: "rgb(199, 198, 206)",
            fontSize: "10px",
            lineHeight: "12px",
            textAlign: "center",
          }}
        >
          <span>vs </span>
          <span>{prop.opponent} </span>
          <span>{prop.gameTime || "Today 7:30"}</span>
        </time>

        {/* Centered Stat Section */}
        <div
          className="self-end flex gap-1 justify-center pb-2 pt-1 px-1"
          style={{
            alignSelf: "flex-end",
            display: "flex",
            gap: "4px",
            justifySelf: "center",
            paddingBottom: "8px",
            paddingLeft: "4px",
            paddingRight: "4px",
            paddingTop: "4px",
            textAlign: "center",
          }}
        >
          <div
            className="flex items-baseline flex-1 text-xs gap-1"
            style={{
              alignItems: "last baseline",
              display: "flex",
              flexBasis: "0%",
              flexGrow: "1",
              fontSize: "10px",
              gap: "2px",
              lineHeight: "12px",
              textAlign: "center",
            }}
          >
            <div
              className="text-lg"
              style={{
                fontSize: "16px",
                lineHeight: "20px",
                textAlign: "center",
                color: "rgb(255, 255, 255)",
                fontWeight: "600",
              }}
            >
              {prop.line}
            </div>
            <span
              className="text-gray-400 text-xs max-w-20 text-left"
              style={{
                color: "rgb(199, 198, 206)",
                fontSize: "10px",
                lineHeight: "12px",
                maxWidth: "80px",
                textAlign: "left",
              }}
            >
              <span
                className="inline"
                style={{
                  color: "rgb(199, 198, 206)",
                  display: "inline",
                  fontSize: "10px",
                  lineHeight: "12px",
                  overflowWrap: "break-word",
                  textAlign: "left",
                  wordWrap: "break-word",
                }}
              >
                {prop.stat}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Less/More Buttons - Exact PrizePicks Style */}
      <div
        className="self-end flex"
        style={{
          alignSelf: "flex-end",
          display: "flex",
          textAlign: "center",
        }}
      >
        {/* Less Button */}
        <button
          onClick={() => onSelect(prop.id, "under")}
          disabled={prop.pickType === "demon" || prop.pickType === "goblin"}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 border-r border-t border-gray-600 transition-colors ${
            isSelected(prop.id, "under")
              ? "bg-green-400 text-black"
              : prop.pickType === "demon" || prop.pickType === "goblin"
                ? "bg-gray-800/50 text-gray-500 cursor-not-allowed opacity-50"
                : "bg-black/50 hover:bg-gray-700/50 text-white"
          }`}
          style={{
            alignContent: "center",
            alignItems: "baseline",
            backgroundColor: isSelected(prop.id, "under")
              ? "rgb(110, 255, 0)"
              : prop.pickType === "demon" || prop.pickType === "goblin"
                ? "rgba(75, 85, 99, 0.5)"
                : "rgba(0, 0, 0, 0.5)",
            borderBottomLeftRadius: "6px",
            borderColor: "rgb(44, 44, 57)",
            borderRight: "1px solid rgb(44, 44, 57)",
            borderTop: "1px solid rgb(44, 44, 57)",
            color: isSelected(prop.id, "under")
              ? "rgb(5, 6, 20)"
              : prop.pickType === "demon" || prop.pickType === "goblin"
                ? "rgb(107, 114, 128)"
                : "rgb(255, 255, 255)",
            cursor:
              prop.pickType === "demon" || prop.pickType === "goblin"
                ? "not-allowed"
                : "pointer",
            display: "flex",
            flexBasis: "0%",
            flexGrow: "1",
            fontSize: "11px",
            gap: "3px",
            justifyContent: "center",
            lineHeight: "12px",
            paddingBottom: "6px",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "6px",
            textAlign: "center",
            border: "none",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 9 8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.815 7.842a.678.678 0 0 0 .87 0l3.36-2.89a.562.562 0 0 0 .034-.837.677.677 0 0 0-.905-.03L4.89 6.047V.593C4.89.265 4.603 0 4.25 0c-.353 0-.64.265-.64.593v5.455L1.325 4.085a.677.677 0 0 0-.904.031.562.562 0 0 0 .034.838l3.36 2.889Z"
            />
          </svg>
          <span className="text-sm">
            {prop.pickType === "demon" || prop.pickType === "goblin"
              ? "N/A"
              : "Less"}
          </span>
        </button>

        {/* More Button */}
        <button
          onClick={() => onSelect(prop.id, "over")}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 border-t border-gray-600 transition-colors ${
            isSelected(prop.id, "over")
              ? "bg-green-400 text-black"
              : "bg-black/50 hover:bg-gray-700/50 text-white"
          }`}
          style={{
            alignContent: "center",
            alignItems: "baseline",
            backgroundColor: isSelected(prop.id, "over")
              ? "rgb(110, 255, 0)"
              : "rgba(0, 0, 0, 0.5)",
            borderBottomRightRadius: "6px",
            borderColor: "rgb(44, 44, 57)",
            borderTop: "1px solid rgb(44, 44, 57)",
            color: isSelected(prop.id, "over")
              ? "rgb(5, 6, 20)"
              : "rgb(255, 255, 255)",
            cursor: "pointer",
            display: "flex",
            flexBasis: "0%",
            flexGrow: "1",
            fontSize: "11px",
            gap: "3px",
            justifyContent: "center",
            lineHeight: "12px",
            paddingBottom: "6px",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "6px",
            textAlign: "center",
            border: "none",
          }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 9 8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="h-2 w-2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.315.158a.678.678 0 0 1 .87 0l3.36 2.89a.562.562 0 0 1 .034.837.677.677 0 0 1-.905.03L5.39 1.953v5.455c0 .328-.287.593-.64.593-.353 0-.64-.265-.64-.593V1.952L1.825 3.916a.677.677 0 0 1-.904-.031.562.562 0 0 1 .034-.838L4.315.158Z"
            />
          </svg>
          <span className="text-sm">More</span>
          {prop.pickType === "demon" && (
            <span className="text-xs opacity-75 ml-1">1.25x</span>
          )}
          {prop.pickType === "goblin" && (
            <span className="text-xs opacity-75 ml-1">0.85x</span>
          )}
        </button>
      </div>
    </div>
  );
};

// PrizePicks-style Lineup Builder Component
const LineupBuilder: React.FC<{
  selectedPicks: SelectedPick[];
  onRemovePick: (propId: string) => void;
  entryAmount: number;
  onEntryAmountChange: (amount: number) => void;
  onSubmitLineup: () => void;
  calculatePayout: () => number;
  getOverallConfidence: () => number;
  validateLineup: () => { valid: boolean; message: string };
}> = ({
  selectedPicks,
  onRemovePick,
  entryAmount,
  onEntryAmountChange,
  onSubmitLineup,
  calculatePayout,
  getOverallConfidence,
  validateLineup,
}) => {
  const validation = validateLineup();

  return (
    <div
      className="sticky top-4 self-start"
      style={{
        backgroundColor: "rgb(5, 6, 20)",
        borderBottom: "1px solid rgb(57, 57, 69)",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        display: "flex",
        flexDirection: "column",
        minHeight: "500px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">Current Lineup</h3>
            <p className="text-gray-400 text-sm">
              {selectedPicks.length} Players Selected
            </p>
          </div>
          {selectedPicks.length > 0 && (
            <button
              onClick={() =>
                selectedPicks.forEach((pick) => onRemovePick(pick.propId))
              }
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Selected Players List */}
      <div className="flex-1 overflow-y-auto">
        {selectedPicks.length === 0 ? (
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-white font-semibold mb-2">Build Your Lineup</h4>
            <p className="text-gray-400 text-sm">
              Select 2-6 players to create your PrizePicks entry
            </p>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {selectedPicks.map((pick, index) => (
              <motion.div
                key={`${pick.propId}-${pick.choice}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">
                      {pick.choice === "over" ? "📈" : "📉"}
                      {pick.pickType === "demon" && "😈"}
                      {pick.pickType === "goblin" && "👺"}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">
                        {pick.player}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {pick.choice.toUpperCase()} {pick.line} {pick.stat}
                      </div>
                      <div className="text-green-400 text-xs">
                        {pick.confidence?.toFixed(1)}% confidence
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePick(pick.propId)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Entry Configuration */}
      {selectedPicks.length >= 2 && (
        <div className="border-t border-gray-700/50 p-4 space-y-4">
          {/* Payout Info */}
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Two Ways to Win:</div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-400">1st Place</div>
                <div className="text-white font-bold">5X</div>
              </div>
              <div className="text-gray-500">OR</div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Perfect Lineup</div>
                <div className="text-purple-400 font-bold">
                  {(calculatePayout() / entryAmount).toFixed(1)}X
                </div>
              </div>
            </div>
          </div>

          {/* Entry Fee and Payout */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Entry Fee
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={entryAmount}
                  onChange={(e) =>
                    onEntryAmountChange(parseInt(e.target.value) || 0)
                  }
                  className="w-full pl-6 pr-2 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-purple-400 focus:outline-none"
                  min="5"
                  max="1000"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">To Win</label>
              <div className="py-2 px-2 bg-gray-700/50 border border-gray-600 rounded text-white text-sm">
                ${calculatePayout().toFixed(2)}
              </div>
            </div>
          </div>

          {/* Overall Confidence */}
          <div className="text-center">
            <div className="text-sm text-gray-400">
              Overall AI Confidence:{" "}
              <span className="text-green-400 font-bold">
                {getOverallConfidence().toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={onSubmitLineup}
            disabled={!validation.valid}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              validation.valid
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {validation.valid
              ? "SUBMIT LINEUP"
              : validation.message.toUpperCase()}
          </button>

          {/* Info Banner */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              Payout multipliers may be adjusted based on your player
              selections. <span className="text-blue-400">Learn more</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const PrizePicksPro: React.FC = () => {
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);
  const [entryAmount, setEntryAmount] = useState(25);
  const [showAIAnalysis, setShowAIAnalysis] = useState<string | null>(null);
  const [showDemonsGoblinsModal, setShowDemonsGoblinsModal] = useState(false);
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  // Enhanced mock player props with demons/goblins and tooltips - 9 cards for 3x3 grid
  const [playerProps] = useState<PlayerProp[]>([
    {
      id: "1",
      player: "LeBron James",
      team: "LAL",
      opponent: "GSW",
      stat: "Points",
      line: 25.5,
      overOdds: 1.85,
      underOdds: 1.95,
      confidence: 94.7,
      aiRecommendation: "over",
      reasoning:
        "LeBron has scored 26+ points in 8 of his last 10 games. Warriors defense allows 118 PPG and LeBron averages 28.3 vs Golden State historically.",
      trend: "8/10 games over 25.5",
      recentForm: "Hot streak - 32 PPG last 5 games",
      position: "SF",
      sport: "NBA",
      gameTime: "Today 7:30 PM",
      pickType: "normal",
      trendValue: 8,
    },
    {
      id: "2",
      player: "Stephen Curry",
      team: "GSW",
      opponent: "LAL",
      stat: "Three-Pointers Made",
      line: 4.5,
      overOdds: 1.9,
      underOdds: 1.9,
      confidence: 91.3,
      aiRecommendation: "over",
      reasoning:
        "Curry is shooting 43% from three at home and Lakers allow 14.2 threes per game (28th in NBA). Perfect matchup for volume.",
      trend: "7/10 games over 4.5 threes",
      recentForm: "5.2 threes per game last 10",
      position: "PG",
      sport: "NBA",
      gameTime: "Today 7:30 PM",
      pickType: "demon",
      trendValue: 12,
    },
    {
      id: "3",
      player: "Giannis Antetokounmpo",
      team: "MIL",
      opponent: "BOS",
      stat: "Rebounds",
      line: 11.5,
      overOdds: 1.88,
      underOdds: 1.92,
      confidence: 89.2,
      aiRecommendation: "over",
      reasoning:
        "Giannis faces Celtics who play small ball frequently. He grabbed 13+ rebounds in 4 of last 5 games vs Boston.",
      trend: "6/8 games over 11.5 rebounds",
      recentForm: "12.8 rebounds per game last 10",
      position: "PF",
      sport: "NBA",
      gameTime: "Today 8:00 PM",
      pickType: "goblin",
      trendValue: 5,
    },
    {
      id: "4",
      player: "Jayson Tatum",
      team: "BOS",
      opponent: "MIL",
      stat: "Points",
      line: 28.5,
      overOdds: 1.87,
      underOdds: 1.93,
      confidence: 87.4,
      aiRecommendation: "under",
      reasoning:
        "Tatum struggles against Milwaukee's length, averaging 24.2 points in last 6 meetings. Bucks have improved perimeter defense this season.",
      trend: "4/8 games under 28.5",
      recentForm: "Cold streak - 42% FG last 3 games",
      position: "SF",
      sport: "NBA",
      gameTime: "Today 8:00 PM",
      pickType: "normal",
      trendValue: 3,
    },
    {
      id: "5",
      player: "Kevin Durant",
      team: "PHX",
      opponent: "DEN",
      stat: "Points",
      line: 27.5,
      overOdds: 1.83,
      underOdds: 1.97,
      confidence: 92.1,
      aiRecommendation: "over",
      reasoning:
        "Durant has been unstoppable lately, scoring 28+ in 7 of last 8 games. Denver's perimeter defense ranks 24th in the league.",
      trend: "7/8 games over 27.5",
      recentForm: "Elite form - 31.2 PPG last 5",
      position: "PF",
      sport: "NBA",
      gameTime: "Today 9:00 PM",
      pickType: "normal",
      trendValue: 9,
    },
    {
      id: "6",
      player: "Nikola Jokic",
      team: "DEN",
      opponent: "PHX",
      stat: "Assists",
      line: 8.5,
      overOdds: 1.89,
      underOdds: 1.91,
      confidence: 88.6,
      aiRecommendation: "over",
      reasoning:
        "Jokic faces a fast-paced Suns team that allows 25.3 assists per game. He's averaging 9.8 assists in last 6 games.",
      trend: "6/8 games over 8.5 assists",
      recentForm: "Playmaking machine - 9.8 APG",
      position: "C",
      sport: "NBA",
      gameTime: "Today 9:00 PM",
      pickType: "normal",
      trendValue: 7,
    },
    {
      id: "7",
      player: "Joel Embiid",
      team: "PHI",
      opponent: "MIA",
      stat: "Rebounds",
      line: 10.5,
      overOdds: 1.86,
      underOdds: 1.94,
      confidence: 90.3,
      aiRecommendation: "over",
      reasoning:
        "Embiid dominates the glass against Miami's small-ball lineups. He's grabbed 12+ rebounds in 5 of 6 meetings with Heat.",
      trend: "5/6 games over 10.5 vs MIA",
      recentForm: "Dominant - 11.7 RPG last 5",
      position: "C",
      sport: "NBA",
      gameTime: "Today 7:00 PM",
      pickType: "goblin",
      trendValue: 4,
    },
    {
      id: "8",
      player: "Luka Doncic",
      team: "DAL",
      opponent: "LAC",
      stat: "Triple-Double",
      line: 0.5,
      overOdds: 2.1,
      underOdds: 1.75,
      confidence: 85.2,
      aiRecommendation: "over",
      reasoning:
        "Luka has recorded triple-doubles in 3 of his last 4 games vs Clippers. His usage rate is at season-high levels.",
      trend: "3/4 triple-doubles vs LAC",
      recentForm: "Triple-double threat - 28/9/8",
      position: "PG",
      sport: "NBA",
      gameTime: "Today 10:30 PM",
      pickType: "demon",
      trendValue: 15,
    },
    {
      id: "9",
      player: "Anthony Davis",
      team: "LAL",
      opponent: "GSW",
      stat: "Blocks",
      line: 1.5,
      overOdds: 1.92,
      underOdds: 1.88,
      confidence: 86.8,
      aiRecommendation: "over",
      reasoning:
        "AD faces Warriors who attempt 42.3 shots in the paint per game. He's averaged 2.4 blocks in last 5 meetings.",
      trend: "4/5 games over 1.5 blocks",
      recentForm: "Defensive anchor - 2.1 BPG",
      position: "PF",
      sport: "NBA",
      gameTime: "Today 7:30 PM",
      pickType: "normal",
      trendValue: 6,
    },
  ]);

  const addPick = (prop: PlayerProp, choice: "over" | "under") => {
    if (selectedPicks.length >= 6) return;

    // Remove existing pick for this prop if any
    const filteredPicks = selectedPicks.filter(
      (pick) => pick.propId !== prop.id,
    );

    const newPick: SelectedPick = {
      propId: prop.id,
      choice,
      player: prop.player,
      stat: prop.stat,
      line: prop.line,
      confidence: prop.confidence,
      pickType: prop.pickType,
    };

    setSelectedPicks([...filteredPicks, newPick]);
  };

  const removePick = (propId: string) => {
    setSelectedPicks(selectedPicks.filter((pick) => pick.propId !== propId));
  };

  const calculatePayout = () => {
    const pickCount = selectedPicks.length;
    const multipliers: Record<number, number> = {
      2: 3,
      3: 5,
      4: 10,
      5: 20,
      6: 40,
    };

    if (pickCount < 2) return 0;

    let baseMultiplier = multipliers[pickCount] || 0;

    // Apply demon/goblin modifiers
    selectedPicks.forEach((pick) => {
      if (pick.pickType === "demon") {
        baseMultiplier *= 1.25;
      } else if (pick.pickType === "goblin") {
        baseMultiplier *= 0.85;
      }
    });

    return entryAmount * baseMultiplier;
  };

  const getOverallConfidence = () => {
    if (selectedPicks.length === 0) return 0;
    return (
      selectedPicks.reduce((sum, pick) => sum + pick.confidence, 0) /
      selectedPicks.length
    );
  };

  const isPickSelected = (propId: string, choice: "over" | "under") => {
    return selectedPicks.some(
      (pick) => pick.propId === propId && pick.choice === choice,
    );
  };

  const validateLineup = () => {
    if (selectedPicks.length < 2)
      return { valid: false, message: "Select at least 2 picks" };
    if (selectedPicks.length > 6)
      return { valid: false, message: "Maximum 6 picks allowed" };

    // Check for at least 2 different teams
    const teams = new Set(
      selectedPicks.map((pick) => {
        const prop = playerProps.find((p) => p.id === pick.propId);
        return prop?.team;
      }),
    );

    if (teams.size < 2)
      return {
        valid: false,
        message: "Must have picks from at least 2 different teams",
      };

    return { valid: true, message: "Lineup is valid" };
  };

  const submitLineup = () => {
    const validation = validateLineup();
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    alert(
      `Lineup submitted! Entry: $${entryAmount}, Potential payout: $${calculatePayout().toFixed(2)}`,
    );
  };

  // Generate expanded player data with all available props
  const getExpandedPlayerData = (playerName: string): ExpandedPlayerData => {
    const basePlayer = playerProps.find((p) => p.player === playerName);
    if (!basePlayer) throw new Error("Player not found");

    // Generate all available props for this player (sorted by odds)
    const allProps: ExpandedPlayerProp[] = [
      {
        id: `${playerName}_points`,
        stat: "Points",
        line: basePlayer.line,
        overOdds: basePlayer.overOdds,
        underOdds: basePlayer.underOdds,
        confidence: basePlayer.confidence,
        aiRecommendation: basePlayer.aiRecommendation,
        reasoning: basePlayer.reasoning,
        expectedValue: 25.4,
        volume: 87,
        oddsExplanation: `${basePlayer.overOdds} odds means ${(100 / basePlayer.overOdds).toFixed(1)}% implied probability.`,
        pickType: basePlayer.pickType || "normal",
      },
      {
        id: `${playerName}_rebounds`,
        stat: "Rebounds",
        line: 8.5,
        overOdds: 1.92,
        underOdds: 1.88,
        confidence: 89.2,
        aiRecommendation: "over",
        reasoning:
          "Opponent plays fast pace allowing more rebounding opportunities",
        expectedValue: 8.7,
        volume: 73,
        oddsExplanation:
          "1.92 odds means 52.1% implied probability. Slightly favored over.",
        pickType: "normal",
      },
      {
        id: `${playerName}_assists`,
        stat: "Assists",
        line: 6.5,
        overOdds: 2.1,
        underOdds: 1.75,
        confidence: 76.3,
        aiRecommendation: "under",
        reasoning: "Limited playmaking role in recent games",
        expectedValue: 5.8,
        volume: 45,
        oddsExplanation:
          "2.1 odds means 47.6% implied probability. Market sees this as challenging.",
        pickType: "demon",
      },
      {
        id: `${playerName}_combo`,
        stat: "Pts+Rebs+Asts",
        line: 40.5,
        overOdds: 1.88,
        underOdds: 1.92,
        confidence: 82.1,
        aiRecommendation: "over",
        reasoning: "Triple-double potential in high-pace matchup",
        expectedValue: 42.1,
        volume: 68,
        oddsExplanation:
          "1.88 odds means 53.2% implied probability. Good value combo bet.",
        pickType: "normal",
      },
      {
        id: `${playerName}_threes`,
        stat: "3-PT Made",
        line: 2.5,
        overOdds: 2.25,
        underOdds: 1.65,
        confidence: 71.4,
        aiRecommendation: "under",
        reasoning: "Opponent has strong perimeter defense",
        expectedValue: 2.2,
        volume: 32,
        oddsExplanation:
          "2.25 odds means 44.4% implied probability. Lower volume prop.",
        pickType: "goblin",
      },
    ];

    return {
      player: playerName,
      team: basePlayer.team,
      opponent: basePlayer.opponent,
      position: basePlayer.position || "SF",
      sport: basePlayer.sport || "NBA",
      gameTime: basePlayer.gameTime || "Today 7:30 PM",
      seasonStats: {
        Points: 25.4,
        Rebounds: 7.2,
        Assists: 6.8,
        "3PM": 2.1,
        Steals: 1.3,
      },
      recentForm: ["35", "20", "24", "24", "24"], // Last 5 games matching the chart
      props: allProps,
    };
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="holographic text-6xl font-black mb-4">
            PRIZEPICKS PRO
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            AI-Enhanced Player Prop Analysis
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                Expert AI Recommendations
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">
                Real-time Data Analysis
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-semibold">
                Advanced Pattern Recognition
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Entry Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Configure Your Entry
            </h2>
            <p className="text-gray-400">
              Select 2-6 picks for your PrizePicks entry
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setShowDemonsGoblinsModal(true)}
                className="flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Learn about Demons & Goblins</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Entry Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={entryAmount}
                  onChange={(e) =>
                    setEntryAmount(parseInt(e.target.value) || 0)
                  }
                  className="pl-8 pr-4 py-3 bg-gray-800/80 border-2 border-gray-500 rounded-xl text-white font-bold text-center focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
                  min="5"
                  max="1000"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Potential Payout</div>
              <div className="text-3xl font-black text-green-400">
                ${calculatePayout().toFixed(2)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
              <div className="text-2xl font-bold text-blue-400">
                {getOverallConfidence().toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Layout - Props Grid + Lineup Builder */}
      <div className="flex gap-6 max-w-none">
        {/* Props Grid - Left Side */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-4 w-full">
            {playerProps.map((prop, index) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="w-full"
              >
                <PropCard
                  prop={prop}
                  onSelect={addPick}
                  isSelected={isPickSelected}
                  showAIAnalysis={showAIAnalysis}
                  onToggleAnalysis={(playerName) =>
                    setExpandedPlayer(
                      expandedPlayer === playerName ? null : playerName,
                    )
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lineup Builder - Right Side */}
        <div className="w-80 flex-shrink-0">
          <LineupBuilder
            selectedPicks={selectedPicks}
            onRemovePick={removePick}
            entryAmount={entryAmount}
            onEntryAmountChange={setEntryAmount}
            onSubmitLineup={submitLineup}
            calculatePayout={calculatePayout}
            getOverallConfidence={getOverallConfidence}
            validateLineup={validateLineup}
          />
        </div>
      </div>

      {/* Expanded Player View */}
      {expandedPlayer && (
        <ExpandedPlayerView
          playerData={getExpandedPlayerData(expandedPlayer)}
          onClose={() => setExpandedPlayer(null)}
          onSelect={(propId, choice) => {
            // Create a temporary prop object for the selection
            const expandedData = getExpandedPlayerData(expandedPlayer);
            const selectedProp = expandedData.props.find(
              (p) => p.id === propId,
            );
            if (selectedProp) {
              const tempProp: PlayerProp = {
                id: propId,
                player: expandedData.player,
                team: expandedData.team,
                opponent: expandedData.opponent,
                stat: selectedProp.stat,
                line: selectedProp.line,
                overOdds: selectedProp.overOdds,
                underOdds: selectedProp.underOdds,
                confidence: selectedProp.confidence,
                aiRecommendation: selectedProp.aiRecommendation,
                reasoning: selectedProp.reasoning,
                trend: "TBD",
                recentForm: expandedData.recentForm.join(", "),
                position: expandedData.position,
                sport: expandedData.sport,
                gameTime: expandedData.gameTime,
                pickType: selectedProp.pickType,
              };
              addPick(tempProp, choice);
            }
          }}
          isSelected={(propId, choice) => {
            return selectedPicks.some(
              (pick) => pick.propId === propId && pick.choice === choice,
            );
          }}
        />
      )}

      {/* Demons & Goblins Modal */}
      <DemonsGoblinsModal
        isOpen={showDemonsGoblinsModal}
        onClose={() => setShowDemonsGoblinsModal(false)}
      />
    </div>
  );
};

export default PrizePicksPro;
