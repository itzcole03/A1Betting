import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeStore } from '../../store/themeStore';
const ThemeToggle = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeStore();
    return (_jsx(IconButton, { "aria-label": "toggle theme", color: "inherit", sx: { ml: 1 }, onClick: toggleTheme, children: theme.palette.mode === 'dark' ? _jsx(Brightness7Icon, {}) : _jsx(Brightness4Icon, {}) }));
};
export default ThemeToggle;
