import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const UltimateMoneyMaker = ({ opportunities, onPlaceBet }) => {
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const handlePlaceBet = async (opportunity) => {
        try {
            setIsPlacingBet(true);
            await onPlaceBet(opportunity);
        }
        catch (error) {
            console.error('Error placing bet:', error);
        }
        finally {
            setIsPlacingBet(false);
        }
    };
    return (_jsxs("div", { className: "ultimate-money-maker", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Betting Opportunities" }), _jsx("div", { className: "space-y-4", children: opportunities.map(opportunity => (_jsxs("div", { className: "prizepicks-card p-4 rounded-xl", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: opportunity.description }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Models: ", opportunity.models.join(', ')] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold", children: [(opportunity.confidence * 100).toFixed(1), "%"] }), _jsx("div", { className: "text-sm", children: "Confidence" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mt-4", children: [_jsxs("div", { className: "glass-premium p-2 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Odds" }), _jsx("div", { className: "font-bold", children: opportunity.odds.toFixed(2) })] }), _jsxs("div", { className: "glass-premium p-2 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Expected Value" }), _jsxs("div", { className: "font-bold", children: [(opportunity.expectedValue * 100).toFixed(1), "%"] })] }), _jsxs("div", { className: "glass-premium p-2 rounded-lg", children: [_jsx("div", { className: "text-sm text-gray-500", children: "Kelly Size" }), _jsxs("div", { className: "font-bold", children: [(opportunity.kellySize * 100).toFixed(1), "%"] })] })] }), _jsx("button", { className: "ultimate-btn w-full mt-4", onClick: (e) => {
                                e.stopPropagation();
                                handlePlaceBet(opportunity);
                            }, disabled: isPlacingBet, children: isPlacingBet ? 'Placing Bet...' : 'Place Bet' })] }, opportunity.id))) })] }));
};
