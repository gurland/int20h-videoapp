import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './utils/store';
import { createTheme, ThemeProvider } from '@mui/material';

let theme = createTheme();
theme = createTheme({
    components: {
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </StoreProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
