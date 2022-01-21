import React from 'react';
import { Routes as BrowserRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from './constants/routes';
import Homepage from './pages/homepage/Homepage';
import Room from './pages/Room/Room';
import './App.scss';
import Header from './components/header/Header';

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app-content">
                <BrowserRoutes>
                    <Route path={Routes.Homepage} element={<Homepage />} />
                    <Route path={Routes.Room} element={<Room />} />
                    <Route path="*" element={<Navigate to={Routes.Homepage} />} />
                </BrowserRoutes>
            </div>
        </div>
    );
}

export default App;
