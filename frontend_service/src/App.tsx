import React from 'react';
import { Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from './constants/routes';
import Homepage from './pages/Homepage';
import RoomPage from './pages/RoomPage';
import Header from './components/Header';
import { makeStyles } from 'tss-react/mui';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import CreateRoomPage from './pages/CreateRoomPage';

const useStyles = makeStyles()((theme) => ({
    app: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    appContent: {
        overflow: 'auto',
        height: 'calc(100% - 60px)',
        padding: theme.spacing(1, 4, 4, 4),
        transition: 'padding 0.2s ease-in-out',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2, 4, 2),
        },
    },
}));

function App() {
    const { classes } = useStyles();
    return (
        <div className={classes.app}>
            <Header />
            <div className={classes.appContent}>
                <BrowserRoutes>
                    <Route path={Routes.Homepage} element={<Homepage />} />
                    <Route path={Routes.Room} element={<RoomPage />} />
                    <Route path={Routes.Auth} element={<AuthPage />} />
                    <Route path={Routes.Profile} element={<ProfilePage />} />
                    <Route path={Routes.CreateRoom} element={<CreateRoomPage />} />
                    <Route path="*" element={<Navigate to={Routes.Homepage} />} />
                </BrowserRoutes>
            </div>
        </div>
    );
}

export default App;
