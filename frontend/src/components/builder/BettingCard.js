import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Builder } from '@builder.io/react';
const BettingCard = ({ title = 'Match Title', odds = '2.5', team1 = 'Team A', team2 = 'Team B', sport = 'Football', time = 'Today 3:00 PM', onClick }) => {
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow", onClick: onClick, children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: sport }), _jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: time })] }), _jsx("h3", { className: "text-lg font-semibold mb-2 dark:text-white", children: title }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium dark:text-white", children: team1 }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "vs" }), _jsx("span", { className: "text-sm font-medium dark:text-white", children: team2 })] }), _jsx("div", { className: "bg-blue-500 text-white px-3 py-1 rounded font-bold", children: odds })] })] }));
};
// Register the component with Builder.io
Builder.registerComponent(BettingCard, {
    name: 'BettingCard',
    inputs: [
        {
            name: 'title',
            type: 'string',
            defaultValue: 'Match Title',
            helperText: 'Title of the betting match'
        },
        {
            name: 'odds',
            type: 'string',
            defaultValue: '2.5',
            helperText: 'Betting odds'
        },
        {
            name: 'team1',
            type: 'string',
            defaultValue: 'Team A',
            helperText: 'First team name'
        },
        {
            name: 'team2',
            type: 'string',
            defaultValue: 'Team B',
            helperText: 'Second team name'
        },
        {
            name: 'sport',
            type: 'string',
            defaultValue: 'Football',
            helperText: 'Sport type'
        },
        {
            name: 'time',
            type: 'string',
            defaultValue: 'Today 3:00 PM',
            helperText: 'Match time'
        }
    ]
});
export default BettingCard;
