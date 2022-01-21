import React from 'react';
import { Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from './constants/routes';
import Homepage from './pages/homepage/Homepage';
import RoomPage from './pages/RoomPage/RoomPage';
import './App.scss';
import Header from './components/header/Header';

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app-content">
                <BrowserRoutes>
                    <Route path={Routes.Homepage} element={<Homepage />} />
                    <Route path={Routes.Room} element={<RoomPage />} />
                    <Route path="*" element={<Navigate to={Routes.Homepage} />} />
                </BrowserRoutes>
            </div>
        </div>
    );
}

export default App;
