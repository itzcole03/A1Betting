import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { errorLogger } from '../utils/errorLogger';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.handleReset = () => {
            this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
            });
        };
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
        errorLogger.logError(error, {
            context: 'ErrorBoundary',
            componentStack: errorInfo.componentStack,
        });
    }
    render() {
        if (this.state.hasError) {
            return (_jsx(Box, { sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    p: 3,
                    bgcolor: 'background.default',
                }, children: _jsxs(Paper, { elevation: 3, sx: {
                        p: 4,
                        maxWidth: 600,
                        width: '100%',
                        textAlign: 'center',
                    }, children: [_jsx(Typography, { gutterBottom: true, color: "error", variant: "h4", children: "Something went wrong" }), _jsx(Typography, { paragraph: true, color: "text.secondary", variant: "body1", children: "We apologize for the inconvenience. An error has occurred and our team has been notified." }), process.env.NODE_ENV === 'development' && this.state.error && (_jsxs(Box, { sx: {
                                mt: 2,
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                textAlign: 'left',
                                overflow: 'auto',
                            }, children: [_jsx(Typography, { color: "error", variant: "subtitle2", children: this.state.error.toString() }), this.state.errorInfo && (_jsx(Typography, { component: "pre", sx: {
                                        mt: 1,
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                    }, variant: "caption", children: this.state.errorInfo.componentStack }))] })), _jsxs(Box, { sx: { mt: 3 }, children: [_jsx(Button, { color: "primary", sx: { mr: 2 }, variant: "contained", onClick: this.handleReset, children: "Try Again" }), _jsx(Button, { color: "primary", variant: "outlined", onClick: () => window.location.reload(), children: "Refresh Page" })] })] }) }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
