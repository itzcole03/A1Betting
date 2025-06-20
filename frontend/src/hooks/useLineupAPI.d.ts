import { type Player } from '@/services/api';
export declare const LINEUP_QUERY_KEY: string[];
export declare function useLineupAPI(): {
    players: unknown;
    isLoading: boolean;
    error: Error | null;
    filterPlayers: ({ position, team, minSalary, maxSalary, minConfidence, searchTerm, }?: {
        position?: string;
        team?: string;
        minSalary?: number;
        maxSalary?: number;
        minConfidence?: number;
        searchTerm?: string;
    }) => any;
    positions: unknown[];
    teams: unknown[];
    validateLineup: (selectedPlayers: Player[]) => {
        isValid: boolean;
        errors: string[];
        totalSalary: Player;
    };
    submitLineup: import("@tanstack/react-query").UseMutateFunction<unknown, Error, void, unknown>;
    isSubmitting: boolean;
    submitError: Error | null;
};
