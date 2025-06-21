export interface LineupPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  salary: number;
  projectedPoints: number;
  ownership?: number;
  value?: number;
}

export interface Lineup {
  id: string;
  name: string;
  players: LineupPlayer[];
  totalSalary: number;
  projectedPoints: number;
  salaryRemaining: number;
  isValid: boolean;
  sport: string;
  contest: string;
}

export interface LineupConstraints {
  maxSalary: number;
  positions: Record<string, number>;
  maxPlayersPerTeam?: number;
  minDifferentTeams?: number;
}

export interface LineupOptimization {
  objective: "points" | "value" | "ownership";
  constraints: LineupConstraints;
  playerPool: LineupPlayer[];
  numberOfLineups: number;
}
