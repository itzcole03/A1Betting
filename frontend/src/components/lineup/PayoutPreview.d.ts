import { Player } from '@/services/api';
interface PayoutPreviewProps {
    selectedPlayers: Player[];
    entryFee: number;
    className?: string;
}
export declare function PayoutPreview({ selectedPlayers, entryFee, className }: PayoutPreviewProps): import("react/jsx-runtime").JSX.Element;
export {};
